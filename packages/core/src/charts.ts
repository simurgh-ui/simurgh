export type ChartValue = number | Date | string;
export type ChartAccessor<T, V extends ChartValue = ChartValue> =
  | keyof T
  | ((datum: T, index: number) => V | null | undefined);
export type ChartSeriesType =
  | 'line'
  | 'area'
  | 'bar'
  | 'scatter'
  | 'bubble'
  | 'radar'
  | 'heatmap';
export type ChartScaleType = 'linear' | 'time' | 'band' | 'log';
export type ChartRenderMode = 'auto' | 'svg' | 'canvas';
export type ChartTooltipMode = 'nearest' | 'intersect' | 'index' | 'shared' | 'none';
export type ChartTooltipTrigger = 'always' | 'hover' | 'click';
export type ChartTooltipPosition = 'static' | 'cursor';
export type ChartAxisConfig = {
  title?: string;
  ticks?: number;
  tickFormatter?: (value: ChartValue) => string;
  tickRotation?: number;
  grid?: boolean;
  position?: 'start' | 'end';
  locale?: string;
};
export type ChartReference = { id?: string; axis: 'x' | 'y'; value: number; endValue?: number; label?: string; color?: string };
export type ChartAnnotation = { id?: string; x: number; y: number; label?: string; color?: string; description?: string };
export type ChartDataLabelConfig = { enabled?: boolean; placement?: 'top' | 'inside' | 'bottom'; minDistance?: number; formatter?: (value: number, index: number, seriesId: string) => string };
export type ChartLegendConfig = { placement?: 'top' | 'right' | 'bottom' | 'left'; orientation?: 'horizontal' | 'vertical'; maxHeight?: number; selectAll?: boolean; isolate?: boolean };
export type ChartVisualMapPiece = { gte?: number; lte?: number; color?: string; opacity?: number; size?: number };
export type ChartVisualMap = { min?: number; max?: number; color?: readonly [string, string]; opacity?: readonly [number, number]; size?: readonly [number, number]; pieces?: readonly ChartVisualMapPiece[] };
export type ChartVisualStyle = { color?: string; opacity?: number; size?: number };
export type ChartDataOptions<T = unknown> = {
  missing?: 'skip' | 'zero' | 'connect';
  interpolate?: 'none' | 'linear' | 'step';
  sort?: 'ascending' | 'descending' | ((a: T, b: T) => number);
  filter?: (datum: T, index: number) => boolean;
  aggregate?: 'sum' | 'mean' | 'min' | 'max' | ((values: readonly number[]) => number);
  aggregateValue?: ChartAccessor<T, number>;
  aggregateKey?: PropertyKey;
  aggregateBy?: ChartAccessor<T>;
  window?: number;
  stackOffset?: 'zero' | 'expand';
};
export function chartMissingValue(value: number | null, policy: ChartDataOptions['missing'] = 'skip'): number | null {
  return value == null || !Number.isFinite(value) ? policy === 'zero' ? 0 : null : value;
}
export function interpolateChartValues(values: readonly (number | null)[], mode: ChartDataOptions['interpolate'] = 'none'): (number | null)[] {
  if (mode === 'none') return [...values];
  const output = [...values];
  for (let index = 0; index < output.length; index += 1) {
    if (output[index] != null) continue;
    let left = index - 1; while (left >= 0 && output[left] == null) left -= 1;
    let right = index + 1; while (right < output.length && output[right] == null) right += 1;
    if (left < 0 || right >= output.length) continue;
    output[index] = mode === 'step' ? output[left]! : (output[left]! + (output[right]! - output[left]!) * ((index - left) / (right - left)));
  }
  return output;
}
export function prepareChartData<T>(data: readonly T[], options: ChartDataOptions<T> | undefined): readonly T[] {
  if (!options) return data;
  let rows = options.filter ? data.filter(options.filter) : [...data];
  if (options.sort) rows = [...rows].sort(typeof options.sort === 'function' ? options.sort : (a, b) => {
    const left = String(a); const right = String(b);
    return (left < right ? -1 : left > right ? 1 : 0) * (options.sort === 'descending' ? -1 : 1);
  });
  if (options.window != null && options.window > 0 && rows.length > options.window) rows = rows.slice(-Math.floor(options.window));
  if (!options.aggregate || !options.aggregateBy || !options.aggregateValue || options.aggregateKey == null) return rows;
  const groups = new Map<ChartValue, T[]>();
  rows.forEach((row, index) => { const key = chartValue(row, options.aggregateBy!, index) ?? index; const group = groups.get(key) ?? []; group.push(row); groups.set(key, group); });
  return [...groups.values()].map((group) => {
    const first = group[0]!;
    const values = group.map((row, index) => numericValue(chartValue(row, options.aggregateValue!, index))).filter((value): value is number => value != null);
    if (!values.length) return first;
    const value = typeof options.aggregate === 'function' ? options.aggregate(values) : options.aggregate === 'mean' ? values.reduce((sum, item) => sum + item, 0) / values.length : options.aggregate === 'min' ? Math.min(...values) : options.aggregate === 'max' ? Math.max(...values) : values.reduce((sum, item) => sum + item, 0);
    return { ...(first as object), [options.aggregateKey!]: value } as T;
  });
}
export function chartVisualStyle(value: number, map: ChartVisualMap | undefined): ChartVisualStyle {
  if (!map) return {};
  const piece = map.pieces?.find((item) => (item.gte == null || value >= item.gte) && (item.lte == null || value <= item.lte));
  if (piece) return { ...(piece.color == null ? {} : { color: piece.color }), ...(piece.opacity == null ? {} : { opacity: piece.opacity }), ...(piece.size == null ? {} : { size: piece.size }) };
  const min = map.min ?? 0;
  const max = map.max ?? 1;
  const ratio = max === min ? 0 : Math.max(0, Math.min(1, (value - min) / (max - min)));
  return {
    ...(map.color ? { color: `color-mix(in srgb, ${map.color[0]} ${(1 - ratio) * 100}%, ${map.color[1]})` } : {}),
    ...(map.opacity ? { opacity: map.opacity[0] + (map.opacity[1] - map.opacity[0]) * ratio } : {}),
    ...(map.size ? { size: map.size[0] + (map.size[1] - map.size[0]) * ratio } : {}),
  };
}

