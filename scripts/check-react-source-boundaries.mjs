import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const componentsRoot = resolve(root, 'packages/react/src/components');
const internalsRoot = resolve(root, 'packages/react/src/internal');
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

if (barrelWrappers.length > 0) {
  failures.push(
    `React component modules must not depend on the root barrel: ${barrelWrappers.join(', ')}`,
  );
}

const internalFiles = (await readdir(internalsRoot)).filter((file) =>
  /\.tsx?$/.test(file),
);
const requiredInternals = [
  'composite',
  'controlled-state',
  'dialog-context',
  'floating',
  'focus',
  'forms',
  'ids',
];
const internalStems = new Set();
for (const file of internalFiles) {
  const stem = file.replace(/\.tsx?$/, '');
  if (internalStems.has(stem)) {
    failures.push(
      `duplicate React internal module: ${stem}.ts and ${stem}.tsx`,
    );
  }
  internalStems.add(stem);
}
for (const required of requiredInternals) {
  if (!internalStems.has(required)) {
    failures.push(`missing focused React internal module: ${required}`);
  }
}

if (failures.length > 0) {
  process.stderr.write(
    `React source-boundary check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${files.length} independent React component modules and ${internalFiles.length} shared internals.\n`,
  );
}
