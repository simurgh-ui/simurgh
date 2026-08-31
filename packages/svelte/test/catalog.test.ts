import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { compile } from 'svelte/compiler';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');
const components = readdirSync(resolve(root, 'src/components')).filter((file) =>
  file.endsWith('.svelte'),
);

describe('Svelte adapter catalog', () => {
  it('ships and compiles all 68 component modules for client and server', () => {
    expect(components).toHaveLength(68);
    for (const file of components) {
      const filename = resolve(root, 'src/components', file);
      const source = readFileSync(filename, 'utf8');
      for (const generate of ['client', 'server'] as const) {
        const result = compile(source, {
          filename,
          generate,
          css: 'injected',
          dev: false,
        });
        expect(result.js.code.length, `${file} ${generate}`).toBeGreaterThan(0);
        expect(result.warnings, `${file} ${generate}`).toEqual([]);
      }
    }
  });

  it('keeps native form and interactive semantics in source-owned controls', () => {
    expect(
      readFileSync(resolve(root, 'src/components/checkbox.svelte'), 'utf8'),
    ).toContain('type="checkbox"');
    expect(
      readFileSync(resolve(root, 'src/components/dialog.svelte'), 'utf8'),
    ).toContain('showModal()');
    expect(
      readFileSync(resolve(root, 'src/components/tabs.svelte'), 'utf8'),
    ).toContain('role="tablist"');
  });
});
