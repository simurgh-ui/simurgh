import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const start = '{/* framework-parity:start */}';
const end = '{/* framework-parity:end */}';
const failures = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function block(source, framework) {
  const pattern = new RegExp(
    `${escapeRegExp(`{/* ${framework}-api:start */}`)}([\\s\\S]*?)${escapeRegExp(`{/* ${framework}-api:end */}`)}`,
    'u',
  );
  return source.match(pattern)?.[1] ?? '';
}

function names(values) {
  return values.map((value) => `\`${value}\``).join(', ');
}

function stateContract(react, vue, angular) {
  const reactPairs = [...react.matchAll(/\| `(?:default)?(Open|Value|Month|Index|Expanded)`/gu)]
    .map((match) => match[1].toLowerCase())
    .filter((value, index, values) => values.indexOf(value) === index);
  const vueModels = [...vue.matchAll(/\| `update:([^`]+)` \|/gu)]
    .map((match) => match[1]);
  const angularModels = [...angular.matchAll(/\| `([A-Za-z]+)Change` \|/gu)]
    .map((match) => match[1]);
  if (!reactPairs.length && !vueModels.length && !angularModels.length)
    return 'No controlled state contract; use native attributes, inputs, or events documented above.';
  return `React uses controlled/default props and callbacks${reactPairs.length ? ` for ${names(reactPairs)}` : ''}; Vue uses ${vueModels.length ? names(vueModels.map((value) => (value === 'modelValue' ? 'v-model' : `v-model:${value}`))) : 'ordinary props/events'}; Angular uses ${angularModels.length ? names(angularModels.map((value) => `[(${value})]`)) : 'inputs and outputs'}.`;
}

function imperativeContract(react, vue, angular) {
  const reactRef = /\| `ref` \|/u.test(react);
  const vueMethods = !/Exposed methods: none\./u.test(vue);
  const angularMethods = !/No public methods\./u.test(angular);
  if (!reactRef && !vueMethods && !angularMethods)
    return 'No framework exposes an imperative handle for this component.';
  return `${reactRef ? 'React forwards native refs' : 'React has no forwarded ref'}; ${vueMethods ? 'Vue exposes the listed methods' : 'Vue exposes no methods'}; ${angularMethods ? 'Angular exposes the listed class methods through a template reference or ViewChild' : 'Angular exposes no public methods'}.`;
}

function section(component, source) {
  const react = block(source, 'react');
  const vue = block(source, 'vue');
  const angular = block(source, 'angular');
  const reactExports = registry.symbols.react[component];
  const vueExports = registry.symbols.vue[component];
  const angularExports = registry.symbols.angular[component];
  const composition =
    reactExports.length === vueExports.length && vueExports.length === angularExports.length
      ? `All adapters export ${reactExports.length} public ${reactExports.length === 1 ? 'symbol' : 'symbols'}, with framework-idiomatic names.`
      : `React exports ${reactExports.length} parts, Vue ${vueExports.length}, and Angular ${angularExports.length}. These are intentional composition differences; use each framework's example rather than translating symbol-for-symbol.`;
  return `${start}
### Framework parity and differences

The adapters target the same user-visible behavior and accessibility contract. Their public shapes
follow each framework's conventions and are not expected to be symbol-for-symbol identical.

| Concern | Contract |
| --- | --- |
| Public composition | ${composition} |
| State and change events | ${stateContract(react, vue, angular)} |
| Children and content | React uses \`children\`; Vue uses the slots listed above; Angular uses the documented content projection selectors. |
| Native attributes | React forwards the named native interface; Vue follows the stated fallthrough rule; Angular attributes apply to the component host unless an input, directive, or documented native root consumes them. |
| Imperative access | ${imperativeContract(react, vue, angular)} |

These differences are intentional adapter design. Behavioral or accessibility differences not stated
on this page are parity defects rather than supported variations.
${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const generated = section(component, source);
  const pattern = new RegExp(
    `${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`,
    'u',
  );
  const expected = pattern.test(source)
    ? source.replace(pattern, generated)
    : source.replace('## Customization', `${generated}\n\n## Customization`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(
    `Framework parity documentation is missing or stale: ${failures.join(', ')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} framework parity documentation for ${registry.components.length} component pages.\n`,
  );
}
