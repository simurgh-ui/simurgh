// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { specialtyChartMarks, specialtyChartSummary, type SpecialtyChartKind, type SpecialtyDatum, type SpecialtyMark } from '@simurgh-ui/core/specialty-charts';
import type { ChartAccessibility } from '@simurgh-ui/core/charts';
import type { HTMLAttributes } from 'preact/compat';

export type SpecialtyChartProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & { data: readonly SpecialtyDatum[]; accessibility: ChartAccessibility; width?: number; height?: number };

function Mark({ mark, index }: { mark: SpecialtyMark; index: number }) {
  const color = `hsl(var(--simurgh-chart-${index % 10 + 1}))`;
  if (mark.type === 'path') return <path data-part={mark.part} d={mark.path} fill={mark.part === 'link' ? 'none' : color} stroke={color} strokeWidth={mark.part === 'link' ? Math.max(2, Math.sqrt(Math.abs(mark.value))) : 1} />;
  if (mark.type === 'rect') return <rect data-part={mark.part} x={mark.x} y={mark.y} width={mark.width} height={mark.height} fill={color} stroke="currentColor" />;
  if (mark.type === 'line') return <line data-part={mark.part} x1={mark.x} y1={mark.y} x2={mark.x2} y2={mark.y2} stroke={color} strokeWidth="2" />;
  if (mark.type === 'circle') return <circle data-part={mark.part} cx={mark.x} cy={mark.y} r={mark.radius} fill={color} />;
  return <text data-part={mark.part} x={mark.x} y={mark.y}>{mark.label}</text>;
}

export function SpecialtyChart({ kind, data, accessibility, width = 640, height = 360, ...native }: SpecialtyChartProps & { kind: SpecialtyChartKind }) {
  const marks = specialtyChartMarks(kind, data, width, height);
  const decorative = 'decorative' in accessibility && accessibility.decorative;
  return <figure className="simurgh-chart" data-slot="chart" data-kind={kind} data-state={marks.length ? undefined : 'empty'} aria-hidden={decorative || undefined} {...native}>
    {!decorative && <figcaption>{accessibility.title}</figcaption>}
    <svg viewBox={`0 0 ${width} ${height}`} data-part="plot" aria-hidden="true">{marks.map((item, index) => <Mark key={`${item.part}:${item.label}:${index}`} mark={item} index={index} />)}</svg>
    {!decorative && <><p data-part="description">{accessibility.description} {specialtyChartSummary(kind, marks)}</p><ul data-part="data-list" className="simurgh-visually-hidden">{marks.filter((item, index, all) => all.findIndex((candidate) => candidate.label === item.label) === index).map((item) => <li key={item.label}>{item.label}: {item.value}</li>)}</ul></>}
  </figure>;
}

const chart = (kind: SpecialtyChartKind) => (props: SpecialtyChartProps) => <SpecialtyChart {...props} kind={kind} />;
export const CandlestickChart = chart('candlestick');
export const OhlcChart = chart('ohlc');
export const BoxPlotChart = chart('box-plot');
export const ViolinChart = chart('violin');
export const HistogramChart = chart('histogram');
export const FunnelChart = chart('funnel');
export const GaugeChart = chart('gauge');
export const PolarAreaChart = chart('polar-area');
export const WaterfallChart = chart('waterfall');
export const TreemapChart = chart('treemap');
export const SankeyChart = chart('sankey');
export const GeoChart = chart('geo');
export const MapChart = GeoChart;
