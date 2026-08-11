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
    budget: 300,
  },
  {
    name: 'vue-button',
    framework: 'vue',
    subpath: 'button',
    budget: 0.5 * KiB,
  },
  {
    name: 'vue-checkbox',
    framework: 'vue',
    subpath: 'checkbox',
    budget: 520,
  },
  {
    name: 'vue-switch',
    framework: 'vue',
    subpath: 'switch',
    budget: 540,
  },
  {
    name: 'vue-label',
    framework: 'vue',
    subpath: 'label',
    budget: 210,
  },
  {
    name: 'vue-separator',
    framework: 'vue',
    subpath: 'separator',
    budget: 315,
  },
  {
    name: 'vue-progress',
    framework: 'vue',
    subpath: 'progress',
    budget: 560,
  },
  {
    name: 'vue-input',
    framework: 'vue',
    subpath: 'input',
    budget: 415,
  },
  {
    name: 'vue-native-select',
    framework: 'vue',
    subpath: 'native-select',
    budget: 490,
  },
  {
    name: 'vue-slider',
    framework: 'vue',
    subpath: 'slider',
    budget: 520,
  },
  {
    name: 'vue-link',
    framework: 'vue',
    subpath: 'link',
    budget: 480,
  },
  {
    name: 'vue-button-group',
    framework: 'vue',
    subpath: 'button-group',
    budget: 400,
  },
  {
    name: 'vue-input-group',
    framework: 'vue',
    subpath: 'input-group',
    budget: 405,
  },
  {
    name: 'vue-input-otp',
    framework: 'vue',
    subpath: 'input-otp',
    budget: 630,
  },
  {
    name: 'vue-toolbar',
    framework: 'vue',
    subpath: 'toolbar',
    budget: 800,
  },
  {
    name: 'vue-toggle',
    framework: 'vue',
    subpath: 'toggle',
    budget: 450,
  },
  {
    name: 'vue-toggle-group',
    framework: 'vue',
    subpath: 'toggle-group',
    budget: 1150,
  },
  {
    name: 'vue-tabs',
    framework: 'vue',
    subpath: 'tabs',
    budget: 1125,
  },
  {
    name: 'vue-accordion',
    framework: 'vue',
    subpath: 'accordion',
    budget: 585,
  },
  {
    name: 'vue-collapsible',
    framework: 'vue',
    subpath: 'collapsible',
    budget: 665,
  },
  {
    name: 'angular-button',
    framework: 'angular',
    subpath: 'button',
    budget: 512,
  },
  {
    name: 'angular-checkbox',
    framework: 'angular',
    subpath: 'checkbox',
    budget: 1.1 * KiB,
  },
  {
    name: 'angular-switch',
    framework: 'angular',
    subpath: 'switch',
    budget: 1.1 * KiB,
  },
  {
    name: 'angular-context-menu',
    framework: 'angular',
    subpath: 'context-menu',
    budget: 2 * KiB,
  },
  {
    name: 'angular-select',
    framework: 'angular',
    subpath: 'select',
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
    budget: 0.8 * KiB,
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
    budget: 1.1 * KiB,
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
    budget: 1480,
  },
  {
    name: 'vue-dialog',
    framework: 'vue',
    subpath: 'dialog',
    budget: 1.25 * KiB,
  },
  {
    name: 'vue-calendar',
    framework: 'vue',
    subpath: 'calendar',
    budget: 1.875 * KiB,
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
    budget: 512,
  },
  {
    name: 'react-basic',
    framework: 'react',
    subpath: 'basic',
    budget: 8 * KiB,
  },
  {
    name: 'vue-basic',
    framework: 'vue',
    subpath: 'basic',
    budget: 8 * KiB,
  },
  {
    name: 'angular-basic',
    framework: 'angular',
    subpath: 'basic',
    budget: 6 * KiB,
  },
  {
    name: 'react-overlays',
    framework: 'react',
    subpath: 'overlays',
    budget: 18 * KiB,
  },
  {
    name: 'vue-overlays',
    framework: 'vue',
    subpath: 'overlays',
    budget: 10.5 * KiB,
  },
  {
    name: 'angular-overlays',
    framework: 'angular',
    subpath: 'overlays',
    budget: 12 * KiB,
  },
  { name: 'react-complete', framework: 'react', budget: 27 * KiB },
  { name: 'vue-complete', framework: 'vue', budget: 22 * KiB },
  { name: 'angular-complete', framework: 'angular', budget: 27 * KiB },
  {
    name: 'react-without-floating',
    framework: 'react',
    external: ['@floating-ui/react', '@floating-ui/react/*'],
  },
  {
    name: 'vue-without-floating',
    framework: 'vue',
    external: ['@floating-ui/dom', '@floating-ui/dom/*'],
  },
  {
    name: 'angular-without-floating',
    framework: 'angular',
    external: ['@floating-ui/dom', '@floating-ui/dom/*'],
  },
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
          external: [
            ...peerDependencies[bundleCase.framework],
            ...(bundleCase.external ?? []),
          ],
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

const packageBudgets = { react: 300 * KiB, vue: 375 * KiB, angular: 275 * KiB };
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

const floatingUi = Object.fromEntries(
  ['react', 'vue', 'angular'].map((framework) => [
    framework,
    {
      gzip:
        measurements[`${framework}-complete`].gzip -
        measurements[`${framework}-without-floating`].gzip,
      calculation: 'complete bundle minus bundle with Floating UI externalized',
    },
  ]),
);
const report = {
  bundles: measurements,
  featureCosts: { floatingUi },
  packages: publishedPackages,
};
await mkdir(resolve(root, 'artifacts'), { recursive: true });
await writeFile(
  resolve(root, 'artifacts/bundle-sizes.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.table(measurements);
console.table(floatingUi);
console.table(publishedPackages);
if (failures.length) throw new Error(failures.join('\n'));
