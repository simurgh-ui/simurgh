import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(root, 'packages/react/src');
const targetRoot = resolve(root, 'packages/preact/src');
const testSourceRoot = resolve(root, 'packages/react/test');
const testTargetRoot = resolve(root, 'packages/preact/test');
const banner = '// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.\n// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.\n';
const checkedBanner = '// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.\n';

function transform(source) {
  return source
    .replaceAll("'react-dom'", "'preact/compat'")
    .replaceAll('"react-dom"', '"preact/compat"')
    .replaceAll("'react'", "'preact/compat'")
    .replaceAll('"react"', '"preact/compat"')
    .replaceAll("'@simurgh-ui/motion/react'", "'@simurgh-ui/motion/preact'")
    .replaceAll('"@simurgh-ui/motion/react"', '"@simurgh-ui/motion/preact"');
}

function adaptComponent(source, path) {
  let output = transform(source);
  if (path === 'components/button.tsx') {
    output = output
      .replace('    disabled,\n    children,', '    disabled,\n    onClick,\n    children,')
      .replace('      data-icon-only={iconOnly || undefined}\n      {...props}', '      data-icon-only={iconOnly || undefined}\n      onClick={disabled || loading ? undefined : onClick}\n      {...props}');
  }
  if (path === 'components/file-upload.tsx') {
    output = output.replace(
      '        onChange={(event) =>\n          update(Array.from(event.currentTarget.files ?? []))\n        }',
      '        onInput={(event) => update(Array.from(event.currentTarget.files ?? []))}\n        onChange={(event) => update(Array.from(event.currentTarget.files ?? []))}',
    );
  }
  if (path === 'components/form.tsx') {
    output = output.replace('      onInvalid={(event) => {', '      onInvalidCapture={(event) => {');
  }
  if (path === 'internal/floating.tsx') {
    output = output
      .replace('      onFocus: interactive', '      onFocusCapture: interactive')
      .replace('      onBlur: interactive', '      onBlurCapture: interactive');
  }
  return output;
}

function transformTest(source) {
  return transform(source)
    .replaceAll("'@testing-library/react'", "'@testing-library/preact'")
    .replaceAll('"@testing-library/react"', '"@testing-library/preact"')
    .replaceAll("'react-dom/server'", "'preact-render-to-string'")
    .replaceAll('"react-dom/server"', '"preact-render-to-string"')
    .replaceAll('React positioned', 'Preact positioned');
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(path));
    else if (/\.(?:ts|tsx)$/u.test(entry.name)) files.push(path);
  }
  return files;
}

for (const sourcePath of await sourceFiles(sourceRoot)) {
  const relativePath = relative(sourceRoot, sourcePath).replaceAll('\\', '/');
  const targetPath = resolve(targetRoot, relativePath);
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${banner}${adaptComponent(await readFile(sourcePath, 'utf8'), relativePath)}`);
}

for (const sourcePath of await sourceFiles(testSourceRoot)) {
  if (sourcePath.endsWith('overlay-hydration.test.tsx')) continue;
  const targetPath = resolve(testTargetRoot, relative(testSourceRoot, sourcePath));
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, transformTest(await readFile(sourcePath, 'utf8')));
}

const motionSource = resolve(root, 'packages/motion/src/react.tsx');
const motionTarget = resolve(root, 'packages/motion/src/preact.tsx');
await writeFile(motionTarget, `${checkedBanner}${transform(await readFile(motionSource, 'utf8'))}`);
