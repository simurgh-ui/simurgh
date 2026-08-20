import { execFileSync } from 'node:child_process';
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, extname, resolve } from 'node:path';
import { build } from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const directories = [
  'angular',
  'cli',
  'core',
  'icons',
  'motion',
  'react',
  'registry',
  'styles',
  'vue',
];
const temporaryRoot = await mkdtemp(resolve(tmpdir(), 'simurgh-packed-'));
const tarballRoot = resolve(temporaryRoot, 'tarballs');
const consumerRoot = resolve(temporaryRoot, 'consumer');
const pnpmEntry = process.env.npm_execpath;
if (!pnpmEntry)
  throw new Error(
    'Run this verifier through pnpm so its pinned runtime is available.',
  );
const pnpm = (args, options = {}) => {
  const executable =
    extname(pnpmEntry).toLowerCase() === '.exe' ? pnpmEntry : process.execPath;
  const commandArgs = executable === pnpmEntry ? args : [pnpmEntry, ...args];
  return execFileSync(executable, commandArgs, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  });
};

function exportTargets(exports) {
  if (typeof exports === 'string') return [exports];
  if (!exports || typeof exports !== 'object') return [];
  return Object.values(exports).flatMap(exportTargets);
}

try {
  await mkdir(tarballRoot, { recursive: true });
  await mkdir(consumerRoot, { recursive: true });
  const dependencies = {};
  for (const directory of directories) {
    const packageRoot = resolve(root, 'packages', directory);
    const manifest = JSON.parse(
      await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
    );
    const output = pnpm([
      '--dir',
      packageRoot,
      'pack',
      '--pack-destination',
      tarballRoot,
    ]);
    const tarballName = output.trim().split(/\r?\n/u).at(-1);
    const tarball = resolve(tarballRoot, basename(tarballName));
    const entries = execFileSync('tar', ['-tf', tarball], {
      encoding: 'utf8',
    }).split(/\r?\n/u);
    if (!entries.includes('package/package.json'))
      throw new Error(`${manifest.name} tarball lacks package.json.`);
    const forbidden = entries.filter(
      (entry) => entry.includes('/src/') || entry.endsWith('.map'),
    );
    if (forbidden.length) {
      throw new Error(
        `${manifest.name} tarball contains source or source maps: ${forbidden.slice(0, 5).join(', ')}`,
      );
    }
    dependencies[manifest.name] = `file:${tarball.replaceAll('\\', '/')}`;
  }
  Object.assign(dependencies, {
    react: `file:${resolve(root, 'packages/react/node_modules/react').replaceAll('\\', '/')}`,
    'react-dom': `file:${resolve(root, 'packages/react/node_modules/react-dom').replaceAll('\\', '/')}`,
    vue: `file:${resolve(root, 'packages/vue/node_modules/vue').replaceAll('\\', '/')}`,
    '@vue/server-renderer': `file:${resolve(root, 'packages/vue/node_modules/@vue/server-renderer').replaceAll('\\', '/')}`,
    '@angular/common': `file:${resolve(root, 'packages/angular/node_modules/@angular/common').replaceAll('\\', '/')}`,
    '@angular/compiler': `file:${resolve(root, 'packages/angular/node_modules/@angular/compiler').replaceAll('\\', '/')}`,
    '@angular/core': `file:${resolve(root, 'packages/angular/node_modules/@angular/core').replaceAll('\\', '/')}`,
    '@angular/platform-browser': `file:${resolve(root, 'packages/angular/node_modules/@angular/platform-browser').replaceAll('\\', '/')}`,
    rxjs: `file:${resolve(root, 'packages/angular/node_modules/rxjs').replaceAll('\\', '/')}`,
    tslib: `file:${resolve(root, 'packages/angular/node_modules/tslib').replaceAll('\\', '/')}`,
  });
  const workspaceOverrides = { ...dependencies };
  await writeFile(
    resolve(consumerRoot, 'package.json'),
    `${JSON.stringify({ name: 'simurgh-tarball-consumer', private: true, type: 'module', dependencies }, null, 2)}\n`,
  );
  await writeFile(
    resolve(consumerRoot, 'pnpm-workspace.yaml'),
    `packages: []\noverrides:\n${Object.entries(workspaceOverrides)
      .map(([name, path]) => `  '${name}': '${path}'`)
      .join('\n')}\n`,
  );
  pnpm([
    '--dir',
    consumerRoot,
    'install',
    '--ignore-scripts',
    '--no-frozen-lockfile',
  ]);

  for (const directory of directories) {
    const manifest = JSON.parse(
      await readFile(
        resolve(
          consumerRoot,
          'node_modules',
          '@simurgh-ui',
          directory,
          'package.json',
        ),
        'utf8',
      ),
    );
    const packageRoot = resolve(
      consumerRoot,
      'node_modules',
      '@simurgh-ui',
      directory,
    );
    const files = (await readdir(packageRoot, { recursive: true })).map(
      (file) => file.replaceAll('\\', '/'),
    );
    for (const target of exportTargets(manifest.exports)) {
      const normalized = target.replace(/^\.\//u, '');
      const exists = normalized.includes('*')
        ? files.some((file) => {
            const [prefix, suffix] = normalized.split('*');
            return file.startsWith(prefix) && file.endsWith(suffix);
          })
        : files.includes(normalized);
      if (!exists)
        throw new Error(`${manifest.name} export target ${target} is missing.`);
    }
  }

  const imports = directories
    .filter((directory) => !['cli', 'styles'].includes(directory))
    .map(
      (directory) =>
        `import type * as ${directory.replace('-', '_')} from '@simurgh-ui/${directory}';`,
    )
    .join('\n');
  await writeFile(resolve(consumerRoot, 'types.ts'), `${imports}\n`);
  await writeFile(
    resolve(consumerRoot, 'tsconfig.json'),
    `${JSON.stringify({ compilerOptions: { module: 'ESNext', moduleResolution: 'Bundler', skipLibCheck: true, strict: true, target: 'ES2022' }, include: ['types.ts'] }, null, 2)}\n`,
  );
  execFileSync(
    process.execPath,
    [
      resolve(root, 'node_modules/typescript/bin/tsc'),
      '-p',
      'tsconfig.json',
      '--noEmit',
    ],
    {
      cwd: consumerRoot,
      stdio: 'pipe',
    },
  );

  const quickStarts = {
    react: `import React from 'react'; import { Button } from '@simurgh-ui/react/button'; import '@simurgh-ui/styles/button.css'; export const App=()=> <Button>Save</Button>;`,
    vue: `import { h } from 'vue'; import { Button } from '@simurgh-ui/vue/button'; import '@simurgh-ui/styles/button.css'; export const App=()=>h(Button,{},()=> 'Save');`,
    angular: `import { Component } from '@angular/core'; import { ButtonComponent } from '@simurgh-ui/angular/button'; import '@simurgh-ui/styles/button.css'; @Component({standalone:true,imports:[ButtonComponent],template:'<simurgh-button>Save</simurgh-button>'}) export class App {}`,
  };
  for (const [framework, source] of Object.entries(quickStarts)) {
    const extension = framework === 'react' ? 'tsx' : 'ts';
    const entry = resolve(consumerRoot, `${framework}.${extension}`);
    await writeFile(entry, source);
    const result = await build({
      absWorkingDir: consumerRoot,
      bundle: true,
      entryPoints: [entry],
      external: [
        'react',
        'react/*',
        'react-dom',
        'react-dom/*',
        'vue',
        'vue/*',
        '@angular/*',
        'rxjs',
        'tslib',
      ],
      format: 'esm',
      logLevel: 'silent',
      outdir: 'out',
      platform: 'browser',
      tsconfig: resolve(consumerRoot, 'tsconfig.json'),
      write: false,
    });
    if (!result.outputFiles?.some((file) => file.path.endsWith('.js')))
      throw new Error(`${framework} tarball quick start lacks JavaScript.`);
    if (!result.outputFiles?.some((file) => file.path.endsWith('.css')))
      throw new Error(`${framework} tarball quick start lacks CSS.`);
  }
  process.stdout.write(
    `Packed, installed, type-resolved, and bundled ${directories.length} packages.\n`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
