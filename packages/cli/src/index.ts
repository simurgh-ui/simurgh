#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { manifest, registryEntry, type Framework } from '@simurgh-ui/registry';
import { cac } from 'cac';
import pc from 'picocolors';
import ts from 'typescript';

type Config = {
  schemaVersion: 1;
  framework: Framework;
  components: string;
  styles: string;
  registryVersion: string;
};
const CONFIG_SCHEMA_VERSION = 1 as const;
const GENERATED_SOURCE_SCHEMA_VERSION = 1 as const;
type OutputOptions = { dryRun?: boolean; json?: boolean };
const cwd = () => process.cwd();
const configPath = () => join(cwd(), 'simurgh.json');
function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}
function detectFramework(): Framework {
  const pkgPath = join(cwd(), 'package.json');
  if (!existsSync(pkgPath))
    throw new Error('No package.json found. Run this inside an application.');
  const pkg = readJson<{
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  }>(pkgPath);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps['@angular/core']) return 'angular';
  if (deps.vue) return 'vue';
  if (deps.react) return 'react';
  throw new Error('Could not detect Angular, React, or Vue. Pass --framework.');
}
function loadConfig(options: OutputOptions = {}): Config {
  if (!existsSync(configPath()))
    throw new Error('simurgh.json not found. Run `simurgh init` first.');
  const config = readJson<Partial<Config> & { schemaVersion?: unknown }>(
    configPath(),
  );
  if (config.schemaVersion === undefined) {
    const migrated = { schemaVersion: CONFIG_SCHEMA_VERSION, ...config };
    if (!options.dryRun)
      writeFileSync(configPath(), `${JSON.stringify(migrated, null, 2)}\n`);
    if (!options.json)
      console.log(
        pc.green(
          `${options.dryRun ? 'Would migrate' : 'Migrated'} simurgh.json from schema 0 to schema 1.`,
        ),
      );
    return migrated as Config;
  }
  if (config.schemaVersion !== CONFIG_SCHEMA_VERSION) {
    throw new Error(
      typeof config.schemaVersion === 'number' &&
        config.schemaVersion > CONFIG_SCHEMA_VERSION
        ? `simurgh.json uses schema ${config.schemaVersion}, but this CLI supports schema ${CONFIG_SCHEMA_VERSION}. Upgrade @simurgh-ui/cli before continuing.`
        : `Unsupported simurgh.json schema ${String(config.schemaVersion)}. Restore a schema 1 config or rerun \`simurgh init\` in a clean application and migrate your paths.`,
    );
  }
  if (
    !config.framework ||
    !(config.framework in manifest.frameworks) ||
    typeof config.components !== 'string' ||
    typeof config.styles !== 'string' ||
    typeof config.registryVersion !== 'string'
  ) {
    throw new Error(
      'Invalid simurgh.json schema 1 config. Expected framework, components, styles, and registryVersion. Run `simurgh init` in a clean application to generate a reference config, then migrate your reviewed paths.',
    );
  }
  return config as Config;
}
function assetRoot(): string {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
  if (existsSync(join(root, 'styles/tokens.css'))) return root;
  throw new Error(
    'The bundled registry assets are unavailable. Reinstall @simurgh-ui/cli.',
  );
}
function ensureParent(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}
function copy(path: string, target: string) {
  ensureParent(target);
  writeFileSync(target, readFileSync(path));
}
function recipeStyleTarget(config: Config, component: string) {
  return join(cwd(), config.styles, 'components', `${component}.css`);
}
function addRecipeImport(config: Config, component: string) {
  const path = join(cwd(), config.styles, 'recipes.css');
  const source = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const importPattern =
    /^@import ['"]\.\/components\/([^'"]+)\.css['"];\r?\n?/gmu;
  const components = new Set<string>([component]);
  for (const match of source.matchAll(importPattern)) {
    if (match[1]) components.add(match[1]);
  }
  const body = source.replace(importPattern, '').trimStart();
  const imports = [...components]
    .sort()
    .map((name) => `@import './components/${name}.css';`)
    .join('\n');
  writeFileSync(path, `${imports}\n\n${body}`.trimEnd() + '\n');
}
function installRecipeStyle(
  config: Config,
  component: string,
  overwrite = false,
) {
  const target = recipeStyleTarget(config, component);
  if (!existsSync(target) || overwrite) {
    copy(join(assetRoot(), 'styles/components', `${component}.css`), target);
  }
  addRecipeImport(config, component);
}
function installComponentSupport(
  config: Config,
  source: string,
  overwrite = false,
) {
  if (!source.includes('../internal/')) return;
  const extension = manifest.frameworks[config.framework].extension;
  const supportAssets = join(assetRoot(), config.framework);
  const supportTarget = resolve(cwd(), config.components, '..');
  for (const file of readdirSync(join(supportAssets, 'internal'))) {
    const target = join(supportTarget, 'internal', file);
    if (!existsSync(target) || overwrite) {
      copy(join(supportAssets, 'internal', file), target);
    }
  }
  const floating = `floating.${extension}`;
  if (
    existsSync(join(supportAssets, floating)) &&
    (!existsSync(join(supportTarget, floating)) || overwrite)
  ) {
    copy(join(supportAssets, floating), join(supportTarget, floating));
  }
}
function componentTarget(config: Config, component: string) {
  return join(
    cwd(),
    config.components,
    `${component}.${manifest.frameworks[config.framework].extension}`,
  );
}

