import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const script = resolve(import.meta.dirname, 'aggregate-icon-study.mjs');

function session(index) {
  return {
    policyVersion: 1,
    sessionCode: `test-code-${index}`,
    consentRecorded: true,
    framework: ['react', 'vue', 'angular'][index % 3],
    tasks: {
      findFromConcept: {
        success: index !== 4,
        seconds: 10 + index,
        zeroResultQueries: index % 2,
      },
      compareCandidates: {
        success: true,
        mistakenSubstitutions: index === 4 ? 1 : 0,
      },
      copyFrameworkImport: { success: true },
      themeIcon: { success: true },
      labelIconOnlyControl: { success: index !== 3 },
      verifyRtl: { success: true },
    },
    structuredIssueCodes: index === 4 ? ['candidate-confusion'] : [],
    withdrawn: false,
  };
}

async function fixture() {
  const directory = await mkdtemp(resolve(tmpdir(), 'simurgh-icon-study-'));
  for (let index = 0; index < 5; index += 1) {
    await writeFile(
      resolve(directory, `${index}.json`),
      JSON.stringify(session(index)),
    );
  }
  return directory;
}

test('publishes only cohort aggregates', async () => {
  const directory = await fixture();
  const output = resolve(directory, 'aggregate-output.json');
  const result = spawnSync(process.execPath, [script, directory, output], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  const aggregate = JSON.parse(await readFile(output, 'utf8'));
  assert.equal(aggregate.cohortSize, 5);
  assert.equal(aggregate.metrics.searchSuccessRate, 0.8);
  assert.equal(aggregate.metrics.averageTimeToFirstCorrectIconSeconds, 12);
  assert.equal(aggregate.metrics.iconOnlyLabelTaskSuccessRate, 0.8);
  assert.equal(JSON.stringify(aggregate).includes('test-code'), false);
});

test('rejects prohibited participant data', async () => {
  const directory = await fixture();
  const invalid = {
    ...session(0),
    sessionCode: 'replacement-code',
    email: 'not-allowed@example.test',
  };
  await writeFile(resolve(directory, '0.json'), JSON.stringify(invalid));
  const result = spawnSync(
    process.execPath,
    [script, directory, resolve(directory, 'output.json')],
    {
      encoding: 'utf8',
    },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /email is prohibited by policy/);
});
