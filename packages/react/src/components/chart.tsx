import {
  areaPath,
  bandScale,
  chartDomain,
  chartLayout,
  chartSummary,
  chartValue,
  linePath,
  linearScale,
  logScale,
  minMaxDecimate,
  numericValue,
  pieArcs,
  radarPoints,
  stackChartValues,
  stackedAreaPath,
  type ChartAccessibility,
  type ChartAccessor,
  type ChartDomain,
  type ChartRenderMode,
  type ChartScaleType,
  type ChartSeries,
  type ChartSeriesType,
  type ChartValue,
} from '@simurgh-ui/core/charts';
import { clampDomain, domainFromSelection, panDomain, resizeChartSelection, selectionFromPoints, zoomDomain, type ChartBrushHandle, type ChartSync } from '@simurgh-ui/core/chart-interactions';
import type { CanvasMark } from '@simurgh-ui/core/chart-canvas';
import type { ChartStream } from '@simurgh-ui/core/chart-stream';
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type SVGAttributes,
} from 'react';

export type ChartProps<T> = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  data?: readonly T[];
  stream?: ChartStream<string>;
  x?: ChartAccessor<T>;
  y?: ChartAccessor<T, number>;
  series?: readonly ChartSeries<T>[];
  accessibility: ChartAccessibility;
  width?: number;
  height?: number;
  xScale?: ChartScaleType;
  yScale?: Exclude<ChartScaleType, 'band'>;
  xDomain?: ChartDomain;
  yDomain?: ChartDomain;
  viewport?: { x?: ChartDomain; y?: ChartDomain };
  defaultViewport?: { x?: ChartDomain; y?: ChartDomain };
  interaction?: { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy' };
  sync?: ChartSync;
  onViewportChange?: (viewport: { x?: ChartDomain; y?: ChartDomain }) => void;
  onSelectionChange?: (selection: { start: readonly [number, number]; end: readonly [number, number] } | null) => void;
  onSelectedDataChange?: (data: readonly T[]) => void;
  onPointHover?: (point: ChartPointInteraction<T> | null) => void;
  onPointClick?: (point: ChartPointInteraction<T>) => void;
  onPointDoubleClick?: (point: ChartPointInteraction<T>) => void;
  onPointContextMenu?: (point: ChartPointInteraction<T>) => void;
  renderMode?: ChartRenderMode;
  canvasThreshold?: number;
  hiddenSeries?: readonly string[];
  defaultHiddenSeries?: readonly string[];
  onHiddenSeriesChange?: (series: string[]) => void;
  emptyContent?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  innerRadius?: number;
};

type PreparedPoint<T> = {
  datum: T;
  index: number;
  x: number;
  y: number;
  xValue: ChartValue;
  yValue: number;
  radius: number;
  y0: number;
};
export type ChartPointInteraction<T> = Pick<PreparedPoint<T>, 'datum' | 'index' | 'x' | 'y' | 'xValue' | 'yValue' | 'radius'> & { seriesId: string };
type PreparedSeries<T> = ChartSeries<T> & { points: PreparedPoint<T>[]; type: ChartSeriesType };
type ChartContextValue = { width: number; height: number };
const ChartContext = createContext<ChartContextValue | null>(null);

const colors = Array.from({ length: 10 }, (_, index) => `hsl(var(--simurgh-chart-${index + 1}))`);
const axisNumberFormatter = new Intl.NumberFormat('en-US');

function useChartRows<T>(data: readonly T[] | undefined, stream: ChartStream<string> | undefined, width: number): readonly T[] {
  const [version, setVersion] = useState(0);
  useEffect(() => stream?.subscribe(() => setVersion((value) => value + 1)), [stream]);
  return useMemo(() => {
    if (data && stream) throw new TypeError('Chart accepts either data or stream, not both.');
    if (!stream) return data ?? [];
    const snapshot = stream.snapshot();
    const limit = Math.max(2, Math.floor(width * 2));
    const step = Math.max(1, Math.ceil(snapshot.length / limit));
    const indexes = Array.from({ length: Math.ceil(snapshot.length / step) }, (_, index) => index * step);
    if (snapshot.length && indexes.at(-1) !== snapshot.length - 1) indexes.push(snapshot.length - 1);
    return indexes.map((index) => Object.fromEntries(stream.dimensions.map((key) => [key, snapshot.columns[key]![index]])) as T);
  }, [data, stream, version, width]);
}

