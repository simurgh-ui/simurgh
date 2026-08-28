import { describe, expect, it } from 'vitest';
import { specialtyChartMarks, specialtyChartSummary, type SpecialtyChartKind } from '../src/specialty-charts.js';

const kinds: SpecialtyChartKind[] = ['candlestick', 'ohlc', 'box-plot', 'violin', 'histogram', 'funnel', 'gauge', 'polar-area', 'waterfall', 'treemap', 'sankey', 'geo'];
const data = [
  { label: 'A', value: 12, open: 8, high: 15, low: 6, close: 12, values: [2, 4, 5, 8], source: 'A', target: 'B', latitude: 35, longitude: 51 },
  { label: 'B', value: 8, open: 12, high: 14, low: 7, close: 9, values: [3, 5, 7, 9], source: 'B', target: 'C', latitude: 48, longitude: 2 },
];

describe('specialty chart geometry', () => {
  for (const kind of kinds) it(`creates ${kind} marks and a summary`, () => {
    const marks = specialtyChartMarks(kind, data);
    expect(marks.length).toBeGreaterThan(0);
    expect(marks.every((item) => Number.isFinite(item.value))).toBe(true);
    expect(specialtyChartSummary(kind, marks)).toContain(kind);
  });
});
