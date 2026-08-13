import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const previewSource = await readFile(resolve(root, 'apps/docs/src/components/ReactComponentPreview.tsx'), 'utf8');
const components = [...previewSource.matchAll(/component === '([^']+)'/gu)].map((match) => match[1]);
const statefulComponents = new Set([
  'accordion',
  'alert-dialog',
  'checkbox',
  'collapsible',
  'context-menu',
  'dialog',
  'drawer',
  'dropdown-menu',
  'file-upload',
  'form',
  'input-otp',
  'menubar',
  'number-input',
  'password-input',
  'popover',
  'radio-group',
  'rating',
  'select',
  'sheet',
  'switch',
  'tabs',
  'toggle',
  'toggle-group',
  'toolbar',
]);
const failures = [];

for (const component of components) {
  const page = await readFile(resolve(docsRoot, `${component}.mdx`), 'utf8');
  if (!previewSource.includes(`@simurgh-ui/react/${component}`))
    failures.push(`${component}: missing public React subpath import`);
  if (!previewSource.includes(`@simurgh-ui/styles/${component}.css`))
    failures.push(`${component}: missing consumer stylesheet import`);
  if (!page.includes('kind="live"'))
    failures.push(`${component}: page is not labeled as a live component`);
  const invocation = statefulComponents.has(component)
    ? `component="${component}" client:load`
    : `component="${component}" />`;
  if (!page.includes(invocation))
    failures.push(`${component}: page uses the wrong preview hydration strategy`);
}

if (new Set(components).size !== components.length)
  failures.push('duplicate live preview component branch');
if (failures.length) {
  process.stderr.write(`Live component preview check failed:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Validated ${components.length} live public-component previews with scoped hydration and consumer stylesheet imports.\n`);
}
