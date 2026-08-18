import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const rootArgument = process.argv.indexOf('--root');
const outputArgument = process.argv.indexOf('--output');
const root = resolve(rootArgument >= 0 ? process.argv[rootArgument + 1] : '.');
const output =
  outputArgument >= 0 ? resolve(process.argv[outputArgument + 1]) : undefined;
const revision = process.env.SIMURGH_BASELINE_REVISION ?? 'unknown';
const components = [
  'popover',
  'tooltip',
  'hover-card',
  'dropdown-menu',
  'context-menu',
  'select',
  'combobox',
  'date-picker',
];
const peers = {
  react: ['react', 'react/*', 'react-dom', 'react-dom/*'],
  vue: ['vue', 'vue/*'],
  angular: [
    '@angular/common',
    '@angular/common/*',
    '@angular/core',
    '@angular/core/*',
  ],
};
const measurements = [];

for (const [framework, external] of Object.entries(peers)) {
  for (const component of components) {
    const entry = resolve(
      root,
      `packages/${framework}/dist/components/${component}.js`,
    );
    await readFile(entry);
    const result = await build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      minify: true,
      format: 'esm',
      platform: 'browser',
      target: 'es2022',
      external,
      logLevel: 'silent',
    });
    const bytes = result.outputFiles[0].contents;
    measurements.push({
      framework,
      component,
      minified: bytes.length,
      gzip: gzipSync(bytes).length,
      brotli: brotliCompressSync(bytes).length,
    });
  }
}

const report = {
  schemaVersion: 1,
  revision,
  calculation:
    'ESM browser bundle with only framework peer dependencies externalized',
  measurements,
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (output) await writeFile(output, serialized);
else process.stdout.write(serialized);
