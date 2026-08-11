import { build } from 'esbuild';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

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
const cases = [
  {
    name: 'react-button',
    framework: 'react',
    subpath: 'button',
    budget: 1 * KiB,
  },
  {
    name: 'vue-button',
    framework: 'vue',
    subpath: 'button',
    budget: 1.5 * KiB,
  },
  {
    name: 'angular-button',
    framework: 'angular',
    subpath: 'button',
    budget: 2 * KiB,
  },
  {
    name: 'react-rating',
    framework: 'react',
    subpath: 'rating',
    budget: 1.5 * KiB,
  },
  {
    name: 'vue-rating',
    framework: 'vue',
    subpath: 'rating',
    budget: 2 * KiB,
  },
  {
    name: 'angular-rating',
    framework: 'angular',
    subpath: 'rating',
    budget: 2 * KiB,
  },
  {
    name: 'react-tags-input',
    framework: 'react',
    subpath: 'tags-input',
    budget: 2 * KiB,
  },
  {
    name: 'vue-tags-input',
    framework: 'vue',
    subpath: 'tags-input',
    budget: 2.5 * KiB,
  },
  {
    name: 'angular-tags-input',
    framework: 'angular',
    subpath: 'tags-input',
    budget: 2.5 * KiB,
  },
  {
    name: 'react-dialog',
    framework: 'react',
    subpath: 'dialog',
    budget: 4 * KiB,
  },
  {
    name: 'angular-dialog',
    framework: 'angular',
    subpath: 'dialog',
    budget: 2 * KiB,
  },
  {
    name: 'angular-calendar',
    framework: 'angular',
    subpath: 'calendar',
    budget: 3 * KiB,
  },
  {
    name: 'angular-root-button',
    framework: 'angular',
    source: `export { ButtonComponent } from '@simurgh-ui/angular';`,
    budget: 2 * KiB,
  },
  { name: 'react-complete', framework: 'react', budget: 27 * KiB },
  { name: 'vue-complete', framework: 'vue', budget: 21 * KiB },
  { name: 'angular-complete', framework: 'angular', budget: 27 * KiB },
  {
    name: 'styles-complete',
    path: 'packages/styles/all.css',
  },
];

function packageResolver() {
  return {
    name: 'simurgh-package-exports',
    setup(buildApi) {
      buildApi.onResolve(
        { filter: /^@simurgh-ui\/(react|vue|angular)(?:\/(.+))?$/ },
        (args) => {
          const match = args.path.match(
            /^@simurgh-ui\/(react|vue|angular)(?:\/(.+))?$/,
          );
          const [, framework, subpath] = match;
          return {
            path: resolve(
              root,
              `packages/${framework}/dist/${subpath ? `components/${subpath}` : 'index'}.js`,
            ),
            sideEffects: false,
          };
        },
      );
    },
  };
}

const measurements = {};
const failures = [];
for (const bundleCase of cases) {
  const source =
    bundleCase.source ??
    (bundleCase.framework
      ? `export * from '@simurgh-ui/${bundleCase.framework}${bundleCase.subpath ? `/${bundleCase.subpath}` : ''}';`
      : undefined);
  const buildOptions = {
    bundle: true,
    write: false,
    minify: true,
    platform: 'browser',
    target: 'es2022',
    logLevel: 'silent',
    ...(source
      ? {
          stdin: {
            contents: source,
            resolveDir: root,
            sourcefile: `${bundleCase.name}.js`,
          },
          format: 'esm',
          external: peerDependencies[bundleCase.framework],
          plugins: [packageResolver()],
        }
      : { entryPoints: [resolve(root, bundleCase.path)] }),
  };
  const buildResult = await build(buildOptions);
  const bytes = buildResult.outputFiles[0].contents;
  const result = {
    minified: bytes.byteLength,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    brotli: brotliCompressSync(bytes).byteLength,
    ...(bundleCase.budget ? { budget: bundleCase.budget } : {}),
  };
  measurements[bundleCase.name] = result;
  if (bundleCase.budget && result.gzip > bundleCase.budget) {
    failures.push(
      `${bundleCase.name} is ${result.gzip} B gzip; budget is ${bundleCase.budget} B`,
    );
  }
}

const packageBudgets = { react: 300 * KiB, vue: 800 * KiB, angular: 275 * KiB };
const publishedPackages = {};
for (const framework of ['react', 'vue', 'angular']) {
  const isWindows = process.platform === 'win32';
  const command = isWindows ? process.env.ComSpec : 'pnpm';
  const arguments_ = isWindows
    ? [
        '/d',
        '/s',
        '/c',
        `pnpm --filter @simurgh-ui/${framework} pack --dry-run --json`,
      ]
    : ['--filter', `@simurgh-ui/${framework}`, 'pack', '--dry-run', '--json'];
  const { stdout } = await promisify(execFile)(command, arguments_, {
    cwd: root,
    maxBuffer: 10_000_000,
  });
  const manifest = JSON.parse(stdout.slice(stdout.indexOf('{')));
  const files = await Promise.all(
    manifest.files.map(({ path }) =>
      readFile(resolve(root, `packages/${framework}`, path)),
    ),
  );
  const bytes = Buffer.concat(files);
  const result = {
    files: files.length,
    unpacked: bytes.byteLength,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    budget: packageBudgets[framework],
  };
  publishedPackages[framework] = result;
  if (manifest.files.some(({ path }) => path.endsWith('.map'))) {
    failures.push(`${framework} publishes source maps`);
  }
  if (result.unpacked > result.budget) {
    failures.push(
      `${framework} package is ${result.unpacked} B unpacked; budget is ${result.budget} B`,
    );
  }
}

const report = { bundles: measurements, packages: publishedPackages };
await mkdir(resolve(root, 'artifacts'), { recursive: true });
await writeFile(
  resolve(root, 'artifacts/bundle-sizes.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.table(measurements);
console.table(publishedPackages);
if (failures.length) throw new Error(failures.join('\n'));
