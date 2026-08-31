import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const { compile } = createRequire(
  resolve(root, 'packages/svelte/package.json'),
)('svelte/compiler');
const frameworks = ['react', 'preact', 'vue', 'angular', 'svelte', 'lit'];
const external = [
  'react',
  'react-dom',
  'preact',
  'preact/compat',
  'preact/jsx-runtime',
  'vue',
  '@angular/common',
  '@angular/core',
  '@angular/platform-browser',
  'rxjs',
  'tslib',
  'zone.js',
  'svelte/*',
  'lit',
  'lit/*',
];
const sveltePlugin = {
  name: 'svelte-client',
  setup(buildContext) {
    buildContext.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      const source = await readFile(path, 'utf8');
      const result = compile(source, {
        filename: path,
        generate: 'client',
        css: 'injected',
        dev: false,
      });
      return {
        contents: result.js.code,
        loader: 'js',
        resolveDir: resolve(path, '..'),
      };
    });
  },
};

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
      `fixtures/quick-starts/${framework}.${framework === 'react' || framework === 'preact' ? 'tsx' : framework === 'svelte' ? 'svelte' : 'ts'}`,
    ],
    external,
    format: 'esm',
    alias: {
      [`@simurgh-ui/${framework}/button`]: componentTarget,
      '@simurgh-ui/styles/button.css': styleTarget,
    },
    logLevel: 'silent',
    plugins: framework === 'svelte' ? [sveltePlugin] : [],
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
