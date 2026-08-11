import { build } from 'esbuild';
import { copyFile, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const framework = process.argv[2];
if (!['react', 'vue', 'angular'].includes(framework)) {
  throw new Error('Usage: node scripts/build-adapter.mjs react|vue|angular');
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
    resolve(
      packageRoot,
      framework === 'angular'
        ? `dist/components/${component}.js`
        : `src/components/${component}.${extension}`,
    ),
  ]),
);
const outputDirectory = resolve(
  packageRoot,
  framework === 'angular' ? 'dist-bundled/components' : 'dist/components',
);
await mkdir(outputDirectory, { recursive: true });
await build({
  entryPoints,
  outdir: outputDirectory,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  sourcemap: true,
  treeShaking: true,
  external,
  pure: [
    'createContext',
    'defineComponent',
    'forwardRef',
    'inject',
    'i0.ɵɵngDeclareClassMetadata',
    'i0.ɵɵngDeclareComponent',
    'i0.ɵɵngDeclareDirective',
    'i0.ɵɵngDeclareFactory',
    'openRoot',
    'sidebarPart',
  ],
  logLevel: 'warning',
});
if (framework === 'angular') {
  for (const file of await readdir(outputDirectory)) {
    await copyFile(
      resolve(outputDirectory, file),
      resolve(packageRoot, 'dist/components', file),
    );
  }
  await rm(resolve(packageRoot, 'dist-bundled'), {
    recursive: true,
    force: true,
  });
}
