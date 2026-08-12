import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const KiB = 1024;
const peerDependencies = {
  react: ['react', 'react/*', 'react-dom', 'react-dom/*'],
  vue: ['vue', 'vue/*'],
  angular: [
    '@angular/common',
    '@angular/common/*',
    '@angular/core',
    '@angular/core/*',
  ],
};

function packageResolver() {
  return {
    name: 'simurgh-lazy-overlay-exports',
    setup(buildApi) {
      buildApi.onResolve(
        { filter: /^@simurgh-ui\/(react|vue|angular)\/(.+)$/ },
        (args) => {
          const [, framework, subpath] = args.path.match(
            /^@simurgh-ui\/(react|vue|angular)\/(.+)$/,
          );
          return {
            path: resolve(
              root,
              `packages/${framework}/dist/components/${subpath}.js`,
            ),
            sideEffects: false,
          };
        },
      );
    },
  };
}

const measurements = {};
for (const framework of ['react', 'vue', 'angular']) {
  const entryPoint = resolve(root, `fixtures/lazy-overlays/${framework}.ts`);
  const result = await build({
    entryPoints: [entryPoint],
    bundle: true,
    splitting: true,
    write: false,
    metafile: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    outdir: resolve(root, '.bundle-size/lazy-overlays'),
    external: peerDependencies[framework],
    plugins: [packageResolver()],
    logLevel: 'silent',
  });
  const entryOutput = Object.entries(result.metafile.outputs).find(
    ([, output]) =>
      output.entryPoint?.replaceAll('\\', '/').endsWith(
        `fixtures/lazy-overlays/${framework}.ts`,
      ),
  );
  if (!entryOutput) throw new Error(`Missing ${framework} lazy entry chunk.`);
  const [entryPath, entryMetadata] = entryOutput;
  const entryFile = result.outputFiles.find(
    (file) => file.path.replaceAll('\\', '/').endsWith(entryPath),
  );
  if (!entryFile) throw new Error(`Missing ${framework} lazy entry output.`);
  const inputs = Object.keys(entryMetadata.inputs);
  if (inputs.some((input) => input.includes('@floating-ui'))) {
    throw new Error(`${framework} initial chunk includes Floating UI.`);
  }
  const gzip = gzipSync(entryFile.contents, { level: 9 }).byteLength;
  const budget = 0.5 * KiB;
  measurements[framework] = {
    minified: entryFile.contents.byteLength,
    gzip,
    budget,
  };
  if (gzip > budget) {
    throw new Error(
      `${framework} lazy entry is ${gzip} B gzip; budget is ${budget} B.`,
    );
  }
}

console.table(measurements);
