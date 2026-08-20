import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

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

export async function verifyPublishedBeta({ fetchRegistry = fetch } = {}) {
  const packages = [];
  const failures = [];
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
    if (!manifest.version.includes('-beta.'))
      failures.push(`${manifest.name}: local version is not a beta`);
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
    const published = registry.versions?.[manifest.version];
    if (!published) {
      failures.push(
        `${manifest.name}@${manifest.version}: version is not published`,
      );
      continue;
    }
    if (registry['dist-tags']?.beta !== manifest.version)
      failures.push(
        `${manifest.name}: beta tag is ${registry['dist-tags']?.beta ?? 'missing'}, expected ${manifest.version}`,
      );
    if (!published.dist?.integrity)
      failures.push(
        `${manifest.name}@${manifest.version}: registry integrity is missing`,
      );
    if (!published.dist?.attestations?.url)
      failures.push(
        `${manifest.name}@${manifest.version}: provenance attestation is missing`,
      );
    packages.push({
      name: manifest.name,
      version: manifest.version,
      betaTag: registry['dist-tags']?.beta,
      integrity: published.dist?.integrity,
      tarball: published.dist?.tarball,
      provenanceAttestation: published.dist?.attestations?.url,
    });
  }
  if (failures.length)
    throw new Error(
      `Published beta verification failed:\n${failures.join('\n')}`,
    );
  return { schemaVersion: 1, packageCount: packages.length, packages };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const outputIndex = process.argv.indexOf('--output');
  const outputFile = resolve(
    process.cwd(),
    outputIndex >= 0
      ? process.argv[outputIndex + 1]
      : 'artifacts/published-beta-evidence.json',
  );
  const evidence = await verifyPublishedBeta();
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(evidence, null, 2)}\n`);
  process.stdout.write(
    `Verified ${evidence.packageCount} published beta packages with integrity and provenance.\n`,
  );
}
