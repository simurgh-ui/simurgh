import { describe, expect, it, vi } from 'vitest';
import {
  arcPath,
  bandScale,
  chartDomain,
  heatmapBins,
  linePath,
  linearScale,
  minMaxDecimate,
  pieArcs,
  radarPoints,
  stackChartValues,
  stackedAreaPath,
  chartVisualStyle,
  chartCurvePath,
  chartMissingValue,
  prepareChartData,
} from '../src/charts.js';
import { SpatialGrid, clampDomain, createChartSync, domainFromSelection, nextChartIndex, panDomain, pinchZoomDomain, resizeChartSelection, selectionFromPoints, zoomDomain } from '../src/chart-interactions.js';
import { createChartStream } from '../src/chart-stream.js';
import { chartToCsv, svgToDataUri } from '../src/chart-export.js';

describe('chart scales and geometry', () => {
  it('resolves continuous and piecewise visual mappings', () => {
    expect(chartVisualStyle(5, { min: 0, max: 10, opacity: [0.2, 1], size: [2, 8] }).opacity).toBeCloseTo(0.6);
    expect(chartVisualStyle(5, { min: 0, max: 10, opacity: [0.2, 1], size: [2, 8] }).size).toBe(5);
    expect(chartVisualStyle(7, { pieces: [{ gte: 5, color: 'red', size: 9 }] })).toMatchObject({ color: 'red', size: 9 });
  });
  it('builds stepped curve paths', () => {
    expect(chartCurvePath([[0, 0], [10, 10]], 'step')).toContain('M0,0L10,0L10,10');
  });
  it('builds cubic smooth curves', () => {
    expect(chartCurvePath([[0, 0], [10, 10], [20, 0]], 'smooth')).toContain('C');
  });
  it('applies data preparation policies', () => {
    expect(chartMissingValue(null, 'zero')).toBe(0);
    expect(prepareChartData([{ value: 1 }, { value: 3 }, { value: 2 }], { sort: (a, b) => b.value - a.value, window: 2 })).toEqual([{ value: 2 }, { value: 1 }]);
  });
  it('supports normalized stacked values', () => {
    expect(stackChartValues([{ stack: 's', x: 'a', value: 2 }, { stack: 's', x: 'a', value: 8 }], 'expand').map((item) => [item.start, item.end])).toEqual([[0, 0.2], [0.2, 1]]);
  });
  it('pads constant domains and omits invalid logarithmic values', () => {
    expect(chartDomain([5, 5])).toEqual([4.75, 5.25]);
    expect(chartDomain([-2, 0, 10], { log: true })).toEqual([9.5, 10.5]);
    expect(chartDomain([Number.NaN])).toBeNull();
  });
  it('maps linear and categorical ranges', () => {
    expect(linearScale([0, 10], [0, 100])(2.5)).toBe(25);
    const scale = bandScale(['a', 'b'], [0, 100], 0.2);
    expect(scale.bandwidth).toBe(40);
    expect(scale.map('b')).toBe(55);
  });
  it('creates paths while retaining gaps', () => {
    expect(linePath([[0, 1], null, [2, 3]])).toBe('M0,1M2,3');
    expect(stackedAreaPath([{ x: 0, y0: 4, y1: 2 }, { x: 1, y0: 5, y1: 3 }])).toBe('M0,2L1,3L1,5L0,4Z');
    expect(arcPath(0, 0, 10, 0, Math.PI)).toContain('A10,10');
    expect(radarPoints([1, 2, 3], 10).split(' ')).toHaveLength(3);
  });
  it('stacks positive and negative series independently', () => {
    const result = stackChartValues([
      { stack: 'a', x: 'q1', value: 2 },
      { stack: 'a', x: 'q1', value: 3 },
      { stack: 'a', x: 'q1', value: -2 },
    ]);
    expect(result.map(({ start, end }) => [start, end])).toEqual([[0, 2], [2, 5], [0, -2]]);
  });
  it('filters negative pie values and bins heatmaps', () => {
    expect(pieArcs([{ v: 2 }, { v: -1 }, { v: 3 }], 'v', 10)).toHaveLength(2);
    expect(heatmapBins([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }], 2, 2)).toEqual(expect.arrayContaining([expect.objectContaining({ count: 2 })]));
  });
  it('decimates by pixel buckets while preserving extrema', () => {
    const points = Array.from({ length: 1000 }, (_, x) => ({ x, y: x === 501 ? 1000 : Math.sin(x) }));
    const result = minMaxDecimate(points, 20);
    expect(result.length).toBeLessThanOrEqual(42);
    expect(result.some((point) => point.y === 1000)).toBe(true);
  });
});

