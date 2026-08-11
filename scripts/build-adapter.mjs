import { build } from 'esbuild';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const framework = process.argv[2];
if (!['react', 'vue'].includes(framework)) {
  throw new Error('Usage: node scripts/build-adapter.mjs react|vue');
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
const extension = framework === 'react' ? 'tsx' : 'ts';
const entryPoints = Object.fromEntries(
  registry.components.map((component) => [
    component,
    resolve(packageRoot, `src/components/${component}.${extension}`),
  ]),
);
const outputDirectory = resolve(packageRoot, 'dist/components');
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
