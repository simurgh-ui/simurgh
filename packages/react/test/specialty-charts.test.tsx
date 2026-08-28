// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { assertSpecialtyChartContract, specialtyContractKinds } from '../../core/test-utils/chart-contract.js';
import { BoxPlotChart, CandlestickChart, FunnelChart, GaugeChart, GeoChart, HistogramChart, MapChart, OhlcChart, PolarAreaChart, SankeyChart, TreemapChart, ViolinChart, WaterfallChart } from '../src/components/specialty-charts.js';

const accessibility = { title: 'Specialty', description: 'Specialty chart.' } as const;
const data = [{ label: 'A', value: 10, open: 7, high: 12, low: 5, close: 10, values: [1, 2, 3], source: 'A', target: 'B', latitude: 35, longitude: 51 }];
const charts = [CandlestickChart, OhlcChart, BoxPlotChart, ViolinChart, HistogramChart, FunnelChart, GaugeChart, PolarAreaChart, WaterfallChart, TreemapChart, SankeyChart, GeoChart, MapChart];

describe('React specialty charts', () => {
  it('renders every specialty chart with accessible fallback data', () => {
    for (const [index, Chart] of charts.entries()) {
      const result = render(<Chart data={data} accessibility={accessibility} />);
      expect(result.container.querySelector('[data-part="plot"]')).toBeTruthy();
      expect(result.container.querySelector('[data-part="data-list"]')?.textContent).toBeTruthy();
      if (index < specialtyContractKinds.length) assertSpecialtyChartContract(result.container.querySelector('figure')!, specialtyContractKinds[index]!);
      result.unmount();
    }
  });
});
