import { expect } from 'vitest';
import type { Direction, Orientation } from '../src/index.js';

export const compositeNavigationCases = [
  { direction: 'ltr', start: 0, key: 'ArrowRight', expected: 1 },
  { direction: 'ltr', start: 0, key: 'ArrowLeft', expected: 2 },
  { direction: 'rtl', start: 0, key: 'ArrowRight', expected: 2 },
  { direction: 'rtl', start: 0, key: 'ArrowLeft', expected: 1 },
  { direction: 'ltr', start: 1, key: 'Home', expected: 0 },
  { direction: 'ltr', start: 1, key: 'End', expected: 2 },
  {
    direction: 'ltr',
    orientation: 'vertical',
    start: 0,
    key: 'ArrowDown',
    expected: 1,
  },
  { direction: 'ltr', start: 0, key: 't', expected: 1 },
  { direction: 'ltr', start: 0, key: 'ArrowRight', expected: 2, disabled: 1 },
] as const satisfies ReadonlyArray<{
  direction: Direction;
  orientation?: Orientation;
  start: number;
  key: string;
  expected: number;
  disabled?: number;
}>;

export type CompositeContractHarness = {
  items(): HTMLElement[];
  press(key: string): Promise<void>;
  selected(): number;
  addItem(): Promise<void>;
  destroy(): void;
};

export async function runSharedCompositeContract(
  createHarness: (options: {
    direction: Direction;
    orientation: Orientation;
    disabled?: number;
  }) => Promise<CompositeContractHarness> | CompositeContractHarness,
) {
  for (const contract of compositeNavigationCases) {
    const harness = await createHarness({
      direction: contract.direction,
      orientation: contract.orientation ?? 'horizontal',
      ...('disabled' in contract ? { disabled: contract.disabled } : {}),
    });
    try {
      harness.items()[contract.start]?.focus();
      await harness.press(contract.key);
      expect(document.activeElement).toBe(harness.items()[contract.expected]);
      expect(harness.selected()).toBe(contract.expected);
    } finally {
      harness.destroy();
    }
  }

  const dynamic = await createHarness({
    direction: 'ltr',
    orientation: 'horizontal',
  });
  try {
    dynamic.items()[0]?.focus();
    await dynamic.addItem();
    await dynamic.press('End');
    expect(dynamic.items()).toHaveLength(4);
    expect(document.activeElement).toBe(dynamic.items()[3]);
    expect(dynamic.selected()).toBe(3);
  } finally {
    dynamic.destroy();
  }
}
