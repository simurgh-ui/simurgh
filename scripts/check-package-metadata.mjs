import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const packages = [
  'angular',
  'cli',
  'core',
  'icons',
  'lit',
  'motion',
  'preact',
  'react',
  'registry',
  'styles',
  'svelte',
  'vue',
];

for (const directory of packages) {
  const manifest = JSON.parse(
    await readFile(
      resolve(root, 'packages', directory, 'package.json'),
      'utf8',
    ),
  );
  if (manifest.private)
    throw new Error(`${manifest.name} must be publishable.`);
  if (manifest.license !== 'MIT')
    throw new Error(`${manifest.name} must declare MIT.`);
  if (
    manifest.repository?.url !== 'git+https://github.com/simurgh-ui/simurgh.git'
  ) {
    throw new Error(`${manifest.name} has an invalid repository URL.`);
  }
  if (manifest.repository?.directory !== `packages/${directory}`) {
    throw new Error(`${manifest.name} has an invalid repository directory.`);
  }
  if (manifest.homepage !== 'https://github.com/simurgh-ui/simurgh#readme') {
    throw new Error(`${manifest.name} has an invalid homepage.`);
  }
  if (manifest.bugs?.url !== 'https://github.com/simurgh-ui/simurgh/issues') {
    throw new Error(`${manifest.name} has an invalid bugs URL.`);
  }
  if (manifest.publishConfig?.access !== 'public') {
    throw new Error(`${manifest.name} must publish publicly.`);
  }
  if (directory === 'cli' && manifest.engines?.node !== '>=22') {
    throw new Error(`${manifest.name} must declare its Node.js runtime.`);
  }
}

process.stdout.write(
  `Validated publish metadata for ${packages.length} packages.\n`,
);
