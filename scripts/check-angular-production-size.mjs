import { transformAsync } from '@babel/core';
import linkerPlugin from '@angular/compiler-cli/linker/babel';
import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const cases = {
  button: 512,
  checkbox: 1 * 1024,
  select: 2 * 1024,
  calendar: 3 * 1024,
  basic: 7 * 1024,
  overlays: 12 * 1024,
};
const measurements = {};
for (const [name, budget] of Object.entries(cases)) {
  const result = await build({
    entryPoints: [
      resolve(
        root,
        `fixtures/angular-production/${name === 'button' ? 'main' : name}.ts`,
      ),
    ],
    bundle: true,
    write: false,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    external: [
      '@angular/common',
      '@angular/common/*',
      '@angular/core',
      '@angular/core/*',
    ],
    plugins: [
      {
        name: 'angular-production-linker',
        setup(buildApi) {
          buildApi.onLoad(
            { filter: /packages[\\/]angular[\\/]dist[\\/].*\.js$/ },
            async ({ path }) => {
              const source = await readFile(path, 'utf8');
              const linked = await transformAsync(source, {
                filename: path,
                babelrc: false,
                configFile: false,
                sourceMaps: false,
                plugins: [[linkerPlugin, { linkerJitMode: false }]],
              });
              return { contents: linked?.code ?? source, loader: 'js' };
            },
          );
        },
      },
    ],
  });
  const bytes = result.outputFiles[0].contents;
  measurements[name] = {
    minified: bytes.byteLength,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    brotli: brotliCompressSync(bytes).byteLength,
    budget,
    linked: true,
    optimized: true,
  };
}
await writeFile(
  resolve(root, 'artifacts/angular-production-size.json'),
  `${JSON.stringify(measurements, null, 2)}\n`,
);
console.table(measurements);
const failures = Object.entries(measurements).filter(
  ([, measurement]) => measurement.gzip > measurement.budget,
);
if (failures.length) {
  throw new Error(
    failures
      .map(
        ([name, measurement]) =>
          `angular-linked-${name} is ${measurement.gzip} B gzip; budget is ${measurement.budget} B`,
      )
      .join('\n'),
  );
}
