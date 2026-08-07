import { describe, expect, it } from 'vitest';
import { manifest, registryEntry } from '@simurgh-ui/registry';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { rmSync } from 'node:fs';
describe('registry', () => { it('contains ten components for every framework', () => { expect(manifest.components).toHaveLength(10); for (const framework of ['react', 'vue', 'angular'] as const) expect(registryEntry('dialog', framework).framework).toBe(framework); }); });

describe('CLI application fixture', () => {
  it('initializes, adds idempotently, and detects local changes', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'simurgh-cli-'));
    const cli = resolve('packages/cli/dist/index.js');
    try {
      writeFileSync(join(fixture, 'package.json'), JSON.stringify({ name: 'fixture', private: true, dependencies: { react: '^19.0.0' } }));
      execFileSync(process.execPath, [cli, 'init', '--framework', 'react', '--skip-install'], { cwd: fixture });
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
      expect(spawnSync(process.execPath, [cli, 'diff', 'dialog'], { cwd: fixture }).status).toBe(0);
      writeFileSync(generated, `${original}\n// application customization\n`);
      expect(spawnSync(process.execPath, [cli, 'diff', 'dialog'], { cwd: fixture }).status).toBe(1);
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  }, 15_000);
});
