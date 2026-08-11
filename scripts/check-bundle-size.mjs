import { build } from 'esbuild';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const cases = [
  ['react-button', 'packages/react/dist/components/button.js', 1024],
  ['vue-button', 'packages/vue/dist/components/button.js', 1536],
  ['angular-button', 'packages/angular/dist/components/button.js', 2048],
  ['react-dialog', 'packages/react/dist/components/dialog.js', 4096],
  ['react-complete', 'packages/react/dist/index.js'],
  ['vue-complete', 'packages/vue/dist/index.js'],
  ['angular-complete', 'packages/angular/dist/index.js'],
  ['styles-complete', 'packages/styles/all.css'],
];
const measurements = {};
for (const [name, relativePath, budget] of cases) {
  const path = resolve(root, relativePath);
  let bytes;
  if (path.endsWith('.js') || path.endsWith('.css')) {
    const result = await build({
      entryPoints: [path],
      bundle: true,
      write: false,
      minify: true,
      ...(path.endsWith('.js') ? { format: 'esm', packages: 'external' } : {}),
      platform: 'browser',
      target: 'es2022',
      logLevel: 'silent',
    });
    bytes = result.outputFiles[0].contents;
  }
  const result = {
    minified: bytes.byteLength,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    brotli: brotliCompressSync(bytes).byteLength,
    ...(budget ? { budget } : {}),
  };
  measurements[name] = result;
  if (budget && result.gzip > budget) {
    throw new Error(`${name} is ${result.gzip} B gzip; budget is ${budget} B`);
  }
}
await mkdir(resolve(root, 'artifacts'), { recursive: true });
await writeFile(
  resolve(root, 'artifacts/bundle-sizes.json'),
  `${JSON.stringify(measurements, null, 2)}\n`,
);
console.table(measurements);
