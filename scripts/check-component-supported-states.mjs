import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const start = '{/* component-supported-states:start */}';
const end = '{/* component-supported-states:end */}';
const failures = [];
const states = ['Loading', 'Empty', 'Invalid', 'Read-only', 'Disabled', 'Error'];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function apiBlock(source, framework) {
  const from = `{/* ${framework}-api:start */}`;
  const to = `{/* ${framework}-api:end */}`;
  return source.match(new RegExp(`${escapeRegExp(from)}([\\s\\S]*?)${escapeRegExp(to)}`, 'u'))?.[1] ?? '';
}

function publicNames(api, framework) {
  const heading = framework === 'angular' ? '(?:Input|Output)' : '(?:Prop|Event)';
  const table = new RegExp(`\\| ${heading} \\|[^\\n]*\\n\\|[^\\n]*\\|([\\s\\S]*?)(?:\\n\\n|$)`, 'gu');
  return new Set([...api.matchAll(table)].flatMap((match) =>
    [...match[1].matchAll(/^\| `([^`]+)` \|/gmu)].map((entry) => entry[1]),
  ));
}

function nativeState(api, state) {
  if (!/Inherited attributes:/u.test(api)) return false;
  if (state === 'Disabled') return /(Button|Input|Select|Textarea)HTMLAttributes/u.test(api);
  if (state === 'Read-only') return /(Input|Textarea)HTMLAttributes/u.test(api);
  return false;
}

function propFor(state, names, api) {
  const candidates = {
    Loading: ['loading'],
    Invalid: ['invalid'],
    'Read-only': ['readOnly', 'readonly'],
    Disabled: ['disabled'],
  }[state] ?? [];
  return candidates.find((name) => names.has(name)) ?? (nativeState(api, state) ? state === 'Read-only' ? 'readOnly' : 'disabled' : undefined);
}

function expression(framework, prop) {
  if (framework === 'react') return `\`${prop}={true}\``;
  if (framework === 'vue') return `\`:${prop === 'readOnly' ? 'readonly' : prop}="true"\``;
  return `\`[${prop}]="true"\``;
}

function semanticState(component, state, symbols, names) {
  if (state === 'Empty') {
    if (component === 'empty') return 'Dedicated empty-state primitive; compose its title, description, media, and actions.';
    const prop = ['noResults', 'emptyText'].find((name) => names.has(name));
    if (prop) return `Supported through \`${prop}\` when filtering returns no items.`;
    if (names.has('options')) return 'Render an application-owned empty message when the options collection is empty.';
  }
  if (state === 'Error') {
    const errorSymbol = symbols.find((symbol) => /Error/u.test(symbol));
    if (errorSymbol) return `Use the dedicated \`${errorSymbol}\` region.`;
    if (names.has('invalid')) return 'Set the invalid state and render a separate labeled error message; invalid styling alone is not an error description.';
    if (component === 'alert') return 'Use urgent alert semantics for an error message when immediate announcement is required.';
  }
  if (state === 'Loading') {
    if (component === 'spinner' || component === 'skeleton') return `Dedicated ${component} loading primitive; provide context or an accessible loading label.`;
    if (component === 'progress') return 'Use indeterminate progress when completion cannot be calculated.';
  }
  return undefined;
}

function contract(component, source, framework, state) {
  const api = apiBlock(source, framework);
  const names = publicNames(api, framework);
  const symbols = registry.symbols[framework][component];
  const prop = propFor(state, names, api);
  if (prop) {
    if (state === 'Disabled') return `Supported with ${expression(framework, prop)} on the documented control or interactive part; its interaction is blocked. Disabled form controls are omitted from submission.`;
    if (state === 'Read-only') return `Supported with ${expression(framework, prop)}; focus and value submission remain available while editing is blocked.`;
    if (state === 'Invalid') return `Supported with ${expression(framework, prop)}; also associate visible error text.`;
    return `Supported with ${expression(framework, prop)}; the component exposes its busy state and blocks duplicate interaction.`;
  }
  return semanticState(component, state, symbols, names) ?? 'Not supported by this component API; handle this state in surrounding application UI.';
}

function section(component, source) {
  const rows = states.map((state) => {
    const cells = ['react', 'vue', 'angular'].map((framework) => contract(component, source, framework, state));
    return `| ${state} | ${cells.join(' | ')} |`;
  }).join('\n');
  return `${start}\n### Supported states\n\nThe table distinguishes component behavior from application-owned presentation. “Not supported”\nmeans there is no public state contract for that adapter; do not invent one with an undocumented\nattribute. Keep status and error messages accessible when they are rendered outside the component.\n\n| State | React | Vue | Angular |\n| --- | --- | --- | --- |\n${rows}\n${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const generated = section(component, source);
  const marked = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'u');
  const expected = marked.test(source)
    ? source.replace(marked, generated)
    : source.replace('## Customization', `${generated}\n\n## Customization`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(`Component supported-state documentation is missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} six-state support matrices for ${registry.components.length} component pages.\n`);
}
