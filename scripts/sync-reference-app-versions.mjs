import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const write = process.argv.includes('--write');
const versions = {};
const frameworks = ['react', 'preact', 'vue', 'angular', 'svelte', 'lit'];

for (const packageName of [...frameworks, 'styles']) {
  const manifest = JSON.parse(
    await readFile(
      resolve(root, 'packages', packageName, 'package.json'),
      'utf8',
    ),
  );
  versions[manifest.name] = manifest.version;
}

const stale = [];
for (const framework of frameworks) {
  const path = resolve(
    root,
    'fixtures/reference-apps',
    framework,
    'package.json',
  );
  const manifest = JSON.parse(await readFile(path, 'utf8'));
  for (const packageName of [
    `@simurgh-ui/${framework}`,
    '@simurgh-ui/styles',
  ]) {
    const expected = `^${versions[packageName]}`;
    if (manifest.dependencies?.[packageName] !== expected) {
      stale.push(`${framework}: ${packageName} must be ${expected}`);
      if (write) manifest.dependencies[packageName] = expected;
    }
  }
  if (write) await writeFile(path, `${JSON.stringify(manifest, null, 2)}\n`);
}

if (stale.length && !write)
  throw new Error(`Reference app versions are stale:\n${stale.join('\n')}`);
process.stdout.write(
  `${write ? 'Synchronized' : 'Validated'} reference app package versions for ${frameworks.join(', ')}.\n`,
);
