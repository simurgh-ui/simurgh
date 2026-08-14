import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(packageRoot, '../..');
const assetsRoot = resolve(packageRoot, 'assets');

mkdirSync(resolve(assetsRoot, 'styles'), { recursive: true });

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

for (const [source, target] of [
  ['packages/styles/tokens.css', 'styles/tokens.css'],
  ['packages/styles/recipes.css', 'styles/recipes.css'],
]) {
  copyFileSync(resolve(workspaceRoot, source), resolve(assetsRoot, target));
}