export function chartTicks(domain: ChartDomain, count = 5): number[] {
  const size = Math.max(2, Math.floor(count));
  return Array.from({ length: size }, (_, index) => domain[0] + ((domain[1] - domain[0]) * index) / (size - 1));
}

export function formatChartValue(value: ChartValue, locale = 'en-US'): string {
  if (value instanceof Date) return new Intl.DateTimeFormat(locale).format(value);
  if (typeof value === 'number') return new Intl.NumberFormat(locale).format(value);
  return String(value);
}

export type ChartSeries<T> = {
  id: string;
  type?: ChartSeriesType;
  label?: string;
  x?: ChartAccessor<T>;
  y: ChartAccessor<T, number>;
  radius?: ChartAccessor<T, number>;
  color?: string;
  stack?: string;
  axis?: 'start' | 'end';
  curve?: 'linear' | 'step' | 'smooth' | 'monotone';
  tension?: number;
  lineWidth?: number;
  lineDash?: string;
  pointSymbol?: 'circle' | 'square' | 'diamond';
  fill?: string;
  pattern?: string;
};

export function chartCurvePath(points: readonly (readonly [number, number])[], curve: ChartSeries<unknown>['curve'] = 'linear', tension?: number): string {
  if (points.length < 2 || curve === 'linear' || curve == null) return linePath(points);
  if (curve === 'smooth' || curve === 'monotone') {
    const factor = Math.max(0, Math.min(1, tension ?? 0.5)) / 6;
    let path = `M${points[0]![0]},${points[0]![1]}`;
    for (let index = 0; index < points.length - 1; index += 1) {
      const previous = points[Math.max(0, index - 1)]!;
      const current = points[index]!;
      const next = points[index + 1]!;
      const after = points[Math.min(points.length - 1, index + 2)]!;
      const control1: [number, number] = [current[0] + (next[0] - previous[0]) * factor, current[1] + (next[1] - previous[1]) * factor];
      const control2: [number, number] = [next[0] - (after[0] - current[0]) * factor, next[1] - (after[1] - current[1]) * factor];
      path += `C${control1[0]},${control1[1]} ${control2[0]},${control2[1]} ${next[0]},${next[1]}`;
    }
    return path;
  }
  const stepped: [number, number][] = [points[0] as [number, number]];
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]!;
    const current = points[index]!;
    stepped.push([current[0], previous[1]], [current[0], current[1]]);
  }
  return linePath(stepped);
}

