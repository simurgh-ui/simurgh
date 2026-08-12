import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs');
const dictionaryPath = resolve(root, 'apps/docs/spelling-words.txt');
const denied = new Map([
  ['accesibility', 'accessibility'],
  ['behaviourr', 'behavior'],
  ['compatability', 'compatibility'],
  ['dependancy', 'dependency'],
  ['descripton', 'description'],
  ['frameworkk', 'framework'],
  ['intial', 'initial'],
  ['maintainance', 'maintenance'],
  ['occurence', 'occurrence'],
  ['seperate', 'separate'],
  ['teh', 'the'],
  ['uncontrolledd', 'uncontrolled'],
]);

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (extname(entry.name) === '.mdx') files.push(path);
  }
  return files;
}

function prose(source) {
  return source
    .replace(/^---[\s\S]*?---/u, '')
    .replace(/```[\s\S]*?```/gu, ' ')
    .replace(/`[^`]*`/gu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(
      /\[[^\]]*\]\([^)]+\)/gu,
      (link) => link.match(/^\[([^\]]*)\]/u)?.[1] ?? ' ',
    )
    .replace(/https?:\/\/\S+/gu, ' ')
    .replace(/&[a-z]+;/giu, ' ');
}

function words(source) {
  return [...prose(source).matchAll(/[\p{Letter}][\p{Letter}'’.-]*/gu)]
    .map((match) =>
      match[0]
        .toLowerCase()
        .replaceAll('’', "'")
        .replace(/^[.-]+|[.'-]+$/gu, ''),
    )
    .filter((word) => word.length > 1 && !/^x+$/u.test(word));
}

const used = new Set();
for (const path of await walk(docsRoot)) {
  for (const word of words(await readFile(path, 'utf8'))) used.add(word);
}
const sortedUsed = [...used].sort((first, second) =>
  first.localeCompare(second, 'en'),
);

if (process.argv.includes('--update')) {
  const deniedUsed = sortedUsed.filter((word) => denied.has(word));
  if (deniedUsed.length) {
    throw new Error(
      `Refusing to approve denied spelling: ${deniedUsed.map((word) => `${word} -> ${denied.get(word)}`).join(', ')}`,
    );
  }
  await writeFile(dictionaryPath, `${sortedUsed.join('\n')}\n`);
  process.stdout.write(
    `Updated documentation spelling dictionary (${sortedUsed.length} words).\n`,
  );
  process.exit(0);
}

const dictionarySource = await readFile(dictionaryPath, 'utf8');
const entries = dictionarySource.split(/\r?\n/u).filter(Boolean);
const expectedOrder = [...entries].sort((first, second) =>
  first.localeCompare(second, 'en'),
);
if (entries.join('\n') !== expectedOrder.join('\n')) {
  throw new Error(
    'Documentation spelling dictionary must be sorted and contain one word per line.',
  );
}
const duplicates = entries.filter(
  (word, index) => entries.indexOf(word) !== index,
);
if (duplicates.length)
  throw new Error(
    `Duplicate spelling entries: ${[...new Set(duplicates)].join(', ')}`,
  );

const approved = new Set(entries);
const unknown = sortedUsed.filter((word) => !approved.has(word));
const deniedUsed = sortedUsed.filter((word) => denied.has(word));
if (unknown.length || deniedUsed.length) {
  const messages = [];
  if (unknown.length) messages.push(`Unreviewed words: ${unknown.join(', ')}`);
  if (deniedUsed.length) {
    messages.push(
      `Denied spellings: ${deniedUsed.map((word) => `${word} -> ${denied.get(word)}`).join(', ')}`,
    );
  }
  process.stderr.write(
    `Documentation spelling check failed.\n${messages.join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Documentation spelling check passed (${entries.length} reviewed words).\n`,
  );
}
