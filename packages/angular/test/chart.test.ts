import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { BarChartComponent, LineChartComponent, PieChartComponent, RadarChartComponent } from '../src/components/chart.js';

const accessibility = { title: 'Revenue', description: 'Monthly revenue.' } as const;

describe('Angular charts', () => {
  it('prepares line and stacked bar geometry', () => {
    const line = new LineChartComponent();
    line.data = [{ x: 1, y: 2 }, { x: 2, y: 4 }];
    line.x = 'x';
    line.y = 'y';
    line.accessibility = accessibility;
    expect(line.model.marks[0]?.path).toContain('M');

    const bar = new BarChartComponent();
    bar.data = [{ x: 'a', one: 2, two: 3 }];
    bar.x = 'x';
    bar.series = [{ id: 'one', y: 'one', stack: 'total' }, { id: 'two', y: 'two', stack: 'total' }];
    bar.accessibility = accessibility;
    expect(bar.model.marks).toHaveLength(2);
  });
  it('emits controlled legend changes and creates radar points', () => {
    const chart = new LineChartComponent();
    const emitted = vi.fn();
    chart.hiddenSeriesChange.subscribe(emitted);
    chart.toggleSeries('cost');
    expect(emitted).toHaveBeenCalledWith(['cost']);

    const radar = new RadarChartComponent();
    radar.data = [{ y: 1 }, { y: 2 }, { y: 3 }];
    radar.y = 'y';
    radar.accessibility = accessibility;
    expect(radar.points.split(' ')).toHaveLength(3);
  });
  it('supports legend select-all and isolate controls', () => {
    const chart = new LineChartComponent();
    const emitted = vi.fn();
    chart.series = [{ id: 'revenue', y: 'revenue' }, { id: 'cost', y: 'cost' }];
    chart.hiddenSeriesChange.subscribe(emitted);
    chart.selectAllSeries();
    expect(emitted).toHaveBeenCalledWith([]);
    chart.isolateSeries('revenue');
    expect(emitted).toHaveBeenCalledWith(['cost']);
  });
  it('supports viewport zoom, brush gestures, and point events', () => {
    const chart = new LineChartComponent();
    chart.data = [{ x: 0, y: 2 }, { x: 10, y: 8 }];
    chart.x = 'x';
    chart.y = 'y';
    chart.accessibility = accessibility;
    chart.interaction = { zoom: 'x', brush: 'x' };
    const viewport = { getBoundingClientRect: () => ({ left: 0, top: 0, width: 640, height: 360 }), setPointerCapture: vi.fn() } as unknown as HTMLElement;
    const wheel = { currentTarget: viewport, clientX: 320, clientY: 180, deltaY: -100, preventDefault: vi.fn() } as unknown as WheelEvent;
    const viewportChange = vi.fn();
    const xDomainChange = vi.fn();
    chart.viewportChange.subscribe(viewportChange);
    chart.xDomainChange.subscribe(xDomainChange);
    chart.onWheel(wheel);
    expect(viewportChange).toHaveBeenCalled();
    expect(xDomainChange).toHaveBeenCalled();
    const selectionChange = vi.fn();
    chart.selectionChange.subscribe(selectionChange);
    const start = { currentTarget: viewport, clientX: 100, clientY: 120, pointerId: 1 } as unknown as PointerEvent;
    const end = { currentTarget: viewport, clientX: 400, clientY: 220, pointerId: 1 } as unknown as PointerEvent;
    chart.onPointerDown(start);
    chart.onPointerUp(end);
    expect(selectionChange).toHaveBeenCalledWith(expect.objectContaining({ start: [100, 120] }));
  });
  it('supports tooltip modes, triggers, and custom content', () => {
    const chart = new LineChartComponent();
    chart.data = [{ x: 0, y: 2 }, { x: 10, y: 8 }];
    chart.x = 'x';
    chart.y = 'y';
    chart.accessibility = accessibility;
    chart.tooltipMode = 'shared';
    chart.tooltipTrigger = 'hover';
    chart.tooltipContent = (points) => `selected:${points.length}`;
    chart.onMouseMove({ currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 640, height: 360 }) }, clientX: 320, clientY: 180 } as unknown as MouseEvent);
    expect(chart.model.tooltip).toBe('selected:1');
    chart.onMouseLeave();
    expect(chart.tooltipVisible).toBe(false);
    chart.tooltipMode = 'none';
    expect(chart.model.tooltip).toBe('selected:0');
  });
  it('prepares configurable axis ticks and titles', () => {
    const chart = new LineChartComponent();
    chart.data = [{ x: 0, y: 2 }, { x: 10, y: 8 }];
    chart.x = 'x';
    chart.y = 'y';
    chart.accessibility = accessibility;
    chart.xAxis = { ticks: 3, title: 'Time' };
    chart.yAxis = { ticks: 4, title: 'Value' };
    expect(chart.model.xTicks).toHaveLength(3);
    expect(chart.model.yTicks).toHaveLength(4);
  });
  it('prepares reference lines and annotations', () => {
    const chart = new LineChartComponent();
    chart.data = [{ x: 0, y: 2 }, { x: 10, y: 8 }];
    chart.x = 'x';
    chart.y = 'y';
    chart.accessibility = accessibility;
    chart.references = [{ axis: 'y', value: 5, label: 'Target' }];
    chart.annotations = [{ x: 10, y: 8, label: 'Peak', description: 'Peak value' }];
    expect(chart.model.references).toHaveLength(1);
    expect(chart.model.annotations[0]?.description).toBe('Peak value');
  });
  it('prepares collision-aware data labels', () => {
    const chart = new LineChartComponent();
    chart.data = [{ x: 0, y: 2 }, { x: 10, y: 8 }];
    chart.x = 'x';
    chart.y = 'y';
    chart.accessibility = accessibility;
    chart.dataLabels = { formatter: (value) => `v${value}` };
    expect(chart.model.dataLabels.map((label) => label.text)).toContain('v2');
  });
  it('prepares formatted pie slice labels', () => {
    const chart = new PieChartComponent();
    chart.data = [{ name: 'A', value: 2 }, { name: 'B', value: 8 }];
    chart.y = 'value';
    chart.dataLabels = { formatter: (value) => `slice-${value}` };
    expect(chart.model.dataLabels.map((label) => label.text)).toContain('slice-2');
  });
});
