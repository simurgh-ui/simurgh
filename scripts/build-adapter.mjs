import { build } from 'esbuild';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const framework = process.argv[2];
if (!['react', 'vue', 'preact', 'lit'].includes(framework)) {
  throw new Error('Usage: node scripts/build-adapter.mjs react|vue|preact|lit');
}
const root = resolve(import.meta.dirname, '..');
const packageRoot = resolve(root, `packages/${framework}`);
const manifest = JSON.parse(
  await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
);
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const external = [
  ...Object.keys(manifest.dependencies ?? {}),
  ...Object.keys(manifest.peerDependencies ?? {}),
].flatMap((dependency) => [dependency, `${dependency}/*`]);
const extension = framework === 'react' || framework === 'preact' ? 'tsx' : 'ts';
const entryPoints = Object.fromEntries(
  registry.components.map((component) => [
    `components/${component}`,
    resolve(packageRoot, `src/components/${component}.${extension}`),
  ]),
);
if (framework === 'vue' || framework === 'preact' || framework === 'lit') {
  entryPoints.index = resolve(packageRoot, `src/index.${framework === 'preact' ? 'tsx' : 'ts'}`);
}
const outputDirectory = resolve(packageRoot, 'dist');
await mkdir(outputDirectory, { recursive: true });
await build({
  entryPoints,
  outdir: outputDirectory,
  bundle: true,
  splitting: framework === 'vue',
  chunkNames: 'chunks/[name]-[hash]',
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  sourcemap: true,
  sourcesContent: false,
  treeShaking: true,
  external,
  pure: [
    'Symbol',
    'alertDialogButton',
    'cardPart',
    'carouselControl',
    'checkControl',
    'createContext',
    'defineComponent',
    'floatingRoot',
    'forwardRef',
    'inject',
    'openRoot',
    'sidebarPart',
  ],
  logLevel: 'warning',
});
