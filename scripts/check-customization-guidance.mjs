import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const path = resolve(import.meta.dirname, '../apps/docs/src/content/docs/guides/theming.mdx');
const source = await readFile(path, 'utf8');
const required = [
  '## Component customization patterns',
  '### Sizes and density',
  '### Visual variants',
  '### Icons',
  '### Responsive behavior',
  '### Animation and reduced motion',
  '### Dark mode and RTL',
  '### What applies where',
  "data-variant='danger'",
  '@container (inline-size < 24rem)',
  '@media (prefers-reduced-motion: reduce)',
  "[data-theme='dark']",
  "[dir='rtl']",
];

const missing = required.filter((marker) => !source.includes(marker));
if (missing.length) {
  console.error(`Customization guidance is missing required coverage:\n${missing.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log('Customization guidance check passed.');