export type ChartAccessibility =
  | {
      title: string;
      description: string;
      table?: boolean | { pageSize?: number };
      decorative?: never;
    }
  | { decorative: true; title?: never; description?: never; table?: never };

export type ChartPoint<T = unknown> = {
  datum: T;
  index: number;
  seriesId: string;
  x: number;
  y: number;
  xValue: ChartValue;
  yValue: number;
  radius?: number;
};

export type ChartDomain = readonly [number, number];
export type ChartPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};
export type ChartLayout = ChartPadding & {
  width: number;
  height: number;
  plotWidth: number;
  plotHeight: number;
};

export const defaultChartPadding: ChartPadding = {
  top: 16,
  right: 16,
  bottom: 32,
  left: 44,
};

export function chartValue<T, V extends ChartValue>(
  datum: T,
  accessor: ChartAccessor<T, V>,
  index: number,
): V | null | undefined {
  return typeof accessor === 'function'
    ? accessor(datum, index)
    : (datum[accessor] as V | null | undefined);
}

export function numericValue(value: unknown): number | null {
  const numeric = value instanceof Date ? value.getTime() : Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function chartDomain(
  values: Iterable<number>,
  options: { includeZero?: boolean; log?: boolean; padding?: number } = {},
): ChartDomain | null {
  let min = Infinity;
  let max = -Infinity;
  for (const value of values) {
    if (!Number.isFinite(value) || (options.log && value <= 0)) continue;
    min = Math.min(min, value);
    max = Math.max(max, value);
  }
  if (!Number.isFinite(min)) return null;
  if (options.includeZero && !options.log) {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }
  if (min === max) {
    const pad = Math.abs(min || 1) * (options.padding ?? 0.05);
    return [options.log ? Math.max(Number.MIN_VALUE, min - pad) : min - pad, max + pad];
  }
  return [min, max];
}

export function linearScale(
  domain: ChartDomain,
  range: ChartDomain,
): (value: number) => number {
  const span = domain[1] - domain[0] || 1;
  const output = range[1] - range[0];
  return (value) => range[0] + ((value - domain[0]) / span) * output;
}

export function logScale(
  domain: ChartDomain,
  range: ChartDomain,
): (value: number) => number {
  const start = Math.log(Math.max(Number.MIN_VALUE, domain[0]));
  const end = Math.log(Math.max(Number.MIN_VALUE, domain[1]));
  const scale = linearScale([start, end], range);
  return (value) => scale(Math.log(Math.max(Number.MIN_VALUE, value)));
}

export function bandScale(
  values: readonly ChartValue[],
  range: ChartDomain,
  padding = 0.15,
) {
  const keys = [...new Set(values.map(String))];
  const step = (range[1] - range[0]) / Math.max(1, keys.length);
  const bandwidth = step * (1 - Math.min(0.9, Math.max(0, padding)));
  const inset = (step - bandwidth) / 2;
  const positions = new Map(keys.map((key, index) => [key, range[0] + index * step + inset]));
  return {
    bandwidth,
    values: keys,
    map: (value: ChartValue) => positions.get(String(value)) ?? range[0],
  };
}

export function chartLayout(
  width: number,
  height: number,
  padding: Partial<ChartPadding> = {},
): ChartLayout {
  const resolved = { ...defaultChartPadding, ...padding };
  return {
    ...resolved,
    width,
    height,
    plotWidth: Math.max(0, width - resolved.left - resolved.right),
    plotHeight: Math.max(0, height - resolved.top - resolved.bottom),
  };
}

export function linePath(points: readonly (readonly [number, number] | null)[]): string {
  let path = '';
  let drawing = false;
  for (const point of points) {
    if (!point || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) {
      drawing = false;
      continue;
    }
    path += `${drawing ? 'L' : 'M'}${round(point[0])},${round(point[1])}`;
    drawing = true;
  }
  return path;
}

export function areaPath(
  points: readonly (readonly [number, number] | null)[],
  baseline: number,
): string {
  const groups: (readonly [number, number])[][] = [];
  let group: (readonly [number, number])[] = [];
  for (const point of [...points, null]) {
    if (point) group.push(point);
    else if (group.length) {
      groups.push(group);
      group = [];
    }
  }
  return groups
    .map((items) => {
      const first = items[0]!;
      const last = items.at(-1)!;
      return `${linePath(items)}L${round(last[0])},${round(baseline)}L${round(first[0])},${round(baseline)}Z`;
    })
    .join('');
}

export function stackedAreaPath(
  points: readonly { x: number; y0: number; y1: number }[],
): string {
  if (!points.length) return '';
  const top = linePath(points.map((item) => [item.x, item.y1]));
  const bottom = points
    .slice()
    .reverse()
    .map((item) => `L${round(item.x)},${round(item.y0)}`)
    .join('');
  return `${top}${bottom}Z`;
}

export type StackDatum<T> = T & { stack: string | undefined; x: ChartValue; value: number };
export function stackChartValues<T extends { stack: string | undefined; x: ChartValue; value: number }>(
  values: readonly T[],
  offset: 'zero' | 'expand' = 'zero',
): (T & { start: number; end: number })[] {
  const positive = new Map<string, number>();
  const negative = new Map<string, number>();
  const totalsPositive = new Map<string, number>();
  const totalsNegative = new Map<string, number>();
  if (offset === 'expand') values.forEach((item) => { if (!item.stack) return; const totals = item.value < 0 ? totalsNegative : totalsPositive; const key = `${item.stack}\u0000${String(item.x)}`; totals.set(key, (totals.get(key) ?? 0) + Math.abs(item.value)); });
  return values.map((item) => {
    if (!item.stack) return { ...item, start: 0, end: item.value };
    const key = `${item.stack}\u0000${String(item.x)}`;
    const totals = item.value < 0 ? negative : positive;
    const start = totals.get(key) ?? 0;
    const total = item.value < 0 ? totalsNegative : totalsPositive;
    const scale = offset === 'expand' ? 1 / (total.get(key) || 1) : 1;
    const end = start + item.value * scale;
    totals.set(key, end);
    return { ...item, start, end };
  });
}

export type PieArc<T = unknown> = {
  datum: T;
  index: number;
  value: number;
  startAngle: number;
  endAngle: number;
  path: string;
};

export function pieArcs<T>(
  data: readonly T[],
  accessor: ChartAccessor<T, number>,
  radius: number,
  innerRadius = 0,
): PieArc<T>[] {
  const valid = data
    .map((datum, index) => ({ datum, index, value: numericValue(chartValue(datum, accessor, index)) }))
    .filter((item): item is { datum: T; index: number; value: number } => item.value != null && item.value >= 0);
  const total = valid.reduce((sum, item) => sum + item.value, 0);
  if (total <= 0) return [];
  let angle = -Math.PI / 2;
  return valid.map((item) => {
    const startAngle = angle;
    angle += (item.value / total) * Math.PI * 2;
    return {
      ...item,
      startAngle,
      endAngle: angle,
      path: arcPath(0, 0, radius, startAngle, angle, innerRadius),
    };
  });
}

export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  start: number,
  end: number,
  innerRadius = 0,
): string {
  const sweep = Math.max(0, end - start);
  const cappedEnd = sweep >= Math.PI * 2 ? start + Math.PI * 2 - 1e-6 : end;
  const large = cappedEnd - start > Math.PI ? 1 : 0;
  const startPoint = polar(cx, cy, radius, start);
  const endPoint = polar(cx, cy, radius, cappedEnd);
  if (innerRadius <= 0) {
    return `M${round(cx)},${round(cy)}L${point(startPoint)}A${round(radius)},${round(radius)} 0 ${large} 1 ${point(endPoint)}Z`;
  }
  const innerEnd = polar(cx, cy, innerRadius, cappedEnd);
  const innerStart = polar(cx, cy, innerRadius, start);
  return `M${point(startPoint)}A${round(radius)},${round(radius)} 0 ${large} 1 ${point(endPoint)}L${point(innerEnd)}A${round(innerRadius)},${round(innerRadius)} 0 ${large} 0 ${point(innerStart)}Z`;
}

