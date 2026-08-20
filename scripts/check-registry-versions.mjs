import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const packageDirectories = [
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

export function compareVersions(left, right) {
  const parse = (version) => {
    const match = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(version);
    if (!match) throw new Error(`Unsupported semantic version: ${version}`);
    return {
      numbers: match.slice(1, 4).map(Number),
      prerelease: match[4]?.split('.'),
    };
  };
  const a = parse(left);
  const b = parse(right);
  for (let index = 0; index < 3; index += 1) {
    if (a.numbers[index] !== b.numbers[index])
      return Math.sign(a.numbers[index] - b.numbers[index]);
  }
  if (!a.prerelease && !b.prerelease) return 0;
  if (!a.prerelease) return 1;
  if (!b.prerelease) return -1;
  const length = Math.max(a.prerelease.length, b.prerelease.length);
  for (let index = 0; index < length; index += 1) {
    if (a.prerelease[index] === undefined) return -1;
    if (b.prerelease[index] === undefined) return 1;
    const aNumber = /^\d+$/.test(a.prerelease[index])
      ? Number(a.prerelease[index])
      : undefined;
    const bNumber = /^\d+$/.test(b.prerelease[index])
      ? Number(b.prerelease[index])
      : undefined;
    if (aNumber !== undefined && bNumber !== undefined && aNumber !== bNumber)
      return Math.sign(aNumber - bNumber);
    if (aNumber !== undefined && bNumber === undefined) return -1;
    if (aNumber === undefined && bNumber !== undefined) return 1;
    const comparison = a.prerelease[index].localeCompare(b.prerelease[index]);
    if (comparison) return Math.sign(comparison);
  }
  return 0;
}

export async function checkRegistryVersions({
  publish = false,
  fetchRegistry = fetch,
} = {}) {
  const failures = [];
  const results = [];
  for (const directory of packageDirectories) {
    const manifest = JSON.parse(
      await readFile(
        resolve(
          import.meta.dirname,
          '..',
          'packages',
          directory,
          'package.json',
        ),
        'utf8',
      ),
    );
    const response = await fetchRegistry(
      `https://registry.npmjs.org/${encodeURIComponent(manifest.name)}`,
    );
    if (!response.ok) {
      failures.push(
        `${manifest.name}: registry returned HTTP ${response.status}`,
      );
      continue;
    }
    const registry = await response.json();
    const latest = registry['dist-tags']?.latest;
    const published = Object.hasOwn(registry.versions ?? {}, manifest.version);
    if (!latest)
      failures.push(`${manifest.name}: registry has no latest dist-tag`);
    else if (compareVersions(manifest.version, latest) < 0)
      failures.push(
        `${manifest.name}: local ${manifest.version} is behind npm latest ${latest}`,
      );
    if (publish && published)
      failures.push(
        `${manifest.name}: ${manifest.version} is already published and cannot be republished`,
      );
    results.push({
      name: manifest.name,
      local: manifest.version,
      latest,
      published,
    });
  }
  if (failures.length)
    throw new Error(`Registry version check failed:\n${failures.join('\n')}`);
  return results;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const publish = process.argv.includes('--publish');
  const results = await checkRegistryVersions({ publish });
  for (const result of results) {
    process.stdout.write(
      `${result.name}: local ${result.local}; npm latest ${result.latest}; ${result.published ? 'published' : 'unpublished'}\n`,
    );
  }
  process.stdout.write(
    `Registry versions are ${publish ? 'publishable' : 'non-regressive'}.\n`,
  );
}
