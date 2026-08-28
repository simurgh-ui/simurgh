import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { assertSpecialtyModelContract } from '../../core/test-utils/chart-contract.js';
import { BoxPlotChartComponent, CandlestickChartComponent, FunnelChartComponent, GaugeChartComponent, GeoChartComponent, HistogramChartComponent, MapChartComponent, OhlcChartComponent, PolarAreaChartComponent, SankeyChartComponent, TreemapChartComponent, ViolinChartComponent, WaterfallChartComponent } from '../src/components/specialty-charts.js';

const charts = [CandlestickChartComponent, OhlcChartComponent, BoxPlotChartComponent, ViolinChartComponent, HistogramChartComponent, FunnelChartComponent, GaugeChartComponent, PolarAreaChartComponent, WaterfallChartComponent, TreemapChartComponent, SankeyChartComponent, GeoChartComponent, MapChartComponent];
const data = [{ label: 'A', value: 10, open: 7, high: 12, low: 5, close: 10, values: [1, 2, 3], source: 'A', target: 'B', latitude: 35, longitude: 51 }];

describe('Angular specialty charts', () => {
  it('builds every specialty geometry model with accessible summaries', () => {
    for (const Type of charts) {
      const chart = new Type(); chart.data = data; chart.accessibility = { title: 'Specialty', description: 'Specialty chart.' };
      expect(chart.marks.length).toBeGreaterThan(0);
      expect(chart.uniqueMarks[0]?.label).toBeTruthy();
      expect(chart.summary).toContain(chart.kind);
      assertSpecialtyModelContract(chart.kind, chart.marks.length, chart.summary, chart.uniqueMarks.length);
    }
  });
});
