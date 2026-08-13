import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const headings = [
  '## Installation',
  '## Purpose',
  '## Basic usage',
  '## Anatomy',
  '## State model',
  '## Examples',
  '## Accessibility',
  '## API surface',
  '## Customization',
  '## Related components',
];
const failures = [];

function names(framework, component) {
  return registry.symbols[framework][component].map((name) => `\`${name}\``).join(', ');
}

function generatedSections(component) {
  return `## API surface

- React exports: ${names('react', component)}
- Vue exports: ${names('vue', component)}
- Angular exports: ${names('angular', component)}

Import these public symbols from the component subpath shown in Installation. Framework-specific
props, events, slots, directives, methods, defaults, and native-attribute behavior belong in the API
tables on this page; use the linked source only to verify the current implementation.

## Customization

Load the optional component stylesheet for the default recipe, override semantic tokens for broad
theme changes, or omit the recipe CSS for headless styling. See [theming and styling
hooks](/guides/theming/) for import order, selectors, dark mode, RTL, and reduced-motion guidance.

## Accessibility

Preserve the documented composition and accessible names when wrapping or restyling this component.
See [accessibility and RTL guidance](/guides/accessibility-rtl/) for keyboard, focus, labeling, and
directionality requirements.

`;
}

function applyTemplate(source, component) {
  if (source.includes('## Purpose')) {
    const complete = source.includes('## Accessibility')
      ? source
      : source.replace(
          '## API surface',
          `## Accessibility\n\nPreserve the documented composition and accessible names when wrapping or restyling this component.\nSee [accessibility and RTL guidance](/guides/accessibility-rtl/) for keyboard, focus, labeling, and\ndirectionality requirements.\n\n## API surface`,
        );
    return reorderSections(complete);
  }
  const exampleTabs = source.includes('<CodeTabs>') ? 'CodeTabs' : 'Tabs';
  let result = source.replace(
    '{/* component-installation:end */}',
    '{/* component-installation:end */}\n\n## Purpose',
  );
  result = result.replace(
    '<ComponentPreview',
    `## Anatomy\n\nThe public component parts are listed in API surface below. Use only the parts needed by the example;\ncompound components depend on their documented parent/child nesting.\n\n## Basic usage\n\n<ComponentPreview`,
  );
  result = result.replace(
    `<${exampleTabs}>`,
    `## Examples\n\n<${exampleTabs}>`,
  );
  result = result.replace(
    `</${exampleTabs}>`,
    `</${exampleTabs}>\n\n## State model`,
  );
  result = result.replace(
    '{/* doc-verification:start */}',
    `${generatedSections(component)}{/* doc-verification:start */}`,
  );
  return reorderSections(result.replace('## Further guidance', '## Related components'));
}

function reorderSections(source) {
  const matches = [...source.matchAll(/(?:^\{\/\* [^\n]+:start \*\/\}\r?\n)?^## .+$/gmu)];
  if (!matches.length) return source;
  const preamble = source.slice(0, matches[0].index).trimEnd();
  const sections = new Map(
    matches.map((match, index) => {
      const end = matches[index + 1]?.index ?? source.length;
      const heading = match[0].match(/^## .+$/mu)?.[0];
      return [heading, source.slice(match.index, end).trim()];
    }),
  );
  if (headings.some((heading) => !sections.has(heading))) return source;
  const ordered = headings.map((heading) => sections.get(heading));
  const additional = [...sections.entries()]
    .filter(([heading]) => !headings.includes(heading))
    .map(([, section]) => section);
  return `${preamble}\n\n${[...ordered, ...additional].join('\n\n')}\n`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const expected = applyTemplate(source, component);
  if (process.argv.includes('--update') && expected !== source) {
    await writeFile(path, expected);
    continue;
  }
  let previous = -1;
  for (const heading of headings) {
    const index = source.indexOf(heading);
    if (index < 0 || index <= previous) {
      failures.push(`${component}: missing or misplaced ${heading}`);
      break;
    }
    previous = index;
  }
}

if (failures.length) {
  process.stderr.write(`Component template validation failed:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} the required template for ${registry.components.length} component pages.\n`,
  );
}
