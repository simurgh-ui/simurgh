import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const packageRoot = resolve(root, 'packages/react');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const entryPoints = Object.fromEntries(
  registry.components.map((component) => [
    `components/${component}`,
    resolve(packageRoot, `src/components/${component}.tsx`),
  ]),
);
const common = {
  entryPoints,
  outdir: resolve(root, '.bundle-size/react-splitting'),
  bundle: true,
  write: false,
  metafile: true,
  minify: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  sourcemap: false,
  external: [
    '@floating-ui/react',
    '@floating-ui/react/*',
    '@simurgh-ui/core',
    '@simurgh-ui/core/*',
    'react',
    'react/*',
    'react-dom',
    'react-dom/*',
  ],
  pure: ['createContext', 'forwardRef'],
  logLevel: 'silent',
};

function summarize(result) {
  const outputs = Object.entries(result.metafile.outputs);
  const button = outputs.find(([, output]) =>
    output.entryPoint
      ?.replaceAll('\\', '/')
      .endsWith('packages/react/src/components/button.tsx'),
  );
  if (!button) throw new Error('Missing React Button entry output.');
  const outputFiles = new Map(
    result.outputFiles.map((file) => [basename(file.path), file.contents]),
  );
  const reachable = new Set();
  const visit = (path) => {
    if (reachable.has(path)) return;
    reachable.add(path);
    for (const dependency of result.metafile.outputs[path]?.imports ?? []) {
      const match = outputs.find(
        ([candidate]) => basename(candidate) === basename(dependency.path),
      );
      if (match) visit(match[0]);
    }
  };
  visit(button[0]);
  const buttonFiles = [...reachable].map((path) =>
    outputFiles.get(basename(path)),
  );
  if (buttonFiles.some((file) => !file)) {
    throw new Error('Missing emitted output while tracing React Button.');
  }
  return {
    outputFiles: outputs.length,
    totalMinified: outputs.reduce((total, [, output]) => total + output.bytes, 0),
    buttonFiles: buttonFiles.length,
    buttonMinified: buttonFiles.reduce(
      (total, contents) => total + contents.byteLength,
      0,
    ),
    buttonGzip: buttonFiles.reduce(
      (total, contents) =>
        total + gzipSync(contents, { level: 9 }).byteLength,
      0,
    ),
  };
}

const isolated = summarize(await build({ ...common, splitting: false }));
const split = summarize(
  await build({
    ...common,
    splitting: true,
    chunkNames: 'chunks/[name]-[hash]',
  }),
);
const report = { isolated, split };

await writeFile(
  resolve(root, 'artifacts/react-code-splitting.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.table(report);