export function radarPoints(values: readonly number[], radius: number): string {
  const domain = chartDomain(values, { includeZero: true }) ?? [0, 1];
  const scale = linearScale(domain, [0, radius]);
  return values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (index / Math.max(1, values.length)) * Math.PI * 2;
      return point(polar(0, 0, scale(value), angle));
    })
    .join(' ');
}

export function minMaxDecimate<T extends { x: number; y: number }>(
  points: readonly T[],
  pixelWidth: number,
): T[] {
  if (points.length <= Math.max(2, pixelWidth * 2) || pixelWidth <= 0) return [...points];
  const domain = chartDomain(points.map((item) => item.x));
  if (!domain) return [];
  const bucket = Math.max(1, (domain[1] - domain[0]) / pixelWidth);
  const result: T[] = [];
  let low: T | undefined;
  let high: T | undefined;
  let current = -1;
  for (const item of points) {
    const next = Math.floor((item.x - domain[0]) / bucket);
    if (next !== current) {
      if (low) result.push(low);
      if (high && high !== low) result.push(high);
      low = high = item;
      current = next;
    } else {
      if (!low || item.y < low.y) low = item;
      if (!high || item.y > high.y) high = item;
    }
  }
  if (low) result.push(low);
  if (high && high !== low) result.push(high);
  return result.sort((a, b) => a.x - b.x);
}