function projectPaths(framework: Framework) {
  if (framework === 'angular')
    return {
      components: 'src/app/components/ui',
      styles: 'src/styles/simurgh',
    };
  const sourcePrefix = existsSync(join(cwd(), 'src')) ? 'src/' : '';
  return {
    components: `${sourcePrefix}components/ui`,
    styles: `${sourcePrefix}styles/simurgh`,
  };
}

function declarationNames(statement: ts.Statement): string[] {
  if (
    (ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement)) &&
    statement.name
  )
    return [statement.name.text];
  if (ts.isVariableStatement(statement))
    return statement.declarationList.declarations.flatMap((declaration) =>
      ts.isIdentifier(declaration.name) ? [declaration.name.text] : [],
    );
  return [];
}

export function extractComponentSource(
  source: string,
  symbols: readonly string[],
  filename = 'registry-source.ts',
): string {
  const sourceFile = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const declarations = new Map<string, ts.Statement>();
  for (const statement of sourceFile.statements)
    for (const name of declarationNames(statement))
      declarations.set(name, statement);
  const selected = new Set<ts.Statement>();
  const queue = [...symbols];
  const seen = new Set<string>();
  while (queue.length) {
    const name = queue.shift()!;
    if (seen.has(name)) continue;
    seen.add(name);
    const statement = declarations.get(name);
    if (!statement) continue;
    selected.add(statement);
    const visit = (node: ts.Node) => {
      if (
        ts.isIdentifier(node) &&
        declarations.has(node.text) &&
        !seen.has(node.text)
      )
        queue.push(node.text);
      ts.forEachChild(node, visit);
    };
    visit(statement);
  }
  const referenced = new Set<string>();
  for (const statement of selected) {
    const visit = (node: ts.Node) => {
      if (ts.isIdentifier(node)) referenced.add(node.text);
      ts.forEachChild(node, visit);
    };
    visit(statement);
  }
  for (const name of declarations.keys()) referenced.delete(name);

  // The bundled fallback source contains every framework component. Many of
  // those files import the same React/Vue/Angular bindings, so retaining every
  // import produces duplicate declarations in the generated component. Walk
  // backwards to keep one provider for each referenced imported binding.
  const claimedImports = new Set<string>();
  const imports: ts.ImportDeclaration[] = [];
  for (const statement of [...sourceFile.statements].reverse()) {
    if (!ts.isImportDeclaration(statement) || !statement.importClause) continue;
    const clause = statement.importClause;
    const defaultImport =
      clause.name &&
      referenced.has(clause.name.text) &&
      !claimedImports.has(clause.name.text)
        ? clause.name
        : undefined;
    if (defaultImport) claimedImports.add(defaultImport.text);

    let namedBindings: ts.NamedImportBindings | undefined;
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      const name = clause.namedBindings.name.text;
      if (referenced.has(name) && !claimedImports.has(name)) {
        namedBindings = clause.namedBindings;
        claimedImports.add(name);
      }
    } else if (clause.namedBindings) {
      const elements = clause.namedBindings.elements.filter((element) => {
        const name = element.name.text;
        if (!referenced.has(name) || claimedImports.has(name)) return false;
        claimedImports.add(name);
        return true;
      });
      if (elements.length)
        namedBindings = ts.factory.updateNamedImports(
          clause.namedBindings,
          elements,
        );
    }
    if (!defaultImport && !namedBindings) continue;
    imports.unshift(
      ts.factory.updateImportDeclaration(
        statement,
        statement.modifiers,
        ts.factory.updateImportClause(
          clause,
          clause.isTypeOnly,
          defaultImport,
          namedBindings,
        ),
        statement.moduleSpecifier,
        statement.attributes,
      ),
    );
  }

  const mergedImports: ts.ImportDeclaration[] = [];
  const namedImportGroups = new Map<
    string,
    { index: number; elements: ts.ImportSpecifier[] }
  >();
  for (const statement of imports) {
    const clause = statement.importClause!;
    if (
      clause.name ||
      !clause.namedBindings ||
      !ts.isNamedImports(clause.namedBindings)
    ) {
      mergedImports.push(statement);
      continue;
    }
    const moduleName = ts.isStringLiteral(statement.moduleSpecifier)
      ? statement.moduleSpecifier.text
      : statement.moduleSpecifier.getText(sourceFile);
    const normalizedElements = clause.namedBindings.elements.map((element) =>
      clause.isTypeOnly && !element.isTypeOnly
        ? ts.factory.updateImportSpecifier(
            element,
            true,
            element.propertyName,
            element.name,
          )
        : element,
    );
    const group = namedImportGroups.get(moduleName);
    if (group) {
      group.elements.push(...normalizedElements);
      continue;
    }
    const index = mergedImports.length;
    namedImportGroups.set(moduleName, { index, elements: normalizedElements });
    mergedImports.push(
      ts.factory.updateImportDeclaration(
        statement,
        statement.modifiers,
        ts.factory.updateImportClause(
          clause,
          false,
          undefined,
          ts.factory.updateNamedImports(
            clause.namedBindings,
            normalizedElements,
          ),
        ),
        statement.moduleSpecifier,
        statement.attributes,
      ),
    );
  }
  for (const { index, elements } of namedImportGroups.values()) {
    const statement = mergedImports[index]!;
    const clause = statement.importClause!;
    const bindings = clause.namedBindings as ts.NamedImports;
    mergedImports[index] = ts.factory.updateImportDeclaration(
      statement,
      statement.modifiers,
      ts.factory.updateImportClause(
        clause,
        false,
        undefined,
        ts.factory.updateNamedImports(bindings, elements),
      ),
      statement.moduleSpecifier,
      statement.attributes,
    );
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const body = [
    ...mergedImports.map((statement) =>
      printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile).trim(),
    ),
    ...sourceFile.statements
      .filter((statement) => selected.has(statement))
      .map((statement) =>
        source.slice(statement.getFullStart(), statement.getEnd()).trim(),
      ),
  ].join('\n\n');
  return `// Generated from Simurgh registry ${manifest.version}. This source is yours to edit.\n${body}\n`;
}

