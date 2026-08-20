import { execFileSync } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const changesetRoot = resolve(root, '.changeset');
const packageNames = new Map();
for (const directory of await readdir(resolve(root, 'packages'))) {
  try {
    const manifest = JSON.parse(
      await readFile(
        resolve(root, 'packages', directory, 'package.json'),
        'utf8',
      ),
    );
    if (!manifest.private) packageNames.set(directory, manifest.name);
  } catch {}
}

const notes = Object.fromEntries(
  [...packageNames.values()].map((name) => [name, []]),
);
const covered = new Set();
for (const file of (await readdir(changesetRoot)).filter((name) =>
  name.endsWith('.md'),
)) {
  const source = await readFile(resolve(changesetRoot, file), 'utf8');
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]+)$/u);
  if (!match) throw new Error(`${file} has invalid Changeset frontmatter.`);
  const summary = match[2].trim();
  if (summary.length < 12)
    throw new Error(`${file} needs a consumer-facing summary.`);
  const releases = [
    ...match[1].matchAll(
      /^['"]?(@simurgh-ui\/[\w-]+)['"]?:\s*(patch|minor|major)$/gmu,
    ),
  ];
  if (!releases.length)
    throw new Error(`${file} does not release a public package.`);
  for (const [, name, level] of releases) {
    if (!(name in notes))
      throw new Error(`${file} references unknown package ${name}.`);
    covered.add(name);
    notes[name].push({ changeset: file.replace(/\.md$/u, ''), level, summary });
  }
}

const baseArgument = process.argv.find((value) => value.startsWith('--base='));
const base = baseArgument?.slice(7) || process.env.CHANGESET_BASE_REF;
if (base) {
  const changed = execFileSync(
    'git',
    ['diff', '--name-only', `${base}...HEAD`],
    {
      cwd: root,
      encoding: 'utf8',
    },
  )
    .split(/\r?\n/u)
    .filter(Boolean);
  const consumerPackages = new Set();
  for (const path of changed) {
    const match = path.match(/^packages\/([^/]+)\/(.+)$/u);
    if (!match || !packageNames.has(match[1])) continue;
    const relative = match[2];
    if (
      relative.startsWith('test/') ||
      relative === 'CHANGELOG.md' ||
      relative === 'README.md' ||
      relative.startsWith('coverage/') ||
      relative.startsWith('dist/')
    )
      continue;
    consumerPackages.add(packageNames.get(match[1]));
  }
  const missing = [...consumerPackages].filter((name) => !covered.has(name));
  if (missing.length) {
    throw new Error(
      `Consumer-visible changes need Changesets: ${missing.join(', ')}`,
    );
  }
}

const scoped = Object.fromEntries(
  Object.entries(notes).filter(([, entries]) => entries.length > 0),
);
await writeFile(
  resolve(root, 'artifacts/pending-release-notes.json'),
  `${JSON.stringify({ schemaVersion: 1, packages: scoped }, null, 2)}\n`,
);
process.stdout.write(
  `Validated ${Object.values(scoped).flat().length} package-scoped pending release notes.\n`,
);
