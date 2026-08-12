import { access, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const start = '{/* component-installation:start */}';
const end = '{/* component-installation:end */}';
const legacyStart = '<!-- component-installation:start -->';
const legacyEnd = '<!-- component-installation:end -->';
const failures = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function formatImport(framework, component, symbols) {
  const specifier = `@simurgh-ui/${framework}/${component}`;
  if (symbols.length === 1)
    return `import { ${symbols[0]} } from '${specifier}';`;
  return `import {\n  ${symbols.join(',\n  ')},\n} from '${specifier}';`;
}

function section(component) {
  return `${start}
## Installation

Copy editable source into an initialized application:

\`\`\`sh
pnpm dlx @simurgh-ui/cli add ${component}
\`\`\`

For package consumption, import from the component subpath and load its optional recipe CSS:

### React

\`\`\`tsx
${formatImport('react', component, registry.symbols.react[component])}
import '@simurgh-ui/styles/${component}.css';
\`\`\`

### Vue

\`\`\`ts
${formatImport('vue', component, registry.symbols.vue[component])}
import '@simurgh-ui/styles/${component}.css';
\`\`\`

### Angular

\`\`\`ts
${formatImport('angular', component, registry.symbols.angular[component])}
import '@simurgh-ui/styles/${component}.css';
\`\`\`

Omit the component stylesheet for fully headless styling. CLI-copied components use the local path
written to \`simurgh.json\` and the copied application styles instead of these package imports.
${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const stylesheet = resolve(
    root,
    `packages/styles/components/${component}.css`,
  );
  await Promise.all([access(path), access(stylesheet)]);
  const source = await readFile(path, 'utf8');
  const pattern = new RegExp(
    `(?:${escapeRegExp(start)}|${escapeRegExp(legacyStart)})[\\s\\S]*?(?:${escapeRegExp(end)}|${escapeRegExp(legacyEnd)})\\s*`,
    'u',
  );
  const withoutSection = source.replace(pattern, '');
  const importMatches = [...withoutSection.matchAll(/^import .+;$/gmu)];
  const insertion = importMatches.at(-1)?.index;
  if (insertion === undefined) {
    failures.push(`${component}: page has no MDX import insertion point`);
    continue;
  }
  const lineEnd = withoutSection.indexOf('\n', insertion);
  const expected = `${withoutSection.slice(0, lineEnd + 1).trimEnd()}\n\n${section(component)}\n\n${withoutSection.slice(lineEnd + 1).trimStart()}`;
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected)
    failures.push(`${component}: missing or stale installation section`);
}

if (failures.length) {
  process.stderr.write(
    `Component installation check failed:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} installation imports for ${registry.components.length} component pages.\n`,
  );
}
