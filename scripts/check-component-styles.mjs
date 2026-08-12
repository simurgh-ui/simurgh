import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const stylesRoot = resolve(root, 'packages/styles');
const componentsRoot = resolve(stylesRoot, 'components');
const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const manifest = JSON.parse(
  await readFile(resolve(stylesRoot, 'package.json'), 'utf8'),
);

if (manifest.exports?.['./*.css'] !== './components/*.css') {
  throw new Error('The styles package must export component CSS subpaths.');
}
if (!manifest.files?.includes('components/*.css')) {
  throw new Error('The styles package must publish component CSS files.');
}

const expected = new Set(
  registry.components.map((component) => `${component}.css`),
);
const actual = new Set(
  (await readdir(componentsRoot)).filter((file) => file.endsWith('.css')),
);
const missing = [...expected].filter((file) => !actual.has(file));
const stale = [...actual].filter((file) => !expected.has(file));

if (missing.length) {
  throw new Error(`Missing component styles: ${missing.join(', ')}`);
}
if (stale.length) {
  throw new Error(`Unregistered component styles: ${stale.join(', ')}`);
}

for (const file of expected) {
  const path = resolve(componentsRoot, file);
  await access(path);
  const css = await readFile(path, 'utf8');
  if (!css.startsWith("@import '../tokens.css';")) {
    throw new Error(`${file} must import the shared design tokens.`);
  }
  if (css.includes("@import '../recipes.css';")) {
    throw new Error(`${file} imports the complete recipe catalog.`);
  }
}

console.log(`Verified ${expected.size} component-level CSS exports.`);
