import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const start = '{/* component-composition:start */}';
const end = '{/* component-composition:end */}';
const failures = [];

const supportingType =
  /(?:Props|Message|Tone|Side|Option|Options|Value|Values|Direction|Orientation)$/u;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function codeList(values) {
  return values.map((value) => `\`${value}\``).join(', ');
}

function frameworkContract(framework, symbols, source) {
  const types = symbols.filter((symbol) => supportingType.test(symbol));
  const rendered = symbols.filter((symbol) => !types.includes(symbol));
  const root =
    framework === 'angular'
      ? rendered.find((symbol) => symbol.endsWith('Component')) ?? rendered[0]
      : rendered[0];
  const parts = rendered.filter((symbol) => symbol !== root);
  const label =
    framework === 'react' ? 'React' : framework === 'vue' ? 'Vue' : 'Angular';
  const angularApi =
    framework === 'angular'
      ? (source.match(
          /\{\/\* angular-api:start \*\/\}([\s\S]*?)\{\/\* angular-api:end \*\/\}/u,
        )?.[1] ?? '')
      : '';
  const projections =
    framework === 'angular'
      ? [...angularApi.matchAll(/Content projection: ([^.]+)\./gu)]
          .flatMap((match) =>
            [...match[1].matchAll(/`([^`]+)`/gu)].map((item) => item[1]),
          )
          .filter((value, index, values) => values.indexOf(value) === index)
      : [];

  if (!root) {
    return `| ${label} | No rendered component export. | None. | ${types.length ? codeList(types) : 'None'}. |`;
  }
  if (!parts.length) {
    if (framework === 'angular' && projections.length > 1) {
      return `| ${label} | Create \`${root}\` first and project descendants into its named regions. | ${codeList(projections)} are projection regions; \`default\` is the main body and named selectors such as \`[trigger]\` are required only for that interaction. | ${types.length ? codeList(types) : 'None'}. |`;
    }
    return `| ${label} | \`${root}\` is standalone and required when using this component. | Content is optional unless the API requires a label or value. | ${types.length ? codeList(types) : 'None'}. |`;
  }

  const relationship =
    framework === 'angular'
      ? `Create \`${root}\` first. Attach listed directives to elements inside its projected content; nested component parts must remain inside it.`
      : `Render \`${root}\` as the ancestor. Nest the listed parts inside that root so they can read its shared state/context.`;
  return `| ${label} | ${relationship} | ${codeList(parts)} are conditional parts: include only those needed by the documented anatomy. A trigger/control and its matching content/item are required when that interaction is used. | ${types.length ? codeList(types) : 'None'}. |`;
}

function section(component, source) {
  const contracts = ['react', 'vue', 'angular'].map((framework) =>
    frameworkContract(framework, registry.symbols[framework][component], source),
  );
  return `${start}
### Composition contract

Follow the framework example as a structural contract. Root components own shared state; parts that
consume that state must stay under the root (or be attached to projected descendants in Angular).
Parts described as conditional are optional until their corresponding interaction or semantic region
is used. Do not render a state-consuming part by itself.

| Framework | Required parent/child relationship | Conditional parts | Supporting types |
| --- | --- | --- | --- |
${contracts.join('\n')}

Accessible names, descriptions, and form labels remain required whenever the component's purpose
cannot otherwise be determined, even when the corresponding visual part is optional.
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
  const anchor = '{/* framework-parity:start */}';
  const expected = pattern.test(source)
    ? source.replace(pattern, generated)
    : source.replace(anchor, `${generated}\n\n${anchor}`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(
    `Component composition documentation is missing or stale: ${failures.join(', ')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} composition contracts for ${registry.components.length} component pages.\n`,
  );
}
