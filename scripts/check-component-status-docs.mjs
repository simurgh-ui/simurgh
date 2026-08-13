import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const stylesRoot = resolve(root, 'packages/styles/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const start = '{/* component-status:start */}';
const end = '{/* component-status:end */}';
const descriptions = {
  headless: 'No default visual treatment is applied. The public component supplies behavior and semantics; consumers provide layout and appearance.',
  structural: 'The optional recipe supplies layout and stable structure without a strong visual treatment. Product typography, color, and emphasis remain consumer-owned.',
  styled: 'The optional component stylesheet provides a complete default recipe, including visual hierarchy and interaction states. Consumers can override semantic tokens or omit the recipe.',
  native: 'The component preserves a familiar native element and browser behavior. The optional recipe harmonizes its appearance without replacing the platform interaction model.',
};
const statuses = new Map();
const failures = [];

for (const [status, components] of Object.entries(registry.presentationStatus ?? {})) {
  if (!(status in descriptions)) failures.push(`unknown status: ${status}`);
  for (const component of components) {
    if (statuses.has(component)) failures.push(`${component}: assigned to multiple statuses`);
    statuses.set(component, status);
  }
}
for (const component of registry.components) {
  if (!statuses.has(component)) failures.push(`${component}: missing registry presentation status`);
}
for (const component of statuses.keys()) {
  if (!registry.components.includes(component)) failures.push(`${component}: status exists for an unknown component`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const [source, stylesheet, react, vue, angular] = await Promise.all([
    readFile(path, 'utf8'),
    readFile(resolve(stylesRoot, `${component}.css`), 'utf8'),
    readFile(resolve(root, `packages/react/src/components/${component}.tsx`), 'utf8'),
    readFile(resolve(root, `packages/vue/src/components/${component}.ts`), 'utf8'),
    readFile(resolve(root, `packages/angular/src/components/${component}.ts`), 'utf8'),
  ]);
  const status = statuses.get(component);
  const substantiveRecipe = stylesheet
    .split(/\r?\n/u)
    .some((line) => line.trim() && !line.trim().startsWith('@import'));
  if (['styled', 'structural'].includes(status) && !substantiveRecipe)
    failures.push(`${component}: ${status} status has no published recipe rules`);
  if (status === 'headless' && substantiveRecipe)
    failures.push(`${component}: headless status conflicts with published recipe rules`);
  if (!source.includes('<ComponentPreview')) failures.push(`${component}: missing documented preview`);
  if (!source.includes('{/* component-styling-contract:start */}'))
    failures.push(`${component}: missing stable styling contract`);
  for (const [framework, adapterSource] of Object.entries({ react, vue, angular })) {
    if (!registry.symbols[framework]?.[component]?.length)
      failures.push(`${component}: missing ${framework} registry symbols`);
    if (!adapterSource.trim()) failures.push(`${component}: empty ${framework} adapter source`);
  }
  const section = `${start}\n### Default presentation: ${status}\n\n${descriptions[status]}\n${end}`;
  const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'u');
  const expected = pattern.test(source) ? source.replace(pattern, section) : source.replace('## Anatomy', `${section}\n\n## Anatomy`);
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(`${component}: missing or stale presentation status`);
}

if (failures.length) {
  process.stderr.write(`Component presentation status check failed:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} presentation status for ${registry.components.length} component pages.\n`);
}
