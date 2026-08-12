import { build } from 'esbuild';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const frameworks = ['react', 'vue', 'angular'];
const external = [
  'react',
  'react-dom',
  'vue',
  '@angular/common',
  '@angular/core',
  '@angular/platform-browser',
  'rxjs',
  'tslib',
  'zone.js',
];

for (const framework of frameworks) {
  const packageRoot = resolve(root, 'packages', framework);
  const packageJson = JSON.parse(
    await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
  );
  const componentPattern =
    packageJson.exports['./*'].import ?? packageJson.exports['./*'].default;
  const componentTarget = resolve(
    packageRoot,
    componentPattern.replace('*', 'button'),
  );
  const stylesRoot = resolve(root, 'packages/styles');
  const stylesPackage = JSON.parse(
    await readFile(resolve(stylesRoot, 'package.json'), 'utf8'),
  );
  const styleTarget = resolve(
    stylesRoot,
    stylesPackage.exports['./*.css'].replace('*', 'button'),
  );
  await Promise.all([access(componentTarget), access(styleTarget)]);

  const result = await build({
    absWorkingDir: root,
    bundle: true,
    entryPoints: [
      `fixtures/quick-starts/${framework}.${framework === 'react' ? 'tsx' : 'ts'}`,
    ],
    external,
    format: 'esm',
    alias: {
      [`@simurgh-ui/${framework}/button`]: componentTarget,
      '@simurgh-ui/styles/button.css': styleTarget,
    },
    logLevel: 'silent',
    outdir: 'out',
    platform: 'browser',
    tsconfig: resolve(root, 'tsconfig.base.json'),
    write: false,
  });
  const outputs = result.outputFiles ?? [];
  if (!outputs.some((output) => output.path.endsWith('.js'))) {
    throw new Error(`${framework} quick start did not produce JavaScript.`);
  }
  if (!outputs.some((output) => output.path.endsWith('.css'))) {
    throw new Error(`${framework} quick start did not resolve component CSS.`);
  }
  process.stdout.write(`${framework} package quick start passed.\n`);
}
