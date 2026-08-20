import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const failures = [];

for (const [framework, frameworkConfig] of Object.entries(
  registry.frameworks,
)) {
  const packageRoot = resolve(root, `packages/${framework}`);
  const manifest = JSON.parse(
    await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
  );
  const wildcard = manifest.exports?.['./*'];
  if (!wildcard?.types?.includes('dist/components/*.d.ts')) {
    failures.push(
      `${framework}: wildcard types do not resolve component modules`,
    );
  }
  const runtimeTarget = wildcard?.import ?? wildcard?.default;
  if (!runtimeTarget?.includes('dist/components/*.js')) {
    failures.push(
      `${framework}: wildcard runtime does not resolve component modules`,
    );
  }

  for (const component of registry.components) {
    const sourcePath = resolve(
      packageRoot,
      `src/components/${component}.${frameworkConfig.extension}`,
    );
    const source = await readFile(sourcePath, 'utf8');
    if (/from\s+['"]\.\.\/index(?:\.js)?['"]/.test(source)) {
      failures.push(`${framework}/${component}: depends on the root barrel`);
    }

    const outputPath = resolve(packageRoot, `dist/components/${component}.js`);
    const output = await readFile(outputPath, 'utf8').catch(() => null);
    if (output === null) {
      failures.push(`${framework}/${component}: missing built subpath output`);
    } else if (/from\s+['"]\.\.\/index\.js['"]/.test(output)) {
      failures.push(`${framework}/${component}: built output depends on root`);
    }
  }
}

if (failures.length > 0) {
  process.stderr.write(
    `Adapter boundary check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${registry.components.length} barrel-independent component subpaths across React, Vue, and Angular.\n`,
  );
}
