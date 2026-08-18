import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const budget = 5 * 1024;
const cases = {
  engine: {
    entry: 'packages/core/dist/floating.js',
    external: [],
  },
  react: {
    entry: 'packages/react/dist/internal/floating.js',
    external: ['react', 'react/*', 'react-dom', 'react-dom/*'],
  },
  vue: {
    entry: 'packages/vue/dist/internal/floating-parts.js',
    external: ['vue', 'vue/*'],
  },
  angular: {
    entry: 'packages/angular/dist/internal/floating-base.js',
    external: [
      '@angular/common',
      '@angular/common/*',
      '@angular/core',
      '@angular/core/*',
    ],
  },
};

const measurements = {};
const failures = [];
for (const [name, bundleCase] of Object.entries(cases)) {
  const result = await build({
    entryPoints: [resolve(root, bundleCase.entry)],
    bundle: true,
    write: false,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    external: bundleCase.external,
    logLevel: 'silent',
  });
  const bytes = result.outputFiles[0].contents;
  const measurement = {
    minified: bytes.byteLength,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    brotli: brotliCompressSync(bytes).byteLength,
    budget,
  };
  measurements[name] = measurement;
  if (measurement.gzip > budget) {
    failures.push(`${name}: ${measurement.gzip} B gzip exceeds ${budget} B`);
  }
}

const report = {
  schemaVersion: 1,
  calculation:
    'Complete shared positioning and interaction adapter entry bundled as ESM with only framework peers externalized',
  measurements,
};
await writeFile(
  resolve(root, 'artifacts/floating-layer-sizes.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.table(measurements);
if (failures.length) {
  throw new Error(`Floating layer size budget failed:\n${failures.join('\n')}`);
}