export function ChartRoot({ width = 640, height = 360, children, ...props }: HTMLAttributes<HTMLElement> & ChartContextValue) {
  return (
    <ChartContext.Provider value={{ width, height }}>
      <figure className="simurgh-chart" data-slot="chart" {...props}>{children}</figure>
    </ChartContext.Provider>
  );
}
export function ChartPlot(props: SVGAttributes<SVGSVGElement>) {
  const context = useContext(ChartContext);
  return <svg viewBox={`0 0 ${context?.width ?? 640} ${context?.height ?? 360}`} data-part="plot" {...props} />;
}
export function ChartGrid(props: SVGAttributes<SVGGElement>) { return <g data-part="grid" {...props} />; }
export function ChartXAxis(props: SVGAttributes<SVGGElement>) { return <g data-part="x-axis" {...props} />; }
export function ChartYAxis(props: SVGAttributes<SVGGElement>) { return <g data-part="y-axis" {...props} />; }
export function ChartLegend(props: HTMLAttributes<HTMLDivElement>) { return <div data-part="legend" {...props} />; }
export function ChartTooltip(props: HTMLAttributes<HTMLDivElement>) { return <div role="tooltip" data-part="tooltip" {...props} />; }
export function ChartCrosshair(props: SVGAttributes<SVGGElement>) { return <g data-part="crosshair" {...props} />; }
export function ChartBrush(props: SVGAttributes<SVGRectElement>) { return <rect data-part="brush" {...props} />; }

