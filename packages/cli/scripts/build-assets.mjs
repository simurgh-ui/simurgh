import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(packageRoot, '../..');
const assetsRoot = resolve(packageRoot, 'assets');

const styleAssetsRoot = resolve(assetsRoot, 'styles');
const componentStyleAssetsRoot = resolve(styleAssetsRoot, 'components');
mkdirSync(styleAssetsRoot, { recursive: true });

for (const framework of ['react', 'vue', 'angular']) {
  const frameworkAssets = resolve(assetsRoot, framework);
  mkdirSync(frameworkAssets, { recursive: true });

  const extension = framework === 'react' ? 'tsx' : 'ts';
  const sourceRoot = resolve(workspaceRoot, `packages/${framework}/src`);
  const componentRoot = resolve(sourceRoot, 'components');
  const sources = [
    resolve(sourceRoot, `index.${extension}`),
    ...readdirSync(componentRoot)
      .filter((file) => file.endsWith(`.${extension}`))
      .sort()
      .map((file) => resolve(componentRoot, file)),
  ];
  const registrySource = sources
    .map((source) => readFileSync(source, 'utf8').trim())
    .join('\n\n');
  writeFileSync(
    resolve(assetsRoot, `${framework}.${extension}`),
    `${registrySource}\n`,
  );
}

copyFileSync(
  resolve(workspaceRoot, 'packages/styles/tokens.css'),
  resolve(styleAssetsRoot, 'tokens.css'),
);
writeFileSync(
  resolve(styleAssetsRoot, 'recipes.css'),
  '/* Component recipe imports are managed by the Simurgh CLI. */\n',
);

rmSync(componentStyleAssetsRoot, { recursive: true, force: true });
mkdirSync(componentStyleAssetsRoot, { recursive: true });
const componentStylesRoot = resolve(
  workspaceRoot,
  'packages/styles/components',
);
for (const file of readdirSync(componentStylesRoot)
  .filter((entry) => entry.endsWith('.css'))
  .sort()) {
  const source = readFileSync(resolve(componentStylesRoot, file), 'utf8')
    .replace(/^@import '\.\.\/tokens\.css';\r?\n(?:\r?\n)?/u, '')
    .trimStart();
  writeFileSync(resolve(componentStyleAssetsRoot, file), source);
}
