import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const config = ts.readConfigFile(
  resolve(root, 'packages/vue/tsconfig.json'),
  ts.sys.readFile,
);
const parsed = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  resolve(root, 'packages/vue'),
);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const index = program.getSourceFile(resolve(root, 'packages/vue/src/index.ts'));
const moduleSymbol = checker.getSymbolAtLocation(index);
const exportsByName = new Map(
  checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.name, symbol]),
);
const start = '{/* vue-api:start */}';
const end = '{/* vue-api:end */}';
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

function resolveSymbol(symbol) {
  return symbol?.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;
}

function property(object, name) {
  return object.properties.find(
    (entry) =>
      ts.isPropertyAssignment(entry) && entry.name.getText(object.getSourceFile()).replaceAll(/["']/gu, '') === name,
  );
}

function findOptions(node, seen) {
  if (!node) return undefined;
  if (ts.isObjectLiteralExpression(node)) return node;
  if (ts.isIdentifier(node)) {
    const referenced = resolveSymbol(checker.getSymbolAtLocation(node));
    if (referenced && !seen.has(referenced)) return optionObject(referenced, seen);
  }
  if (ts.isCallExpression(node)) {
    const direct = node.arguments.find(ts.isObjectLiteralExpression);
    if (direct) return direct;
    const called = resolveSymbol(checker.getSymbolAtLocation(node.expression));
    if (called && !seen.has(called)) {
      const fromFactory = optionObject(called, seen);
      if (fromFactory) return fromFactory;
    }
  }
  let result;
  ts.forEachChild(node, (child) => {
    result ??= findOptions(child, seen);
  });
  return result;
}

function optionObject(symbol, seen = new Set()) {
  if (!symbol || seen.has(symbol)) return undefined;
  seen.add(symbol);
  const declaration = symbol?.valueDeclaration;
  if (!declaration) return undefined;
  return findOptions(
    ts.isVariableDeclaration(declaration) ? declaration.initializer : declaration,
    seen,
  );
}

function propType(expression) {
  const text = expression.getText();
  const propTypeMatch = text.match(/PropType<([\s\S]+)>/u);
  if (propTypeMatch) return propTypeMatch[1];
  const constructor = text.match(/^(?:Boolean|String|Number|Array|Object)$/u)?.[0];
  return (
    {
      Boolean: 'boolean',
      String: 'string',
      Number: 'number',
      Array: 'unknown[]',
      Object: 'Record<string, unknown>',
    }[constructor] ?? text
  );
}

function propsRows(options) {
  const propsOption = property(options, 'props');
  if (!propsOption || !ts.isObjectLiteralExpression(propsOption.initializer)) return [];
  return propsOption.initializer.properties
    .filter(ts.isPropertyAssignment)
    .map((entry) => {
      const name = entry.name.getText().replaceAll(/["']/gu, '');
      if (!ts.isObjectLiteralExpression(entry.initializer)) {
        const type = propType(entry.initializer);
        const fallback = type === 'boolean' ? 'false' : 'undefined';
        return `| \`${name}\` | ${inlineCode(type)} | ${inlineCode(fallback)} |`;
      }
      const typeOption = property(entry.initializer, 'type');
      const defaultOption = property(entry.initializer, 'default');
      const requiredOption = property(entry.initializer, 'required');
      const type = typeOption ? propType(typeOption.initializer) : 'unknown';
      const fallback = defaultOption
        ? inlineCode(defaultOption.initializer.getText())
        : requiredOption?.initializer.kind === ts.SyntaxKind.TrueKeyword
          ? 'Required'
          : inlineCode('undefined');
      return `| \`${name}\` | ${inlineCode(type)} | ${fallback} |`;
    });
}

function eventRows(options) {
  const emitsOption = property(options, 'emits');
  if (!emitsOption) return [];
  const names = ts.isArrayLiteralExpression(emitsOption.initializer)
    ? emitsOption.initializer.elements.map((entry) => entry.getText().replaceAll(/["']/gu, ''))
    : ts.isObjectLiteralExpression(emitsOption.initializer)
      ? emitsOption.initializer.properties.map((entry) => entry.name.getText().replaceAll(/["']/gu, ''))
      : [];
  const payloads = new Map(names.map((name) => [name, new Set()]));
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText() === 'emit' &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      const payload = node.arguments[1];
      if (payloads.has(node.arguments[0].text)) {
        payloads
          .get(node.arguments[0].text)
          .add(payload ? checker.typeToString(checker.getTypeAtLocation(payload)) : 'none');
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(options);
  return names.map((name) => {
    const types = [...payloads.get(name)];
    return `| \`${name}\` | ${inlineCode(types.length ? types.join(' | ') : 'unspecified')} |`;
  });
}

function componentSection(name) {
  const exported = exportsByName.get(name);
  const symbol = resolveSymbol(exported);
  const options = optionObject(symbol);
  if (!options) {
    const declared = exported && checker.getDeclaredTypeOfSymbol(exported);
    const text = declared
      ? checker.typeToString(
          declared,
          exported.declarations?.[0],
          ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias,
        )
      : 'unknown';
    return `### \`${name}\`\n\nExported type: ${inlineCode(text)}.`;
  }
  const props = propsRows(options);
  const events = eventRows(options);
  const source = options.getText();
  const slots = [...source.matchAll(/slots\.([A-Za-z_$][\w$]*)/gu)]
    .map((match) => match[1])
    .filter((slot, index, values) => values.indexOf(slot) === index)
    .sort();
  const expose = source.match(/expose\(\{([\s\S]*?)\}\)/u)?.[1];
  const methods = expose
    ? expose.split(',').map((item) => item.trim()).filter(Boolean)
    : [];
  const inheritAttrs = property(options, 'inheritAttrs')?.initializer.kind !== ts.SyntaxKind.FalseKeyword;
  const attrs = inheritAttrs
    ? 'Vue attribute fallthrough is enabled for the rendered root.'
    : source.includes('...attrs')
      ? 'Automatic fallthrough is disabled; `attrs` are manually forwarded to the rendered root.'
      : 'Automatic attribute fallthrough is disabled and undeclared attributes are not forwarded.';
  const propsTable = props.length
    ? `| Prop | Type | Default / requirement |\n| --- | --- | --- |\n${props.join('\n')}`
    : 'No declared props.';
  const eventsTable = events.length
    ? `| Event | Payload |\n| --- | --- |\n${events.join('\n')}`
    : 'No emitted events.';
  return `### \`${name}\`\n\n${attrs}\n\n${propsTable}\n\n${eventsTable}\n\nSlots: ${slots.length ? slots.map((slot) => `\`${slot}\``).join(', ') : 'none'}.\n\nExposed methods: ${methods.length ? methods.map((method) => `\`${method}\``).join(', ') : 'none'}.`;
}

function section(component) {
  return `${start}\n<details className="reference-details">\n<summary>Vue API reference</summary>\n\n### Vue\n\nBoolean props without explicit defaults use Vue's \`false\` default. Undeclared attributes follow\nthe fallthrough behavior stated for each component.\n\n${registry.symbols.vue[component].map(componentSection).join('\n\n')}\n\n</details>\n${end}`;
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
  process.stderr.write(`Vue API documentation is missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} Vue API documentation for ${registry.components.length} component pages.\n`,
  );
}
