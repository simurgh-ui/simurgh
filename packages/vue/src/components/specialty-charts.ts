import { specialtyChartMarks, specialtyChartSummary, type SpecialtyChartKind, type SpecialtyDatum, type SpecialtyMark } from '@simurgh-ui/core/specialty-charts';
import type { ChartAccessibility } from '@simurgh-ui/core/charts';
import { defineComponent, h, type PropType } from 'vue';

const props = {
  data: { type: Array as PropType<readonly SpecialtyDatum[]>, required: true as const },
  accessibility: { type: Object as PropType<ChartAccessibility>, required: true as const },
  width: { type: Number, default: 640 }, height: { type: Number, default: 360 },
};
const renderMark = (item: SpecialtyMark, index: number) => {
  const color = `hsl(var(--simurgh-chart-${index % 10 + 1}))`;
  if (item.type === 'path') return h('path', { 'data-part': item.part, d: item.path, fill: item.part === 'link' ? 'none' : color, stroke: color, 'stroke-width': item.part === 'link' ? Math.max(2, Math.sqrt(Math.abs(item.value))) : 1 });
  if (item.type === 'rect') return h('rect', { 'data-part': item.part, x: item.x, y: item.y, width: item.width, height: item.height, fill: color, stroke: 'currentColor' });
  if (item.type === 'line') return h('line', { 'data-part': item.part, x1: item.x, y1: item.y, x2: item.x2, y2: item.y2, stroke: color, 'stroke-width': 2 });
  if (item.type === 'circle') return h('circle', { 'data-part': item.part, cx: item.x, cy: item.y, r: item.radius, fill: color });
  return h('text', { 'data-part': item.part, x: item.x, y: item.y }, item.label);
};
export const specialtyChart = (name: string, kind: SpecialtyChartKind) => defineComponent({ name, inheritAttrs: false, props, setup(values, { attrs }) { return () => { const marks = specialtyChartMarks(kind, values.data, values.width, values.height); const decorative = 'decorative' in values.accessibility && values.accessibility.decorative; const unique = marks.filter((item, index, all) => all.findIndex((candidate) => candidate.label === item.label) === index); return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-kind': kind, 'data-state': marks.length ? undefined : 'empty', 'aria-hidden': decorative || undefined }, [!decorative && h('figcaption', values.accessibility.title), h('svg', { viewBox: `0 0 ${values.width} ${values.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, marks.map(renderMark)), !decorative && h('p', { 'data-part': 'description' }, `${values.accessibility.description} ${specialtyChartSummary(kind, marks)}`), !decorative && h('ul', { 'data-part': 'data-list', class: 'simurgh-visually-hidden' }, unique.map((item) => h('li', `${item.label}: ${item.value}`)))]); }; } });
export const CandlestickChart = specialtyChart('SimurghCandlestickChart', 'candlestick');
export const OhlcChart = specialtyChart('SimurghOhlcChart', 'ohlc');
export const BoxPlotChart = specialtyChart('SimurghBoxPlotChart', 'box-plot');
export const ViolinChart = specialtyChart('SimurghViolinChart', 'violin');
export const HistogramChart = specialtyChart('SimurghHistogramChart', 'histogram');
export const FunnelChart = specialtyChart('SimurghFunnelChart', 'funnel');
export const GaugeChart = specialtyChart('SimurghGaugeChart', 'gauge');
export const PolarAreaChart = specialtyChart('SimurghPolarAreaChart', 'polar-area');
export const WaterfallChart = specialtyChart('SimurghWaterfallChart', 'waterfall');
export const TreemapChart = specialtyChart('SimurghTreemapChart', 'treemap');
export const SankeyChart = specialtyChart('SimurghSankeyChart', 'sankey');
export const GeoChart = specialtyChart('SimurghGeoChart', 'geo');
export const MapChart = GeoChart;
