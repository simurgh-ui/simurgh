import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = {
  LICENSE: ['MIT License', 'Simurgh UI contributors'],
  'SECURITY.md': [
    'Reporting a vulnerability',
    'private vulnerability',
    'reporting',
  ],
  'CONTRIBUTING.md': ['Development', 'Changesets and pull requests', 'MIT'],
  'CODE_OF_CONDUCT.md': ['Our standard', 'Enforcement'],
  '.github/CODEOWNERS': ['* @alighafoorzade', '/SECURITY.md'],
};

for (const [path, markers] of Object.entries(required)) {
  const absolute = resolve(root, path);
  await access(absolute);
  const source = await readFile(absolute, 'utf8');
  for (const marker of markers) {
    if (!source.includes(marker))
      throw new Error(`${path} is missing ${marker}.`);
  }
}

process.stdout.write('Repository governance files passed.\n');
