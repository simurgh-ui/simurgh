import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const path = resolve(import.meta.dirname, '../apps/docs/src/content/docs/guides/documentation-acceptance-test.mdx');
const source = await readFile(path, 'utf8');
const required = [
  '## Test setup',
  '## 1. Install one component',
  '## 2. Customize its theme',
  '## 3. Build and submit a form',
  '## 4. Open an overlay',
  '## 5. Handle an event',
  '## 6. Update a copied component',
  '## Framework-switch checkpoint',
  '## First-time-reader comprehension checkpoint',
  '## Recorded acceptance result',
  'React',
  'Vue',
  'Angular',
  'Manual evidence required',
  'manual release check required',
  '/guides/installation/',
  '/guides/theming/',
  '/guides/overlay-focus/',
  '/guides/updates-and-migrations/',
  'Identify styling status',
  'Select the correct primitive',
  'Preview the real default',
  'Choose a density',
  'Customize semantic tokens',
  'Verify accessibility modes',
  'fresh-context browser walkthrough',
];
const missing = required.filter((marker) => !source.includes(marker));
const resultRows = [...source.matchAll(/^\| (?:Install|Customize|Build|Open|Handle|Update|Switch) .+ \|$/gmu)];

if (missing.length || resultRows.length !== 7) {
  console.error(`Documentation acceptance test is incomplete.${missing.length ? ` Missing: ${missing.join(', ')}.` : ''} Result rows: ${resultRows.length}/7.`);
  process.exit(1);
}

console.log('Documentation acceptance test coverage passed (6 implementation tasks, framework switching, and 7 first-time-reader checks).');
