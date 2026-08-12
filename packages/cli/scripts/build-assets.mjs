import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(packageRoot, '../..');
const assetsRoot = resolve(packageRoot, 'assets');

mkdirSync(resolve(assetsRoot, 'styles'), { recursive: true });

for (const framework of ['vue', 'angular']) {
  const frameworkAssets = resolve(assetsRoot, framework);
  mkdirSync(frameworkAssets, { recursive: true });
  copyFileSync(
    resolve(workspaceRoot, `packages/${framework}/src/components/button.ts`),
    resolve(frameworkAssets, 'button.ts'),
  );
}

for (const [source, target] of [
  ['packages/react/src/index.tsx', 'react.tsx'],
  ['packages/vue/src/index.ts', 'vue.ts'],
  ['packages/angular/src/index.ts', 'angular.ts'],
  ['packages/styles/tokens.css', 'styles/tokens.css'],
  ['packages/styles/recipes.css', 'styles/recipes.css'],
]) {
  copyFileSync(resolve(workspaceRoot, source), resolve(assetsRoot, target));
}
