import { execFile } from 'node:child_process';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { build } from 'esbuild';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const iconsRoot = resolve(root, 'packages/icons');
const KiB = 1024;
const external = [
  'react',
  'react/*',
  'vue',
  'vue/*',
  '@angular/core',
  '@angular/core/*',
];
const cases = [
  [
    'react-one',
    `export { Home } from './packages/icons/src/react-icons/home.tsx'`,
    1.5 * KiB,
  ],
  [
    'react-three',
    `export { Home } from './packages/icons/src/react-icons/home.tsx'; export { Menu } from './packages/icons/src/react-icons/menu.tsx'; export { Settings } from './packages/icons/src/react-icons/settings.tsx'`,
    3 * KiB,
  ],
  [
    'vue-one',
    `export { Home } from './packages/icons/src/vue-icons/home.ts'`,
    1.5 * KiB,
  ],
  [
    'vue-three',
    `export { Home } from './packages/icons/src/vue-icons/home.ts'; export { Menu } from './packages/icons/src/vue-icons/menu.ts'; export { Settings } from './packages/icons/src/vue-icons/settings.ts'`,
    3 * KiB,
  ],
  [
    'angular-one',
    `export { Home } from './packages/icons/src/angular-icons/home.ts'`,
    2.5 * KiB,
  ],
  [
    'react-dynamic',
    `export * from './packages/icons/src/react-dynamic.tsx'`,
    270 * KiB,
  ],
  [
    'vue-dynamic',
    `export * from './packages/icons/src/vue-dynamic.ts'`,
    270 * KiB,
  ],
  [
    'angular-dynamic',
    `export * from './packages/icons/src/angular-dynamic.ts'`,
    270 * KiB,
  ],
  [
    'react-complete',
    `export * from './packages/icons/src/react.tsx'`,
    275 * KiB,
  ],
  ['vue-complete', `export * from './packages/icons/src/vue.ts'`, 275 * KiB],
  [
    'angular-complete',
    `export * from './packages/icons/src/angular.ts'`,
    310 * KiB,
  ],
];

const failures = [];
const bundles = {};
for (const [name, source, budget] of cases) {
  const result = await build({
    stdin: { contents: source, resolveDir: root },
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
  const gzip = gzipSync(bytes, { level: 9 }).byteLength;
  bundles[name] = {
    minified: bytes.byteLength,
    gzip,
    brotli: brotliCompressSync(bytes).byteLength,
    budget,
  };
  if (gzip > budget)
    failures.push(`${name}: ${gzip} B gzip exceeds ${budget} B`);
}

const svgFiles = await readdir(resolve(iconsRoot, 'svg'));
const svgBytes = await Promise.all(
  svgFiles
    .filter((file) => file.endsWith('.svg'))
    .map((file) => readFile(resolve(iconsRoot, 'svg', file))),
);
const rawSvg = {
  files: svgBytes.length,
  unpacked: svgBytes.reduce((sum, bytes) => sum + bytes.byteLength, 0),
  gzip: gzipSync(Buffer.concat(svgBytes), { level: 9 }).byteLength,
  brotli: brotliCompressSync(Buffer.concat(svgBytes)).byteLength,
};

const isWindows = process.platform === 'win32';
const npmCache = resolve(root, 'artifacts/npm-cache');
await mkdir(npmCache, { recursive: true });
const { stdout } = await promisify(execFile)(
  isWindows ? process.env.ComSpec : 'npm',
  isWindows
    ? ['/d', '/s', '/c', 'npm pack --dry-run --json']
    : ['pack', '--dry-run', '--json'],
  {
    cwd: iconsRoot,
    maxBuffer: 20_000_000,
    env: { ...process.env, npm_config_cache: npmCache },
  },
);
const manifest = JSON.parse(stdout)[0];
const published = await Promise.all(
  manifest.files.map(({ path }) => readFile(resolve(iconsRoot, path))),
);
const packageSize = {
  files: published.length,
  unpacked: manifest.unpackedSize,
  gzip: gzipSync(Buffer.concat(published), { level: 9 }).byteLength,
  brotli: brotliCompressSync(Buffer.concat(published)).byteLength,
  budget: 6 * 1024 * KiB,
};
if (manifest.files.some(({ path }) => path.endsWith('.map')))
  failures.push('published package contains source maps');
if (packageSize.unpacked > packageSize.budget)
  failures.push(
    `package: ${packageSize.unpacked} B exceeds ${packageSize.budget} B`,
  );

const report = { bundles, rawSvg, package: packageSize };
await mkdir(resolve(root, 'artifacts'), { recursive: true });
await writeFile(
  resolve(root, 'artifacts/icons-bundle-sizes.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.table(bundles);
console.table({ rawSvg, package: packageSize });
if (failures.length) throw new Error(failures.join('\n'));
