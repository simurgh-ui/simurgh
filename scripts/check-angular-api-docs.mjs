import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const config = ts.readConfigFile(resolve(root, 'packages/angular/tsconfig.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, resolve(root, 'packages/angular'));
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const index = program.getSourceFile(resolve(root, 'packages/angular/src/index.ts'));
const moduleSymbol = checker.getSymbolAtLocation(index);
const exportsByName = new Map(checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.name, symbol]));
const start = '{/* angular-api:start */}';
const end = '{/* angular-api:end */}';
const failures = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}
function clean(value) {
  return value.replaceAll('|', '\\|').replace(/\s+/gu, ' ').trim();
}
function inlineCode(value) {
  const text = clean(value);
  return text.includes('`') ? `\`\` ${text} \`\`` : `\`${text}\``;
}
function decorators(node) {
  return ts.canHaveDecorators(node) ? ts.getDecorators(node) ?? [] : [];
}
function decorator(node, name) {
  return decorators(node).find((item) => {
    const expression = ts.isCallExpression(item.expression) ? item.expression.expression : item.expression;
    return expression.getText() === name;
  });
}
function decoratorArgument(item) {
  return item && ts.isCallExpression(item.expression) ? item.expression.arguments[0] : undefined;
}
function resolveClass(name) {
  let symbol = exportsByName.get(name);
  if (symbol?.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
  return symbol?.declarations?.find(ts.isClassDeclaration);
}
function resolveSymbol(name) {
  let symbol = exportsByName.get(name);
  if (symbol?.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
  return symbol;
}
function metadata(declaration) {
  const kind = decorator(declaration, 'Component') ?? decorator(declaration, 'Directive');
  const argument = decoratorArgument(kind);
  if (!argument || !ts.isObjectLiteralExpression(argument)) return new Map();
  return new Map(argument.properties.filter(ts.isPropertyAssignment).map((item) => [item.name.getText().replaceAll(/["']/gu, ''), item.initializer]));
}
function decoratorContract(member, kind) {
  const item = decorator(member, kind);
  if (!item) return undefined;
  const argument = decoratorArgument(item);
  if (argument && ts.isStringLiteral(argument)) return { alias: argument.text, required: false };
  if (argument && ts.isObjectLiteralExpression(argument)) {
    const values = new Map(argument.properties.filter(ts.isPropertyAssignment).map((entry) => [entry.name.getText(), entry.initializer]));
    const alias = values.get('alias');
    return {
      alias: alias && ts.isStringLiteral(alias) ? alias.text : undefined,
      required: values.get('required')?.kind === ts.SyntaxKind.TrueKeyword,
    };
  }
  return { alias: undefined, required: false };
}
function memberType(member) {
  const type = member.type ? checker.getTypeFromTypeNode(member.type) : checker.getTypeAtLocation(member);
  return checker.typeToString(type, member, ts.TypeFormatFlags.NoTruncation);
}
function eventPayload(member) {
  const type = memberType(member);
  return type.match(/EventEmitter<([\s\S]+)>/u)?.[1] ?? type;
}
function isPublic(member) {
  return !member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword || modifier.kind === ts.SyntaxKind.ProtectedKeyword);
}
function componentSection(name) {
  const declaration = resolveClass(name);
  if (!declaration) {
    const symbol = resolveSymbol(name);
    const declared = symbol && checker.getDeclaredTypeOfSymbol(symbol);
    const text = declared
      ? checker.typeToString(
          declared,
          symbol.declarations?.[0],
          ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias,
        )
      : 'unknown';
    return `### \`${name}\`\n\nExported type: ${inlineCode(text)}.`;
  }
  const meta = metadata(declaration);
  const selector = meta.get('selector')?.getText().replaceAll(/["']/gu, '') ?? 'none';
  const template = meta.get('template')?.getText().slice(1, -1) ?? '';
  const inputs = [];
  const outputs = [];
  const methods = [];
  for (const member of declaration.members) {
    const input = decoratorContract(member, 'Input');
    const output = decoratorContract(member, 'Output');
    const memberName = member.name?.getText();
    if (input && memberName) {
      const fallback = member.initializer ? inlineCode(member.initializer.getText()) : input.required ? 'Required' : inlineCode('undefined');
      inputs.push(`| \`${input.alias ?? memberName}\` | ${inlineCode(memberType(member))} | ${fallback} |`);
    }
    if (output && memberName) outputs.push(`| \`${output.alias ?? memberName}\` | ${inlineCode(eventPayload(member))} |`);
    if (
      ts.isMethodDeclaration(member) &&
      memberName &&
      isPublic(member) &&
      !/^ngOn(?:Init|Changes|Destroy|Check)$|^ngAfter|^ngDoCheck$/u.test(memberName)
    ) {
      const signature = checker.getSignatureFromDeclaration(member);
      methods.push(`| \`${memberName}${checker.signatureToString(signature, declaration, ts.TypeFormatFlags.NoTruncation).replace(/^\(/u, '(')}\` |`);
    }
  }
  const slots = [...template.matchAll(/<ng-content(?:\s+select="([^"]+)")?\s*\/?\s*>/gu)]
    .map((match) => match[1] ?? 'default')
    .filter((slot, index, values) => values.indexOf(slot) === index);
  const rootTag = template.match(/<([a-z][\w-]*)[\s>]/u)?.[1];
  const host = meta.get('host')?.getText();
  const inputsTable = inputs.length ? `| Input | Type | Default / requirement |\n| --- | --- | --- |\n${inputs.join('\n')}` : 'No inputs.';
  const outputsTable = outputs.length ? `| Output | Payload |\n| --- | --- |\n${outputs.join('\n')}` : 'No outputs.';
  const methodsTable = methods.length ? `| Public method |\n| --- |\n${methods.join('\n')}` : 'No public methods.';
  const behavior = decorator(declaration, 'Directive')
    ? `Attribute directive selector: \`${selector}\`; behavior applies to its host element.`
    : `Component selector: \`${selector}\`. ${rootTag ? `The template's first native element is \`${rootTag}\`.` : 'The component has no single native template root.'}${host ? ` Angular host bindings: ${inlineCode(host)}.` : ''}`;
  return `### \`${name}\`\n\n${behavior}\n\n${inputsTable}\n\n${outputsTable}\n\nContent projection: ${slots.length ? slots.map((slot) => `\`${slot}\``).join(', ') : 'none'}.\n\n${methodsTable}`;
}
function section(component) {
  return `${start}\n### Angular\n\nInputs and outputs use their public template names. Public methods are callable through a template\nreference or \`ViewChild\`. Native attributes apply to the documented template root or directive host;\nthey are not automatically forwarded through component hosts.\n\n${registry.symbols.angular[component].map(componentSection).join('\n\n')}\n${end}`;
}
for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const generated = section(component);
  const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'u');
  const expected = pattern.test(source) ? source.replace(pattern, generated) : source.replace('## Customization', `${generated}\n\n## Customization`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}
if (failures.length) {
  process.stderr.write(`Angular API documentation is missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} Angular API documentation for ${registry.components.length} component pages.\n`);
}
