import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const svgRoot = resolve(root, 'packages/icons/svg');
const iconNames = (await readdir(svgRoot))
  .filter((file) => file.endsWith('.svg'))
  .map((file) => file.slice(0, -4))
  .sort();

if (iconNames.length === 0 || new Set(iconNames).size !== iconNames.length) {
  throw new Error('The published SVG catalog must contain unique icon names.');
}

await Promise.all(
  iconNames.flatMap((name) => [
    access(resolve(root, `packages/icons/src/definitions/${name}.ts`)),
    access(resolve(root, `packages/icons/src/react-icons/${name}.tsx`)),
    access(resolve(root, `packages/icons/src/vue-icons/${name}.ts`)),
    access(resolve(root, `packages/icons/src/angular-icons/${name}.ts`)),
  ]),
);

const generated = await readFile(
  resolve(root, 'packages/icons/src/icons.generated.ts'),
  'utf8',
);
const generatedNameBlock =
  generated.match(/export const iconNames = \[([\s\S]*?)\] as const;/u)?.[1] ??
  '';
const generatedNames = [...generatedNameBlock.matchAll(/"([a-z0-9-]+)"/gu)].map(
  (match) => match[1],
);
const generatedNameSet = new Set(generatedNames);
const missingName = iconNames.find((name) => !generatedNameSet.has(name));
if (generatedNames.length !== iconNames.length || missingName) {
  throw new Error(
    `Generated icon names do not match the SVG catalog (${generatedNames.length}/${iconNames.length}; missing ${missingName ?? 'unknown'}). Run the icon generator.`,
  );
}

const overview = await readFile(
  resolve(root, 'apps/docs/src/content/docs/icons/overview.mdx'),
  'utf8',
);
const readme = await readFile(
  resolve(root, 'packages/icons/README.md'),
  'utf8',
);
if (!overview.includes('{iconNames.length}')) {
  throw new Error(
    'Icon documentation must derive its visible count from iconNames.length.',
  );
}
if (
  /contains\s+\d+\s+(?:functional\s+)?icons/iu.test(overview) ||
  /contains\s+\d+\s+navigation/iu.test(readme)
) {
  throw new Error('Do not maintain a literal icon count in documentation.');
}

console.log(
  `Icon catalog integrity check passed for ${iconNames.length} icons.`,
);
