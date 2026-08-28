import { expect } from 'vitest';
import type { SpecialtyChartKind } from '../src/specialty-charts.js';

export type ChartContractHarness = {
  root: HTMLElement;
  keyboard: HTMLElement;
  announcement: () => string;
  press: (key: string) => Promise<void>;
  wheel: () => Promise<void>;
  click: () => Promise<void>;
  viewportChanges: () => number;
  pointClicks: () => number;
  destroy: () => void;
};

export async function runSharedChartContract(createHarness: () => Promise<ChartContractHarness> | ChartContractHarness) {
  const harness = await createHarness();
  try {
    expect(harness.root.getAttribute('data-slot')).toBe('chart');
    expect(harness.root.querySelector('figcaption')?.textContent).toContain('Contract chart');
    expect(harness.root.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(harness.keyboard.getAttribute('aria-label')).toBe('Explorer');
    expect(harness.root.querySelector('[data-part="reset-viewport"]')?.textContent).toBe('Réinitialiser');
    expect(harness.root.querySelector('nav')?.getAttribute('aria-label')).toBe('Pages de données');
    expect(harness.root.querySelector('th')?.textContent).toBe('Catégorie');
    await harness.press('End');
    expect(harness.announcement()).toContain('8');
    await harness.press('Home');
    expect(harness.announcement()).toContain('2');
    await harness.wheel();
    expect(harness.viewportChanges()).toBeGreaterThan(0);
    await harness.click();
    expect(harness.pointClicks()).toBeGreaterThan(0);
  } finally { harness.destroy(); }
}

export const specialtyContractKinds: readonly SpecialtyChartKind[] = ['candlestick', 'ohlc', 'box-plot', 'violin', 'histogram', 'funnel', 'gauge', 'polar-area', 'waterfall', 'treemap', 'sankey', 'geo'];
export function assertSpecialtyChartContract(root: HTMLElement, kind: SpecialtyChartKind) {
  expect(root.getAttribute('data-kind')).toBe(kind);
  expect(root.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  expect(root.querySelector('[data-part="description"]')?.textContent).toContain(kind);
  expect(root.querySelector('[data-part="data-list"]')?.textContent).toBeTruthy();
}
export function assertSpecialtyModelContract(kind: SpecialtyChartKind, markCount: number, summary: string, dataListCount: number) {
  expect(specialtyContractKinds).toContain(kind);
  expect(markCount).toBeGreaterThan(0);
  expect(summary).toContain(kind);
  expect(dataListCount).toBeGreaterThan(0);
}
