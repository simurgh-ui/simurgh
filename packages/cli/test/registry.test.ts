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
    expect(manifest.components).toHaveLength(15);
    for (const framework of ['react', 'vue', 'angular'] as const) {
      expect(registryEntry('dialog', framework).framework).toBe(framework);
      expect(
        registryEntry('radio-group', framework).symbols.length,
      ).toBeGreaterThan(1);
      expect(
        registryEntry('combobox', framework).symbols.length,
      ).toBeGreaterThan(1);
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
  }, 15_000);
});
