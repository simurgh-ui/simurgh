import { Buffer } from 'node:buffer';
import {
  copyFileSync,
  existsSync,
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

const styleAssetsRoot = resolve(assetsRoot, 'styles');
const componentStyleAssetsRoot = resolve(styleAssetsRoot, 'components');
mkdirSync(styleAssetsRoot, { recursive: true });

function writeIfChanged(target, source) {
  if (existsSync(target) && readFileSync(target, 'utf8') === source) return;
  writeFileSync(target, source);
}

function copyIfChanged(source, target) {
  if (
    existsSync(target) &&
    Buffer.compare(readFileSync(source), readFileSync(target)) === 0
  )
    return;
  copyFileSync(source, target);
}

function copyDirectoryIfChanged(source, target) {
  mkdirSync(target, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const sourceEntry = resolve(source, entry.name);
    const targetEntry = resolve(target, entry.name);
    if (entry.isDirectory()) copyDirectoryIfChanged(sourceEntry, targetEntry);
    else copyIfChanged(sourceEntry, targetEntry);
  }
}

for (const framework of ['react', 'vue', 'angular']) {
  const frameworkAssets = resolve(assetsRoot, framework);
  mkdirSync(frameworkAssets, { recursive: true });

  const extension = framework === 'react' ? 'tsx' : 'ts';
  const sourceRoot = resolve(workspaceRoot, `packages/${framework}/src`);
  const componentRoot = resolve(sourceRoot, 'components');
  const internalRoot = resolve(sourceRoot, 'internal');
  const componentFiles = readdirSync(componentRoot)
    .filter((file) => file.endsWith(`.${extension}`))
    .sort();
  const sources = [
    resolve(sourceRoot, `index.${extension}`),
    ...componentFiles.map((file) => resolve(componentRoot, file)),
  ];
  const registrySource = sources
    .map((source) => readFileSync(source, 'utf8').trim())
    .join('\n\n');
  writeIfChanged(
    resolve(assetsRoot, `${framework}.${extension}`),
    `${registrySource}\n`,
  );
  // Prefer the original per-component module at install time. Extracting a
  // component from the concatenated fallback source can otherwise collect the
  // repeated imports from every module in that file.
  for (const file of componentFiles) {
    copyIfChanged(resolve(componentRoot, file), resolve(frameworkAssets, file));
  }
  copyDirectoryIfChanged(internalRoot, resolve(frameworkAssets, 'internal'));
  const floatingSource = resolve(sourceRoot, `floating.${extension}`);
  if (existsSync(floatingSource)) {
    copyIfChanged(
      floatingSource,
      resolve(frameworkAssets, `floating.${extension}`),
    );
  }
}

copyIfChanged(
  resolve(workspaceRoot, 'packages/styles/tokens.css'),
  resolve(styleAssetsRoot, 'tokens.css'),
);
writeIfChanged(
  resolve(styleAssetsRoot, 'recipes.css'),
  '/* Component recipe imports are managed by the Simurgh CLI. */\n',
);

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
  writeIfChanged(resolve(componentStyleAssetsRoot, file), source);
}
