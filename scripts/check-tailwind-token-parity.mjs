import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const [tokens, preset] = await Promise.all([
  readFile(resolve(root, 'packages/styles/tokens.css'), 'utf8'),
  readFile(resolve(root, 'packages/styles/tailwind.preset.ts'), 'utf8'),
]);

const semanticStart = tokens.indexOf('/* Semantic tokens');
const darkStart = tokens.indexOf('.dark');
if (semanticStart === -1 || darkStart === -1) {
  throw new Error('Could not locate the semantic token block in tokens.css.');
}

const semanticTokens = [
  ...new Set(
    [
      ...tokens
        .slice(semanticStart, darkStart)
        .matchAll(/(--simurgh-[a-z0-9-]+)\s*:/gu),
    ].map((match) => match[1]),
  ),
];
const missing = semanticTokens.filter(
  (token) => !preset.includes(`var(${token})`),
);

if (missing.length) {
  throw new Error(
    `Tailwind preset is missing semantic tokens: ${missing.join(', ')}`,
  );
}

process.stdout.write(
  `Tailwind preset covers all ${semanticTokens.length} semantic CSS tokens.\n`,
);
