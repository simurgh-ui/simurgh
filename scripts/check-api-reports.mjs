import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const reportRoot = resolve(root, 'artifacts/api-reports');
const codePackages = [
  'angular',
  'core',
  'icons',
  'motion',
  'react',
  'registry',
  'vue',
];
const failures = [];

function resolvedSymbol(checker, symbol) {
  return symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;
}

function typeTarget(value) {
  if (typeof value === 'string') return value.endsWith('.d.ts') ? value : null;
  return value && typeof value === 'object' ? value.types ?? null : null;
}

async function sourceEntries(packageRoot, exports) {
  const entries = [];
  for (const [subpath, value] of Object.entries(exports ?? {})) {
    const target = typeTarget(value);
    if (!target) continue;
    const relative = target.replace(/^\.\/dist\//u, '');
    if (relative.includes('*')) {
      const sourceDirectory = resolve(packageRoot, 'src', dirname(relative));
      const suffix = basename(relative).replace('*', '').replace(/\.d\.ts$/u, '');
      for (const name of (await readdir(sourceDirectory)).sort()) {
        if (!/\.(?:ts|tsx)$/u.test(name) || name.endsWith('.d.ts')) continue;
        const stem = name.replace(/\.(?:ts|tsx)$/u, '');
        if (suffix && !stem.endsWith(suffix)) continue;
        entries.push({
          subpath: subpath.replace('*', stem),
          path: resolve(sourceDirectory, name),
        });
      }
      continue;
    }
    const stem = relative.replace(/\.d\.ts$/u, '');
    const candidates = [`${stem}.ts`, `${stem}.tsx`];
    const path = candidates
      .map((candidate) => resolve(packageRoot, 'src', candidate))
      .find((candidate) => ts.sys.fileExists(candidate));
    if (!path) throw new Error(`No source entry found for ${subpath} -> ${target}.`);
    entries.push({ subpath, path });
  }
  return entries;
}

function publicSignature(checker, exported) {
  const symbol = resolvedSymbol(checker, exported);
  const declaration =
    symbol.valueDeclaration ?? symbol.declarations?.[0] ?? exported.declarations?.[0];
  if (!declaration) return 'type-only';
  if (!symbol.valueDeclaration) {
    return declaration.getText().replace(/^export\s+/u, '').replace(/\s+/gu, ' ');
  }
  return checker.typeToString(
    checker.getTypeOfSymbolAtLocation(symbol, declaration),
    declaration,
    ts.TypeFormatFlags.NoTruncation |
      ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
  );
}

async function reportPackage(directory) {
  const packageRoot = resolve(root, 'packages', directory);
  const config = ts.readConfigFile(
    resolve(packageRoot, 'tsconfig.json'),
    ts.sys.readFile,
  );
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    packageRoot,
    { noEmit: true },
  );
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const checker = program.getTypeChecker();
  const manifest = JSON.parse(
    await readFile(resolve(packageRoot, 'package.json'), 'utf8'),
  );
  const entries = await sourceEntries(packageRoot, manifest.exports);
  const lines = [
    `# ${manifest.name} public API`,
    '',
    `Version snapshot: ${manifest.version}`,
    '',
  ];
  lines.push('## Export map', '', '```json', JSON.stringify(manifest.exports, null, 2), '```', '');
  for (const { subpath, path } of entries) {
    const entry = program.getSourceFile(path);
    if (!entry)
      throw new Error(`${manifest.name} TypeScript program is missing ${path}.`);
    const module = checker.getSymbolAtLocation(entry);
    const exports = checker
      .getExportsOfModule(module)
      .sort((a, b) => a.name.localeCompare(b.name));
    lines.push(`## ${subpath}`, '');
    for (const exported of exports) {
      const type = publicSignature(checker, exported);
      lines.push(`- \`${exported.name}\`: \`${type.replaceAll('`', '\\`')}\``);
    }
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

async function verify(path, expected) {
  if (process.argv.includes('--update')) {
    await mkdir(reportRoot, { recursive: true });
    await writeFile(path, expected);
    return;
  }
  let actual = '';
  try {
    actual = await readFile(path, 'utf8');
  } catch {}
  if (actual !== expected) failures.push(path.slice(root.length + 1));
}

for (const directory of codePackages) {
  await verify(
    resolve(reportRoot, `${directory}.api.md`),
    await reportPackage(directory),
  );
}

for (const directory of ['cli', 'styles']) {
  const manifest = JSON.parse(
    await readFile(
      resolve(root, 'packages', directory, 'package.json'),
      'utf8',
    ),
  );
  const surface = {
    name: manifest.name,
    version: manifest.version,
    ...(manifest.bin ? { bin: manifest.bin } : {}),
    ...(manifest.exports ? { exports: manifest.exports } : {}),
  };
  await verify(
    resolve(reportRoot, `${directory}.api.md`),
    `# ${manifest.name} public API\n\n\`\`\`json\n${JSON.stringify(surface, null, 2)}\n\`\`\`\n`,
  );
}

const registry = JSON.parse(
  await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'),
);
const parity = [
  '# Framework public API parity',
  '',
  '| Component | React | Vue | Angular |',
  '| --- | --- | --- | --- |',
  ...registry.components.map(
    (component) =>
      `| ${component} | ${(registry.symbols.react[component] ?? []).join(', ')} | ${(registry.symbols.vue[component] ?? []).join(', ')} | ${(registry.symbols.angular[component] ?? []).join(', ')} |`,
  ),
  '',
].join('\n');
await verify(resolve(reportRoot, 'framework-parity.api.md'), parity);

if (failures.length) {
  throw new Error(
    `Public API reports changed; regenerate and review:\n${failures.join('\n')}`,
  );
}
process.stdout.write(
  `${process.argv.includes('--update') ? 'Updated' : 'Validated'} ${codePackages.length + 3} public API reports.\n`,
);
