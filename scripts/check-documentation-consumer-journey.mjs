import { build } from 'esbuild';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const components = ['button', 'checkbox', 'dialog', 'form', 'input', 'label'];
const aliases = {};

for (const component of components) {
  const implementation = resolve(
    root,
    `packages/react/dist/components/${component}.js`,
  );
  const stylesheet = resolve(
    root,
    `packages/styles/components/${component}.css`,
  );
  await Promise.all([access(implementation), access(stylesheet)]);
  aliases[`@simurgh-ui/react/${component}`] = implementation;
  aliases[`@simurgh-ui/styles/${component}.css`] = stylesheet;
}
aliases['@simurgh-ui/styles/tokens.css'] = resolve(
  root,
  'packages/styles/tokens.css',
);

const copiedSource = await readFile(
  resolve(root, 'fixtures/documentation-journey/copied-status.tsx'),
  'utf8',
);
if (!copiedSource.includes('data-product-status="release-candidate"')) {
  throw new Error('The copied component does not contain the consumer edit.');
}

const result = await build({
  absWorkingDir: root,
  alias: aliases,
  bundle: true,
  entryPoints: ['fixtures/documentation-journey/app.tsx'],
  external: ['react', 'react-dom'],
  format: 'esm',
  logLevel: 'silent',
  outdir: 'out',
  platform: 'browser',
  tsconfig: resolve(root, 'tsconfig.base.json'),
  write: false,
});

const outputs = result.outputFiles ?? [];
if (!outputs.some((output) => output.path.endsWith('.js')))
  throw new Error('The documentation journey did not produce JavaScript.');
if (!outputs.some((output) => output.path.endsWith('.css')))
  throw new Error('The documentation journey did not produce CSS.');

process.stdout.write(
  'Documentation consumer journey compiled with theme, form, event, overlay, and copied-source edit.\n',
);
