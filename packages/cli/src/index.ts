#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { manifest, registryEntry, type Framework } from '@simurgh-ui/registry';
import { cac } from 'cac';
import pc from 'picocolors';
import ts from 'typescript';

type Config = { framework: Framework; components: string; styles: string; registryVersion: string };
const cwd = () => process.cwd();
const configPath = () => join(cwd(), 'simurgh.json');
function readJson<T>(path: string): T { return JSON.parse(readFileSync(path, 'utf8')) as T; }
function detectFramework(): Framework {
  const pkgPath = join(cwd(), 'package.json'); if (!existsSync(pkgPath)) throw new Error('No package.json found. Run this inside an application.');
  const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(pkgPath); const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps['@angular/core']) return 'angular'; if (deps.vue) return 'vue'; if (deps.react) return 'react';
  throw new Error('Could not detect Angular, React, or Vue. Pass --framework.');
}
function loadConfig(): Config { if (!existsSync(configPath())) throw new Error('simurgh.json not found. Run `simurgh init` first.'); return readJson<Config>(configPath()); }
function assetRoot(): string {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
  if (existsSync(join(root, 'styles/tokens.css'))) return root;
  throw new Error('The bundled registry assets are unavailable. Reinstall @simurgh-ui/cli.');
}
function ensureParent(path: string) { mkdirSync(dirname(path), { recursive: true }); }
function copy(path: string, target: string) { ensureParent(target); writeFileSync(target, readFileSync(path)); }
function componentTarget(config: Config, component: string) { return join(cwd(), config.components, `${component}.${manifest.frameworks[config.framework].extension}`); }

function declarationNames(statement: ts.Statement): string[] {
  if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isEnumDeclaration(statement)) && statement.name) return [statement.name.text];
  if (ts.isVariableStatement(statement)) return statement.declarationList.declarations.flatMap((declaration) => ts.isIdentifier(declaration.name) ? [declaration.name.text] : []);
  return [];
}

export function extractComponentSource(source: string, symbols: readonly string[], filename = 'registry-source.ts'): string {
  const sourceFile = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, filename.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const declarations = new Map<string, ts.Statement>();
  for (const statement of sourceFile.statements) for (const name of declarationNames(statement)) declarations.set(name, statement);
  const selected = new Set<ts.Statement>(); const queue = [...symbols]; const seen = new Set<string>();
  while (queue.length) {
    const name = queue.shift()!; if (seen.has(name)) continue; seen.add(name);
    const statement = declarations.get(name); if (!statement) continue; selected.add(statement);
    const visit = (node: ts.Node) => { if (ts.isIdentifier(node) && declarations.has(node.text) && !seen.has(node.text)) queue.push(node.text); ts.forEachChild(node, visit); };
    visit(statement);
  }
  const statements = sourceFile.statements.filter((statement) => ts.isImportDeclaration(statement) || selected.has(statement));
  const body = statements.map((statement) => source.slice(statement.getFullStart(), statement.getEnd()).trim()).join('\n\n');
  return `// Generated from Simurgh registry ${manifest.version}. This source is yours to edit.\n${body}\n`;
}

function expectedSource(config: Config, component: string): string {
  const entry = registryEntry(component, config.framework); const sourcePath = join(assetRoot(), `${config.framework}.${entry.extension}`);
  return extractComponentSource(readFileSync(sourcePath, 'utf8'), entry.symbols, sourcePath);
}

const cli = cac('simurgh');
cli.command('init', 'Initialize Simurgh in the current application').option('--framework <framework>', 'react, vue, or angular').option('--skip-install', 'Do not install runtime dependencies').action((options: { framework?: Framework; skipInstall?: boolean }) => {
  if (existsSync(configPath())) throw new Error('simurgh.json already exists.');
  const framework = options.framework ?? detectFramework(); if (!(framework in manifest.frameworks)) throw new Error(`Unsupported framework: ${framework}`);
  const root = assetRoot();
  const config: Config = { framework, components: framework === 'angular' ? 'src/app/components/ui' : 'src/components/ui', styles: 'src/styles/simurgh', registryVersion: manifest.version };
  writeFileSync(configPath(), `${JSON.stringify(config, null, 2)}\n`);
  mkdirSync(join(cwd(), config.styles), { recursive: true });
  copy(join(root, 'styles/tokens.css'), join(cwd(), config.styles, 'tokens.css')); copy(join(root, 'styles/recipes.css'), join(cwd(), config.styles, 'recipes.css'));
  if (!options.skipInstall) execFileSync('pnpm', ['add', ...manifest.frameworks[framework].dependencies], { cwd: cwd(), stdio: 'inherit', shell: process.platform === 'win32' });
  console.log(pc.green(`Initialized Simurgh for ${framework}.`));
});
cli.command('list', 'List registry components').action(() => { for (const name of manifest.components) console.log(`${name.padEnd(16)} ${manifest.version}`); });
cli.command('add [...components]', 'Copy component source into the application').option('--overwrite', 'Replace an existing generated catalog').action((components: string[], options: { overwrite?: boolean }) => {
  const config = loadConfig(); const selected = components.length ? components : manifest.components;
  for (const name of selected) {
    registryEntry(name, config.framework); const target = componentTarget(config, name);
    if (existsSync(target) && !options.overwrite) { console.log(pc.yellow(`${relative(cwd(), target)} already exists; preserved local source.`)); continue; }
    ensureParent(target); writeFileSync(target, expectedSource(config, name));
    console.log(pc.green(`Added ${name} to ${relative(cwd(), target)}.`));
  }
});
cli.command('diff [component]', 'Compare local source with the registry').action((component?: string) => {
  const config = loadConfig(); const selected = component ? [component] : manifest.components.filter((name) => existsSync(componentTarget(config, name)));
  if (!selected.length) throw new Error('No generated Simurgh source found. Run `simurgh add` first.');
  let differs = false;
  for (const name of selected) {
    registryEntry(name, config.framework); const target = componentTarget(config, name);
    if (!existsSync(target)) { console.log(pc.yellow(`${name}: not installed`)); differs = true; continue; }
    const same = readFileSync(target, 'utf8') === expectedSource(config, name); differs ||= !same;
    console.log(same ? pc.green(`${name}: matches the registry`) : pc.yellow(`${name}: differs; local customizations are preserved`));
  }
  process.exitCode = differs ? 1 : 0;
});
cli.help(); cli.version('0.1.0');
try { cli.parse(); } catch (error) { console.error(pc.red(error instanceof Error ? error.message : String(error))); process.exitCode = 1; }
