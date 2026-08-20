import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const policy = JSON.parse(await readFile(resolve(root, 'stability-policy.json'), 'utf8'));
const guide = await readFile(
  resolve(root, 'apps/docs/src/content/docs/guides/versioning.mdx'),
  'utf8',
);
const failures = [];

if (policy.version !== 1) failures.push('policy version must be 1');
if (policy.publicApi?.minimumDeprecationNoticeDays < 90)
  failures.push('stable deprecations require at least 90 days of notice');
if (policy.publicApi?.minimumDeprecationMinorReleases < 1)
  failures.push('stable deprecations must span at least one minor release');
if (policy.publicApi?.supportedStableMinorLines < 2)
  failures.push('the latest two stable minor lines must be supported');
if (policy.publicApi?.securitySupportMonths < 6)
  failures.push('stable security support must last at least six months');
if (policy.prerelease?.breakingReleaseLevel !== 'minor')
  failures.push('pre-release breaking changes must use a minor release');

for (const surface of policy.experimentalSurfaces ?? []) {
  if (!guide.includes(`\`${surface}\``))
    failures.push(`versioning guide does not identify ${surface} as experimental`);
}
for (const phrase of ['90 calendar days', 'one published minor release', 'latest two minor lines']) {
  if (!guide.includes(phrase)) failures.push(`versioning guide is missing “${phrase}”`);
}

if (failures.length) throw new Error(`Invalid stability policy:\n${failures.join('\n')}`);
process.stdout.write(
  `Validated deprecation, support, breaking-change, and ${policy.experimentalSurfaces.length}-surface experimental policy.\n`,
);