function expectedSource(config: Config, component: string): string {
  const entry = registryEntry(component, config.framework);
  const componentSource = join(
    assetRoot(),
    config.framework,
    `${component}.${entry.extension}`,
  );
  const sourcePath = existsSync(componentSource)
    ? componentSource
    : join(assetRoot(), `${config.framework}.${entry.extension}`);
  const source = extractComponentSource(
    readFileSync(sourcePath, 'utf8'),
    entry.symbols,
    sourcePath,
  );
  const metadata = JSON.stringify({
    schemaVersion: GENERATED_SOURCE_SCHEMA_VERSION,
    registryVersion: manifest.version,
    framework: config.framework,
    component,
  });
  return `// @simurgh-ui/generated ${metadata}\n${source}`;
}

function printDiffGuidance(config: Config, components: readonly string[]) {
  const names = components.join(' ');
  console.log('');
  console.log(pc.bold('Safe update guidance'));
  if (config.registryVersion !== manifest.version) {
    console.log(
      pc.yellow(
        `- This project records registry ${config.registryVersion}; the CLI bundles ${manifest.version}.`,
      ),
    );
  }
  console.log('- Commit or stash your current customizations before updating.');
  console.log(
    `- On a temporary branch, run \`simurgh add ${names} --overwrite\` to materialize the bundled source.`,
  );
  console.log(
    '- Review that branch\'s diff, then merge upstream fixes into your customized source instead of accepting the overwrite wholesale.',
  );
  console.log(
    '- Resolve conflicts in favor of required local behavior, retain relevant upstream accessibility and bug fixes, then run your tests.',
  );
  console.log(
    '- After adopting the registry update, update `registryVersion` in simurgh.json to the bundled version.',
  );
}

const cli = cac('simurgh');
cli
  .command('init', 'Initialize Simurgh in the current application')
  .option('--framework <framework>', 'react, vue, or angular')
  .option('--skip-install', 'Do not install runtime dependencies')
  .option('--dry-run', 'Show planned changes without writing or installing')
  .option('--json', 'Print one machine-readable JSON result')
  .action((options: { framework?: Framework; skipInstall?: boolean } & OutputOptions) => {
    if (existsSync(configPath()))
      throw new Error('simurgh.json already exists.');
    const framework = options.framework ?? detectFramework();
    if (!(framework in manifest.frameworks))
      throw new Error(`Unsupported framework: ${framework}`);
    const root = assetRoot();
    const paths = projectPaths(framework);
    const config: Config = {
      schemaVersion: CONFIG_SCHEMA_VERSION,
      framework,
      ...paths,
      registryVersion: manifest.version,
    };
    if (!options.dryRun) {
      writeFileSync(configPath(), `${JSON.stringify(config, null, 2)}\n`);
      mkdirSync(join(cwd(), config.styles), { recursive: true });
      copy(
        join(root, 'styles/tokens.css'),
        join(cwd(), config.styles, 'tokens.css'),
      );
      copy(
        join(root, 'styles/recipes.css'),
        join(cwd(), config.styles, 'recipes.css'),
      );
    }
    if (!options.skipInstall && !options.dryRun)
      execFileSync(
        'pnpm',
        ['add', ...manifest.frameworks[framework].dependencies],
        {
          cwd: cwd(),
          stdio: options.json ? 'ignore' : 'inherit',
          shell: process.platform === 'win32',
        },
      );
    if (options.json)
      console.log(
        JSON.stringify({
          command: 'init',
          dryRun: Boolean(options.dryRun),
          framework,
          config,
          installDependencies: !options.skipInstall,
        }),
      );
    else
      console.log(
        pc.green(
          `${options.dryRun ? 'Would initialize' : 'Initialized'} Simurgh for ${framework}.`,
        ),
      );
  });
