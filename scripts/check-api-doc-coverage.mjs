import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const adapters = {
  react: { package: 'react', index: 'src/index.tsx' },
  vue: { package: 'vue', index: 'src/index.ts' },
  angular: { package: 'angular', index: 'src/index.ts' },
};
const failures = [];

for (const [framework, adapter] of Object.entries(adapters)) {
  const packageRoot = resolve(root, `packages/${adapter.package}`);
  const config = ts.readConfigFile(resolve(packageRoot, 'tsconfig.json'), ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, packageRoot);
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const checker = program.getTypeChecker();
  const index = program.getSourceFile(resolve(packageRoot, adapter.index));
  const moduleSymbol = index && checker.getSymbolAtLocation(index);
  if (!moduleSymbol) {
    failures.push(`${framework}: public entry module could not be analyzed`);
    continue;
  }

  const publicNames = new Set(checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.name));
  const documented = new Map();
  for (const component of registry.components) {
    const names = registry.symbols[framework]?.[component];
    if (!Array.isArray(names) || names.length === 0) {
      failures.push(`${framework}/${component}: no documented public symbols`);
      continue;
    }
    for (const name of names) {
      const owners = documented.get(name) ?? [];
      documented.set(name, [...owners, component]);
      if (!publicNames.has(name)) failures.push(`${framework}/${component}: ${name} is not publicly exported`);
    }
  }

  for (const name of [...publicNames].sort((a, b) => a.localeCompare(b, 'en'))) {
    if (!documented.has(name)) failures.push(`${framework}: public export ${name} is undocumented`);
  }
}

if (failures.length) {
  console.error(`API documentation coverage failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}

console.log(`Validated public API coverage for ${registry.components.length} components across React, Vue, and Angular.`);