export function ChartDataTable<T>({ data, columns, pageSize = 50 }: {
  data: readonly T[];
  columns: readonly { label: string; value: ChartAccessor<T> }[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(0);
  const size = Math.max(1, pageSize);
  const pages = Math.max(1, Math.ceil(data.length / size));
  const current = Math.min(page, pages - 1);
  return (
    <div data-part="data-table">
      <table><thead><tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr></thead>
        <tbody>{data.slice(current * size, current * size + size).map((datum, row) => (
          <tr key={current * size + row}>{columns.map((column) => <td key={column.label}>{String(chartValue(datum, column.value, current * size + row) ?? '')}</td>)}</tr>
        ))}</tbody></table>
      {pages > 1 && <nav aria-label="Chart data pages"><button type="button" disabled={!current} onClick={() => setPage(current - 1)}>Previous</button><span>{current + 1} / {pages}</span><button type="button" disabled={current + 1 >= pages} onClick={() => setPage(current + 1)}>Next</button></nav>}
    </div>
  );
}

function CartesianChart<T>({ kind, ...props }: ChartProps<T> & { kind: ChartSeriesType | 'combo' }) {
  const {
    data: inputData, stream, x = ((_, index) => index), y, series, accessibility, width = 640, height = 360,
    xScale = 'linear', yScale = 'linear', xDomain, yDomain, viewport: controlledViewport, defaultViewport, interaction, sync,
    onViewportChange, onSelectionChange, onSelectedDataChange, onPointHover, onPointClick, onPointDoubleClick, onPointContextMenu,
    renderMode = 'auto', canvasThreshold = 2000,
    hiddenSeries: controlledHiddenSeries, defaultHiddenSeries = [], onHiddenSeriesChange, emptyContent = 'No chart data', orientation = 'vertical', ...native
  } = props;
  const [uncontrolledHiddenSeries, setUncontrolledHiddenSeries] = useState<readonly string[]>(defaultHiddenSeries);
  const [uncontrolledViewport, setUncontrolledViewport] = useState(controlledViewport ?? defaultViewport ?? sync?.state.viewport ?? {});
  const viewport = controlledViewport ?? uncontrolledViewport;
  const [selection, setSelection] = useState<{ start: readonly [number, number]; end: readonly [number, number] } | null>(null);
  const pointerStart = useRef<readonly [number, number] | null>(null);
  const pointerLast = useRef<readonly [number, number] | null>(null);
  const brushHandle = useRef<ChartBrushHandle | null>(null);
  const hiddenSeries = controlledHiddenSeries ?? uncontrolledHiddenSeries;
  const data = useChartRows(inputData, stream, width);
  const titleId = `${useId()}-title`;
  const descriptionId = `${titleId}-description`;
  const layout = chartLayout(width, height);
  const definitions = useMemo<ChartSeries<T>[]>(() => series?.length ? [...series] : y ? [{ id: 'value', y, x, type: kind === 'combo' ? 'line' : kind }] : [], [series, y, x, kind]);
  const active = definitions.filter((item) => !hiddenSeries.includes(item.id));
  const unstacked = active.flatMap((definition) => data.map((datum, index) => {
    const xValue = chartValue(datum, definition.x ?? x, index);
    const yValue = numericValue(chartValue(datum, definition.y, index));
    const numericX = numericValue(xValue);
    return yValue == null || xValue == null || (xScale !== 'band' && numericX == null) || (yScale === 'log' && yValue <= 0)
      ? null : { datum, index, xValue, numericX: numericX ?? index, yValue, radius: numericValue(definition.radius ? chartValue(datum, definition.radius, index) : 4) ?? 4, definition };
  }).filter((item): item is NonNullable<typeof item> => item != null));
  const raw = stackChartValues(unstacked.map((item) => ({ ...item, stack: item.definition.stack, x: item.xValue, value: item.yValue })));
  const categories = raw.map((item) => item.xValue);
  const fullX = xDomain ?? chartDomain(raw.map((item) => item.numericX)) ?? [0, 1];
  const fullY = yDomain ?? chartDomain(raw.flatMap((item) => [item.start, item.end]), { includeZero: active.some((item) => item.type === 'bar' || kind === 'bar'), log: yScale === 'log' }) ?? [0, 1];
  const resolvedX = viewport.x ?? fullX;
  const resolvedY = viewport.y ?? fullY;
  const horizontalBars = kind === 'bar' && orientation === 'horizontal';
  const xBand = xScale === 'band' ? bandScale(categories, horizontalBars ? [layout.top, layout.top + layout.plotHeight] : [layout.left, layout.left + layout.plotWidth]) : null;
  const numericXMap = (xScale === 'log' ? logScale : linearScale)(resolvedX, [layout.left, layout.left + layout.plotWidth]);
  const xMap = xBand
    ? (value: ChartValue) => xBand.map(value) + xBand.bandwidth / 2
    : (value: ChartValue) => numericXMap(numericValue(value) ?? resolvedX[0]);
  const yMap = (yScale === 'log' ? logScale : linearScale)(resolvedY, [layout.top + layout.plotHeight, layout.top]);
  const horizontalValueMap = linearScale(resolvedY, [layout.left, layout.left + layout.plotWidth]);
  const prepared: PreparedSeries<T>[] = active.map((definition) => ({ ...definition, type: definition.type ?? (kind === 'combo' ? 'line' : kind), points: raw.filter((item) => item.definition === definition).map((item) => horizontalBars
    ? ({ ...item, x: horizontalValueMap(item.end), y: xBand ? xBand.map(item.xValue) + xBand.bandwidth / 2 : xMap(item.xValue), y0: horizontalValueMap(item.start) })
    : ({ ...item, x: xMap(item.xValue), y: yMap(item.end), y0: yMap(item.start) })) }));
  const pointCount = prepared.reduce((sum, item) => sum + item.points.length, 0);
  const useCanvas = renderMode === 'canvas' || (renderMode === 'auto' && pointCount > canvasThreshold);
  const [focus, setFocus] = useState(0);
  const flat = prepared.flatMap((item) => item.points.map((point) => ({ ...point, series: item })));
  useEffect(() => {
    if (!sync) return;
    return sync.subscribe((state) => {
      if (controlledViewport === undefined) setUncontrolledViewport(state.viewport);
      setSelection(state.selection);
      if (state.focused) {
        const next = flat.findIndex((item) => item.series.id === state.focused?.seriesId && item.index === state.focused?.index);
        if (next >= 0) setFocus(next);
      }
    });
  }, [sync, controlledViewport, flat]);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!useCanvas || !canvas.current) return;
    let current = true;
    void import('@simurgh-ui/core/chart-canvas').then(({ drawChartCanvas }) => {
      if (!current || !canvas.current) return;
      const context = canvas.current.getContext('2d');
      if (!context) return;
      const marks: CanvasMark[] = prepared.flatMap<CanvasMark>((item, seriesIndex) => {
        const color = item.color ?? colors[seriesIndex % colors.length]!;
        const points = (item.type === 'line' || item.type === 'area') ? minMaxDecimate(item.points, layout.plotWidth) : item.points;
        if (item.type === 'line') return [{ type: 'line' as const, points: points.map((point) => [point.x, point.y] as const), color }];
        if (item.type === 'area') return [{ type: 'area' as const, points: points.map((point) => [point.x, point.y] as const), baseline: item.stack && points[0] ? points[0].y0 : yMap(0), color, opacity: 0.3 }];
        if (item.type === 'bar') return points.map((point) => {
          const origin = item.stack ? point.y0 : horizontalBars ? horizontalValueMap(0) : yMap(0);
          return horizontalBars
            ? { type: 'rect' as const, x: Math.min(point.x, origin), y: point.y - (xBand?.bandwidth ?? 8) / 2, width: Math.abs(point.x - origin), height: xBand?.bandwidth ?? 8, color }
            : { type: 'rect' as const, x: point.x - (xBand?.bandwidth ?? 8) / 2, y: Math.min(point.y, origin), width: xBand?.bandwidth ?? 8, height: Math.abs(point.y - origin), color };
        });
        return points.map((point) => ({ type: 'point' as const, x: point.x, y: point.y, radius: item.type === 'bubble' ? point.radius : 3, color }));
      });
      drawChartCanvas(context, marks, width, height, window.devicePixelRatio || 1);
    });
    return () => { current = false; };
  }, [useCanvas, prepared, layout.plotWidth, width, height]);
  const summary = chartSummary(flat.map((item) => item.yValue));
  const decorative = 'decorative' in accessibility && accessibility.decorative;
  const table = !decorative && accessibility.table;
  const toggleSeries = (id: string) => {
    const next = hiddenSeries.includes(id) ? hiddenSeries.filter((item) => item !== id) : [...hiddenSeries, id];
    if (controlledHiddenSeries === undefined) setUncontrolledHiddenSeries(next);
    onHiddenSeriesChange?.(next);
  };
  if (!flat.length) return <figure className="simurgh-chart" data-slot="chart" data-state="empty" {...native}>
    {!decorative && <><figcaption id={titleId}>{accessibility.title}</figcaption><p id={descriptionId} data-part="description">{accessibility.description}</p></>}
    <div data-part="empty">{emptyContent}</div>
    <div data-part="legend">{definitions.map((item, index) => <button type="button" key={item.id} aria-pressed={!hiddenSeries.includes(item.id)} onClick={() => toggleSeries(item.id)}><span style={{ background: item.color ?? colors[index % colors.length] }} />{item.label ?? item.id}</button>)}</div>
  </figure>;
  const focused = flat[Math.min(focus, flat.length - 1)];
  const setViewport = (next: { x?: ChartDomain; y?: ChartDomain }) => {
    if (controlledViewport === undefined) setUncontrolledViewport(next);
    sync?.set({ viewport: next });
    onViewportChange?.(next);
  };
  const axisEnabled = (value: boolean | 'x' | 'y' | 'xy' | undefined, axis: 'x' | 'y') => value === true || value === 'xy' || value === axis;
  const pointFromEvent = (event: Pick<React.PointerEvent<HTMLDivElement>, 'currentTarget' | 'clientX' | 'clientY'>): readonly [number, number] => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return [((event.clientX - bounds.left) / bounds.width) * width, ((event.clientY - bounds.top) / bounds.height) * height];
  };
  const finishSelection = (point: readonly [number, number]) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    pointerLast.current = null;
    if (!start || !interaction || !axisEnabled(interaction.brush, 'x') && !axisEnabled(interaction.brush, 'y')) return;
    const next = selectionFromPoints(start, point);
    if (!next) return;
    setSelection(next);
    onSelectionChange?.(next);
    sync?.set({ selection: next });
    const selected = flat.filter((item) => (!axisEnabled(interaction.brush, 'x') || item.x >= next.start[0] && item.x <= next.end[0]) && (!axisEnabled(interaction.brush, 'y') || item.y >= next.start[1] && item.y <= next.end[1])).map((item) => item.datum);
    onSelectedDataChange?.([...new Set(selected)]);
    const nextViewport = { ...viewport };
    if (axisEnabled(interaction.brush, 'x')) nextViewport.x = domainFromSelection(fullX, [next.start[0], next.end[0]], [layout.left, layout.left + layout.plotWidth]);
    if (axisEnabled(interaction.brush, 'y')) nextViewport.y = domainFromSelection(fullY, [next.start[1], next.end[1]], [layout.top + layout.plotHeight, layout.top]);
    setViewport(nextViewport);
  };
  const resizeSelection = (point: readonly [number, number]) => {
    const handle = brushHandle.current;
    if (!handle || !selection || !interaction) return;
    const next = resizeChartSelection(selection, handle, point);
    setSelection(next);
    onSelectionChange?.(next);
    sync?.set({ selection: next });
    const selected = flat.filter((item) => (!axisEnabled(interaction.brush, 'x') || item.x >= next.start[0] && item.x <= next.end[0]) && (!axisEnabled(interaction.brush, 'y') || item.y >= next.start[1] && item.y <= next.end[1])).map((item) => item.datum);
    onSelectedDataChange?.([...new Set(selected)]);
    const nextViewport = { ...viewport };
    if (axisEnabled(interaction.brush, 'x')) nextViewport.x = domainFromSelection(fullX, [next.start[0], next.end[0]], [layout.left, layout.left + layout.plotWidth]);
    if (axisEnabled(interaction.brush, 'y')) nextViewport.y = domainFromSelection(fullY, [next.start[1], next.end[1]], [layout.top + layout.plotHeight, layout.top]);
    setViewport(nextViewport);
  };
  const brushHandleFromPoint = (point: readonly [number, number]): ChartBrushHandle | null => {
    if (!selection || !interaction) return null;
    const candidates: readonly [ChartBrushHandle, readonly [number, number]][] = [
      ['start', selection.start], ['end', [selection.end[0], selection.start[1]]],
      ['start-y', [selection.start[0], selection.end[1]]], ['end-y', selection.end],
    ];
    return candidates.find(([, handlePoint]) => Math.hypot(point[0] - handlePoint[0], point[1] - handlePoint[1]) <= 12)?.[0] ?? null;
  };
  const moveViewport = (point: readonly [number, number]) => {
    const previous = pointerLast.current;
    if (!previous || !interaction) return;
    const next = { ...viewport };
    if (axisEnabled(interaction.pan, 'x')) next.x = clampDomain(panDomain(resolvedX, -(point[0] - previous[0]) / (layout.plotWidth || 1)), fullX);
    if (axisEnabled(interaction.pan, 'y')) next.y = clampDomain(panDomain(resolvedY, (point[1] - previous[1]) / (layout.plotHeight || 1)), fullY);
    pointerLast.current = point;
    if (next.x !== viewport.x || next.y !== viewport.y) setViewport(next);
  };
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!interaction || !axisEnabled(interaction.zoom, 'x') && !axisEnabled(interaction.zoom, 'y')) return;
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.2 : 1 / 1.2;
    const point = pointFromEvent(event);
    const next = { ...viewport };
    if (axisEnabled(interaction.zoom, 'x')) next.x = clampDomain(zoomDomain(resolvedX, factor, domainFromSelection(resolvedX, [point[0], point[0]], [layout.left, layout.left + layout.plotWidth])[0]), fullX);
    if (axisEnabled(interaction.zoom, 'y')) next.y = clampDomain(zoomDomain(resolvedY, factor, domainFromSelection(resolvedY, [point[1], point[1]], [layout.top + layout.plotHeight, layout.top])[0]), fullY);
    setViewport(next);
  };
  const focusFromPointer = (event: Pick<React.MouseEvent<HTMLDivElement>, 'currentTarget' | 'clientX' | 'clientY'>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = ((event.clientX - bounds.left) / bounds.width) * width;
    const y = ((event.clientY - bounds.top) / bounds.height) * height;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    flat.forEach((point, index) => {
      const nextDistance = Math.hypot(point.x - x, point.y - y);
      if (nextDistance < distance) {
        distance = nextDistance;
        nearest = index;
      }
    });
    setFocus(nearest);
    const point = flat[nearest];
    onPointHover?.(point ? { datum: point.datum, index: point.index, x: point.x, y: point.y, xValue: point.xValue, yValue: point.yValue, radius: point.radius, seriesId: point.series.id } : null);
    if (point) sync?.set({ focused: { seriesId: point.series.id, index: point.index } });
  };
  const pointFromPointerEvent = (event: Pick<React.MouseEvent<HTMLDivElement>, 'currentTarget' | 'clientX' | 'clientY'>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return null;
    const x = ((event.clientX - bounds.left) / bounds.width) * width;
    const y = ((event.clientY - bounds.top) / bounds.height) * height;
    return flat.reduce((nearest, point, index) => Math.hypot(point.x - x, point.y - y) < Math.hypot(flat[nearest]!.x - x, flat[nearest]!.y - y) ? index : nearest, 0);
  };
  const pointInteraction = (index: number): ChartPointInteraction<T> | null => {
    const point = flat[index];
    return point ? { datum: point.datum, index: point.index, x: point.x, y: point.y, xValue: point.xValue, yValue: point.yValue, radius: point.radius, seriesId: point.series.id } : null;
  };
  const ticks = Array.from({ length: 5 }, (_, index) => resolvedY[0] + ((resolvedY[1] - resolvedY[0]) * index) / 4);
  return (
    <figure className="simurgh-chart" data-slot="chart" data-renderer={useCanvas ? 'canvas' : 'svg'} dir={native.dir} aria-labelledby={decorative ? undefined : titleId} aria-describedby={decorative ? undefined : descriptionId} aria-hidden={decorative || undefined} {...native}>
      {!decorative && <><figcaption id={titleId}>{accessibility.title}</figcaption><p id={descriptionId} data-part="description">{accessibility.description} {summary}</p></>}
      <div data-part="viewport" style={{ aspectRatio: `${width} / ${height}` }} onMouseMove={focusFromPointer} onMouseLeave={() => onPointHover?.(null)}
        onClick={(event) => { const index = pointFromPointerEvent(event); const point = index == null ? null : pointInteraction(index); if (point) onPointClick?.(point); }}
        onDoubleClick={(event) => { const index = pointFromPointerEvent(event); const point = index == null ? null : pointInteraction(index); if (point) onPointDoubleClick?.(point); }}
        onContextMenu={(event) => { const index = pointFromPointerEvent(event); const point = index == null ? null : pointInteraction(index); if (point) { event.preventDefault(); onPointContextMenu?.(point); } }} onWheel={handleWheel}
        onPointerDown={(event) => { if (interaction && (axisEnabled(interaction.pan, 'x') || axisEnabled(interaction.pan, 'y') || axisEnabled(interaction.brush, 'x') || axisEnabled(interaction.brush, 'y'))) { const point = pointFromEvent(event); brushHandle.current = axisEnabled(interaction.brush, 'x') || axisEnabled(interaction.brush, 'y') ? brushHandleFromPoint(point) : null; pointerStart.current = brushHandle.current ? null : point; pointerLast.current = point; event.currentTarget.setPointerCapture(event.pointerId); } }}
        onPointerMove={(event) => { const point = pointFromEvent(event); if (brushHandle.current) resizeSelection(point); else if (pointerStart.current && interaction && (axisEnabled(interaction.pan, 'x') || axisEnabled(interaction.pan, 'y'))) moveViewport(point); }}
        onPointerUp={(event) => { const point = pointFromEvent(event); if (brushHandle.current) { resizeSelection(point); brushHandle.current = null; pointerLast.current = null; } else if (pointerStart.current && interaction && (axisEnabled(interaction.brush, 'x') || axisEnabled(interaction.brush, 'y'))) finishSelection(point); else { pointerStart.current = null; pointerLast.current = null; } }}
        onPointerCancel={() => { pointerStart.current = null; pointerLast.current = null; brushHandle.current = null; }}>
        {useCanvas && <canvas ref={canvas} width={width} height={height} aria-hidden="true" />}
        <svg viewBox={`0 0 ${width} ${height}`} data-part="plot" aria-hidden="true">
          <g data-part="grid">{ticks.map((tick) => <line key={tick} x1={layout.left} x2={layout.left + layout.plotWidth} y1={yMap(tick)} y2={yMap(tick)} />)}</g>
          <g data-part="y-axis">{ticks.map((tick) => <text key={tick} x={layout.left - 8} y={yMap(tick)}>{axisNumberFormatter.format(tick)}</text>)}</g>
          {!useCanvas && prepared.map((item, seriesIndex) => <SeriesMarks key={item.id} item={item} index={seriesIndex} baseline={horizontalBars ? horizontalValueMap(0) : yMap(0)} bandwidth={xBand?.bandwidth ?? 8} orientation={orientation} />)}
          {focused && <g data-part="crosshair"><line x1={focused.x} x2={focused.x} y1={layout.top} y2={layout.top + layout.plotHeight} /><circle cx={focused.x} cy={focused.y} r="4" /></g>}
          {selection && <g data-part="brush"><rect x={selection.start[0]} y={selection.start[1]} width={selection.end[0] - selection.start[0]} height={selection.end[1] - selection.start[1]} /><rect data-part="brush-handle" x={selection.start[0] - 4} y={selection.start[1] - 4} width="8" height="8" /><rect data-part="brush-handle" x={selection.end[0] - 4} y={selection.start[1] - 4} width="8" height="8" /><rect data-part="brush-handle" x={selection.start[0] - 4} y={selection.end[1] - 4} width="8" height="8" /><rect data-part="brush-handle" x={selection.end[0] - 4} y={selection.end[1] - 4} width="8" height="8" /></g>}
        </svg>
        <button type="button" data-part="keyboard-target" aria-label="Explore chart data" onKeyDown={(event) => {
          if (event.key === 'Home') setFocus(0); else if (event.key === 'End') setFocus(flat.length - 1); else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) setFocus((value) => Math.max(0, value - 1)); else if (['ArrowRight', 'ArrowDown'].includes(event.key)) setFocus((value) => Math.min(flat.length - 1, value + 1)); else return;
          event.preventDefault();
        }} />
        {interaction && (axisEnabled(interaction.zoom, 'x') || axisEnabled(interaction.zoom, 'y') || axisEnabled(interaction.pan, 'x') || axisEnabled(interaction.pan, 'y') || axisEnabled(interaction.brush, 'x') || axisEnabled(interaction.brush, 'y')) && <button type="button" data-part="reset-viewport" onClick={() => { setViewport({}); setSelection(null); sync?.set({ selection: null, focused: null }); onSelectionChange?.(null); onSelectedDataChange?.([]); }}>Reset view</button>}
        {focused && <div role="tooltip" data-part="tooltip">{focused.series.label ?? focused.series.id}: {focused.yValue}</div>}
      </div>
      <div data-part="legend">{definitions.map((item, index) => <button type="button" key={item.id} aria-pressed={!hiddenSeries.includes(item.id)} onClick={() => toggleSeries(item.id)}><span style={{ background: item.color ?? colors[index % colors.length] }} />{item.label ?? item.id}</button>)}</div>
      {table && <ChartDataTable data={data} pageSize={typeof table === 'object' ? table.pageSize ?? 50 : 50} columns={[{ label: 'Category', value: x }, ...definitions.map((item) => ({ label: item.label ?? item.id, value: item.y }))]} />}
    </figure>
  );
}