describe('chart interaction helpers', () => {
  it('zooms, pans, and follows RTL point order', () => {
    expect(zoomDomain([0, 10], 2)).toEqual([2.5, 7.5]);
    expect(panDomain([0, 10], 0.1)).toEqual([1, 11]);
    expect(nextChartIndex(0, 3, 'ArrowLeft', 'rtl')).toBe(1);
  });
  it('converts pixel selections to ordered domains and clamps panning', () => {
    expect(domainFromSelection([0, 100], [75, 25], [0, 100])).toEqual([25, 75]);
    expect(selectionFromPoints([80, 20], [10, 60])).toEqual({ start: [10, 20], end: [80, 60] });
    expect(clampDomain([-10, 40], [0, 100])).toEqual([0, 50]);
    expect(clampDomain([70, 120], [0, 100])).toEqual([50, 100]);
    expect(resizeChartSelection({ start: [10, 20], end: [80, 60] }, 'start', [30, 0])).toEqual({ start: [30, 20], end: [80, 60] });
  });
  it('zooms around a pinch anchor', () => {
    expect(pinchZoomDomain([0, 100], 100, 200, 50)).toEqual([25, 75]);
  });
  it('broadcasts linked chart state changes', () => {
    const sync = createChartSync();
    const listener = vi.fn();
    sync.subscribe(listener);
    sync.set({ viewport: { x: [2, 8] }, focused: { seriesId: 'revenue', index: 2 } });
    expect(sync.state.viewport.x).toEqual([2, 8]);
    expect(listener).toHaveBeenCalledWith(sync.state);
  });
  it('finds nearby dense marks', () => {
    const grid = new SpatialGrid<{ x: number; y: number; id: string }>(10);
    grid.add({ x: 12, y: 14, id: 'near' });
    grid.add({ x: 100, y: 100, id: 'far' });
    expect(grid.nearest(10, 10, 10)?.id).toBe('near');
  });
});

describe('chart export helpers', () => {
  it('serializes points to CSV and SVG data URIs', () => {
    expect(chartToCsv([{ seriesId: 'sales', index: 0, xValue: 'Q1', yValue: 12 }])).toContain('sales,0,Q1,12');
    expect(svgToDataUri('<svg />')).toContain('data:image/svg+xml');
  });
});

describe('chart stream', () => {
  it('wraps its ring buffer and coalesces notifications', async () => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => setTimeout(callback, 0));
    const stream = createChartStream({ capacity: 3, dimensions: ['x', 'y'] as const });
    const listener = vi.fn();
    stream.subscribe(listener);
    stream.append({ x: [1, 2], y: [10, 20] });
    stream.append({ x: [3, 4], y: [30, 40] });
    await new Promise((resolve) => setTimeout(resolve, 5));
    const snapshot = stream.snapshot();
    expect([...snapshot.columns.x]).toEqual([2, 3, 4]);
    expect([...snapshot.columns.y]).toEqual([20, 30, 40]);
    expect(listener).toHaveBeenCalledOnce();
    expect(stream.length).toBe(3);
    stream.clear();
    expect(stream.length).toBe(0);
    vi.unstubAllGlobals();
  });
  it('rejects mismatched columns', () => {
    const stream = createChartStream({ capacity: 3, dimensions: ['x', 'y'] as const });
    expect(() => stream.append({ x: [1], y: [2, 3] })).toThrow(/same length/);
  });
});
