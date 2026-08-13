import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const budget = 5 * 1024;
const entries = ['index', 'react', 'vue', 'angular'];
const external = [
  'react',
  'react/*',
  'vue',
  'vue/*',
  '@angular/core',
  '@angular/core/*',
];
const results = {};

for (const entry of entries) {
  const result = await build({
    entryPoints: [resolve(root, `packages/motion/dist/${entry}.js`)],
    bundle: true,
    write: false,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    external,
    logLevel: 'silent',
  });
  const gzip = gzipSync(result.outputFiles[0].contents, {
    level: 9,
  }).byteLength;
  results[entry] = { gzip, budget };
  if (gzip > budget)
    throw new Error(`motion/${entry} is ${gzip} B gzip; budget is ${budget} B`);
}

console.table(results);
