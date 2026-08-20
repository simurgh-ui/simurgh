import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const script = resolve(
  import.meta.dirname,
  'check-manual-accessibility-evidence.mjs',
);
const pass = (observation) => ({ passed: true, observation });
function evidence() {
  const checks = {
    requiredFormError: pass('Required state and linked error announced once.'),
    dialogContextAndFocus: pass(
      'Dialog title announced and trigger focus restored.',
    ),
    nativeSelect: pass('Label, selected value, and options announced.'),
    toastAnnouncement: pass(
      'Status message announced once without focus movement.',
    ),
  };
  return {
    schemaVersion: 1,
    auditDate: '2026-08-20',
    commitSha: '0123456789abcdef0123456789abcdef01234567',
    packageVersion: '1.0.0-beta.1',
    mobileScreenReaderSessions: [
      {
        platform: 'android',
        platformVersion: '16',
        physicalDevice: true,
        screenReader: 'TalkBack',
        screenReaderVersion: '16.1',
        browser: 'Chrome',
        browserVersion: '140',
        checks,
      },
      {
        platform: 'ios',
        platformVersion: '20.0',
        physicalDevice: true,
        screenReader: 'VoiceOver',
        screenReaderVersion: '20.0',
        browser: 'Safari',
        browserVersion: '20.0',
        checks,
      },
    ],
    manualChecks: {
      zoom200Percent: {
        ...pass(
          'Form, Dialog, Select, navigation, examples, and tables reflowed.',
        ),
        platform: 'Windows 11 Chrome 140',
      },
      forcedColors: {
        ...pass('Interactive states remained distinguishable.'),
        platform: 'Windows 11 Chrome 140',
      },
      reducedMotion: {
        ...pass('Transitions were removed without hiding state changes.'),
        platform: 'Android 16 Chrome 140',
      },
      touchTargets: {
        ...pass(
          'Representative controls measured at least 44 by 44 CSS pixels.',
        ),
        platform: 'Android physical phone',
      },
      focusAppearance: {
        ...pass('Focus remained visible in light, dark, and forced colors.'),
        platform: 'Windows 11 Chrome 140',
      },
    },
    issues: [],
  };
}

async function run(value) {
  const directory = await mkdtemp(resolve(tmpdir(), 'simurgh-a11y-evidence-'));
  const file = resolve(directory, 'evidence.json');
  await writeFile(file, JSON.stringify(value));
  return spawnSync(process.execPath, [script, file], { encoding: 'utf8' });
}

test('accepts complete representative evidence', async () => {
  const result = await run(evidence());
  assert.equal(result.status, 0, result.stderr);
});

test('rejects emulators and unresolved failures', async () => {
  const value = evidence();
  value.mobileScreenReaderSessions[0].physicalDevice = false;
  value.manualChecks.touchTargets.passed = false;
  value.issues.push('touch target too small');
  const result = await run(value);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /physical device/);
  assert.match(
    result.stderr,
    /all recorded accessibility issues must be resolved/,
  );
});
