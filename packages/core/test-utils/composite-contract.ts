import { expect } from 'vitest';
import type { Direction } from '../src/index.js';

export const compositeNavigationCases = [
  { direction: 'ltr', start: 0, key: 'ArrowRight', expected: 1 },
  { direction: 'ltr', start: 0, key: 'ArrowLeft', expected: 2 },
  { direction: 'rtl', start: 0, key: 'ArrowRight', expected: 2 },
  { direction: 'rtl', start: 0, key: 'ArrowLeft', expected: 1 },
  { direction: 'ltr', start: 1, key: 'Home', expected: 0 },
  { direction: 'ltr', start: 1, key: 'End', expected: 2 },
] as const satisfies ReadonlyArray<{
  direction: Direction;
  start: number;
  key: string;
  expected: number;
}>;

export type CompositeContractHarness = {
  items: HTMLElement[];
  press(key: string): Promise<void>;
  selected(): number;
  destroy(): void;
};

export async function runSharedCompositeContract(
  createHarness: (
    direction: Direction,
  ) => Promise<CompositeContractHarness> | CompositeContractHarness,
) {
  for (const contract of compositeNavigationCases) {
    const harness = await createHarness(contract.direction);
    try {
      harness.items[contract.start]?.focus();
      await harness.press(contract.key);
      expect(document.activeElement).toBe(harness.items[contract.expected]);
      expect(harness.selected()).toBe(contract.expected);
    } finally {
      harness.destroy();
    }
  }
}