cli
  .command('list', 'List registry components')
  .option('--dry-run', 'Do not make changes (list is always read-only)')
  .option('--json', 'Print one machine-readable JSON result')
  .action((options: OutputOptions) => {
    if (options.json)
      console.log(
        JSON.stringify({
          command: 'list',
          dryRun: Boolean(options.dryRun),
          registryVersion: manifest.version,
          components: manifest.components,
        }),
      );
    else
      for (const name of manifest.components)
        console.log(`${name.padEnd(16)} ${manifest.version}`);
  });
cli
  .command('add [...components]', 'Copy component source into the application')
  .option('--overwrite', 'Replace an existing generated catalog')
  .option('--dry-run', 'Show planned changes without writing files')
  .option('--json', 'Print one machine-readable JSON result')
  .action((components: string[], options: { overwrite?: boolean } & OutputOptions) => {
    const config = loadConfig(options);
    const selected = components.length ? components : manifest.components;
    const results = [];
    for (const name of selected) {
      registryEntry(name, config.framework);
      const target = componentTarget(config, name);
      const source = expectedSource(config, name);
      const exists = existsSync(target);
      const status = exists && !options.overwrite ? 'preserved' : exists ? 'overwritten' : 'added';
      results.push({ name, target: relative(cwd(), target), status });
      if (exists && !options.overwrite) {
        if (!options.json) console.log(
          pc.yellow(
            `${relative(cwd(), target)} already exists; preserved local source.`,
          ),
        );
      } else {
        if (!options.dryRun) {
          ensureParent(target);
          writeFileSync(target, source);
        }
        if (!options.json) console.log(pc.green(`${options.dryRun ? 'Would add' : 'Added'} ${name} to ${relative(cwd(), target)}.`));
      }
      if (!options.dryRun) {
        installComponentSupport(config, source, options.overwrite);
        installRecipeStyle(config, name, options.overwrite);
      }
    }
    if (options.json)
      console.log(JSON.stringify({ command: 'add', dryRun: Boolean(options.dryRun), framework: config.framework, registryVersion: manifest.version, components: results }));
  });
cli
  .command('diff [component]', 'Compare local source with the registry')
  .option('--dry-run', 'Do not migrate configuration while comparing')
  .option('--json', 'Print one machine-readable JSON result')
  .action((component: string | undefined, options: OutputOptions) => {
    const config = loadConfig(options);
    const selected = component
      ? [component]
      : manifest.components.filter((name) =>
          existsSync(componentTarget(config, name)),
        );
    if (!selected.length)
      throw new Error(
        'No generated Simurgh source found. Run `simurgh add` first.',
      );
    let differs = false;
    const changed: string[] = [];
    const results = [];
    for (const name of selected) {
      registryEntry(name, config.framework);
      const target = componentTarget(config, name);
      if (!existsSync(target)) {
        if (!options.json) console.log(pc.yellow(`${name}: not installed`));
        differs = true;
        changed.push(name);
        results.push({ name, status: 'not-installed' });
        continue;
      }
      const same =
        readFileSync(target, 'utf8') === expectedSource(config, name);
      differs ||= !same;
      if (!same) changed.push(name);
      results.push({ name, status: same ? 'matches' : 'differs' });
      if (!options.json) console.log(
        same
          ? pc.green(`${name}: matches the registry`)
          : pc.yellow(`${name}: differs; local customizations are preserved`),
      );
    }
    if (options.json)
      console.log(JSON.stringify({ command: 'diff', dryRun: Boolean(options.dryRun), framework: config.framework, registryVersion: manifest.version, differs, components: results }));
    else if (changed.length) printDiffGuidance(config, changed);
    process.exitCode = differs ? 1 : 0;
  });
cli.help();
cli.version('0.1.0');
try {
  cli.parse();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    process.argv.includes('--json')
      ? JSON.stringify({ command: process.argv[2] ?? null, error: message })
      : pc.red(message),
  );
  process.exitCode = 1;
}
