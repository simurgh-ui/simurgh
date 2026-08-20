import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const policy = JSON.parse(
  await readFile(resolve(root, 'research/icon-evidence-policy.json'), 'utf8'),
);
const inputDirectory = resolve(
  process.cwd(),
  process.argv[2] ?? 'research/sessions/icons',
);
const outputFile = resolve(
  process.cwd(),
  process.argv[3] ?? 'artifacts/icon-study-aggregate.json',
);
const allowedFrameworks = new Set(['react', 'vue', 'angular']);
const allowedIssueCodes = new Set([
  'taxonomy-mismatch',
  'missing-alias',
  'candidate-confusion',
  'copy-confusion',
  'accessibility-confusion',
  'rtl-confusion',
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateInteger(value, label) {
  assert(
    Number.isInteger(value) && value >= 0,
    `${label} must be a non-negative integer`,
  );
}

function validateSuccess(value, label) {
  assert(typeof value === 'boolean', `${label} must be a boolean`);
}

function findProhibitedKey(value, path = '$') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert(
      !policy.prohibitedFields.includes(key),
      `${path}.${key} is prohibited by policy`,
    );
    findProhibitedKey(child, `${path}.${key}`);
  }
}

function validateSession(session, file) {
  findProhibitedKey(session);
  assert(
    session.policyVersion === policy.version,
    `${file}: policyVersion is stale`,
  );
  assert(
    typeof session.sessionCode === 'string' &&
      /^[a-z0-9-]{8,64}$/i.test(session.sessionCode),
    `${file}: invalid random sessionCode`,
  );
  assert(session.consentRecorded === true, `${file}: consent was not recorded`);
  assert(
    session.withdrawn === false,
    `${file}: withdrawn sessions must be deleted, not aggregated`,
  );
  assert(
    allowedFrameworks.has(session.framework),
    `${file}: framework must be react, vue, or angular`,
  );
  assert(
    session.tasks && typeof session.tasks === 'object',
    `${file}: tasks are missing`,
  );

  const tasks = session.tasks;
  validateSuccess(
    tasks.findFromConcept?.success,
    `${file}: findFromConcept.success`,
  );
  validateInteger(
    tasks.findFromConcept?.seconds,
    `${file}: findFromConcept.seconds`,
  );
  validateInteger(
    tasks.findFromConcept?.zeroResultQueries,
    `${file}: findFromConcept.zeroResultQueries`,
  );
  validateSuccess(
    tasks.compareCandidates?.success,
    `${file}: compareCandidates.success`,
  );
  validateInteger(
    tasks.compareCandidates?.mistakenSubstitutions,
    `${file}: compareCandidates.mistakenSubstitutions`,
  );
  for (const task of [
    'copyFrameworkImport',
    'themeIcon',
    'labelIconOnlyControl',
    'verifyRtl',
  ]) {
    validateSuccess(tasks[task]?.success, `${file}: ${task}.success`);
  }
  assert(
    Array.isArray(session.structuredIssueCodes),
    `${file}: structuredIssueCodes must be an array`,
  );
  for (const code of session.structuredIssueCodes) {
    assert(
      allowedIssueCodes.has(code),
      `${file}: unsupported issue code ${code}`,
    );
  }
  return session;
}

const files = (await readdir(inputDirectory))
  .filter((file) => file.endsWith('.json'))
  .sort();
assert(
  files.length >= policy.minimumPublishedCohortSize,
  `Need at least ${policy.minimumPublishedCohortSize} session files; found ${files.length}`,
);
const sessions = [];
const codes = new Set();
for (const file of files) {
  const session = validateSession(
    JSON.parse(await readFile(resolve(inputDirectory, file), 'utf8')),
    file,
  );
  assert(!codes.has(session.sessionCode), `${file}: duplicate sessionCode`);
  codes.add(session.sessionCode);
  sessions.push(session);
}

const count = sessions.length;
const successes = (select) => sessions.filter(select).length;
const sum = (select) =>
  sessions.reduce((total, session) => total + select(session), 0);
const rate = (value) => Number((value / count).toFixed(4));
const aggregate = {
  schemaVersion: 1,
  policyVersion: policy.version,
  cohortSize: count,
  frameworks: Object.fromEntries(
    [...allowedFrameworks].map((framework) => [
      framework,
      sessions.filter((session) => session.framework === framework).length,
    ]),
  ),
  metrics: {
    searchSuccessRate: rate(
      successes((session) => session.tasks.findFromConcept.success),
    ),
    averageTimeToFirstCorrectIconSeconds: Number(
      (sum((session) => session.tasks.findFromConcept.seconds) / count).toFixed(
        2,
      ),
    ),
    zeroResultQueryCount: sum(
      (session) => session.tasks.findFromConcept.zeroResultQueries,
    ),
    frameworkImportCopySuccessRate: rate(
      successes((session) => session.tasks.copyFrameworkImport.success),
    ),
    themeTaskSuccessRate: rate(
      successes((session) => session.tasks.themeIcon.success),
    ),
    iconOnlyLabelTaskSuccessRate: rate(
      successes((session) => session.tasks.labelIconOnlyControl.success),
    ),
    rtlVerificationSuccessRate: rate(
      successes((session) => session.tasks.verifyRtl.success),
    ),
    mistakenIconSubstitutionCount: sum(
      (session) => session.tasks.compareCandidates.mistakenSubstitutions,
    ),
  },
  issueCodeCounts: Object.fromEntries(
    [...allowedIssueCodes].map((code) => [
      code,
      sessions.filter((session) => session.structuredIssueCodes.includes(code))
        .length,
    ]),
  ),
  privacy: {
    rawSessionIdentifiersIncluded: false,
    minimumCohortSizeEnforced: policy.minimumPublishedCohortSize,
  },
};

await writeFile(outputFile, `${JSON.stringify(aggregate, null, 2)}\n`);
process.stdout.write(
  `Aggregated ${count} consented icon-study sessions into ${basename(outputFile)}.\n`,
);
