import { build } from 'esbuild';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const frameworks = ['react', 'vue', 'angular'];
const externals = {
  react: ['react', 'react/*', 'react-dom', 'react-dom/*'],
  vue: ['vue', 'vue/*', '@vue/server-renderer'],
  angular: ['@angular/*', 'rxjs', 'rxjs/*', 'tslib'],
};
const components = ['button', 'checkbox', 'input', 'popover'];
const temporaryRoot = await mkdtemp(resolve(root, '.reference-app-build-'));

try {
  for (const framework of frameworks) {
    for (const target of ['main', 'server']) {
      const serverOutput = resolve(temporaryRoot, `${framework}-server.cjs`);
      const result = await build({
        absWorkingDir: root,
        bundle: true,
        entryPoints: [
          `fixtures/reference-apps/${framework}/${target}.${framework === 'react' ? 'tsx' : 'ts'}`,
        ],
        external: externals[framework],
        alias: {
          ...Object.fromEntries(
            components.map((component) => [
              `@simurgh-ui/${framework}/${component}`,
              resolve(
                root,
                `packages/${framework}/dist/components/${component}.js`,
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
                  `packages/${framework}/dist/components/${component}.js`,
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
            `fixtures/reference-apps/${framework}/server.${framework === 'react' ? 'tsx' : 'ts'}`,
          ],
          external: [],
          format: 'cjs',
          logLevel: 'silent',
          nodePaths: [resolve(root, `packages/${framework}/node_modules`)],
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
    const source = await readFile(
      resolve(
        root,
        `fixtures/reference-apps/${framework}/main.${framework === 'react' ? 'tsx' : 'ts'}`,
      ),
      'utf8',
    );
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
