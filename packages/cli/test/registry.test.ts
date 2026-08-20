import { describe, expect, it } from 'vitest';
import { manifest, registryEntry } from '@simurgh-ui/registry';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rmSync } from 'node:fs';
describe('registry', () => {
  it('contains the component catalog for every framework', () => {
    expect(manifest.components.length).toBeGreaterThan(0);
    expect(new Set(manifest.components).size).toBe(manifest.components.length);
    for (const framework of ['react', 'vue', 'angular'] as const) {
      expect(registryEntry('dialog', framework).framework).toBe(framework);
      expect(
        registryEntry('radio-group', framework).symbols.length,
      ).toBeGreaterThan(1);
      expect(
        registryEntry('combobox', framework).symbols.length,
      ).toBeGreaterThan(1);
      expect(registryEntry('menubar', framework).symbols.length).toBe(2);
      expect(
        registryEntry('hover-card', framework).symbols.length,
      ).toBeGreaterThan(0);
      expect(
        registryEntry('context-menu', framework).symbols.length,
      ).toBeGreaterThan(1);
      expect(registryEntry('sheet', framework).symbols.length).toBeGreaterThan(
        1,
      );
      expect(
        registryEntry('alert-dialog', framework).symbols.length,
      ).toBeGreaterThan(2);
      expect(registryEntry('form', framework).symbols.length).toBe(2);
      expect(registryEntry('native-select', framework).symbols.length).toBe(1);
      expect(registryEntry('button-group', framework).symbols.length).toBe(3);
      expect(registryEntry('input-group', framework).symbols.length).toBe(3);
      expect(registryEntry('empty', framework).symbols.length).toBe(6);
      expect(registryEntry('input-otp', framework).symbols.length).toBe(1);
      expect(registryEntry('item', framework).symbols.length).toBe(7);
      expect(registryEntry('command', framework).symbols.length).toBe(1);
      expect(
        registryEntry('calendar', framework).symbols.length,
      ).toBeGreaterThan(0);
      expect(
        registryEntry('date-picker', framework).symbols.length,
      ).toBeGreaterThan(0);
      expect(registryEntry('carousel', framework).symbols.length).toBe(5);
      expect(registryEntry('resizable', framework).symbols.length).toBe(3);
      expect(registryEntry('sidebar', framework).symbols.length).toBe(8);
      expect(registryEntry('tree', framework).symbols.length).toBe(2);
      expect(registryEntry('file-upload', framework).symbols.length).toBe(1);
      expect(registryEntry('password-input', framework).symbols.length).toBe(1);
      expect(registryEntry('drawer', framework).symbols.length).toBeGreaterThan(
        0,
      );
    }
  });
});

