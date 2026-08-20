import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const evidencePath = resolve(
  process.cwd(),
  process.argv[2] ?? 'artifacts/manual-accessibility-evidence.json',
);
const evidence = JSON.parse(await readFile(evidencePath, 'utf8'));
const failures = [];
const requiredMobileChecks = [
  'requiredFormError',
  'dialogContextAndFocus',
  'nativeSelect',
  'toastAnnouncement',
];
const requiredManualChecks = [
  'zoom200Percent',
  'forcedColors',
  'reducedMotion',
  'touchTargets',
  'focusAppearance',
];
const placeholders =
  /^(exact-|what was checked|measurement and controls checked|controls and themes checked|40-character|release-candidate|YYYY)/i;

function requireText(value, label) {
  if (
    typeof value !== 'string' ||
    value.trim().length < 2 ||
    placeholders.test(value.trim())
  )
    failures.push(
      `${label} must contain exact observed evidence, not template text`,
    );
}

function requirePass(check, label) {
  if (check?.passed !== true)
    failures.push(`${label} must be explicitly passed`);
  requireText(check?.observation, `${label}.observation`);
}

if (evidence.schemaVersion !== 1) failures.push('schemaVersion must be 1');
if (!/^\d{4}-\d{2}-\d{2}$/.test(evidence.auditDate ?? ''))
  failures.push('auditDate must be YYYY-MM-DD');
if (!/^[0-9a-f]{40}$/i.test(evidence.commitSha ?? ''))
  failures.push('commitSha must be a full Git commit SHA');
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(evidence.packageVersion ?? ''))
  failures.push('packageVersion must be semantic');

const sessions = evidence.mobileScreenReaderSessions;
if (!Array.isArray(sessions) || sessions.length < 2)
  failures.push('at least two mobile screen-reader sessions are required');
for (const platform of ['android', 'ios']) {
  const session = sessions?.find(
    (candidate) => candidate.platform === platform,
  );
  if (!session) {
    failures.push(`${platform} screen-reader evidence is required`);
    continue;
  }
  if (session.physicalDevice !== true)
    failures.push(`${platform} session must use a physical device`);
  const expectedReader = platform === 'android' ? 'TalkBack' : 'VoiceOver';
  if (session.screenReader !== expectedReader)
    failures.push(`${platform} session must use ${expectedReader}`);
  for (const field of [
    'platformVersion',
    'screenReaderVersion',
    'browser',
    'browserVersion',
  ])
    requireText(session[field], `${platform}.${field}`);
  for (const check of requiredMobileChecks)
    requirePass(session.checks?.[check], `${platform}.${check}`);
}

for (const check of requiredManualChecks) {
  requirePass(evidence.manualChecks?.[check], `manualChecks.${check}`);
  requireText(
    evidence.manualChecks?.[check]?.platform,
    `manualChecks.${check}.platform`,
  );
}
if (!Array.isArray(evidence.issues)) failures.push('issues must be an array');
else if (evidence.issues.length)
  failures.push(
    'all recorded accessibility issues must be resolved before sign-off',
  );

if (failures.length)
  throw new Error(
    `Manual accessibility evidence is incomplete:\n${failures.join('\n')}`,
  );
process.stdout.write(
  `Validated Android, iOS, and ${requiredManualChecks.length} manual accessibility checks.\n`,
);
