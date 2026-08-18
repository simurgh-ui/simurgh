import { build } from 'esbuild';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const result = await build({
  entryPoints: [resolve(root, 'packages/core/src/floating.ts')],
  bundle: true,
  write: false,
  minify: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  logLevel: 'silent',
});
const bytes = result.outputFiles[0].contents;
const measurement = {
  minified: bytes.byteLength,
  gzip: gzipSync(bytes, { level: 9 }).byteLength,
  brotli: brotliCompressSync(bytes).byteLength,
  budget: 5 * 1024,
};
console.table(measurement);
if (measurement.gzip > measurement.budget)
  throw new Error(
    `Internal floating layer is ${measurement.gzip} B gzip; budget is ${measurement.budget} B.`,
  );
