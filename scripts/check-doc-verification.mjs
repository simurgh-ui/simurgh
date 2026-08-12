import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const verification = JSON.parse(
  await readFile(resolve(root, 'apps/docs/verification.json'), 'utf8'),
);
const start = '<!-- doc-verification:start -->';
const end = '<!-- doc-verification:end -->';
const source =
  'https://github.com/simurgh-ui/simurgh/blob/main/packages/registry/registry.json';

if (verification.registryVersion !== registry.version) {
  throw new Error(
    `Documentation verification targets registry ${verification.registryVersion}, but registry.json is ${registry.version}. Review the docs and update verification.json.`,
  );
}
if (!/^\d{4}-\d{2}-\d{2}$/u.test(verification.date)) {
  throw new Error('Documentation verification date must use YYYY-MM-DD.');
}

const marker = `${start}
_Last verified on ${verification.date} against [Simurgh registry ${verification.registryVersion}](${source})._
${end}`;

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (extname(entry.name) === '.mdx') files.push(path);
  }
  return files;
}

const failures = [];
const files = await walk(docsRoot);
for (const path of files) {
  const contents = await readFile(path, 'utf8');
  const markerPattern = new RegExp(`${start}[\\s\\S]*?${end}\\s*`, 'u');
  const withoutMarker = contents.replace(markerPattern, '').trimEnd();
  const guidanceIndex = withoutMarker.indexOf('\n## Further guidance');
  const expected =
    guidanceIndex >= 0
      ? `${withoutMarker.slice(0, guidanceIndex).trimEnd()}\n\n${marker}\n${withoutMarker.slice(guidanceIndex)}\n`
      : `${withoutMarker}\n\n${marker}\n`;
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (contents !== expected)
    failures.push(path.slice(docsRoot.length + 1));
}

if (failures.length) {
  process.stderr.write(
    `Missing or stale documentation verification markers:\n${failures.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `${process.argv.includes('--update') ? 'Updated' : 'Validated'} registry verification markers for ${files.length} documentation pages.\n`,
  );
}
