import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const { compile } = createRequire(
  resolve(root, 'packages/svelte/package.json'),
)('svelte/compiler');
const frameworks = ['react', 'preact', 'vue', 'angular', 'svelte', 'lit'];
const externals = {
  react: ['react', 'react/*', 'react-dom', 'react-dom/*'],
  preact: ['preact', 'preact/*', 'preact-render-to-string'],
  vue: ['vue', 'vue/*', '@vue/server-renderer'],
  angular: ['@angular/*', 'rxjs', 'rxjs/*', 'tslib'],
  svelte: ['svelte', 'svelte/*'],
  lit: ['lit', 'lit/*'],
};
const components = ['button', 'checkbox', 'input', 'popover'];
const temporaryRoot = await mkdtemp(resolve(root, '.reference-app-build-'));
const entryExtension = (framework) =>
  framework === 'react' || framework === 'preact' ? 'tsx' : 'ts';
const componentExtension = (framework) =>
  framework === 'svelte' ? 'svelte' : 'js';
const sveltePlugin = (generate) => ({
  name: `svelte-${generate}`,
  setup(buildContext) {
    buildContext.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      const source = await readFile(path, 'utf8');
      const result = compile(source, {
        filename: path,
        generate,
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
});

try {
  for (const framework of frameworks) {
    for (const target of ['main', 'server']) {
      const serverOutput = resolve(temporaryRoot, `${framework}-server.cjs`);
      const result = await build({
        absWorkingDir: root,
        bundle: true,
        entryPoints: [
          `fixtures/reference-apps/${framework}/${target}.${entryExtension(framework)}`,
        ],
        external: externals[framework],
        alias: {
          ...Object.fromEntries(
            components.map((component) => [
              `@simurgh-ui/${framework}/${component}`,
              resolve(
                root,
                `packages/${framework}/dist/components/${component}.${componentExtension(framework)}`,
              ),
            ]),
          ),
          '@simurgh-ui/styles/all.css': resolve(
            root,
            'packages/styles/all.css',
          ),
        },
        format: 'esm',
        logLevel: 'silent',
        minify: true,
        nodePaths: [resolve(root, `packages/${framework}/node_modules`)],
        plugins:
          framework === 'svelte'
            ? [sveltePlugin(target === 'server' ? 'server' : 'client')]
            : [],
        outdir: 'out',
        ...(target === 'server'
          ? { outfile: serverOutput, outdir: undefined }
          : {}),
        platform: target === 'server' ? 'node' : 'browser',
        target: 'es2022',
        tsconfig: resolve(root, 'tsconfig.base.json'),
        write: false,
      });
      const javascript = result.outputFiles?.find((file) =>
        /\.[cm]?js$/u.test(file.path),
      );
      if (!javascript?.contents.length)
        throw new Error(`${framework} ${target} reference did not bundle.`);
      if (
        target === 'main' &&
        !result.outputFiles?.some((file) => file.path.endsWith('.css'))
      ) {
        throw new Error(`${framework} reference did not bundle its theme.`);
      }
      if (target === 'server' && framework !== 'angular') {
        await build({
          absWorkingDir: root,
          alias: {
            ...Object.fromEntries(
              components.map((component) => [
                `@simurgh-ui/${framework}/${component}`,
                resolve(
                  root,
                  `packages/${framework}/dist/components/${component}.${componentExtension(framework)}`,
                ),
              ]),
            ),
            '@simurgh-ui/styles/all.css': resolve(
              root,
              'packages/styles/all.css',
            ),
          },
          bundle: true,
          entryPoints: [
            `fixtures/reference-apps/${framework}/server.${entryExtension(framework)}`,
          ],
          external: [],
          format: 'cjs',
          logLevel: 'silent',
          nodePaths: [resolve(root, `packages/${framework}/node_modules`)],
          plugins: framework === 'svelte' ? [sveltePlugin('server')] : [],
          outfile: serverOutput,
          platform: 'node',
          target: 'es2022',
        });
        const markup = await (
          await import(`${pathToFileURL(serverOutput).href}?${Date.now()}`)
        ).render();
        if (
          !markup.includes(
            `${framework[0].toUpperCase()}${framework.slice(1)} reference`,
          )
        ) {
          throw new Error(
            `${framework} SSR reference did not render expected markup.`,
          );
        }
      }
    }
    const source =
      (await readFile(
        resolve(
          root,
          `fixtures/reference-apps/${framework}/main.${entryExtension(framework)}`,
        ),
        'utf8',
      )) +
      (framework === 'svelte'
        ? await readFile(
            resolve(root, 'fixtures/reference-apps/svelte/App.svelte'),
            'utf8',
          )
        : '');
    for (const contract of [
      '/button',
      '/checkbox',
      '/input',
      '/popover',
      '../theme.css',
    ]) {
      if (!source.includes(contract))
        throw new Error(`${framework} reference is missing ${contract}.`);
    }
    process.stdout.write(`${framework} production reference passed.\n`);
  }
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
