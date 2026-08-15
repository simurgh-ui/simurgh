import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { BarChartComponent, LineChartComponent, RadarChartComponent } from '../src/components/chart.js';

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
});
