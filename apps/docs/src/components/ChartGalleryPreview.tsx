import {
  AreaChart,
  BarChart,
  BubbleChart,
  ComboChart,
  DonutChart,
  HeatmapChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
} from '@simurgh-ui/react/chart';
import '@simurgh-ui/styles/chart.css';

export type ChartGalleryKind =
  | 'line'
  | 'area'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'scatter'
  | 'bubble'
  | 'radar'
  | 'heatmap'
  | 'combo';

const salesData = [
  { month: 'Jan', revenue: 28, cost: 18, radius: 6 },
  { month: 'Feb', revenue: 44, cost: 25, radius: 11 },
  { month: 'Mar', revenue: 36, cost: 30, radius: 8 },
  { month: 'Apr', revenue: 62, cost: 38, radius: 15 },
  { month: 'May', revenue: 53, cost: 42, radius: 12 },
  { month: 'Jun', revenue: 76, cost: 49, radius: 18 },
];

const channelData = [
  { channel: 'Product', value: 42 },
  { channel: 'Services', value: 28 },
  { channel: 'Support', value: 18 },
  { channel: 'Other', value: 12 },
];

const titles: Record<ChartGalleryKind, string> = {
  line: 'Line chart',
  area: 'Area chart',
  bar: 'Bar chart',
  pie: 'Pie chart',
  donut: 'Donut chart',
  scatter: 'Scatter chart',
  bubble: 'Bubble chart',
  radar: 'Radar chart',
  heatmap: 'Heatmap chart',
  combo: 'Combo chart',
};

const accessibility = (kind: ChartGalleryKind) => ({
  title: titles[kind],
  description: `Example ${titles[kind].toLowerCase()} using the shared gallery data.`,
});

export default function ChartGalleryPreview({
  kind,
}: {
  kind: ChartGalleryKind;
}) {
  const common = {
    data: salesData,
    x: 'month' as const,
    xScale: 'band' as const,
    height: 280,
  };

  if (kind === 'line')
    return (
      <LineChart
        {...common}
        series={[
          { id: 'Revenue', y: 'revenue' },
          { id: 'Cost', y: 'cost' },
        ]}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'area')
    return (
      <AreaChart
        {...common}
        series={[
          { id: 'Revenue', y: 'revenue' },
          { id: 'Cost', y: 'cost' },
        ]}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'bar')
    return (
      <BarChart
        {...common}
        series={[
          { id: 'Revenue', y: 'revenue' },
          { id: 'Cost', y: 'cost' },
        ]}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'pie')
    return (
      <PieChart
        data={channelData}
        y="value"
        width={640}
        height={300}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'donut')
    return (
      <DonutChart
        data={channelData}
        y="value"
        width={640}
        height={300}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'scatter')
    return (
      <ScatterChart
        {...common}
        y="revenue"
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'bubble')
    return (
      <BubbleChart
        {...common}
        series={[{ id: 'Revenue', y: 'revenue', radius: 'radius' }]}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'radar')
    return (
      <RadarChart
        data={channelData}
        y="value"
        width={640}
        height={300}
        accessibility={accessibility(kind)}
      />
    );
  if (kind === 'heatmap')
    return (
      <HeatmapChart
        {...common}
        series={[{ id: 'Intensity', y: 'revenue', radius: 'radius' }]}
        accessibility={accessibility(kind)}
      />
    );
  return (
    <ComboChart
      {...common}
      series={[
        { id: 'Revenue', y: 'revenue', type: 'bar' },
        { id: 'Cost', y: 'cost', type: 'line' },
      ]}
      accessibility={accessibility(kind)}
    />
  );
}
