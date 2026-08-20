import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const policy = JSON.parse(
  await readFile(resolve(root, 'research/icon-evidence-policy.json'), 'utf8'),
);
const template = JSON.parse(
  await readFile(resolve(root, 'research/icon-study-session.template.json'), 'utf8'),
);
const guide = await readFile(
  resolve(root, 'apps/docs/src/content/docs/icons/research-evidence.mdx'),
  'utf8',
);
const failures = [];
if (policy.productTelemetryEnabled !== false)
  failures.push('product icon telemetry must remain disabled');
if (!policy.consentRequired) failures.push('study consent must be required');
if (policy.rawDataRetentionDays > 30)
  failures.push('raw session retention may not exceed 30 days');
if (policy.minimumPublishedCohortSize < 5)
  failures.push('published cohorts must contain at least five sessions');
if (template.policyVersion !== policy.version)
  failures.push('session template policy version is stale');
if (template.sessionCode !== 'random-code-created-for-this-session')
  failures.push('session template must use a random, study-only identifier');
for (const field of policy.prohibitedFields) {
  if (!guide.includes(`\`${field}\``))
    failures.push(`guide does not identify prohibited field ${field}`);
}
for (const metric of policy.metrics) {
  if (!guide.includes(`\`${metric}\``))
    failures.push(`guide does not define metric ${metric}`);
}
if (failures.length)
  throw new Error(`Invalid icon evidence policy:\n${failures.join('\n')}`);
process.stdout.write(
  `Validated privacy-preserving icon evidence protocol with ${policy.metrics.length} structured metrics.\n`,
);