describe('CLI application fixture', () => {
  it('migrates legacy configs and rejects newer schemas with upgrade guidance', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'simurgh-schema-'));
    const cli = fileURLToPath(new URL('../dist/index.js', import.meta.url));
    const configPath = join(fixture, 'simurgh.json');
    const legacyConfig = {
      framework: 'react',
      components: 'src/components/ui',
      styles: 'src/styles/simurgh',
      registryVersion: manifest.version,
    };
    try {
      writeFileSync(configPath, `${JSON.stringify(legacyConfig, null, 2)}\n`);
      const migrated = spawnSync(process.execPath, [cli, 'diff'], {
        cwd: fixture,
        encoding: 'utf8',
      });
      expect(migrated.stdout).toContain(
        'Migrated simurgh.json from schema 0 to schema 1.',
      );
      expect(JSON.parse(readFileSync(configPath, 'utf8')).schemaVersion).toBe(
        1,
      );

      writeFileSync(
        configPath,
        `${JSON.stringify({ ...legacyConfig, schemaVersion: 2 }, null, 2)}\n`,
      );
      const future = spawnSync(process.execPath, [cli, 'diff'], {
        cwd: fixture,
        encoding: 'utf8',
      });
      expect(future.status).toBe(1);
      expect(future.stderr).toContain(
        'Upgrade @simurgh-ui/cli before continuing.',
      );

      writeFileSync(
        configPath,
        `${JSON.stringify({ schemaVersion: 1, framework: 'react' }, null, 2)}\n`,
      );
      const invalid = spawnSync(process.execPath, [cli, 'diff'], {
        cwd: fixture,
        encoding: 'utf8',
      });
      expect(invalid.status).toBe(1);
      expect(invalid.stderr).toContain(
        'Invalid simurgh.json schema 1 config.',
      );
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  });

  it.each([
    ['react', 'react', 'src/components/ui/button.tsx', 'export const Button'],
    ['vue', 'vue', 'src/components/ui/button.ts', 'export const Button'],
    [
      'angular',
      '@angular/core',
      'src/app/components/ui/button.ts',
      'export class ButtonComponent',
    ],
  ] as const)(
    'initializes a fresh %s source-copy quick start',
    (framework, dependency, componentPath, expectedExport) => {
      const fixture = mkdtempSync(join(tmpdir(), `simurgh-${framework}-`));
      const cli = fileURLToPath(new URL('../dist/index.js', import.meta.url));
      try {
        mkdirSync(join(fixture, 'src'));
        writeFileSync(
          join(fixture, 'package.json'),
          JSON.stringify({
            name: `${framework}-quick-start`,
            private: true,
            dependencies: { [dependency]: '*' },
          }),
        );
        execFileSync(
          process.execPath,
          [cli, 'init', '--framework', framework, '--skip-install'],
          { cwd: fixture },
        );
        execFileSync(process.execPath, [cli, 'add', 'button'], {
          cwd: fixture,
        });

        const config = JSON.parse(
          readFileSync(join(fixture, 'simurgh.json'), 'utf8'),
        ) as { schemaVersion: number; framework: string };
        expect(config.schemaVersion).toBe(1);
        expect(config.framework).toBe(framework);
        expect(readFileSync(join(fixture, componentPath), 'utf8')).toContain(
          expectedExport,
        );
        const generatedSource = readFileSync(
          join(fixture, componentPath),
          'utf8',
        );
        expect(generatedSource).toContain(
          `// @simurgh-ui/generated {"schemaVersion":1,"registryVersion":"${manifest.version}","framework":"${framework}","component":"button"}`,
        );
        const importedModules = [
          ...generatedSource.matchAll(/\bfrom\s+['"]([^'"]+)['"]/gu),
        ].map((match) => match[1]);
        expect(new Set(importedModules).size).toBe(importedModules.length);
        expect(existsSync(join(fixture, 'src/styles/simurgh/tokens.css'))).toBe(
          true,
        );
        expect(
          existsSync(join(fixture, 'src/styles/simurgh/recipes.css')),
        ).toBe(true);
        expect(
          existsSync(join(fixture, 'src/styles/simurgh/components/button.css')),
        ).toBe(true);
        const recipes = readFileSync(
          join(fixture, 'src/styles/simurgh/recipes.css'),
          'utf8',
        );
        expect(recipes).toContain("@import './components/button.css';");
        expect(recipes).not.toContain('./components/dialog.css');
      } finally {
        rmSync(fixture, { recursive: true, force: true });
      }
    },
  );

  it('initializes, adds idempotently, and detects local changes', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'simurgh-cli-'));
    const cli = fileURLToPath(new URL('../dist/index.js', import.meta.url));
    try {
      writeFileSync(
        join(fixture, 'package.json'),
        JSON.stringify({
          name: 'fixture',
          private: true,
          dependencies: { react: '^19.0.0' },
        }),
      );
      mkdirSync(join(fixture, 'src'));
      execFileSync(
        process.execPath,
        [cli, 'init', '--framework', 'react', '--skip-install'],
        { cwd: fixture },
      );
      execFileSync(process.execPath, [cli, 'add', 'dialog'], { cwd: fixture });
      const generated = join(fixture, 'src/components/ui/dialog.tsx');
      const dialogStyle = join(
        fixture,
        'src/styles/simurgh/components/dialog.css',
      );
      expect(existsSync(generated)).toBe(true);
      expect(existsSync(dialogStyle)).toBe(true);
      const original = readFileSync(generated, 'utf8');
      expect(original).toContain('export function Dialog');
      expect(original).not.toContain('export function Tabs');
      expect(original).not.toContain("'./floating.js'");
      expect(original.match(/from 'react'/g)).toHaveLength(1);
      execFileSync(process.execPath, [cli, 'add', 'popover'], { cwd: fixture });
      const popoverSource = readFileSync(
        join(fixture, 'src/components/ui/popover.tsx'),
        'utf8',
      );
      expect(popoverSource).toContain("from '../internal/floating.js'");
      expect(popoverSource).not.toContain('@floating-ui');
      expect(popoverSource).not.toContain("from './floating.js'");
      const floatingSource = readFileSync(
        join(fixture, 'src/components/internal/floating.tsx'),
        'utf8',
      );
      expect(floatingSource).toContain("from '@simurgh-ui/core'");
      expect(floatingSource).not.toContain('@floating-ui');
      const recipeIndex = readFileSync(
        join(fixture, 'src/styles/simurgh/recipes.css'),
        'utf8',
      );
      expect(recipeIndex).toContain("@import './components/dialog.css';");
      expect(recipeIndex).toContain("@import './components/popover.css';");
      expect(recipeIndex).not.toContain('./components/button.css');
      writeFileSync(dialogStyle, '/* application recipe customization */\n');
      execFileSync(process.execPath, [cli, 'add', 'dialog'], { cwd: fixture });
      expect(readFileSync(generated, 'utf8')).toBe(original);
      expect(readFileSync(dialogStyle, 'utf8')).toBe(
        '/* application recipe customization */\n',
      );
      execFileSync(process.execPath, [cli, 'add', 'dialog', '--overwrite'], {
        cwd: fixture,
      });
      expect(readFileSync(dialogStyle, 'utf8')).toContain(
        "[data-slot='dialog-content']",
      );
      expect(readFileSync(generated, 'utf8')).toBe(original);
      execFileSync(process.execPath, [cli, 'add', 'tabs'], { cwd: fixture });
      const tabs = join(fixture, 'src/components/ui/tabs.tsx');
      expect(readFileSync(tabs, 'utf8')).toContain('export function Tabs');
      expect(readFileSync(generated, 'utf8')).toBe(original);
      execFileSync(process.execPath, [cli, 'add', 'combobox'], {
        cwd: fixture,
      });
      const combobox = join(fixture, 'src/components/ui/combobox.tsx');
      expect(readFileSync(combobox, 'utf8')).toContain(
        'export function Combobox',
      );
      execFileSync(process.execPath, [cli, 'add', 'label'], { cwd: fixture });
      const label = join(fixture, 'src/components/ui/label.tsx');
      expect(readFileSync(label, 'utf8')).toContain('export const Label');
      execFileSync(process.execPath, [cli, 'add', 'separator'], {
        cwd: fixture,
      });
      const separator = join(fixture, 'src/components/ui/separator.tsx');
      expect(readFileSync(separator, 'utf8')).toContain(
        'export const Separator',
      );
      execFileSync(process.execPath, [cli, 'add', 'progress'], {
        cwd: fixture,
      });
      const progress = join(fixture, 'src/components/ui/progress.tsx');
      expect(readFileSync(progress, 'utf8')).toContain('export const Progress');
      execFileSync(process.execPath, [cli, 'add', 'toggle'], { cwd: fixture });
      const toggle = join(fixture, 'src/components/ui/toggle.tsx');
      expect(readFileSync(toggle, 'utf8')).toContain('export const Toggle');
      execFileSync(process.execPath, [cli, 'add', 'visually-hidden'], {
        cwd: fixture,
      });
      const visuallyHidden = join(
        fixture,
        'src/components/ui/visually-hidden.tsx',
      );
      expect(readFileSync(visuallyHidden, 'utf8')).toContain(
        'export const VisuallyHidden',
      );
      execFileSync(process.execPath, [cli, 'add', 'avatar'], { cwd: fixture });
      const avatar = join(fixture, 'src/components/ui/avatar.tsx');
      expect(readFileSync(avatar, 'utf8')).toContain('export const Avatar');
      execFileSync(process.execPath, [cli, 'add', 'alert'], { cwd: fixture });
      const alert = join(fixture, 'src/components/ui/alert.tsx');
      expect(readFileSync(alert, 'utf8')).toContain('export const Alert');
      execFileSync(process.execPath, [cli, 'add', 'aspect-ratio'], {
        cwd: fixture,
      });
      const aspectRatio = join(fixture, 'src/components/ui/aspect-ratio.tsx');
      expect(readFileSync(aspectRatio, 'utf8')).toContain(
        'export const AspectRatio',
      );
      execFileSync(process.execPath, [cli, 'add', 'skeleton'], {
        cwd: fixture,
      });
      const skeleton = join(fixture, 'src/components/ui/skeleton.tsx');
      expect(readFileSync(skeleton, 'utf8')).toContain('export const Skeleton');
      execFileSync(process.execPath, [cli, 'add', 'spinner'], { cwd: fixture });
      const spinner = join(fixture, 'src/components/ui/spinner.tsx');
      expect(readFileSync(spinner, 'utf8')).toContain('export const Spinner');
      execFileSync(process.execPath, [cli, 'add', 'button'], { cwd: fixture });
      const button = join(fixture, 'src/components/ui/button.tsx');
      const buttonSource = readFileSync(button, 'utf8');
      expect(buttonSource).toContain('export const Button');
      expect(buttonSource).toContain('ButtonHTMLAttributes');
      expect(buttonSource).not.toContain('@simurgh-ui/core');
      expect(buttonSource).not.toContain('@floating-ui/react');
      expect(buttonSource).not.toContain('createPortal');
      expect(buttonSource.match(/\bforwardRef\b/g)).toHaveLength(2);
      expect(buttonSource.match(/from 'react'/g)).toHaveLength(1);
      execFileSync(process.execPath, [cli, 'add', 'link'], { cwd: fixture });
      const link = join(fixture, 'src/components/ui/link.tsx');
      expect(readFileSync(link, 'utf8')).toContain('export const Link');
      execFileSync(process.execPath, [cli, 'add', 'navigation-menu'], {
        cwd: fixture,
      });
      const navigationMenu = join(
        fixture,
        'src/components/ui/navigation-menu.tsx',
      );
      expect(readFileSync(navigationMenu, 'utf8')).toContain(
        'export const NavigationMenu',
      );
      execFileSync(process.execPath, [cli, 'add', 'input'], { cwd: fixture });
      const input = join(fixture, 'src/components/ui/input.tsx');
      expect(readFileSync(input, 'utf8')).toContain('export const Input');
      execFileSync(process.execPath, [cli, 'add', 'slider'], { cwd: fixture });
      const slider = join(fixture, 'src/components/ui/slider.tsx');
      expect(readFileSync(slider, 'utf8')).toContain('export const Slider');
      execFileSync(process.execPath, [cli, 'add', 'meter'], { cwd: fixture });
      const meter = join(fixture, 'src/components/ui/meter.tsx');
      expect(readFileSync(meter, 'utf8')).toContain('export const Meter');
      execFileSync(process.execPath, [cli, 'add', 'toolbar'], { cwd: fixture });
      const toolbar = join(fixture, 'src/components/ui/toolbar.tsx');
      expect(readFileSync(toolbar, 'utf8')).toContain('export const Toolbar');
      execFileSync(process.execPath, [cli, 'add', 'toggle-group'], {
        cwd: fixture,
      });
      const toggleGroup = join(fixture, 'src/components/ui/toggle-group.tsx');
      expect(readFileSync(toggleGroup, 'utf8')).toContain(
        'export function ToggleGroup',
      );
      execFileSync(process.execPath, [cli, 'add', 'scroll-area'], {
        cwd: fixture,
      });
      const scrollArea = join(fixture, 'src/components/ui/scroll-area.tsx');
      expect(readFileSync(scrollArea, 'utf8')).toContain(
        'export const ScrollArea',
      );
      execFileSync(process.execPath, [cli, 'add', 'textarea'], {
        cwd: fixture,
      });
      const textarea = join(fixture, 'src/components/ui/textarea.tsx');
      expect(readFileSync(textarea, 'utf8')).toContain('export const Textarea');
      execFileSync(process.execPath, [cli, 'add', 'badge'], { cwd: fixture });
      const badge = join(fixture, 'src/components/ui/badge.tsx');
      expect(readFileSync(badge, 'utf8')).toContain('export const Badge');
      execFileSync(process.execPath, [cli, 'add', 'breadcrumb'], {
        cwd: fixture,
      });
      const breadcrumb = join(fixture, 'src/components/ui/breadcrumb.tsx');
      expect(readFileSync(breadcrumb, 'utf8')).toContain(
        'export const Breadcrumb',
      );
      execFileSync(process.execPath, [cli, 'add', 'card'], { cwd: fixture });
      const card = join(fixture, 'src/components/ui/card.tsx');
      expect(readFileSync(card, 'utf8')).toContain('export const Card');
      execFileSync(process.execPath, [cli, 'add', 'kbd'], { cwd: fixture });
      const kbd = join(fixture, 'src/components/ui/kbd.tsx');
      expect(readFileSync(kbd, 'utf8')).toContain('export const Kbd');
      execFileSync(process.execPath, [cli, 'add', 'field'], { cwd: fixture });
      const field = join(fixture, 'src/components/ui/field.tsx');
      expect(readFileSync(field, 'utf8')).toContain('export const Field');
      execFileSync(process.execPath, [cli, 'add', 'table'], { cwd: fixture });
      const table = join(fixture, 'src/components/ui/table.tsx');
      expect(readFileSync(table, 'utf8')).toContain('export const Table');
      execFileSync(process.execPath, [cli, 'add', 'pagination'], {
        cwd: fixture,
      });
      const pagination = join(fixture, 'src/components/ui/pagination.tsx');
      expect(readFileSync(pagination, 'utf8')).toContain(
        'export const Pagination',
      );
      execFileSync(process.execPath, [cli, 'add', 'collapsible'], {
        cwd: fixture,
      });
      const collapsible = join(fixture, 'src/components/ui/collapsible.tsx');
      expect(readFileSync(collapsible, 'utf8')).toContain(
        'export function Collapsible',
      );
      execFileSync(process.execPath, [cli, 'add', 'disclosure'], {
        cwd: fixture,
      });
      const disclosure = join(fixture, 'src/components/ui/disclosure.tsx');
      expect(readFileSync(disclosure, 'utf8')).toContain(
        'export const Disclosure',
      );
      execFileSync(process.execPath, [cli, 'add', 'description-list'], {
        cwd: fixture,
      });
      const descriptionList = join(
        fixture,
        'src/components/ui/description-list.tsx',
      );
      expect(readFileSync(descriptionList, 'utf8')).toContain(
        'export const DescriptionList',
      );
      expect(
        spawnSync(process.execPath, [cli, 'diff', 'dialog'], { cwd: fixture })
          .status,
      ).toBe(0);
      writeFileSync(generated, `${original}\n// application customization\n`);
      const configPath = join(fixture, 'simurgh.json');
      const config = JSON.parse(readFileSync(configPath, 'utf8')) as {
        registryVersion: string;
      };
      writeFileSync(
        configPath,
        `${JSON.stringify({ ...config, registryVersion: '0.0.1' }, null, 2)}\n`,
      );
      const customizedDiff = spawnSync(
        process.execPath,
        [cli, 'diff', 'dialog'],
        { cwd: fixture, encoding: 'utf8' },
      );
      expect(customizedDiff.status).toBe(1);
      expect(customizedDiff.stdout).toContain('Safe update guidance');
      expect(customizedDiff.stdout).toContain(
        'This project records registry 0.0.1; the CLI bundles',
      );
      expect(customizedDiff.stdout).toContain(
        'Commit or stash your current customizations',
      );
      expect(customizedDiff.stdout).toContain(
        'simurgh add dialog --overwrite',
      );
      expect(customizedDiff.stdout).toContain(
        'retain relevant upstream accessibility and bug fixes',
      );
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  }, 90_000);

  it.each([
    [true, 'src/components/ui', 'src/styles/simurgh'],
    [false, 'components/ui', 'styles/simurgh'],
  ] as const)(
    'respects a Next.js project with src directory: %s',
    (withSrc, components, styles) => {
      const fixture = mkdtempSync(join(tmpdir(), 'simurgh-next-layout-'));
      const cli = fileURLToPath(new URL('../dist/index.js', import.meta.url));
      try {
        writeFileSync(
          join(fixture, 'package.json'),
          JSON.stringify({
            name: 'next-layout',
            private: true,
            dependencies: { next: '^15.0.0', react: '^19.0.0' },
          }),
        );
        if (withSrc) mkdirSync(join(fixture, 'src'));

        execFileSync(process.execPath, [cli, 'init', '--skip-install'], {
          cwd: fixture,
        });
        execFileSync(process.execPath, [cli, 'add', 'button'], {
          cwd: fixture,
        });

        const config = JSON.parse(
          readFileSync(join(fixture, 'simurgh.json'), 'utf8'),
        ) as { components: string; styles: string };
        expect(config.components).toBe(components);
        expect(config.styles).toBe(styles);
        expect(existsSync(join(fixture, components, 'button.tsx'))).toBe(true);
        expect(existsSync(join(fixture, styles, 'tokens.css'))).toBe(true);
        expect(existsSync(join(fixture, styles, 'recipes.css'))).toBe(true);
        expect(existsSync(join(fixture, styles, 'components/button.css'))).toBe(
          true,
        );
        expect(existsSync(join(fixture, 'src'))).toBe(withSrc);
      } finally {
        rmSync(fixture, { recursive: true, force: true });
      }
    },
  );
});
