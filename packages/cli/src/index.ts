#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { manifest, registryEntry, type Framework } from '@simurgh-ui/registry';
import { cac } from 'cac';
import pc from 'picocolors';

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
function workspaceRoot(): string {
  const fromDist = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
  if (existsSync(join(fromDist, 'packages/registry/registry.json'))) return fromDist;
  throw new Error('The development registry source is unavailable. Configure the hosted registry before publishing the CLI.');
}
function ensureParent(path: string) { mkdirSync(dirname(path), { recursive: true }); }
function copy(path: string, target: string) { ensureParent(target); writeFileSync(target, readFileSync(path)); }
function componentTarget(config: Config) { return join(cwd(), config.components, `simurgh.${manifest.frameworks[config.framework].extension}`); }

const cli = cac('simurgh');
cli.command('init', 'Initialize Simurgh in the current application').option('--framework <framework>', 'react, vue, or angular').option('--skip-install', 'Do not install runtime dependencies').action((options: { framework?: Framework; skipInstall?: boolean }) => {
  if (existsSync(configPath())) throw new Error('simurgh.json already exists.');
  const framework = options.framework ?? detectFramework(); if (!(framework in manifest.frameworks)) throw new Error(`Unsupported framework: ${framework}`);
  const config: Config = { framework, components: framework === 'angular' ? 'src/app/components/ui' : 'src/components/ui', styles: 'src/styles/simurgh', registryVersion: manifest.version };
  writeFileSync(configPath(), `${JSON.stringify(config, null, 2)}\n`);
  const root = workspaceRoot(); mkdirSync(join(cwd(), config.styles), { recursive: true });
  copy(join(root, 'packages/styles/tokens.css'), join(cwd(), config.styles, 'tokens.css')); copy(join(root, 'packages/styles/recipes.css'), join(cwd(), config.styles, 'recipes.css'));
  if (!options.skipInstall) execFileSync('pnpm', ['add', ...manifest.frameworks[framework].dependencies], { cwd: cwd(), stdio: 'inherit', shell: process.platform === 'win32' });
  console.log(pc.green(`Initialized Simurgh for ${framework}.`));
});
cli.command('list', 'List registry components').action(() => { for (const name of manifest.components) console.log(`${name.padEnd(16)} ${manifest.version}`); });
cli.command('add [...components]', 'Copy component source into the application').option('--overwrite', 'Replace an existing generated catalog').action((components: string[], options: { overwrite?: boolean }) => {
  const config = loadConfig(); const selected = components.length ? components : manifest.components;
  selected.forEach(name => registryEntry(name, config.framework));
  const target = componentTarget(config); if (existsSync(target) && !options.overwrite) { console.log(pc.yellow(`${relative(cwd(), target)} already exists; no files changed. Use --overwrite.`)); return; }
  const source = join(workspaceRoot(), manifest.frameworks[config.framework].source); copy(source, target);
  console.log(pc.green(`Added ${selected.join(', ')} to ${relative(cwd(), target)}.`));
});
cli.command('diff [component]', 'Compare local source with the registry').action((component?: string) => {
  const config = loadConfig(); if (component) registryEntry(component, config.framework); const target = componentTarget(config);
  if (!existsSync(target)) throw new Error('No generated Simurgh source found. Run `simurgh add` first.');
  const source = join(workspaceRoot(), manifest.frameworks[config.framework].source); const same = readFileSync(source, 'utf8') === readFileSync(target, 'utf8');
  console.log(same ? pc.green('Local source matches the registry.') : pc.yellow('Local source differs from the registry. Your customizations are preserved.'));
  process.exitCode = same ? 0 : 1;
});
cli.help(); cli.version('0.1.0');
try { cli.parse(); } catch (error) { console.error(pc.red(error instanceof Error ? error.message : String(error))); process.exitCode = 1; }
