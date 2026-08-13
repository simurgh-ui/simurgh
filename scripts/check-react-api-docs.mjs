import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const sourceRoot = resolve(root, 'packages/react/src').replaceAll('\\', '/');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const configPath = resolve(root, 'packages/react/tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  resolve(root, 'packages/react'),
);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const index = program.getSourceFile(resolve(root, 'packages/react/src/index.tsx'));
const moduleSymbol = checker.getSymbolAtLocation(index);
const exportsByName = new Map(
  checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.name, symbol]),
);
const start = '{/* react-api:start */}';
const end = '{/* react-api:end */}';
const failures = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function clean(value) {
  return value.replaceAll('|', '\\|').replace(/\s+/gu, ' ').trim();
}

function inlineCode(value) {
  const cleaned = clean(value);
  return cleaned.includes('`') ? `\`\` ${cleaned} \`\`` : `\`${cleaned}\``;
}

function sourceDeclaration(symbol) {
  return symbol.declarations?.some((declaration) =>
    declaration.getSourceFile().fileName.replaceAll('\\', '/').startsWith(sourceRoot),
  );
}

function findRenderFunction(node) {
  if (!node) return undefined;
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return node;
  if (ts.isCallExpression(node)) {
    for (const argument of node.arguments) {
      const found = findRenderFunction(argument);
      if (found) return found;
    }
    return findRenderFunction(node.expression);
  }
  if (ts.isParenthesizedExpression(node)) return findRenderFunction(node.expression);
  return undefined;
}

function defaultsFor(symbol) {
  const declaration = symbol.valueDeclaration;
  if (!declaration || !ts.isVariableDeclaration(declaration)) return new Map();
  const render = findRenderFunction(declaration.initializer);
  const parameter = render?.parameters[0];
  if (!parameter || !ts.isObjectBindingPattern(parameter.name)) return new Map();
  return new Map(
    parameter.name.elements
      .filter((element) => element.initializer && ts.isIdentifier(element.name))
      .map((element) => [
        element.name.text,
        clean(element.initializer.getText(index)),
      ]),
  );
}

function componentReference(propsType) {
  const text = checker.typeToString(
    propsType,
    undefined,
    ts.TypeFormatFlags.NoTruncation,
  );
  const native = [...text.matchAll(/(?:React\.)?([A-Z][A-Za-z]+Attributes)<([^>]+)>/gu)]
    .map((match) => `${match[1]}<${match[2]}>`)
    .filter((value, index, values) => values.indexOf(value) === index);
  return native.length
    ? `Inherited attributes: \`${native.join(' & ')}\`.`
    : `Complete props type: \`${clean(text)}\`.`;
}

function componentSection(name) {
  const symbol = exportsByName.get(name);
  if (!symbol) return `### \`${name}\`\n\nExported value.`;
  if (!symbol.valueDeclaration) {
    const declared = checker.getDeclaredTypeOfSymbol(symbol);
    const type = checker.typeToString(
      declared,
      symbol.declarations?.[0],
      ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias,
    );
    return `### \`${name}\`\n\nExported type: \`${clean(type)}\`.`;
  }
  const componentType = checker.getTypeOfSymbolAtLocation(
    symbol,
    symbol.valueDeclaration,
  );
  const signature = componentType.getCallSignatures()[0];
  if (!signature) return `### \`${name}\`\n\nExported value.`;
  const parameter = signature.parameters[0];
  if (!parameter)
    return `### \`${name}\`\n\nThis component has no public props.`;
  const propsType = checker.getTypeOfSymbolAtLocation(
    parameter,
    parameter.valueDeclaration ?? symbol.valueDeclaration,
  );
  const defaults = defaultsFor(symbol);
  const rows = propsType
    .getProperties()
    .filter(
      (property) =>
        sourceDeclaration(property) || property.name === 'children' || property.name === 'ref',
    )
    .sort((first, second) => first.name.localeCompare(second.name, 'en'))
    .map((property) => {
      const declaration = property.valueDeclaration ?? property.declarations?.[0];
      const type = checker.getTypeOfSymbolAtLocation(
        property,
        declaration ?? symbol.valueDeclaration,
      );
      const optional = Boolean(property.flags & ts.SymbolFlags.Optional);
      const fallback = optional ? '`undefined`' : 'Required';
      return `| \`${property.name}\` | ${inlineCode(checker.typeToString(type, declaration, ts.TypeFormatFlags.NoTruncation))} | ${defaults.has(property.name) ? inlineCode(defaults.get(property.name)) : fallback} |`;
    });
  const table = rows.length
    ? `\n\n| Prop | Type | Default / requirement |\n| --- | --- | --- |\n${rows.join('\n')}`
    : '\n\nNo component-specific props; inherited attributes still apply.';
  return `### \`${name}\`\n\n${componentReference(propsType)}${table}`;
}

function section(component) {
  const symbols = registry.symbols.react[component];
  return `${start}\n<details className="reference-details">\n<summary>React API reference</summary>\n\n### React\n\nAn inherited-attributes entry means the component accepts the complete named React native interface,\nincluding its event handlers and ARIA and data attributes. Remaining attributes are forwarded to the\nrendered element unless the component behavior described on this page overrides them.\n\n${symbols.map(componentSection).join('\n\n')}\n\n</details>\n${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const generated = section(component);
  const pattern = new RegExp(
    `${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`,
    'u',
  );
  const anchor = '## Customization';
  const expected = pattern.test(source)
    ? source.replace(pattern, generated)
    : source.replace(anchor, `${generated}\n\n${anchor}`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(`React API documentation is missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} React API documentation for ${registry.components.length} component pages.\n`,
  );
}