function SeriesMarks<T>({ item, index, baseline, bandwidth, orientation }: { item: PreparedSeries<T>; index: number; baseline: number; bandwidth: number; orientation: string }) {
  const color = item.color ?? colors[index % colors.length];
  const points = item.points.map((point) => [point.x, point.y] as const);
  if (item.type === 'line') return <path data-part="series" data-series={item.id} d={linePath(points)} fill="none" stroke={color} />;
  if (item.type === 'area') return <path data-part="series" data-series={item.id} d={item.stack ? stackedAreaPath(item.points.map((point) => ({ x: point.x, y0: point.y0, y1: point.y }))) : areaPath(points, baseline)} fill={color} stroke={color} />;
  if (item.type === 'bar') return <g data-part="series" data-series={item.id}>{item.points.map((point) => { const origin = item.stack ? point.y0 : baseline; return orientation === 'horizontal'
    ? <rect key={point.index} x={Math.min(point.x, origin)} y={point.y - bandwidth / 2} width={Math.abs(origin - point.x)} height={bandwidth} fill={color} />
    : <rect key={point.index} x={point.x - bandwidth / 2} y={Math.min(point.y, origin)} width={bandwidth} height={Math.abs(origin - point.y)} fill={color} />; })}</g>;
  if (item.type === 'heatmap') return <g data-part="series" data-series={item.id}>{item.points.map((point) => <rect key={point.index} x={point.x - 5} y={point.y - 5} width="10" height="10" fill={color} style={{ opacity: Math.min(1, Math.max(0.15, point.radius / 10)) }} />)}</g>;
  return <g data-part="series" data-series={item.id}>{item.points.map((point) => <circle key={point.index} cx={point.x} cy={point.y} r={item.type === 'bubble' ? point.radius : 3} fill={color} />)}</g>;
}

