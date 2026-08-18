#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { manifest, registryEntry, type Framework } from '@simurgh-ui/registry';
import { cac } from 'cac';
import pc from 'picocolors';
import ts from 'typescript';

type Config = {
  framework: Framework;
  components: string;
  styles: string;
  registryVersion: string;
};
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
function loadConfig(): Config {
  if (!existsSync(configPath()))
    throw new Error('simurgh.json not found. Run `simurgh init` first.');
  return readJson<Config>(configPath());
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
  return extractComponentSource(
    readFileSync(sourcePath, 'utf8'),
    entry.symbols,
    sourcePath,
  );
}

const cli = cac('simurgh');
cli
  .command('init', 'Initialize Simurgh in the current application')
  .option('--framework <framework>', 'react, vue, or angular')
  .option('--skip-install', 'Do not install runtime dependencies')
  .action((options: { framework?: Framework; skipInstall?: boolean }) => {
    if (existsSync(configPath()))
      throw new Error('simurgh.json already exists.');
    const framework = options.framework ?? detectFramework();
    if (!(framework in manifest.frameworks))
      throw new Error(`Unsupported framework: ${framework}`);
    const root = assetRoot();
    const paths = projectPaths(framework);
    const config: Config = {
      framework,
      ...paths,
      registryVersion: manifest.version,
    };
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
    if (!options.skipInstall)
      execFileSync(
        'pnpm',
        ['add', ...manifest.frameworks[framework].dependencies],
        { cwd: cwd(), stdio: 'inherit', shell: process.platform === 'win32' },
      );
    console.log(pc.green(`Initialized Simurgh for ${framework}.`));
  });
cli.command('list', 'List registry components').action(() => {
  for (const name of manifest.components)
    console.log(`${name.padEnd(16)} ${manifest.version}`);
});
cli
  .command('add [...components]', 'Copy component source into the application')
  .option('--overwrite', 'Replace an existing generated catalog')
  .action((components: string[], options: { overwrite?: boolean }) => {
    const config = loadConfig();
    const selected = components.length ? components : manifest.components;
    for (const name of selected) {
      registryEntry(name, config.framework);
      const target = componentTarget(config, name);
      if (existsSync(target) && !options.overwrite) {
        console.log(
          pc.yellow(
            `${relative(cwd(), target)} already exists; preserved local source.`,
          ),
        );
      } else {
        ensureParent(target);
        writeFileSync(target, expectedSource(config, name));
        console.log(pc.green(`Added ${name} to ${relative(cwd(), target)}.`));
      }
      installRecipeStyle(config, name, options.overwrite);
    }
  });
cli
  .command('diff [component]', 'Compare local source with the registry')
  .action((component?: string) => {
    const config = loadConfig();
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
    for (const name of selected) {
      registryEntry(name, config.framework);
      const target = componentTarget(config, name);
      if (!existsSync(target)) {
        console.log(pc.yellow(`${name}: not installed`));
        differs = true;
        continue;
      }
      const same =
        readFileSync(target, 'utf8') === expectedSource(config, name);
      differs ||= !same;
      console.log(
        same
          ? pc.green(`${name}: matches the registry`)
          : pc.yellow(`${name}: differs; local customizations are preserved`),
      );
    }
    process.exitCode = differs ? 1 : 0;
  });
cli.help();
cli.version('0.1.0');
try {
  cli.parse();
} catch (error) {
  console.error(pc.red(error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
}
