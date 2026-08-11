import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { format } from 'prettier';

const root = resolve(import.meta.dirname, '..');
const prettierOptions = { singleQuote: true, trailingComma: 'all', semi: true };
const stylesRoot = resolve(root, 'packages/styles');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const recipes = await readFile(resolve(stylesRoot, 'recipes.css'), 'utf8');
const blocks = [];
let cursor = 0;
while (cursor < recipes.length) {
  const open = recipes.indexOf('{', cursor);
  if (open === -1) break;
  const selector = recipes.slice(cursor, open).trim();
  let depth = 1;
  let close = open + 1;
  while (close < recipes.length && depth > 0) {
    if (recipes[close] === '{') depth += 1;
    if (recipes[close] === '}') depth -= 1;
    close += 1;
  }
  blocks.push({ selector, css: `${selector} ${recipes.slice(open, close)}` });
  cursor = close;
}
const output = resolve(stylesRoot, 'components');
await mkdir(output, { recursive: true });

const sharedSelectors = {
  dialog: ['.simurgh-trigger', '.simurgh-content', '.simurgh-overlay'],
  'alert-dialog': ['.simurgh-trigger', '.simurgh-content', '.simurgh-overlay'],
  sheet: ['.simurgh-trigger', '.simurgh-content', '.simurgh-overlay'],
  drawer: ['.simurgh-trigger', '.simurgh-content', '.simurgh-overlay'],
  popover: ['.simurgh-trigger', '.simurgh-content'],
  tooltip: ['.simurgh-trigger', '.simurgh-content'],
  'hover-card': ['.simurgh-trigger', '.simurgh-content'],
  'dropdown-menu': [
    '.simurgh-trigger',
    '.simurgh-content',
    '.simurgh-item',
    '.simurgh-indicator',
  ],
  'context-menu': ['.simurgh-content', '.simurgh-item', '.simurgh-indicator'],
  select: [
    '.simurgh-trigger',
    '.simurgh-content',
    '.simurgh-item',
    '.simurgh-indicator',
  ],
  combobox: ['.simurgh-trigger', '.simurgh-content', '.simurgh-item'],
  'date-picker': ['.simurgh-trigger', '.simurgh-content'],
};

for (const component of registry.components) {
  const selected = blocks
    .filter(({ selector }) => {
      const normalized = selector.toLowerCase();
      const shared = (sharedSelectors[component] ?? []).some((marker) =>
        normalized.includes(marker),
      );
      const named = [
        ...normalized.matchAll(/data-slot=['"]([^'"]+)/g),
        ...normalized.matchAll(/\.simurgh-([a-z0-9-]+)/g),
        ...normalized.matchAll(/\[data-([a-z0-9-]+)/g),
      ].some((match) => {
        const name = match[1];
        if (name === component) return true;
        if (!name.startsWith(`${component}-`)) return false;
        return !registry.components.some(
          (candidate) => candidate !== component && name.startsWith(candidate),
        );
      });
      return shared || named;
    })
    .map(({ css }) => css);
  await writeFile(
    resolve(output, `${component}.css`),
    await format(`@import '../tokens.css';\n\n${selected.join('\n\n')}\n`, {
      ...prettierOptions,
      parser: 'css',
    }),
  );
}
await writeFile(
  resolve(stylesRoot, 'all.css'),
  await format(`@import './tokens.css';\n@import './recipes.css';\n`, {
    ...prettierOptions,
    parser: 'css',
  }),
);
