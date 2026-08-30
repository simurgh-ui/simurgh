import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const packageDirectories = [
  'angular',
  'cli',
  'core',
  'icons',
  'mcp',
  'motion',
  'react',
  'registry',
  'styles',
  'vue',
];

export async function verifyPublishedBeta({
  fetchRegistry = fetch,
  requireProvenance = true,
  publicationChannel = 'ci',
  maxAttempts = 30,
  retryDelayMs = 5_000,
  wait = (delay) =>
    new Promise((resolvePromise) => setTimeout(resolvePromise, delay)),
} = {}) {
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
    let verifiedPackage;
    let packageFailures = [];
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      packageFailures = [];
      try {
        const response = await fetchRegistry(
          `https://registry.npmjs.org/${encodeURIComponent(manifest.name)}`,
        );
        if (!response.ok) {
          packageFailures.push(
            `${manifest.name}: registry returned HTTP ${response.status}`,
          );
        } else {
          const registry = await response.json();
          const published = registry.versions?.[manifest.version];
          if (!published) {
            packageFailures.push(
              `${manifest.name}@${manifest.version}: version is not published`,
            );
          } else {
            if (registry['dist-tags']?.beta !== manifest.version)
              packageFailures.push(
                `${manifest.name}: beta tag is ${registry['dist-tags']?.beta ?? 'missing'}, expected ${manifest.version}`,
              );
            if (!published.dist?.integrity)
              packageFailures.push(
                `${manifest.name}@${manifest.version}: registry integrity is missing`,
              );
            if (requireProvenance && !published.dist?.attestations?.url)
              packageFailures.push(
                `${manifest.name}@${manifest.version}: provenance attestation is missing`,
              );
            if (!packageFailures.length)
              verifiedPackage = {
                name: manifest.name,
                version: manifest.version,
                betaTag: registry['dist-tags']?.beta,
                integrity: published.dist?.integrity,
                tarball: published.dist?.tarball,
                provenanceAttestation: published.dist?.attestations?.url,
              };
          }
        }
      } catch (error) {
        packageFailures.push(
          `${manifest.name}: registry request failed: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      if (verifiedPackage) break;
      if (attempt < maxAttempts) await wait(retryDelayMs);
    }
    if (verifiedPackage) packages.push(verifiedPackage);
    else failures.push(...packageFailures);
  }
  if (failures.length)
    throw new Error(
      `Published beta verification failed:\n${failures.join('\n')}`,
    );
  return {
    schemaVersion: 1,
    publicationChannel,
    provenanceRequired: requireProvenance,
    packageCount: packages.length,
    packages,
  };
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
  const directPublication = process.argv.includes('--direct-publication');
  const evidence = await verifyPublishedBeta({
    requireProvenance: !directPublication,
    publicationChannel: directPublication ? 'direct' : 'ci',
  });
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(evidence, null, 2)}\n`);
  process.stdout.write(
    `Verified ${evidence.packageCount} published beta packages with integrity${evidence.provenanceRequired ? ' and provenance' : '; provenance was not required for direct publication'}.\n`,
  );
}
