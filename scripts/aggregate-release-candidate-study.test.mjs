import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const script = resolve(
  import.meta.dirname,
  'aggregate-release-candidate-study.mjs',
);
const task = (seconds) => ({
  success: true,
  ...(seconds === undefined ? {} : { seconds }),
});
function session(index) {
  return {
    schemaVersion: 1,
    sessionCode: `rc-test-${index}`,
    consentRecorded: true,
    framework: ['react', 'vue', 'angular'][index % 3],
    packageVersion: '1.0.0-beta.1',
    tasks: {
      installComponent: task(40 + index),
      customizeTheme: task(60 + index),
      completeAccessibleForm: task(90 + index),
      restoreDialogFocus: task(),
      serializeForm: task(),
      handleEvent: task(),
      customizeCopiedSource: task(),
      completeProductionBuild: task(120 + index),
    },
    structuredIssueCodes: index === 4 ? ['theme-guidance'] : [],
    withdrawn: false,
  };
}

async function fixture() {
  const directory = await mkdtemp(resolve(tmpdir(), 'simurgh-rc-study-'));
  for (let index = 0; index < 5; index += 1)
    await writeFile(
      resolve(directory, `${index}.json`),
      JSON.stringify(session(index)),
    );
  return directory;
}

test('aggregates task outcomes and adoption timing without identifiers', async () => {
  const directory = await fixture();
  const output = resolve(directory, 'aggregate.json');
  const result = spawnSync(process.execPath, [script, directory, output], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  const aggregate = JSON.parse(await readFile(output, 'utf8'));
  assert.equal(aggregate.cohortSize, 5);
  assert.equal(aggregate.timingSeconds.timeToFirstComponentAverage, 42);
  assert.equal(aggregate.taskSuccessRates.restoreDialogFocus, 1);
  assert.equal(JSON.stringify(aggregate).includes('rc-test'), false);
});

test('rejects free-form participant records', async () => {
  const directory = await fixture();
  await writeFile(
    resolve(directory, '0.json'),
    JSON.stringify({ ...session(0), freeFormNotes: 'not allowed' }),
  );
  const result = spawnSync(
    process.execPath,
    [script, directory, resolve(directory, 'aggregate.json')],
    { encoding: 'utf8' },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /freeFormNotes is prohibited/);
});
