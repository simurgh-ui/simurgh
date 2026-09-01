import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const packageDirectories = [
  'angular',
  'cli',
  'core',
  'icons',
  'lit',
  'mcp',
  'motion',
  'preact',
  'react',
  'registry',
  'styles',
  'svelte',
  'vue',
];
const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;
const failures = [];
const manifests = new Map();

for (const directory of packageDirectories) {
  const packageRoot = resolve(root, 'packages', directory);
  const manifest = JSON.parse(
    await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
  );
  manifests.set(manifest.name, { directory, manifest });

  if (!semver.test(manifest.version)) {
    failures.push(
      `${manifest.name}: invalid package version ${manifest.version}`,
    );
  }
  try {
    await access(resolve(packageRoot, 'CHANGELOG.md'));
  } catch {
    failures.push(`${manifest.name}: missing CHANGELOG.md`);
  }
}

for (const { manifest } of manifests.values()) {
  for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
    for (const [dependency, range] of Object.entries(manifest[field] ?? {})) {
      if (manifests.has(dependency) && range !== 'workspace:*') {
        failures.push(
          `${manifest.name}: ${field}.${dependency} must use workspace:* (found ${range})`,
        );
      }
    }
  }
}

const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
if (!semver.test(registry.version))
  failures.push(
    `registry.json has invalid catalog version ${registry.version}`,
  );

const changesets = JSON.parse(
  await readFile(resolve(root, '.changeset/config.json'), 'utf8'),
);
if (
  (changesets.fixed?.length ?? 0) > 0 ||
  (changesets.linked?.length ?? 0) > 0
) {
  failures.push(
    'Changesets must retain independent package versioning (fixed and linked must be empty)',
  );
}
if (changesets.access !== 'public')
  failures.push('Changesets access must remain public');

if (failures.length > 0) {
  process.stderr.write(
    `Release coherence check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated independent release coherence for ${manifests.size} published packages.\n`,
  );
}
