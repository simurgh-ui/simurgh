import { describe, expect, it } from 'vitest';
import { manifest, registryEntry } from '@simurgh-ui/registry';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rmSync } from 'node:fs';
describe('registry', () => {
  it('contains the component catalog for every framework', () => {
    expect(manifest.components).toHaveLength(41);
    for (const framework of ['react', 'vue', 'angular'] as const) {
      expect(registryEntry('dialog', framework).framework).toBe(framework);
      expect(
        registryEntry('radio-group', framework).symbols.length,
      ).toBeGreaterThan(1);
      expect(
        registryEntry('combobox', framework).symbols.length,
      ).toBeGreaterThan(1);
      expect(registryEntry('menubar', framework).symbols.length).toBe(2);
    }
  });
});

describe('CLI application fixture', () => {
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
      execFileSync(
        process.execPath,
        [cli, 'init', '--framework', 'react', '--skip-install'],
        { cwd: fixture },
      );
      execFileSync(process.execPath, [cli, 'add', 'dialog'], { cwd: fixture });
      const generated = join(fixture, 'src/components/ui/dialog.tsx');
      expect(existsSync(generated)).toBe(true);
      const original = readFileSync(generated, 'utf8');
      expect(original).toContain('export function Dialog');
      expect(original).not.toContain('export function Tabs');
      execFileSync(process.execPath, [cli, 'add', 'dialog'], { cwd: fixture });
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
      expect(readFileSync(button, 'utf8')).toContain('export const Button');
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
      expect(
        spawnSync(process.execPath, [cli, 'diff', 'dialog'], { cwd: fixture })
          .status,
      ).toBe(0);
      writeFileSync(generated, `${original}\n// application customization\n`);
      expect(
        spawnSync(process.execPath, [cli, 'diff', 'dialog'], { cwd: fixture })
          .status,
      ).toBe(1);
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  }, 45_000);
});
