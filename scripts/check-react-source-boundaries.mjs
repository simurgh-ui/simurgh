import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const componentsRoot = resolve(root, 'packages/react/src/components');
const migrated = [
  'accordion',
  'alert-dialog',
  'collapsible',
  'dialog',
  'disclosure',
  'drawer',
  'sheet',
  'tabs',
];
const maximumBarrelWrappers = 26;
const failures = [];

const files = (await readdir(componentsRoot)).filter((file) =>
  file.endsWith('.tsx'),
);
const sources = new Map(
  await Promise.all(
    files.map(async (file) => [
      file,
      await readFile(resolve(componentsRoot, file), 'utf8'),
    ]),
  ),
);
const barrelWrappers = [...sources.entries()]
  .filter(([, source]) => source.includes("from '../index.js'"))
  .map(([file]) => file);

if (barrelWrappers.length > maximumBarrelWrappers) {
  failures.push(
    `React component-to-barrel dependencies increased from ${maximumBarrelWrappers} to ${barrelWrappers.length}`,
  );
}

for (const component of migrated) {
  const source = sources.get(`${component}.tsx`);
  if (!source) failures.push(`${component}: missing component source module`);
  else if (source.includes("from '../index.js'")) {
    failures.push(
      `${component}: migrated component must not depend on the root barrel`,
    );
  }
}

if (failures.length > 0) {
  process.stderr.write(
    `React source-boundary check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${migrated.length} migrated React modules; ${barrelWrappers.length} component-to-barrel dependencies remain.\n`,
  );
}
