import assert from 'node:assert/strict';
import test from 'node:test';
import { verifyPublishedBeta } from './verify-published-beta.mjs';

const versions = {
  angular: '0.3.2-beta.0',
  cli: '0.4.1-beta.0',
  core: '0.3.2-beta.0',
  icons: '0.1.2-beta.0',
  motion: '0.1.3-beta.0',
  react: '0.3.2-beta.0',
  registry: '0.3.2-beta.0',
  styles: '0.2.2-beta.0',
  vue: '0.3.2-beta.0',
};

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
  assert.equal(evidence.packageCount, 9);
  assert.equal(
    evidence.packages.every((entry) => entry.betaTag === entry.version),
    true,
  );
});

test('rejects packages without provenance', async () => {
  await assert.rejects(
    verifyPublishedBeta({
      fetchRegistry: registryFetch({ missingProvenance: true }),
    }),
    /provenance attestation is missing/,
  );
});
