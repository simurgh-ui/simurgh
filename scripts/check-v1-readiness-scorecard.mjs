import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const path = resolve(
  root,
  'apps/docs/src/content/docs/guides/v1-readiness.mdx',
);
const source = await readFile(path, 'utf8');
const requiredDimensions = [
  'Architecture',
  'Framework parity',
  'Accessibility',
  'Compatibility',
  'Documentation',
  'Package integrity',
  'Governance',
  'Release automation',
];
const allowedStatuses = new Set(['Ready', 'In progress', 'Blocked']);
const rows = new Map(
  [...source.matchAll(/^\| ([^|]+) \| ([^|]+) \|/gmu)]
    .map((match) => [match[1].trim(), match[2].trim()])
    .filter(([dimension]) => requiredDimensions.includes(dimension)),
);
const failures = [];

for (const dimension of requiredDimensions) {
  const status = rows.get(dimension);
  if (!status) failures.push(`missing ${dimension} row`);
  else if (!allowedStatuses.has(status)) {
    failures.push(`${dimension} has unsupported status ${status}`);
  }
}

for (const heading of ['## Scorecard', '## Update policy']) {
  if (!source.includes(heading)) failures.push(`missing ${heading} section`);
}

if (failures.length > 0) {
  process.stderr.write(`V1 readiness scorecard check failed:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${requiredDimensions.length} V1 readiness dimensions and maintenance policy.\n`,
  );
}
