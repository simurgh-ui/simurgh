import { chartDomain, linearScale } from './charts.js';

export type SpecialtyChartKind = 'candlestick' | 'ohlc' | 'box-plot' | 'violin' | 'histogram' | 'funnel' | 'gauge' | 'polar-area' | 'waterfall' | 'treemap' | 'sankey' | 'geo';
export type SpecialtyDatum = {
  label?: string;
  value?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  values?: readonly number[];
  source?: string;
  target?: string;
  latitude?: number;
  longitude?: number;
};
export type SpecialtyMark = {
  type: 'path' | 'rect' | 'line' | 'circle' | 'text';
  part: string;
  label: string;
  value: number;
  x: number;
  y: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
  radius: number;
  path: string;
};

const emptyMark: Omit<SpecialtyMark, 'type' | 'part' | 'label' | 'value'> = { x: 0, y: 0, x2: 0, y2: 0, width: 0, height: 0, radius: 0, path: '' };
const mark = (type: SpecialtyMark['type'], part: string, label: string, value: number, geometry: Partial<typeof emptyMark>): SpecialtyMark => ({ type, part, label, value, ...emptyMark, ...geometry });
const finite = (value: unknown, fallback = 0) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
const quantile = (values: readonly number[], amount: number) => {
  const sorted = [...values.filter(Number.isFinite)].sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const index = (sorted.length - 1) * amount;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  return sorted[lower]! + (sorted[upper]! - sorted[lower]!) * (index - lower);
};
const polar = (cx: number, cy: number, radius: number, angle: number) => [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius] as const;
const arcPath = (cx: number, cy: number, radius: number, start: number, end: number) => {
  const a = polar(cx, cy, radius, start); const b = polar(cx, cy, radius, end);
  return `M${cx},${cy}L${a[0]},${a[1]}A${radius},${radius} 0 ${end - start > Math.PI ? 1 : 0} 1 ${b[0]},${b[1]}Z`;
};

