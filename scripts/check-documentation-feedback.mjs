import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const footer = await readFile(
  resolve(root, 'apps/docs/src/components/DocumentationFooter.astro'),
  'utf8',
);
const config = await readFile(resolve(root, 'apps/docs/astro.config.mjs'), 'utf8');
const failures = [];

if (!config.includes("Footer: './src/components/DocumentationFooter.astro'")) {
  failures.push('Starlight must use the documentation feedback footer');
}

for (const framework of ['React', 'Vue', 'Angular']) {
  if (!footer.includes(`['${framework}',`)) {
    failures.push(`missing ${framework} feedback link`);
  }
}

for (const field of [
  'Component:',
  'Framework:',
  'Adapter version:',
  'Registry version:',
  'Documentation:',
  'What was unclear or incorrect?',
  'What did you expect?',
  'Minimal reproduction or relevant code',
]) {
  if (!footer.includes(field)) failures.push(`missing issue context field: ${field}`);
}

if (!footer.includes("labels: 'documentation'")) {
  failures.push('feedback issues must carry the documentation label');
}

if (failures.length > 0) {
  process.stderr.write(`Documentation feedback check failed:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    'Validated component, framework, version, URL, and reproduction context for documentation feedback.\n',
  );
}
