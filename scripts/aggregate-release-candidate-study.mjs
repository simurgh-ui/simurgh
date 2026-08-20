import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const inputDirectory = resolve(
  process.cwd(),
  process.argv[2] ?? 'research/sessions/release-candidate',
);
const outputFile = resolve(
  process.cwd(),
  process.argv[3] ?? 'artifacts/release-candidate-study-aggregate.json',
);
const frameworks = ['react', 'vue', 'angular'];
const issueCodes = [
  'installation-guidance',
  'theme-guidance',
  'form-guidance',
  'dialog-guidance',
  'event-guidance',
  'copied-source-guidance',
  'production-build-guidance',
  'accessibility-guidance',
];
const prohibitedKeys = [
  'name',
  'email',
  'ipAddress',
  'accountId',
  'recording',
  'freeFormNotes',
];
const timedTasks = [
  'installComponent',
  'customizeTheme',
  'completeAccessibleForm',
  'completeProductionBuild',
];
const booleanTasks = [
  ...timedTasks,
  'restoreDialogFocus',
  'serializeForm',
  'handleEvent',
  'customizeCopiedSource',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function rejectProhibitedKeys(value, path = '$') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert(!prohibitedKeys.includes(key), `${path}.${key} is prohibited`);
    rejectProhibitedKeys(child, `${path}.${key}`);
  }
}

function validate(session, file) {
  rejectProhibitedKeys(session);
  assert(session.schemaVersion === 1, `${file}: unsupported schemaVersion`);
  assert(
    /^[a-z0-9-]{8,64}$/i.test(session.sessionCode ?? ''),
    `${file}: invalid random sessionCode`,
  );
  assert(session.consentRecorded === true, `${file}: consent was not recorded`);
  assert(
    session.withdrawn === false,
    `${file}: withdrawn sessions must be deleted`,
  );
  assert(
    frameworks.includes(session.framework),
    `${file}: unsupported framework`,
  );
  assert(
    /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(session.packageVersion ?? ''),
    `${file}: invalid packageVersion`,
  );
  for (const task of booleanTasks) {
    assert(
      typeof session.tasks?.[task]?.success === 'boolean',
      `${file}: ${task}.success must be a boolean`,
    );
  }
  for (const task of timedTasks) {
    assert(
      Number.isInteger(session.tasks[task].seconds) &&
        session.tasks[task].seconds >= 0,
      `${file}: ${task}.seconds must be a non-negative integer`,
    );
  }
  assert(
    Array.isArray(session.structuredIssueCodes),
    `${file}: structuredIssueCodes must be an array`,
  );
  for (const code of session.structuredIssueCodes) {
    assert(
      issueCodes.includes(code),
      `${file}: unsupported issue code ${code}`,
    );
  }
  return session;
}

const files = (await readdir(inputDirectory))
  .filter((file) => file.endsWith('.json'))
  .sort();
assert(
  files.length >= 5,
  `Need at least 5 session files; found ${files.length}`,
);
const sessions = [];
const codes = new Set();
for (const file of files) {
  const session = validate(
    JSON.parse(await readFile(resolve(inputDirectory, file), 'utf8')),
    file,
  );
  assert(!codes.has(session.sessionCode), `${file}: duplicate sessionCode`);
  codes.add(session.sessionCode);
  sessions.push(session);
}

const rate = (task) =>
  Number(
    (
      sessions.filter((session) => session.tasks[task].success).length /
      sessions.length
    ).toFixed(4),
  );
const average = (task) =>
  Number(
    (
      sessions.reduce((sum, session) => sum + session.tasks[task].seconds, 0) /
      sessions.length
    ).toFixed(2),
  );
const aggregate = {
  schemaVersion: 1,
  cohortSize: sessions.length,
  packageVersions: [
    ...new Set(sessions.map((session) => session.packageVersion)),
  ].sort(),
  frameworks: Object.fromEntries(
    frameworks.map((framework) => [
      framework,
      sessions.filter((session) => session.framework === framework).length,
    ]),
  ),
  taskSuccessRates: Object.fromEntries(
    booleanTasks.map((task) => [task, rate(task)]),
  ),
  timingSeconds: {
    timeToFirstComponentAverage: average('installComponent'),
    firstThemeCustomizationAverage: average('customizeTheme'),
    accessibleFormCompletionAverage: average('completeAccessibleForm'),
    firstProductionBuildAverage: average('completeProductionBuild'),
  },
  issueCodeCounts: Object.fromEntries(
    issueCodes.map((code) => [
      code,
      sessions.filter((session) => session.structuredIssueCodes.includes(code))
        .length,
    ]),
  ),
  privacy: {
    rawSessionIdentifiersIncluded: false,
    minimumCohortSizeEnforced: 5,
  },
};

await writeFile(outputFile, `${JSON.stringify(aggregate, null, 2)}\n`);
process.stdout.write(
  `Aggregated ${sessions.length} release-candidate sessions into ${basename(outputFile)}.\n`,
);