export function specialtyChartMarks(kind: SpecialtyChartKind, data: readonly SpecialtyDatum[], width = 640, height = 360): SpecialtyMark[] {
  const left = 32; const top = 20; const plotWidth = Math.max(1, width - 64); const plotHeight = Math.max(1, height - 48);
  if (!data.length) return [];
  if (kind === 'candlestick' || kind === 'ohlc') {
    const domain = chartDomain(data.flatMap((item) => [finite(item.low), finite(item.high)])) ?? [0, 1];
    const y = linearScale(domain, [top + plotHeight, top]); const step = plotWidth / data.length; const body = Math.max(2, step * 0.55);
    return data.flatMap((item, index) => {
      const label = item.label ?? String(index + 1); const open = finite(item.open); const close = finite(item.close); const high = finite(item.high, Math.max(open, close)); const low = finite(item.low, Math.min(open, close)); const x = left + step * (index + 0.5);
      const result = [mark('line', 'wick', label, close, { x, y: y(high), x2: x, y2: y(low) })];
      if (kind === 'ohlc') result.push(mark('line', 'open-tick', label, open, { x: x - body / 2, y: y(open), x2: x, y2: y(open) }), mark('line', 'close-tick', label, close, { x, y: y(close), x2: x + body / 2, y2: y(close) }));
      else result.push(mark('rect', close >= open ? 'up' : 'down', label, close, { x: x - body / 2, y: Math.min(y(open), y(close)), width: body, height: Math.max(1, Math.abs(y(open) - y(close))) }));
      return result;
    });
  }
  if (kind === 'box-plot' || kind === 'violin') {
    const all = data.flatMap((item) => item.values ?? []); const domain = chartDomain(all) ?? [0, 1]; const y = linearScale(domain, [top + plotHeight, top]); const step = plotWidth / data.length;
    return data.flatMap((item, index) => {
      const values = (item.values ?? []).filter(Number.isFinite); const label = item.label ?? String(index + 1); const x = left + step * (index + 0.5); if (!values.length) return [];
      if (kind === 'box-plot') { const min = Math.min(...values); const max = Math.max(...values); const q1 = quantile(values, 0.25); const median = quantile(values, 0.5); const q3 = quantile(values, 0.75); const boxWidth = Math.max(4, step * 0.5); return [mark('line', 'whisker', label, median, { x, y: y(max), x2: x, y2: y(min) }), mark('rect', 'box', label, median, { x: x - boxWidth / 2, y: y(q3), width: boxWidth, height: Math.max(1, y(q1) - y(q3)) }), mark('line', 'median', label, median, { x: x - boxWidth / 2, y: y(median), x2: x + boxWidth / 2, y2: y(median) })]; }
      const bins = 12; const min = domain[0]; const span = domain[1] - min || 1; const counts = Array.from({ length: bins }, () => 0); for (const value of values) counts[Math.min(bins - 1, Math.floor(((value - min) / span) * bins))]!++; const maxCount = Math.max(...counts, 1); const side = Math.max(4, step * 0.38); const right: [number, number][] = counts.map((count, bin) => [x + side * count / maxCount, y(min + span * (bin + 0.5) / bins)]); const path = `M${x},${y(min)}${right.map(([px, py]) => `L${px},${py}`).join('')}${[...right].reverse().map(([, py], bin) => `L${x - side * counts[counts.length - 1 - bin]! / maxCount},${py}`).join('')}Z`; return [mark('path', 'violin', label, quantile(values, 0.5), { path })];
    });
  }
  if (kind === 'histogram') {
    const values = data.flatMap((item) => item.values?.length ? item.values : [finite(item.value)]); const domain = chartDomain(values) ?? [0, 1]; const count = Math.max(1, Math.min(20, Math.ceil(Math.sqrt(values.length)))); const bins = Array.from({ length: count }, () => 0); const span = domain[1] - domain[0] || 1; for (const value of values) bins[Math.min(count - 1, Math.floor(((value - domain[0]) / span) * count))]!++; const max = Math.max(...bins, 1); const step = plotWidth / count; return bins.map((value, index) => mark('rect', 'bin', `${domain[0] + span * index / count}–${domain[0] + span * (index + 1) / count}`, value, { x: left + index * step, y: top + plotHeight * (1 - value / max), width: Math.max(1, step - 1), height: plotHeight * value / max }));
  }
  if (kind === 'funnel') {
    const max = Math.max(...data.map((item) => finite(item.value)), 1); const step = plotHeight / data.length;
    return data.map((item, index) => { const current = plotWidth * finite(item.value) / max; const next = plotWidth * finite(data[index + 1]?.value, finite(item.value)) / max; const cx = width / 2; const y = top + index * step; return mark('path', 'stage', item.label ?? String(index + 1), finite(item.value), { path: `M${cx - current / 2},${y}L${cx + current / 2},${y}L${cx + next / 2},${y + step}L${cx - next / 2},${y + step}Z` }); });
  }
  if (kind === 'gauge') {
    const value = finite(data[0]?.value); const max = Math.max(finite(data[1]?.value, 100), value, 1); const cx = width / 2; const cy = top + plotHeight * 0.78; const radius = Math.min(plotWidth / 2, plotHeight * 0.75); const angle = Math.PI + Math.PI * Math.min(1, Math.max(0, value / max)); const needle = polar(cx, cy, radius * 0.78, angle); return [mark('path', 'track', 'Range', max, { path: arcPath(cx, cy, radius, Math.PI, Math.PI * 2) }), mark('line', 'needle', data[0]?.label ?? 'Value', value, { x: cx, y: cy, x2: needle[0], y2: needle[1] }), mark('circle', 'hub', data[0]?.label ?? 'Value', value, { x: cx, y: cy, radius: 6 })];
  }
  if (kind === 'polar-area') {
    const max = Math.max(...data.map((item) => finite(item.value)), 1); const cx = width / 2; const cy = height / 2; const radius = Math.min(plotWidth, plotHeight) / 2; const step = Math.PI * 2 / data.length;
    return data.map((item, index) => mark('path', 'sector', item.label ?? String(index + 1), finite(item.value), { path: arcPath(cx, cy, radius * finite(item.value) / max, -Math.PI / 2 + index * step, -Math.PI / 2 + (index + 1) * step) }));
  }
  if (kind === 'waterfall') {
    const totals: number[] = []; let total = 0; for (const item of data) { total += finite(item.value); totals.push(total); } const domain = chartDomain([0, ...totals]) ?? [0, 1]; const y = linearScale(domain, [top + plotHeight, top]); const step = plotWidth / data.length;
    return data.map((item, index) => { const before = index ? totals[index - 1]! : 0; const after = totals[index]!; return mark('rect', finite(item.value) >= 0 ? 'increase' : 'decrease', item.label ?? String(index + 1), finite(item.value), { x: left + index * step + 1, y: Math.min(y(before), y(after)), width: Math.max(1, step - 2), height: Math.max(1, Math.abs(y(before) - y(after))) }); });
  }
  if (kind === 'treemap') {
    const total = data.reduce((sum, item) => sum + Math.max(0, finite(item.value)), 0) || 1; let x = left;
    return data.map((item, index) => { const nextWidth = plotWidth * Math.max(0, finite(item.value)) / total; const result = mark('rect', 'node', item.label ?? String(index + 1), finite(item.value), { x, y: top, width: nextWidth, height: plotHeight }); x += nextWidth; return result; });
  }
  if (kind === 'sankey') {
    const sources = [...new Set(data.map((item) => item.source ?? 'Source'))]; const targets = [...new Set(data.map((item) => item.target ?? 'Target'))]; const sourceY = new Map(sources.map((item, index) => [item, top + (index + 0.5) * plotHeight / sources.length])); const targetY = new Map(targets.map((item, index) => [item, top + (index + 0.5) * plotHeight / targets.length]));
    return data.map((item) => { const sy = sourceY.get(item.source ?? 'Source')!; const ty = targetY.get(item.target ?? 'Target')!; return mark('path', 'link', `${item.source ?? 'Source'} → ${item.target ?? 'Target'}`, finite(item.value), { path: `M${left},${sy}C${width / 2},${sy} ${width / 2},${ty} ${left + plotWidth},${ty}` }); });
  }
  return data.map((item, index) => { const longitude = Math.max(-180, Math.min(180, finite(item.longitude))); const latitude = Math.max(-90, Math.min(90, finite(item.latitude))); return mark('circle', 'location', item.label ?? String(index + 1), finite(item.value, 1), { x: left + (longitude + 180) / 360 * plotWidth, y: top + (90 - latitude) / 180 * plotHeight, radius: Math.max(3, Math.sqrt(Math.abs(finite(item.value, 1)))) }); });
}

export function specialtyChartSummary(kind: SpecialtyChartKind, marks: readonly SpecialtyMark[]): string {
  return `${kind}: ${new Set(marks.map((item) => item.label)).size} items.`;
}
