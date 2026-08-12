import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const requirements = {
  dialog: ['realistic-example:start', 'async function submitProfile', 'aria-live="polite"', 'onOpenChange', 'v-model:open', '[(open)]'],
  form: ['realistic-example:start', 'validate(values)', 'aria-describedby', 'FormErrorSummary', 'invalidControl'],
  combobox: ['realistic-example:start', 'searchableOptions', 'noResults', 'onValueChange', 'v-model', '[(value)]'],
  command: ['realistic-example:start', 'AbortController', 'loading', 'serverCommands', 'onValueChange', 'valueChange'],
  'date-picker': ['realistic-example:start', 'disabledDates', 'min="2026-08-14"', 'max="2026-09-30"', 'onValueChange', '[(value)]'],
  'file-upload': ['realistic-example:start', 'MAX_BYTES', 'validateFiles', 'accept', 'filesChange'],
  tabs: ['realistic-example:start', 'workspaceTabs.map', 'activeTab', 'onValueChange', 'v-model', '[(value)]'],
  accordion: ['realistic-example:start', 'faqItems.map', 'trackBy', 'v-for', '*ngFor'],
};
const failures = [];

for (const [component, tokens] of Object.entries(requirements)) {
  const source = await readFile(resolve(docsRoot, `${component}.mdx`), 'utf8');
  for (const token of tokens) {
    if (!source.includes(token)) failures.push(`${component}: missing ${token}`);
  }
  if (!source.includes('{/* realistic-example:end */}')) failures.push(`${component}: missing end marker`);
}

if (failures.length) {
  process.stderr.write(`Realistic component example validation failed:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Validated realistic application examples for ${Object.keys(requirements).length} component pages.\n`);
}
