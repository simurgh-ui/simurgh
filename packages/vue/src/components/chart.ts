import {
  areaPath,
  bandScale,
  chartDomain,
  chartTicks,
  chartLayout,
  chartSummary,
  chartValue,
  linePath,
  linearScale,
  logScale,
  numericValue,
  pieArcs,
  radarPoints,
  stackChartValues,
  stackedAreaPath,
  type ChartAccessibility,
  type ChartAxisConfig,
  type ChartAccessor,
  type ChartSeries,
  type ChartSeriesType,
  type ChartDomain,
  type ChartTooltipMode,
  type ChartTooltipTrigger,
  type ChartValue,
  formatChartValue,
  type ChartTooltipPosition,
} from '@simurgh-ui/core/charts';
import { chartInteractionKey, clampDomain, domainFromSelection, panDomain, pinchZoomDomain, resizeChartSelection, zoomDomain, type ChartBrushHandle, type ChartSync } from '@simurgh-ui/core/chart-interactions';
import { defineComponent, h, nextTick, onBeforeUnmount, ref, watch, type PropType } from 'vue';
import type { CanvasMark } from '@simurgh-ui/core/chart-canvas';
import type { ChartStream } from '@simurgh-ui/core/chart-stream';

type Datum = Record<PropertyKey, unknown>;
export type ChartPointInteraction<T = Datum> = { datum: T; index: number; x: number; y: number; xValue: string | number | Date; yValue: number; radius: number; seriesId: string };
const accessor = [String, Function] as PropType<ChartAccessor<Datum>>;
const numericAccessor = [String, Function] as PropType<ChartAccessor<Datum, number>>;
const colors = Array.from({ length: 10 }, (_, index) => `hsl(var(--simurgh-chart-${index + 1}))`);
const commonProps = {
  data: { type: Array as PropType<readonly Datum[]>, default: () => [] },
  stream: Object as PropType<ChartStream<string>>,
  x: accessor,
  y: numericAccessor,
  xDomain: Object as PropType<ChartDomain>,
  yDomain: Object as PropType<ChartDomain>,
  xAxis: Object as PropType<ChartAxisConfig>,
  yAxis: Object as PropType<ChartAxisConfig>,
  viewport: Object as PropType<{ x?: ChartDomain; y?: ChartDomain }>,
  defaultViewport: Object as PropType<{ x?: ChartDomain; y?: ChartDomain }>,
  interaction: Object as PropType<{ zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy' }>,
  sync: Object as PropType<ChartSync>,
  onPointHover: Function as PropType<(point: ChartPointInteraction | null) => void>,
  onPointClick: Function as PropType<(point: ChartPointInteraction) => void>,
  onPointDoubleClick: Function as PropType<(point: ChartPointInteraction) => void>,
  onPointContextMenu: Function as PropType<(point: ChartPointInteraction) => void>,
  onSelectedDataChange: Function as PropType<(data: readonly Datum[]) => void>,
  onXDomainChange: Function as PropType<(domain: ChartDomain) => void>,
  onYDomainChange: Function as PropType<(domain: ChartDomain) => void>,
  tooltipMode: { type: String as PropType<ChartTooltipMode>, default: 'nearest' },
  tooltipTrigger: { type: String as PropType<ChartTooltipTrigger>, default: 'always' },
  tooltipPosition: { type: String as PropType<ChartTooltipPosition>, default: 'static' },
  tooltipFormatter: Function as PropType<(point: ChartPointInteraction) => string>,
  tooltipContent: Function as PropType<(points: readonly ChartPointInteraction[]) => string>,
  series: Array as PropType<readonly ChartSeries<Datum>[]>,
  accessibility: { type: Object as PropType<ChartAccessibility>, required: true as const },
  width: { type: Number, default: 640 },
  height: { type: Number, default: 360 },
  xScale: { type: String as PropType<'linear' | 'time' | 'band' | 'log'>, default: 'linear' },
  yScale: { type: String as PropType<'linear' | 'time' | 'log'>, default: 'linear' },
  renderMode: { type: String as PropType<'auto' | 'svg' | 'canvas'>, default: 'auto' },
  canvasThreshold: { type: Number, default: 2000 },
  hiddenSeries: Array as PropType<readonly string[]>,
  defaultHiddenSeries: { type: Array as PropType<readonly string[]>, default: () => [] },
  innerRadius: Number,
  emptyContent: { type: String, default: 'No chart data' },
};

function useRows(props: { data: readonly Datum[]; stream: ChartStream<string> | undefined; width: number }) {
  const version = ref(0);
  let unsubscribe: (() => void) | undefined;
  watch(() => props.stream, (stream) => {
    unsubscribe?.();
    unsubscribe = stream?.subscribe(() => version.value++);
  }, { immediate: true });
  onBeforeUnmount(() => unsubscribe?.());
  return () => {
    void version.value;
    if (!props.stream) return props.data;
    if (props.data.length) throw new TypeError('Chart accepts either data or stream, not both.');
    const snapshot = props.stream.snapshot();
    const limit = Math.max(2, Math.floor(props.width * 2));
    const step = Math.max(1, Math.ceil(snapshot.length / limit));
    const indexes = Array.from({ length: Math.ceil(snapshot.length / step) }, (_, index) => index * step);
    if (snapshot.length && indexes.at(-1) !== snapshot.length - 1) indexes.push(snapshot.length - 1);
    return indexes.map((index) => Object.fromEntries(props.stream!.dimensions.map((key) => [key, snapshot.columns[key]![index]])) as Datum);
  };
}

function cartesian(kind: ChartSeriesType | 'combo') {
  return defineComponent({
    name: `Simurgh${kind[0]!.toUpperCase()}${kind.slice(1)}Chart`,
    inheritAttrs: false,
    props: commonProps,
    emits: ['update:hiddenSeries', 'update:viewport', 'update:selection'],
    setup(props, { attrs, emit }) {
      const focused = ref(0);
      const tablePage = ref(0);
      const uncontrolledHiddenSeries = ref<readonly string[]>([...props.defaultHiddenSeries]);
      const uncontrolledViewport = ref(props.viewport ?? props.defaultViewport ?? props.sync?.state.viewport ?? {});
      const selection = ref<{ start: readonly [number, number]; end: readonly [number, number] } | null>(null);
      const tooltipVisible = ref(props.tooltipTrigger !== 'hover' && props.tooltipTrigger !== 'click');
      const tooltipIntersected = ref(true);
      const tooltipPoint = ref<readonly [number, number] | null>(null);
      const pointerStart = ref<readonly [number, number] | null>(null);
      const pointerLast = ref<readonly [number, number] | null>(null);
      const brushHandle = ref<ChartBrushHandle | null>(null);
      const pointers = new Map<number, readonly [number, number]>();
      const pinchStart = ref<number | null>(null);
      const zoomDrag = ref(false);
      const canvas = ref<HTMLCanvasElement>();
      let drawn = '';
      let unsubscribeSync: (() => void) | undefined;
      watch(() => props.sync, (sync) => {
        unsubscribeSync?.();
        unsubscribeSync = sync?.subscribe((state) => {
          if (props.viewport === undefined) uncontrolledViewport.value = state.viewport;
          selection.value = state.selection;
          if (state.focused) focused.value = Math.max(0, state.focused.index);
        });
      }, { immediate: true });
      onBeforeUnmount(() => unsubscribeSync?.());
      const rowsForChart = useRows(props);
      return () => {
        const rows = rowsForChart();
        const layout = chartLayout(props.width, props.height);
        const xAccessor = props.x ?? ((_: Datum, index: number) => index);
        const definitions: readonly ChartSeries<Datum>[] = props.series?.length
          ? props.series
          : props.y ? [{ id: 'value', y: props.y, x: xAccessor, type: kind === 'combo' ? 'line' : kind }] : [];
        const hiddenSeries = props.hiddenSeries ?? uncontrolledHiddenSeries.value;
        const active = definitions.filter((item) => !hiddenSeries.includes(item.id));
        const unstacked = active.flatMap((definition) => rows.map((datum, index) => {
          const xValue = chartValue(datum, definition.x ?? xAccessor, index);
          const yValue = numericValue(chartValue(datum, definition.y, index));
          const numericX = numericValue(xValue);
          return xValue == null || yValue == null || (props.xScale !== 'band' && numericX == null) || (props.yScale === 'log' && yValue <= 0)
            ? null : { datum, index, xValue, numericX: numericX ?? index, yValue, definition, radius: numericValue(definition.radius ? chartValue(datum, definition.radius, index) : 4) ?? 4 };
        }).filter((item): item is NonNullable<typeof item> => item != null));
        const raw = stackChartValues(unstacked.map((item) => ({ ...item, stack: item.definition.stack, x: item.xValue, value: item.yValue })));
        if (!raw.length) return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-state': 'empty' }, [
          h('div', { 'data-part': 'empty' }, props.emptyContent),
          h('div', { 'data-part': 'legend' }, definitions.map((item, index) => h('button', { type: 'button', 'aria-pressed': !hiddenSeries.includes(item.id), onClick: () => { const next = hiddenSeries.includes(item.id) ? hiddenSeries.filter((id) => id !== item.id) : [...hiddenSeries, item.id]; if (props.hiddenSeries === undefined) uncontrolledHiddenSeries.value = next; emit('update:hiddenSeries', next); } }, [h('span', { style: { background: item.color ?? colors[index % colors.length] } }), item.label ?? item.id]))),
        ]);
        const fullX = props.xDomain ?? chartDomain(raw.map((item) => item.numericX)) ?? [0, 1];
        const fullY = props.yDomain ?? chartDomain(raw.flatMap((item) => [item.start, item.end]), { includeZero: active.some((item) => item.type === 'bar' || kind === 'bar') }) ?? [0, 1];
        const secondaryFullY = chartDomain(raw.filter((item) => item.definition.axis === 'end').flatMap((item) => [item.start, item.end]), { includeZero: true }) ?? fullY;
        const viewport = props.viewport ?? uncontrolledViewport.value;
        const xDomain = viewport.x ?? fullX;
        const yDomain = viewport.y ?? fullY;
        const bands = props.xScale === 'band' ? bandScale(raw.map((item) => item.xValue), [layout.left, layout.left + layout.plotWidth]) : null;
        const numericXMap = (props.xScale === 'log' ? logScale : linearScale)(xDomain, [layout.left, layout.left + layout.plotWidth]);
        const yMap = (props.yScale === 'log' ? logScale : linearScale)(yDomain, [layout.top + layout.plotHeight, layout.top]);
        const secondaryYMap = (props.yScale === 'log' ? logScale : linearScale)(secondaryFullY, [layout.top + layout.plotHeight, layout.top]);
        const prepared = active.map((definition) => ({ ...definition, type: definition.type ?? (kind === 'combo' ? 'line' : kind), points: raw.filter((item) => item.definition === definition).map((item) => ({ ...item, x: bands ? bands.map(item.xValue) + bands.bandwidth / 2 : numericXMap(item.numericX), y: (definition.axis === 'end' ? secondaryYMap : yMap)(item.end), y0: (definition.axis === 'end' ? secondaryYMap : yMap)(item.start) })) }));
        const flat = prepared.flatMap((item) => item.points.map((point) => ({ ...point, series: item })));
        const useCanvas = props.renderMode === 'canvas' || (props.renderMode === 'auto' && flat.length > props.canvasThreshold);
        const decorative = 'decorative' in props.accessibility && props.accessibility.decorative;
        const table = !decorative && props.accessibility.table;
        const pageSize = typeof table === 'object' ? table.pageSize ?? 50 : 50;
        const tablePages = Math.max(1, Math.ceil(rows.length / pageSize));
        const current = flat[Math.min(focused.value, flat.length - 1)]!;
      const tooltipPoints = props.tooltipMode === 'none' ? [] : props.tooltipMode === 'nearest' ? (current ? [current] : []) : props.tooltipMode === 'intersect' ? (tooltipIntersected.value && current ? [current] : []) : current ? flat.filter((item) => item.index === current.index) : [];
        const tooltipInteractions = tooltipPoints.map((item) => ({ datum: item.datum, index: item.index, x: item.x, y: item.y, xValue: item.xValue, yValue: item.yValue, radius: item.radius, seriesId: item.definition.id }));
        const xTicks = chartTicks(fullX, props.xAxis?.ticks ?? 5);
        const yTicks = chartTicks(fullY, props.yAxis?.ticks ?? 5);
        const formatTick = (value: ChartValue, axis: ChartAxisConfig | undefined) => axis?.tickFormatter?.(value) ?? formatChartValue(value, axis?.locale);
        const axisNodes = [h('g', { 'data-part': 'grid' }, props.yAxis?.grid === false ? [] : yTicks.map((tick) => h('line', { x1: layout.left, x2: layout.left + layout.plotWidth, y1: yMap(tick), y2: yMap(tick) }))), h('g', { 'data-part': 'y-axis' }, yTicks.map((tick) => h('text', { x: layout.left - 8, y: yMap(tick), 'text-anchor': 'end' }, formatTick(tick, props.yAxis)))), h('g', { 'data-part': 'x-axis' }, xTicks.map((tick) => h('text', { x: numericXMap(tick), y: layout.top + layout.plotHeight + 20, 'text-anchor': 'middle', transform: props.xAxis?.tickRotation ? `rotate(${props.xAxis.tickRotation} ${numericXMap(tick)} ${layout.top + layout.plotHeight + 20})` : undefined }, formatTick(tick, props.xAxis)))), props.xAxis?.title && h('text', { x: layout.left + layout.plotWidth / 2, y: props.height - 4, 'text-anchor': 'middle' }, props.xAxis.title), props.yAxis?.title && h('text', { x: 16, y: layout.top + layout.plotHeight / 2, transform: `rotate(-90 16 ${layout.top + layout.plotHeight / 2})` }, props.yAxis.title)].filter(Boolean);
        const axisEnabled = (value: boolean | 'x' | 'y' | 'xy' | undefined, axis: 'x' | 'y') => value === true || value === 'xy' || value === axis;
        const pointFromEvent = (event: Pick<PointerEvent, 'currentTarget' | 'clientX' | 'clientY'>): readonly [number, number] => {
          const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
          return [((event.clientX - bounds.left) / bounds.width) * props.width, ((event.clientY - bounds.top) / bounds.height) * props.height];
        };
        const pointIndexFromEvent = (event: Pick<MouseEvent, 'currentTarget' | 'clientX' | 'clientY'>) => {
          const point = pointFromEvent(event as PointerEvent);
          return flat.reduce((nearest, item, index) => Math.hypot(item.x - point[0], item.y - point[1]) < Math.hypot(flat[nearest]!.x - point[0], flat[nearest]!.y - point[1]) ? index : nearest, 0);
        };
        const interactionPoint = (index: number): ChartPointInteraction | null => {
          const point = flat[index];
          return point ? { datum: point.datum, index: point.index, x: point.x, y: point.y, xValue: point.xValue, yValue: point.yValue, radius: point.radius, seriesId: point.definition.id } : null;
        };
        const setViewport = (next: { x?: ChartDomain; y?: ChartDomain }) => {
          if (props.viewport === undefined) uncontrolledViewport.value = next;
          props.sync?.set({ viewport: next });
          emit('update:viewport', next);
          if (next.x) props.onXDomainChange?.(next.x);
          if (next.y) props.onYDomainChange?.(next.y);
        };
        const brushHandleFromPoint = (point: readonly [number, number]): ChartBrushHandle | null => {
          if (!selection.value || !props.interaction) return null;
          const candidates: readonly [ChartBrushHandle, readonly [number, number]][] = [['start', selection.value.start], ['end', [selection.value.end[0], selection.value.start[1]]], ['start-y', [selection.value.start[0], selection.value.end[1]]], ['end-y', selection.value.end]];
          return candidates.find(([, item]) => Math.hypot(point[0] - item[0], point[1] - item[1]) <= 12)?.[0] ?? null;
        };
        const applySelection = (nextSelection: { start: readonly [number, number]; end: readonly [number, number] }) => {
          selection.value = nextSelection;
          emit('update:selection', nextSelection);
          props.sync?.set({ selection: nextSelection });
          const selected = flat.filter((item) => (!axisEnabled(props.interaction?.brush, 'x') || item.x >= nextSelection.start[0] && item.x <= nextSelection.end[0]) && (!axisEnabled(props.interaction?.brush, 'y') || item.y >= nextSelection.start[1] && item.y <= nextSelection.end[1])).map((item) => item.datum);
          props.onSelectedDataChange?.([...new Set(selected)]);
          const next = { ...viewport };
          if (axisEnabled(props.interaction?.brush, 'x')) next.x = domainFromSelection(fullX, [nextSelection.start[0], nextSelection.end[0]], [layout.left, layout.left + layout.plotWidth]);
          if (axisEnabled(props.interaction?.brush, 'y')) next.y = domainFromSelection(fullY, [nextSelection.start[1], nextSelection.end[1]], [layout.top + layout.plotHeight, layout.top]);
          setViewport(next);
        };
        const onMouseMove = (event: MouseEvent) => {
          const index = pointIndexFromEvent(event);
          const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
          tooltipPoint.value = [((event.clientX - bounds.left) / bounds.width) * props.width, ((event.clientY - bounds.top) / bounds.height) * props.height];
          const nearestPoint = flat[index];
          tooltipIntersected.value = Boolean(nearestPoint && Math.hypot(nearestPoint.x - tooltipPoint.value[0], nearestPoint.y - tooltipPoint.value[1]) <= Math.max(nearestPoint.radius, 8));
          focused.value = index;
          props.onPointHover?.(interactionPoint(index));
          if (props.tooltipTrigger === 'hover') tooltipVisible.value = true;
          const point = interactionPoint(index);
          if (point) props.sync?.set({ focused: { seriesId: point.seriesId, index: point.index } });
        };
        const onPointerMove = (event: PointerEvent) => {
          const point = pointFromEvent(event);
          if (pointers.has(event.pointerId)) pointers.set(event.pointerId, point);
          if (pinchStart.value && pointers.size >= 2 && props.interaction) {
            const values = [...pointers.values()];
            const distance = Math.hypot(values[1]![0] - values[0]![0], values[1]![1] - values[0]![1]);
            const midpoint: readonly [number, number] = [(values[0]![0] + values[1]![0]) / 2, (values[0]![1] + values[1]![1]) / 2];
            const next = { ...viewport };
            if (axisEnabled(props.interaction.zoom, 'x')) next.x = clampDomain(pinchZoomDomain(viewport.x ?? fullX, pinchStart.value, distance, domainFromSelection(viewport.x ?? fullX, [midpoint[0], midpoint[0]], [layout.left, layout.left + layout.plotWidth])[0]), fullX);
            if (axisEnabled(props.interaction.zoom, 'y')) next.y = clampDomain(pinchZoomDomain(viewport.y ?? fullY, pinchStart.value, distance, domainFromSelection(viewport.y ?? fullY, [midpoint[1], midpoint[1]], [layout.top + layout.plotHeight, layout.top])[0]), fullY);
            setViewport(next);
            return;
          }
          const previous = pointerLast.value;
          if (!previous || !props.interaction) return;
          if (brushHandle.value && selection.value) { applySelection(resizeChartSelection(selection.value, brushHandle.value, point)); return; }
          const next = { ...viewport };
          if (axisEnabled(props.interaction.pan, 'x')) next.x = clampDomain(panDomain(xDomain, -(point[0] - previous[0]) / (layout.plotWidth || 1)), fullX);
          if (axisEnabled(props.interaction.pan, 'y')) next.y = clampDomain(panDomain(yDomain, (point[1] - previous[1]) / (layout.plotHeight || 1)), fullY);
          pointerLast.value = point;
          setViewport(next);
        };
        const onPointerUp = (event: PointerEvent) => {
          const start = pointerStart.value;
          pointerStart.value = null;
          pointerLast.value = null;
          if (!start || !props.interaction || (!axisEnabled(props.interaction.brush, 'x') && !axisEnabled(props.interaction.brush, 'y'))) return;
          const point = pointFromEvent(event);
          const nextSelection = { start: [Math.min(start[0], point[0]), Math.min(start[1], point[1])] as const, end: [Math.max(start[0], point[0]), Math.max(start[1], point[1])] as const };
          applySelection(nextSelection);
        };
        const finishZoomDrag = (point: readonly [number, number]) => {
          const start = pointerStart.value;
          pointerStart.value = null;
          pointerLast.value = null;
          zoomDrag.value = false;
          if (!start || !props.interaction) return;
          const next = { ...viewport };
          if (axisEnabled(props.interaction.zoom, 'x')) next.x = clampDomain(domainFromSelection(fullX, [start[0], point[0]], [layout.left, layout.left + layout.plotWidth]), fullX);
          if (axisEnabled(props.interaction.zoom, 'y')) next.y = clampDomain(domainFromSelection(fullY, [start[1], point[1]], [layout.top + layout.plotHeight, layout.top]), fullY);
          setViewport(next);
        };
        const onWheel = (event: WheelEvent) => {
          if (!props.interaction || (!axisEnabled(props.interaction.zoom, 'x') && !axisEnabled(props.interaction.zoom, 'y'))) return;
          event.preventDefault();
          const target = event.currentTarget as HTMLElement;
          const bounds = target.getBoundingClientRect();
          const point: readonly [number, number] = [((event.clientX - bounds.left) / bounds.width) * props.width, ((event.clientY - bounds.top) / bounds.height) * props.height];
          const next = { ...viewport };
          if (axisEnabled(props.interaction.zoom, 'x')) next.x = clampDomain(zoomDomain(xDomain, event.deltaY < 0 ? 1.2 : 1 / 1.2, domainFromSelection(xDomain, [point[0], point[0]], [layout.left, layout.left + layout.plotWidth])[0]), fullX);
          if (axisEnabled(props.interaction.zoom, 'y')) next.y = clampDomain(zoomDomain(yDomain, event.deltaY < 0 ? 1.2 : 1 / 1.2, domainFromSelection(yDomain, [point[1], point[1]], [layout.top + layout.plotHeight, layout.top])[0]), fullY);
          if (props.viewport === undefined) uncontrolledViewport.value = next;
          emit('update:viewport', next);
        };
        const onChartKeydown = (event: KeyboardEvent) => {
          if (!props.interaction) return;
          const result = chartInteractionKey(event, { x: xDomain, y: yDomain });
          if (result.clearSelection) { selection.value = null; props.sync?.set({ selection: null }); emit('update:selection', null); props.onSelectedDataChange?.([]); event.preventDefault(); return; }
          const next: { x?: ChartDomain; y?: ChartDomain } = {};
          if (result.viewport.x) next.x = clampDomain(result.viewport.x, fullX);
          if (result.viewport.y) next.y = clampDomain(result.viewport.y, fullY);
          if (next.x || next.y) { setViewport(next); event.preventDefault(); }
        };
        const baseline = yMap(0);
        const seriesNodes = [...axisNodes, ...prepared.map((item, seriesIndex) => {
          const color = item.color ?? colors[seriesIndex % colors.length];
          const points = item.points.map((point) => [point.x, point.y] as const);
          if (item.type === 'line') return h('path', { 'data-part': 'series', 'data-series': item.id, d: linePath(points), fill: 'none', stroke: color });
          if (item.type === 'area') return h('path', { 'data-part': 'series', 'data-series': item.id, d: item.stack ? stackedAreaPath(item.points.map((point) => ({ x: point.x, y0: point.y0, y1: point.y }))) : areaPath(points, baseline), fill: color, stroke: color });
          if (item.type === 'bar') return h('g', { 'data-part': 'series', 'data-series': item.id }, item.points.map((point) => { const origin = item.stack ? point.y0 : baseline; return h('rect', { x: point.x - (bands?.bandwidth ?? 8) / 2, y: Math.min(point.y, origin), width: bands?.bandwidth ?? 8, height: Math.abs(point.y - origin), fill: color }); }));
          return h('g', { 'data-part': 'series', 'data-series': item.id }, item.points.map((point) => h('circle', { cx: point.x, cy: point.y, r: item.type === 'bubble' ? point.radius : 3, fill: color })));
        })];
        if (useCanvas) {
          const signature = `${rows.length}:${prepared.length}:${props.width}:${props.height}`;
          if (signature !== drawn) {
            drawn = signature;
            void nextTick(async () => {
              if (!canvas.value) return;
              const { drawChartCanvas } = await import('@simurgh-ui/core/chart-canvas');
              const context = canvas.value.getContext('2d');
              if (!context) return;
              const marks: CanvasMark[] = prepared.flatMap<CanvasMark>((item, seriesIndex) => {
                const color = item.color ?? colors[seriesIndex % colors.length]!;
                if (item.type === 'line') return [{ type: 'line', points: item.points.map((point) => [point.x, point.y]), color }];
                if (item.type === 'area') return [{ type: 'area', points: item.points.map((point) => [point.x, point.y]), baseline: item.points[0]?.y0 ?? baseline, color, opacity: 0.3 }];
                if (item.type === 'bar') return item.points.map((point) => { const origin = item.stack ? point.y0 : baseline; return { type: 'rect' as const, x: point.x - (bands?.bandwidth ?? 8) / 2, y: Math.min(point.y, origin), width: bands?.bandwidth ?? 8, height: Math.abs(point.y - origin), color }; });
                return item.points.map((point) => ({ type: 'point' as const, x: point.x, y: point.y, radius: item.type === 'bubble' ? point.radius : 3, color }));
              });
              drawChartCanvas(context, marks, props.width, props.height, globalThis.devicePixelRatio || 1);
            });
          }
        }
        return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-renderer': useCanvas ? 'canvas-fallback' : 'svg', 'aria-hidden': decorative || undefined }, [
          !decorative && h('figcaption', props.accessibility.title),
          !decorative && h('p', { 'data-part': 'description' }, `${props.accessibility.description} ${chartSummary(flat.map((item) => item.yValue))}`),
          h('div', { 'data-part': 'viewport', style: { aspectRatio: `${props.width} / ${props.height}` }, onWheel, onMousemove: onMouseMove,
            onMouseleave: () => { tooltipIntersected.value = false; props.onPointHover?.(null); if (props.tooltipTrigger === 'hover') tooltipVisible.value = false; },
            onClick: (event: MouseEvent) => { const point = interactionPoint(pointIndexFromEvent(event)); if (point) { tooltipVisible.value = true; props.onPointClick?.(point); } },
            onDblclick: (event: MouseEvent) => { const point = interactionPoint(pointIndexFromEvent(event)); if (point) props.onPointDoubleClick?.(point); },
            onContextmenu: (event: MouseEvent) => { const point = interactionPoint(pointIndexFromEvent(event)); if (point) { event.preventDefault(); props.onPointContextMenu?.(point); } },
            onPointerdown: (event: PointerEvent) => { const point = pointFromEvent(event); pointers.set(event.pointerId, point); if (pointers.size === 2 && props.interaction && (axisEnabled(props.interaction.zoom, 'x') || axisEnabled(props.interaction.zoom, 'y'))) { const values = [...pointers.values()]; pinchStart.value = Math.hypot(values[1]![0] - values[0]![0], values[1]![1] - values[0]![1]); pointerStart.value = null; pointerLast.value = null; } else if (props.interaction && (axisEnabled(props.interaction.zoom, 'x') || axisEnabled(props.interaction.zoom, 'y') || axisEnabled(props.interaction.pan, 'x') || axisEnabled(props.interaction.pan, 'y') || axisEnabled(props.interaction.brush, 'x') || axisEnabled(props.interaction.brush, 'y'))) { zoomDrag.value = (axisEnabled(props.interaction.zoom, 'x') || axisEnabled(props.interaction.zoom, 'y')) && (!(axisEnabled(props.interaction.pan, 'x') || axisEnabled(props.interaction.pan, 'y')) || event.shiftKey); brushHandle.value = zoomDrag.value ? null : brushHandleFromPoint(point); pointerStart.value = brushHandle.value ? null : point; pointerLast.value = point; } (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId); },
            onPointermove: onPointerMove, onPointerup: (event: PointerEvent) => { pointers.delete(event.pointerId); if (pointers.size < 2) pinchStart.value = null; const point = pointFromEvent(event); if (zoomDrag.value && !(props.interaction && (axisEnabled(props.interaction.brush, 'x') || axisEnabled(props.interaction.brush, 'y')))) finishZoomDrag(point); else if (brushHandle.value) { onPointerMove(event); brushHandle.value = null; pointerLast.value = null; } else onPointerUp(event); }, onPointercancel: () => { pointers.clear(); pinchStart.value = null; zoomDrag.value = false; pointerStart.value = null; pointerLast.value = null; brushHandle.value = null; selection.value = null; props.sync?.set({ selection: null }); emit('update:selection', null); props.onSelectedDataChange?.([]); },
          }, [
            useCanvas && h('canvas', { ref: canvas, width: props.width, height: props.height, 'aria-hidden': 'true' }),
            h('svg', { viewBox: `0 0 ${props.width} ${props.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, [...(useCanvas ? [] : seriesNodes), h('g', { 'data-part': 'crosshair' }, [h('line', { x1: current.x, x2: current.x, y1: layout.top, y2: layout.top + layout.plotHeight }), h('line', { x1: layout.left, x2: layout.left + layout.plotWidth, y1: current.y, y2: current.y }), h('text', { x: current.x + 6, y: layout.top + 14 }, String(current.xValue)), h('text', { x: layout.left + 6, y: current.y - 6 }, String(current.yValue)), h('circle', { cx: current.x, cy: current.y, r: 4 })]), selection.value && h('g', { 'data-part': 'brush' }, [h('rect', { x: selection.value.start[0], y: selection.value.start[1], width: selection.value.end[0] - selection.value.start[0], height: selection.value.end[1] - selection.value.start[1] }), h('rect', { 'data-part': 'brush-handle', x: selection.value.start[0] - 4, y: selection.value.start[1] - 4, width: 8, height: 8 }), h('rect', { 'data-part': 'brush-handle', x: selection.value.end[0] - 4, y: selection.value.start[1] - 4, width: 8, height: 8 }), h('rect', { 'data-part': 'brush-handle', x: selection.value.start[0] - 4, y: selection.value.end[1] - 4, width: 8, height: 8 }), h('rect', { 'data-part': 'brush-handle', x: selection.value.end[0] - 4, y: selection.value.end[1] - 4, width: 8, height: 8 })])]),
            h('button', { type: 'button', 'data-part': 'keyboard-target', 'aria-label': 'Explore chart data', onKeydown: (event: KeyboardEvent) => { if (props.interaction && (['+', '=', '-', 'Escape'].includes(event.key) || event.shiftKey && ['ArrowLeft', 'ArrowRight'].includes(event.key))) { onChartKeydown(event); return; } if (event.key === 'Home') focused.value = 0; else if (event.key === 'End') focused.value = flat.length - 1; else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) focused.value = Math.max(0, focused.value - 1); else if (['ArrowRight', 'ArrowDown'].includes(event.key)) focused.value = Math.min(flat.length - 1, focused.value + 1); else return; tooltipVisible.value = true; event.preventDefault(); } }),
            props.interaction && h('button', { type: 'button', 'data-part': 'reset-viewport', onClick: () => { setViewport({}); selection.value = null; props.sync?.set({ selection: null, focused: null }); emit('update:selection', null); props.onSelectedDataChange?.([]); } }, 'Reset view'),
            tooltipPoints.length && tooltipVisible.value && h('div', { role: 'tooltip', 'data-part': 'tooltip', style: props.tooltipPosition === 'cursor' && tooltipPoint.value ? { position: 'absolute', left: `${tooltipPoint.value[0]}px`, top: `${tooltipPoint.value[1]}px` } : undefined }, props.tooltipContent ? props.tooltipContent(tooltipInteractions) : tooltipPoints.map((item, index) => h('div', { key: `${item.definition.id}:${item.index}` }, props.tooltipFormatter?.(tooltipInteractions[index]!) ?? `${item.definition.label ?? item.definition.id}: ${item.yValue}`))),
          ]),
          h('div', { 'data-part': 'legend' }, definitions.map((item, index) => h('button', { type: 'button', 'aria-pressed': !hiddenSeries.includes(item.id), onClick: () => { const next = hiddenSeries.includes(item.id) ? hiddenSeries.filter((id) => id !== item.id) : [...hiddenSeries, item.id]; if (props.hiddenSeries === undefined) uncontrolledHiddenSeries.value = next; emit('update:hiddenSeries', next); } }, [h('span', { style: { background: item.color ?? colors[index % colors.length] } }), item.label ?? item.id]))),
          table && h('div', { 'data-part': 'data-table' }, [
            h('table', [h('thead', h('tr', [h('th', { scope: 'col' }, 'Category'), ...definitions.map((item) => h('th', { scope: 'col' }, item.label ?? item.id))])), h('tbody', rows.slice(tablePage.value * pageSize, tablePage.value * pageSize + pageSize).map((datum, row) => h('tr', [h('td', String(chartValue(datum, xAccessor, tablePage.value * pageSize + row) ?? '')), ...definitions.map((item) => h('td', String(chartValue(datum, item.y, tablePage.value * pageSize + row) ?? '')))])))]),
            tablePages > 1 && h('nav', { 'aria-label': 'Chart data pages' }, [h('button', { type: 'button', disabled: tablePage.value === 0, onClick: () => tablePage.value-- }, 'Previous'), h('span', `${tablePage.value + 1} / ${tablePages}`), h('button', { type: 'button', disabled: tablePage.value + 1 >= tablePages, onClick: () => tablePage.value++ }, 'Next')]),
          ]),
        ]);
      };
    },
  });
}

function polar(donut: boolean) {
  return defineComponent({
    name: donut ? 'SimurghDonutChart' : 'SimurghPieChart', inheritAttrs: false, props: commonProps,
    setup(props, { attrs }) { const rowsForChart = useRows(props); return () => {
      const rows = rowsForChart();
      const value = props.y ?? props.series?.[0]?.y;
      const radius = Math.min(props.width, props.height) / 2 - 16;
      const arcs = value ? pieArcs(rows, value, radius, donut ? props.innerRadius ?? radius * 0.55 : props.innerRadius ?? 0) : [];
      const decorative = 'decorative' in props.accessibility && props.accessibility.decorative;
      return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-state': arcs.length ? undefined : 'empty', 'aria-hidden': decorative || undefined }, arcs.length ? [!decorative && h('figcaption', props.accessibility.title), h('svg', { viewBox: `${-props.width / 2} ${-props.height / 2} ${props.width} ${props.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, arcs.map((arc, index) => h('path', { 'data-part': 'series', d: arc.path, fill: colors[index % colors.length] }))), !decorative && h('p', { 'data-part': 'description' }, `${props.accessibility.description} ${chartSummary(arcs.map((arc) => arc.value), 'Slices')}`)] : props.emptyContent);
    }; },
  });
}

export const LineChart = cartesian('line');
export const AreaChart = cartesian('area');
export const BarChart = cartesian('bar');
export const ScatterChart = cartesian('scatter');
export const BubbleChart = cartesian('bubble');
export const HeatmapChart = cartesian('heatmap');
export const ComboChart = cartesian('combo');
export const PieChart = polar(false);
export const DonutChart = polar(true);
export const RadarChart = defineComponent({ name: 'SimurghRadarChart', inheritAttrs: false, props: commonProps, setup(props, { attrs }) { const rowsForChart = useRows(props); return () => { const rows = rowsForChart(); const value = props.y ?? props.series?.[0]?.y; const values = value ? rows.map((datum, index) => numericValue(chartValue(datum, value, index))).filter((item): item is number => item != null) : []; const decorative = 'decorative' in props.accessibility && props.accessibility.decorative; return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-state': values.length ? undefined : 'empty', 'aria-hidden': decorative || undefined }, values.length ? [h('svg', { viewBox: `${-props.width / 2} ${-props.height / 2} ${props.width} ${props.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, h('polygon', { 'data-part': 'series', points: radarPoints(values, Math.min(props.width, props.height) / 2 - 24), fill: colors[0], stroke: colors[0] })), !decorative && h('figcaption', props.accessibility.title), !decorative && h('p', { 'data-part': 'description' }, `${props.accessibility.description} ${chartSummary(values)}`)] : props.emptyContent); }; } });

export const ChartRoot = defineComponent({ name: 'SimurghChartRoot', inheritAttrs: false, setup(_, { attrs, slots }) { return () => h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart' }, slots.default?.()); } });
export const ChartPlot = defineComponent({ name: 'SimurghChartPlot', setup(_, { attrs, slots }) { return () => h('svg', { ...attrs, 'data-part': 'plot' }, slots.default?.()); } });
export const ChartGrid = part('g', 'grid');
export const ChartXAxis = part('g', 'x-axis');
export const ChartYAxis = part('g', 'y-axis');
export const ChartLegend = part('div', 'legend');
export const ChartTooltip = part('div', 'tooltip', { role: 'tooltip' });
export const ChartCrosshair = part('g', 'crosshair');
export const ChartBrush = part('rect', 'brush');
function part(tag: string, name: string, defaults: Record<string, unknown> = {}) { return defineComponent({ name: `SimurghChart${name}`, setup(_, { attrs, slots }) { return () => h(tag, { ...defaults, ...attrs, 'data-part': name }, slots.default?.()); } }); }
