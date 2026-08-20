import { Buffer } from 'node:buffer';
import console from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { build } from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'artifacts/icon-import-strategies.json');
const checkOnly = process.argv.includes('--check');
const external = ['react', 'react/*'];

const bundleCase = async (id, label, source, example, consequence) => {
  const result = await build({
    absWorkingDir: root,
    stdin: { contents: source, resolveDir: root },
    bundle: true,
    write: false,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    external,
    metafile: true,
    logLevel: 'silent',
  });
  const bytes = result.outputFiles[0].contents;
  const definitionCount = Object.keys(result.metafile.inputs).filter((path) =>
    path.includes('packages/icons/src/definitions/'),
  ).length;
  return {
    id,
    label,
    example,
    delivery: 'JavaScript bundle',
    minified: bytes.byteLength,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    brotli: brotliCompressSync(bytes).byteLength,
    retainedIconDefinitions: definitionCount,
    consequence,
  };
};

const strategies = [
  await bundleCase(
    'named',
    'Named component',
    `export { ArrowRight } from './packages/icons/src/react-icons/arrow-right.tsx';`,
    `import { ArrowRight } from '@simurgh-ui/icons/react/arrow-right';`,
    'Best component tree-shaking: only the selected definition and shared React adapter remain.',
  ),
  await bundleCase(
    'dynamic',
    'Dynamic component',
    `export { SimurghIcon } from './packages/icons/src/react-dynamic.tsx';`,
    `import { SimurghIcon } from '@simurgh-ui/icons/react/dynamic';`,
    'Runtime name selection retains the complete definition catalog.',
  ),
  await bundleCase(
    'category',
    'Category lookup',
    `import { getIcon, iconGroups } from './packages/icons/src/icons.generated.ts'; export const arrows = iconGroups.arrows.map(getIcon);`,
    `import { getIcon, iconGroups } from '@simurgh-ui/icons/catalog';`,
    'Runtime category traversal retains the complete catalog even when one group is selected.',
  ),
];

const rawSvg = Buffer.from(
  (
    await readFile(resolve(root, 'packages/icons/svg/arrow-right.svg'), 'utf8')
  ).replaceAll('\r\n', '\n'),
);
strategies.push({
  id: 'raw-svg',
  label: 'Raw SVG asset',
  example: `import arrowRightUrl from '@simurgh-ui/icons/svg/arrow-right';`,
  delivery: 'Standalone SVG asset',
  minified: rawSvg.byteLength,
  gzip: gzipSync(rawSvg, { level: 9 }).byteLength,
  brotli: brotliCompressSync(rawSvg).byteLength,
  retainedIconDefinitions: 1,
  consequence:
    'Ships one authored asset and no framework adapter; behavior and accessibility are consumer-owned.',
});

const contents = `${JSON.stringify(
  {
    schemaVersion: 1,
    generatedAt: '2026-08-18',
    toolchain: 'esbuild, gzip level 9, Brotli defaults',
    scenario: 'One Arrow Right icon; React is external for component cases',
    strategies,
  },
  null,
  2,
)}\n`;

if (checkOnly) {
  const current = await readFile(output);
  if (!current.equals(Buffer.from(contents))) {
    throw new Error(
      'Icon import-strategy measurements are stale. Run node scripts/measure-icon-import-strategies.mjs.',
    );
  }
  console.log('Icon import-strategy measurements are current.');
} else {
  await writeFile(output, contents);
  console.log('Measured named, dynamic, category, and raw-SVG icon imports.');
}
