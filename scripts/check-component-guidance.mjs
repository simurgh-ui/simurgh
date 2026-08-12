import { readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const componentsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const marker = '## Further guidance';

function footer(component) {
  const repository = 'https://github.com/simurgh-ui/simurgh/blob/main';
  return `${marker}

- Review the shared [accessibility and RTL guidance](/guides/accessibility-rtl/) and
  [theming and styling hooks](/guides/theming/).
- Use the [component chooser](/guides/component-chooser/) and
  [component overview](/components/overview/) to compare related primitives.
- Inspect the registry [manifest](${repository}/packages/registry/registry.json) and framework
  source for [React](${repository}/packages/react/src/index.tsx),
  [Vue](${repository}/packages/vue/src/components/${component}.ts), or
  [Angular](${repository}/packages/angular/src/components/${component}.ts).
`;
}

const files = (await readdir(componentsRoot, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isFile() &&
      entry.name.endsWith('.mdx') &&
      entry.name !== 'overview.mdx',
  )
  .map((entry) => resolve(componentsRoot, entry.name));
const failures = [];

for (const path of files) {
  const component = basename(path, '.mdx');
  const source = await readFile(path, 'utf8');
  const expected = footer(component);
  if (process.argv.includes('--update')) {
    const withoutExisting = source.includes(marker)
      ? source.slice(0, source.indexOf(marker)).trimEnd()
      : source.trimEnd();
    await writeFile(path, `${withoutExisting}\n\n${expected}`);
  } else if (!source.endsWith(expected)) {
    failures.push(component);
  }
}

if (failures.length) {
  process.stderr.write(
    `Component guidance footer is missing or stale: ${failures.join(', ')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} guidance links for ${files.length} component pages.\n`,
  );
}
