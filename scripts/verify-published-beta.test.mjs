import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';
import { verifyPublishedBeta } from './verify-published-beta.mjs';

const packageDirectories = [
  'angular',
  'cli',
  'core',
  'icons',
  'lit',
  'mcp',
  'motion',
  'preact',
  'react',
  'registry',
  'styles',
  'svelte',
  'vue',
];
const versions = Object.fromEntries(
  await Promise.all(
    packageDirectories.map(async (directory) => [
      directory,
      JSON.parse(
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
      ).version,
    ]),
  ),
);

function registryFetch({ missingProvenance = false } = {}) {
  return async (url) => {
    const name = decodeURIComponent(url.split('/').at(-1));
    const directory = name.split('/').at(-1);
    const version = versions[directory];
    return {
      ok: true,
      async json() {
        return {
          'dist-tags': { beta: version },
          versions: {
            [version]: {
              dist: {
                integrity: 'sha512-test-integrity',
                tarball: `https://registry.example/${directory}.tgz`,
                ...(!missingProvenance
                  ? {
                      attestations: {
                        url: `https://registry.example/${directory}/attestation`,
                      },
                    }
                  : {}),
              },
            },
          },
        };
      },
    };
  };
}

test('verifies all staged beta versions and strips registry metadata', async () => {
  const evidence = await verifyPublishedBeta({
    fetchRegistry: registryFetch(),
  });
  assert.equal(evidence.packageCount, 13);
  assert.equal(
    evidence.packages.every((entry) => entry.betaTag === entry.version),
    true,
  );
});

test('rejects packages without provenance', async () => {
  await assert.rejects(
    verifyPublishedBeta({
      fetchRegistry: registryFetch({ missingProvenance: true }),
      maxAttempts: 1,
    }),
    /provenance attestation is missing/,
  );
});

test('records direct publication without claiming provenance', async () => {
  const evidence = await verifyPublishedBeta({
    fetchRegistry: registryFetch({ missingProvenance: true }),
    requireProvenance: false,
    publicationChannel: 'direct',
  });
  assert.equal(evidence.publicationChannel, 'direct');
  assert.equal(evidence.provenanceRequired, false);
  assert.equal(
    evidence.packages.every((entry) => entry.provenanceAttestation == null),
    true,
  );
});

test('retries while a published version propagates through the registry', async () => {
  let requests = 0;
  const fetchRegistry = registryFetch();
  const evidence = await verifyPublishedBeta({
    fetchRegistry: async (url) => {
      requests += 1;
      if (requests === 1)
        return {
          ok: true,
          async json() {
            return { 'dist-tags': {}, versions: {} };
          },
        };
      return fetchRegistry(url);
    },
    maxAttempts: 2,
    retryDelayMs: 0,
    wait: async () => {},
  });
  assert.equal(evidence.packageCount, 13);
  assert.equal(requests, 14);
});