export type HeatmapBin = { x: number; y: number; value: number; count: number };
export function heatmapBins(
  points: readonly { x: number; y: number; value?: number }[],
  columns: number,
  rows: number,
): HeatmapBin[] {
  const xDomain = chartDomain(points.map((item) => item.x));
  const yDomain = chartDomain(points.map((item) => item.y));
  if (!xDomain || !yDomain || columns <= 0 || rows <= 0) return [];
  const bins = new Map<number, HeatmapBin>();
  for (const item of points) {
    const x = Math.min(columns - 1, Math.max(0, Math.floor(((item.x - xDomain[0]) / (xDomain[1] - xDomain[0] || 1)) * columns)));
    const y = Math.min(rows - 1, Math.max(0, Math.floor(((item.y - yDomain[0]) / (yDomain[1] - yDomain[0] || 1)) * rows)));
    const key = y * columns + x;
    const bin = bins.get(key) ?? { x, y, value: 0, count: 0 };
    bin.value += item.value ?? 1;
    bin.count += 1;
    bins.set(key, bin);
  }
  return [...bins.values()];
}

export function chartSummary(values: readonly number[], label = 'Values'): string {
  const domain = chartDomain(values);
  if (!domain) return `${label}: no valid data.`;
  const first = values.find(Number.isFinite);
  let last: number | undefined;
  for (let index = values.length - 1; index >= 0; index -= 1) {
    if (Number.isFinite(values[index])) {
      last = values[index];
      break;
    }
  }
  const trend = first == null || last == null || first === last ? 'unchanged' : last > first ? 'increasing' : 'decreasing';
  return `${label}: ${values.filter(Number.isFinite).length} points, minimum ${domain[0]}, maximum ${domain[1]}, ${trend}.`;
}

function polar(cx: number, cy: number, radius: number, angle: number): readonly [number, number] {
  return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
}
function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
function point(value: readonly [number, number]): string {
  return `${round(value[0])},${round(value[1])}`;
}
