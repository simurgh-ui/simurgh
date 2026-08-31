import { describe, expect, it } from 'vitest';
import { manifest, registryEntry, type Framework } from '../src/index.js';

const frameworks = Object.keys(manifest.frameworks) as Framework[];

describe('registry manifest', () => {
  it('has unique, sorted-independent component identifiers', () => {
    expect(new Set(manifest.components).size).toBe(manifest.components.length);
    expect(
      manifest.components.every((name) =>
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(name),
      ),
    ).toBe(true);
  });

  it('defines non-empty symbols for every component and framework', () => {
    for (const framework of frameworks) {
      const supported = manifest.frameworks[framework].components ?? manifest.components;
      const symbolFramework = manifest.frameworks[framework].symbolsFrom ?? framework;
      const symbols = manifest.symbols[symbolFramework] ?? manifest.newFrameworkSymbols?.[framework] ?? {};
      expect(Object.keys(symbols).sort()).toEqual(
        [...supported].sort(),
      );
      for (const component of supported) {
        const entry = registryEntry(component, framework);
        expect(
          entry.symbols.length,
          `${framework}/${component}`,
        ).toBeGreaterThan(0);
        expect(new Set(entry.symbols).size, `${framework}/${component}`).toBe(
          entry.symbols.length,
        );
      }
    }
  });

  it('assigns every component to exactly one presentation status', () => {
    const assigned = Object.values(manifest.presentationStatus).flat();
    expect(assigned.slice().sort()).toEqual([...manifest.components].sort());
    expect(new Set(assigned).size).toBe(assigned.length);
  });

  it('rejects unknown components', () => {
    expect(() => registryEntry('not-a-component', frameworks[0])).toThrow(
      'Unknown component: not-a-component',
    );
  });
});
