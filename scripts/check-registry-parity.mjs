import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const frameworks = Object.keys(registry.frameworks);
const failures = [];

if (new Set(registry.components).size !== registry.components.length) {
  failures.push('registry.components contains duplicates');
}

const statuses = Object.values(registry.presentationStatus ?? {}).flat();
for (const component of registry.components) {
  const assignments = statuses.filter(
    (candidate) => candidate === component,
  ).length;
  if (assignments !== 1)
    failures.push(
      `${component}: expected one presentation status, found ${assignments}`,
    );

  const requiredFiles = [
    `packages/styles/components/${component}.css`,
    `apps/docs/src/content/docs/components/${component}.mdx`,
  ];
  for (const framework of frameworks) {
    if (!(registry.frameworks[framework].components ?? registry.components).includes(component)) continue;
    const extension = registry.frameworks[framework].extension;
    requiredFiles.push(
      `packages/${framework}/src/components/${component}.${extension}`,
    );
    const symbolFramework = registry.frameworks[framework].symbolsFrom ?? framework;
    const symbols = registry.symbols?.[symbolFramework]?.[component] ?? registry.newFrameworkSymbols?.[framework]?.[component];
    if (!Array.isArray(symbols) || symbols.length === 0) {
      failures.push(`${framework}/${component}: missing public symbols`);
    } else if (new Set(symbols).size !== symbols.length) {
      failures.push(`${framework}/${component}: duplicate public symbols`);
    }
  }

  for (const file of requiredFiles) {
    try {
      await access(resolve(root, file));
    } catch {
      failures.push(`${component}: missing ${file}`);
    }
  }
}

for (const framework of frameworks) {
  const symbolFramework = registry.frameworks[framework].symbolsFrom ?? framework;
  const registered = Object.keys(registry.symbols?.[symbolFramework] ?? registry.newFrameworkSymbols?.[framework] ?? {}).sort();
  const expected = [...(registry.frameworks[framework].components ?? registry.components)].sort();
  if (JSON.stringify(registered) !== JSON.stringify(expected)) {
    failures.push(
      `${framework}: symbol catalog does not match registry.components`,
    );
  }
}

for (const component of statuses) {
  if (!registry.components.includes(component)) {
    failures.push(
      `${component}: presentation status references an unknown component`,
    );
  }
}

if (failures.length > 0) {
  process.stderr.write(
    `Registry parity check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated registry parity for ${registry.components.length} components across ${frameworks.join(', ')}.\n`,
  );
}
