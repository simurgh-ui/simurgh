import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const stylesRoot = resolve(root, 'packages/styles/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const start = '{/* component-styling-contract:start */}';
const end = '{/* component-styling-contract:end */}';
const failures = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'en'));
}

function codeList(values, fallback) {
  return values.length ? values.map((value) => `\`${value}\``).join(', ') : fallback;
}

function extract(css, sources) {
  const classes = unique([...css.matchAll(/\.((?:simurgh|preview)-[a-z0-9-]+)/gu)].map((match) => `.${match[1]}`));
  const slots = unique([...`${css}\n${sources}`.matchAll(/data-slot(?:=|\]=|"\s*:\s*)["']([^"']+)["']/gu)].map((match) => match[1]));
  const data = unique([...`${css}\n${sources}`.matchAll(/(?:attr\.)?(data-[a-z0-9-]+)/gu)].map((match) => `[${match[1]}]`));
  const aria = unique([...css.matchAll(/\[(aria-[a-z-]+)(?:=[^\]]+)?\]/gu)].map((match) => `[${match[1]}]`));
  const variables = unique([...css.matchAll(/--simurgh-[a-z0-9-]+/gu)].map((match) => match[0]));
  return { classes, slots, data, aria, variables };
}

function section(contract) {
  const slotSelectors = contract.slots.map((slot) => `[data-slot="${slot}"]`);
  return `${start}\n### Styling contract\n\nThe selectors below are used by the published component recipe or emitted consistently by an\nadapter. Treat these as the supported styling surface. Element order, anonymous wrappers, and\nundocumented descendants are implementation details and should not be targeted.\n\n| Surface | Stable hooks |\n| --- | --- |\n| Recipe classes | ${codeList(contract.classes, 'No component-specific recipe class; this stylesheet currently imports shared tokens only.')} |\n| Stable DOM parts | ${codeList(slotSelectors, 'No named `data-slot` parts are emitted; target the forwarded root class or attributes documented in the API.')} |\n| Stable data attributes | ${codeList(contract.data, 'No documented `data-*` hook.')} |\n| ARIA/state selectors used by the recipe | ${codeList(contract.aria, 'No ARIA state selector is used by this recipe.')} |\n| CSS custom properties consumed | ${codeList(contract.variables, 'No component-specific token consumption beyond the shared token import.')} |\n\nPrefer a semantic token override for theme-wide changes. Use the listed class or part selectors for a\ncomponent-scoped override. When omitting recipe CSS, preserve state attributes and ARIA semantics\neven if your replacement styles use different selectors.\n${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const [source, css, vue, angular] = await Promise.all([
    readFile(path, 'utf8'),
    readFile(resolve(stylesRoot, `${component}.css`), 'utf8'),
    readFile(resolve(root, `packages/vue/src/components/${component}.ts`), 'utf8'),
    readFile(resolve(root, `packages/angular/src/components/${component}.ts`), 'utf8'),
  ]);
  const generated = section(extract(css, `${vue}\n${angular}`));
  const marked = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'u');
  const expected = marked.test(source)
    ? source.replace(marked, generated)
    : source.replace('## Customization', `${generated}\n\n## Customization`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

if (failures.length) {
  process.stderr.write(`Component styling contracts are missing or stale: ${failures.join(', ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} styling contracts for ${registry.components.length} component pages.\n`);
}