function PolarChart<T>({ donut = false, ...props }: ChartProps<T> & { donut?: boolean }) {
  const { data: inputData, stream, x = ((_, index) => index), y, series, accessibility, width = 360, height = 360, innerRadius, emptyContent = 'No chart data', ...native } = props;
  const data = useChartRows(inputData, stream, width);
  const value = y ?? series?.[0]?.y;
  if (!value) throw new TypeError('Pie and donut charts require a y accessor or series.');
  const radius = Math.max(0, Math.min(width, height) / 2 - 16);
  const resolvedInnerRadius = donut ? innerRadius ?? radius * 0.55 : innerRadius ?? 0;
  const arcs = pieArcs(data, value, radius, resolvedInnerRadius);
  const titleId = `${useId()}-title`;
  const [focus, setFocus] = useState(0);
  const decorative = 'decorative' in accessibility && accessibility.decorative;
  if (!arcs.length) return <figure className="simurgh-chart" data-state="empty" {...native}>{emptyContent}</figure>;
  const focused = arcs[Math.min(focus, arcs.length - 1)]!;
  const focusFromMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const localX = ((event.clientX - bounds.left) / bounds.width) * width - width / 2;
    const localY = ((event.clientY - bounds.top) / bounds.height) * height - height / 2;
    if (Math.hypot(localX, localY) < resolvedInnerRadius) return;
    let angle = Math.atan2(localY, localX) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    const next = arcs.findIndex((arc) => angle >= arc.startAngle + Math.PI / 2 && angle < arc.endAngle + Math.PI / 2);
    if (next >= 0) setFocus(next);
  };
  const label = String(chartValue(focused.datum, x, focused.index) ?? focused.index + 1);
  return <figure className="simurgh-chart" data-slot="chart" aria-labelledby={decorative ? undefined : titleId} aria-hidden={decorative || undefined} {...native}>
    {!decorative && <figcaption id={titleId}>{accessibility.title}</figcaption>}
    <div data-part="viewport" style={{ aspectRatio: `${width} / ${height}` }} onMouseMove={focusFromMouse}>
      <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`} data-part="plot" aria-hidden="true">{arcs.map((arc, index) => <path key={arc.index} data-part="series" d={arc.path} fill={colors[index % colors.length]} style={{ opacity: index === focus ? 1 : 0.7 }} />)}</svg>
      <button type="button" data-part="keyboard-target" aria-label="Explore chart data" onKeyDown={(event) => {
        if (event.key === 'Home') setFocus(0); else if (event.key === 'End') setFocus(arcs.length - 1); else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) setFocus((current) => Math.max(0, current - 1)); else if (['ArrowRight', 'ArrowDown'].includes(event.key)) setFocus((current) => Math.min(arcs.length - 1, current + 1)); else return;
        event.preventDefault();
      }} />
      <div role="tooltip" data-part="tooltip">{label}: {focused.value}</div>
    </div>
    {!decorative && <p data-part="description">{accessibility.description} {chartSummary(arcs.map((arc) => arc.value), 'Slices')}</p>}
  </figure>;
}

export function LineChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="line" />; }
export function AreaChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="area" />; }
export function BarChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="bar" xScale={props.xScale ?? 'band'} />; }
export function ScatterChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="scatter" />; }
export function BubbleChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="bubble" />; }
export function HeatmapChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="heatmap" />; }
export function ComboChart<T>(props: ChartProps<T>) { return <CartesianChart {...props} kind="combo" />; }
export function PieChart<T>(props: ChartProps<T>) { return <PolarChart {...props} />; }
export function DonutChart<T>(props: ChartProps<T>) { return <PolarChart {...props} donut />; }
export function RadarChart<T>(props: ChartProps<T>) {
  const { data: inputData, stream, x = ((_, index) => index), y, series, accessibility, width = 360, height = 360, emptyContent = 'No chart data', ...native } = props;
  const data = useChartRows(inputData, stream, width);
  const value = y ?? series?.[0]?.y;
  const values = value ? data.map((datum, index) => numericValue(chartValue(datum, value, index))).filter((item): item is number => item != null) : [];
  const decorative = 'decorative' in accessibility && accessibility.decorative;
  const radius = Math.min(width, height) / 2 - 24;
  const labels = values.map((_, index) => String(chartValue(data[index]!, x, index) ?? index + 1));
  return <figure className="simurgh-chart" data-slot="chart" data-state={values.length ? undefined : 'empty'} aria-hidden={decorative || undefined} {...native}>{values.length ? <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`} data-part="plot" aria-hidden="true"><g data-part="radar-axes">{labels.map((label, index) => { const angle = -Math.PI / 2 + (index / Math.max(1, values.length)) * Math.PI * 2; const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius; const labelX = Math.cos(angle) * (radius + 16); const labelY = Math.sin(angle) * (radius + 16); return <g key={`${label}-${index}`}><line x1="0" y1="0" x2={x} y2={y} /><text data-part="axis-label" x={labelX} y={labelY} textAnchor={Math.abs(labelX) < 1 ? 'middle' : labelX > 0 ? 'start' : 'end'}>{label}</text></g>; })}</g><polygon data-part="series" points={radarPoints(values, radius)} fill={colors[0]} stroke={colors[0]} /></svg> : emptyContent}{!decorative && <><figcaption>{accessibility.title}</figcaption><p data-part="description">{accessibility.description} {chartSummary(values)}</p></>}</figure>;
}
