# @simurgh-ui/core public API

Version snapshot: 0.3.2-beta.1

## Export map

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./charts": {
    "types": "./dist/charts.d.ts",
    "import": "./dist/charts.js"
  },
  "./chart-interactions": {
    "types": "./dist/chart-interactions.d.ts",
    "import": "./dist/chart-interactions.js"
  },
  "./chart-stream": {
    "types": "./dist/chart-stream.d.ts",
    "import": "./dist/chart-stream.js"
  },
  "./chart-canvas": {
    "types": "./dist/chart-canvas.d.ts",
    "import": "./dist/chart-canvas.js"
  },
  "./chart-export": {
    "types": "./dist/chart-export.d.ts",
    "import": "./dist/chart-export.js"
  },
  "./specialty-charts": {
    "types": "./dist/specialty-charts.d.ts",
    "import": "./dist/specialty-charts.js"
  }
}
```

## .

- `addCalendarDays`: `(value: string, amount: number) => string`
- `addCalendarMonths`: `(value: string, amount: number) => string`
- `autoUpdateFloating`: `(reference: Element, floating: Element, update: () => void) => () => void`
- `calendarDateValue`: `(date: Date) => string`
- `CalendarDay`: `type CalendarDay = { value: string; day: number; outside: boolean; };`
- `calendarMonthDays`: `(month: string, firstDayOfWeek?: number) => CalendarDay[]`
- `calendarToday`: `() => string`
- `ChartExportPoint`: `type ChartExportPoint = { seriesId: string; index: number; xValue: ChartValue; yValue: number };`
- `chartToCsv`: `(points: readonly ChartExportPoint[], delimiter?: string, headers?: readonly [string, string, string, string]) => string`
- `computeFloatingPosition`: `(reference: Element, floating: Element, options?: FloatingOptions) => FloatingPosition`
- `copyChartText`: `(text: string) => Promise<void>`
- `createControllableState`: `<T>(initial: T, onChange?: (value: T) => void) => { readonly value: T; set(next: T): void; toggle(): void; }`
- `createFloatingInteractions`: `(options: FloatingInteractionOptions) => { referenceAttributes: { 'data-simurgh-floating-reference': string; 'aria-haspopup': "menu" | "listbox" | "dialog" | undefined; 'aria-describedby': string | undefined; }; floatingAttributes: { 'data-simurgh-floating-content': string; id: string | undefined; role: string; }; onReferenceClick(event: FloatingInteractionEvent): void; onReferenceMouseEnter: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceMouseLeave: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceFocus: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceBlur: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceKeyDown(event: FloatingInteractionEvent): void; onFloatingKeyDown(event: FloatingInteractionEvent): void; listenForOutsidePress(document: Document): () => void; }`
- `createId`: `(prefix?: string) => string`
- `Direction`: `type Direction = 'ltr' | 'rtl';`
- `downloadChartBlob`: `(blob: Blob, filename: string) => void`
- `FloatingInteractionEvent`: `type FloatingInteractionEvent = { defaultPrevented: boolean; key?: string; stopPropagation?(): void; };`
- `FloatingInteractionKind`: `type FloatingInteractionKind = 'popover' | 'tooltip' | 'hovercard' | 'menu' | 'listbox';`
- `FloatingInteractionOptions`: `type FloatingInteractionOptions = { kind: FloatingInteractionKind; id: string; getOpen(): boolean; setOpen(open: boolean): void; getReference(): HTMLElement | null; getFloating(): HTMLElement | null; };`
- `FloatingOptions`: `type FloatingOptions = { placement?: FloatingPlacement; offset?: number; padding?: number; direction?: 'ltr' | 'rtl'; };`
- `FloatingPlacement`: `type FloatingPlacement = | 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';`
- `FloatingPosition`: `type FloatingPosition = { x: number; y: number; placement: FloatingPlacement; };`
- `focusable`: `(container: ParentNode) => HTMLElement[]`
- `formValue`: `(value: string, checked?: boolean) => string | null`
- `isBrowser`: `boolean`
- `isolateModal`: `(content: HTMLElement) => () => void`
- `listenFormReset`: `(control: Element, reset: () => void) => () => void`
- `MaybeGetter`: `type MaybeGetter<T> = T | (() => T);`
- `moveCalendarDate`: `(value: string, key: string, options?: { direction?: Direction; firstDayOfWeek?: number; }) => string`
- `nextIndex`: `(current: number, size: number, key: string, options?: { orientation?: Orientation; direction?: Direction; loop?: boolean; }) => number`
- `Orientation`: `type Orientation = 'horizontal' | 'vertical';`
- `printChart`: `(svg: string) => void`
- `resolveDirection`: `(element?: Element | null, explicit?: Direction) => Direction`
- `restoreFocus`: `(previous: Element | null) => void`
- `svgToDataUri`: `(svg: string) => string`
- `svgToPng`: `(svg: string, width: number, height: number) => Promise<Blob>`
- `trapFocus`: `(event: KeyboardEvent, container: ParentNode) => void`
- `typeaheadIndex`: `(items: readonly string[], current: number, key: string) => number`

## ./charts

- `arcPath`: `(cx: number, cy: number, radius: number, start: number, end: number, innerRadius?: number) => string`
- `areaPath`: `(points: readonly (readonly [number, number] | null)[], baseline: number) => string`
- `bandScale`: `(values: readonly ChartValue[], range: ChartDomain, padding?: number) => { bandwidth: number; values: string[]; map: (value: ChartValue) => number; }`
- `ChartAccessibility`: `type ChartAccessibility = | { title: string; description: string; table?: boolean | { pageSize?: number }; decorative?: never; } | { decorative: true; title?: never; description?: never; table?: never };`
- `ChartAccessor`: `type ChartAccessor<T, V extends ChartValue = ChartValue> = | keyof T | ((datum: T, index: number) => V | null | undefined);`
- `ChartAnnotation`: `type ChartAnnotation = { id?: string; x: number; y: number; label?: string; color?: string; description?: string };`
- `ChartAxisConfig`: `type ChartAxisConfig = { title?: string; ticks?: number; tickFormatter?: (value: ChartValue) => string; tickRotation?: number; grid?: boolean; position?: 'start' | 'end'; locale?: string; };`
- `chartCurvePath`: `(points: readonly (readonly [number, number])[], curve?: ChartSeries<unknown>["curve"], tension?: number) => string`
- `ChartDataLabelConfig`: `type ChartDataLabelConfig = { enabled?: boolean; placement?: 'top' | 'inside' | 'bottom'; minDistance?: number; formatter?: (value: number, index: number, seriesId: string) => string };`
- `ChartDataOptions`: `type ChartDataOptions<T = unknown> = { missing?: 'skip' | 'zero' | 'connect'; interpolate?: 'none' | 'linear' | 'step'; sort?: 'ascending' | 'descending' | ((a: T, b: T) => number); filter?: (datum: T, index: number) => boolean; aggregate?: 'sum' | 'mean' | 'min' | 'max' | ((values: readonly number[]) => number); aggregateValue?: ChartAccessor<T, number>; aggregateKey?: PropertyKey; aggregateBy?: ChartAccessor<T>; window?: number; stackOffset?: 'zero' | 'expand'; };`
- `chartDomain`: `(values: Iterable<number>, options?: { includeZero?: boolean; log?: boolean; padding?: number; }) => ChartDomain | null`
- `ChartDomain`: `type ChartDomain = readonly [number, number];`
- `chartLayout`: `(width: number, height: number, padding?: Partial<ChartPadding>) => ChartLayout`
- `ChartLayout`: `type ChartLayout = ChartPadding & { width: number; height: number; plotWidth: number; plotHeight: number; };`
- `ChartLegendConfig`: `type ChartLegendConfig = { placement?: 'top' | 'right' | 'bottom' | 'left'; orientation?: 'horizontal' | 'vertical'; maxHeight?: number; selectAll?: boolean; isolate?: boolean };`
- `ChartLocale`: `type ChartLocale = { explore: string; reset: string; back: string; pauseStream: string; resumeStream: string; previous: string; next: string; dataPages: string; category: string; selectAll: string; isolate: (series: string) => string; dataPoints: (count: number, followingLatest?: boolean) => string; viewportState: (x?: ChartDomain, y?: ChartDomain) => string; selectionState: (count: number) => string; drilldownState: (label: string) => string; };`
- `chartMissingValue`: `(value: number | null, policy?: ChartDataOptions["missing"]) => number | null`
- `ChartPadding`: `type ChartPadding = { top: number; right: number; bottom: number; left: number; };`
- `ChartPoint`: `type ChartPoint<T = unknown> = { datum: T; index: number; seriesId: string; x: number; y: number; xValue: ChartValue; yValue: number; radius?: number; };`
- `ChartReference`: `type ChartReference = { id?: string; axis: 'x' | 'y'; value: number; endValue?: number; label?: string; color?: string };`
- `ChartRenderMode`: `type ChartRenderMode = 'auto' | 'svg' | 'canvas' | 'webgl';`
- `ChartScaleType`: `type ChartScaleType = 'linear' | 'time' | 'band' | 'log';`
- `ChartSeries`: `type ChartSeries<T> = { id: string; type?: ChartSeriesType; label?: string; x?: ChartAccessor<T>; y: ChartAccessor<T, number>; radius?: ChartAccessor<T, number>; color?: string; stack?: string; axis?: 'start' | 'end'; curve?: 'linear' | 'step' | 'smooth' | 'monotone'; tension?: number; lineWidth?: number; lineDash?: string; pointSymbol?: 'circle' | 'square' | 'diamond'; fill?: string; pattern?: string; };`
- `ChartSeriesType`: `type ChartSeriesType = | 'line' | 'area' | 'bar' | 'scatter' | 'bubble' | 'radar' | 'heatmap';`
- `chartSummary`: `(values: readonly number[], label?: string) => string`
- `chartTicks`: `(domain: ChartDomain, count?: number) => number[]`
- `ChartTooltipMode`: `type ChartTooltipMode = 'nearest' | 'intersect' | 'index' | 'shared' | 'none';`
- `ChartTooltipPosition`: `type ChartTooltipPosition = 'static' | 'cursor';`
- `ChartTooltipTrigger`: `type ChartTooltipTrigger = 'always' | 'hover' | 'click';`
- `chartValue`: `<T, V extends ChartValue>(datum: T, accessor: ChartAccessor<T, V>, index: number) => V | null | undefined`
- `ChartValue`: `type ChartValue = number | Date | string;`
- `ChartVisualMap`: `type ChartVisualMap = { min?: number; max?: number; color?: readonly [string, string]; opacity?: readonly [number, number]; size?: readonly [number, number]; pieces?: readonly ChartVisualMapPiece[] };`
- `ChartVisualMapPiece`: `type ChartVisualMapPiece = { gte?: number; lte?: number; color?: string; opacity?: number; size?: number };`
- `chartVisualStyle`: `(value: number, map: ChartVisualMap | undefined) => ChartVisualStyle`
- `ChartVisualStyle`: `type ChartVisualStyle = { color?: string; opacity?: number; size?: number };`
- `cullChartPoints`: `<T extends { x: number; y: number; }>(points: readonly T[], bounds: { x?: readonly [number, number]; y?: readonly [number, number]; }) => T[]`
- `defaultChartLocale`: `ChartLocale`
- `defaultChartPadding`: `ChartPadding`
- `formatChartValue`: `(value: ChartValue, locale?: string) => string`
- `HeatmapBin`: `type HeatmapBin = { x: number; y: number; value: number; count: number };`
- `heatmapBins`: `(points: readonly { x: number; y: number; value?: number; }[], columns: number, rows: number) => HeatmapBin[]`
- `interpolateChartValues`: `(values: readonly (number | null)[], mode?: ChartDataOptions["interpolate"]) => (number | null)[]`
- `linearScale`: `(domain: ChartDomain, range: ChartDomain) => (value: number) => number`
- `linePath`: `(points: readonly (readonly [number, number] | null)[]) => string`
- `logScale`: `(domain: ChartDomain, range: ChartDomain) => (value: number) => number`
- `minMaxDecimate`: `<T extends { x: number; y: number; }>(points: readonly T[], pixelWidth: number) => T[]`
- `numericValue`: `(value: unknown) => number | null`
- `PieArc`: `type PieArc<T = unknown> = { datum: T; index: number; value: number; startAngle: number; endAngle: number; path: string; };`
- `pieArcs`: `<T>(data: readonly T[], accessor: ChartAccessor<T, number>, radius: number, innerRadius?: number) => PieArc<T>[]`
- `prepareChartData`: `<T>(data: readonly T[], options: ChartDataOptions<T> | undefined) => readonly T[]`
- `radarPoints`: `(values: readonly number[], radius: number) => string`
- `stackChartValues`: `<T extends { stack: string | undefined; x: ChartValue; value: number; }>(values: readonly T[], offset?: "zero" | "expand") => (T & { start: number; end: number; })[]`
- `StackDatum`: `type StackDatum<T> = T & { stack: string | undefined; x: ChartValue; value: number };`
- `stackedAreaPath`: `(points: readonly { x: number; y0: number; y1: number; }[]) => string`

## ./chart-interactions

- `ChartBrushHandle`: `type ChartBrushHandle = 'start' | 'end' | 'start-y' | 'end-y';`
- `ChartInteractionConfig`: `type ChartInteractionConfig = { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy'; };`
- `chartInteractionKey`: `(event: Pick<KeyboardEvent, "key" | "shiftKey">, viewport: ChartViewport) => { viewport: ChartViewport; clearSelection?: true; }`
- `ChartSelection`: `type ChartSelection = { start: readonly [number, number]; end: readonly [number, number] } | null;`
- `ChartSync`: `type ChartSync = { readonly state: ChartSyncState; set(next: Partial<ChartSyncState>): void; subscribe(listener: (state: ChartSyncState) => void): () => void; };`
- `ChartSyncState`: `type ChartSyncState = { viewport: ChartViewport; selection: ChartSelection; focused?: { seriesId: string; index: number } | null };`
- `ChartViewport`: `type ChartViewport = { x?: ChartDomain; y?: ChartDomain };`
- `clampDomain`: `(domain: ChartDomain, bounds?: ChartDomain) => ChartDomain`
- `createChartSync`: `(initial?: Partial<ChartSyncState>) => ChartSync`
- `domainFromSelection`: `(domain: ChartDomain, selection: readonly [number, number], pixels: readonly [number, number]) => ChartDomain`
- `nextChartIndex`: `(current: number, size: number, key: string, direction?: "ltr" | "rtl") => number`
- `panDomain`: `(domain: ChartDomain, fraction: number) => ChartDomain`
- `pinchZoomDomain`: `(domain: ChartDomain, startDistance: number, endDistance: number, anchor: number) => ChartDomain`
- `resizeChartSelection`: `(selection: Exclude<ChartSelection, null>, handle: ChartBrushHandle, point: readonly [number, number]) => Exclude<ChartSelection, null>`
- `selectionFromPoints`: `(start: readonly [number, number], end: readonly [number, number]) => ChartSelection`
- `SpatialGrid`: `typeof SpatialGrid`
- `zoomDomain`: `(domain: ChartDomain, factor: number, anchor?: number) => ChartDomain`

## ./chart-stream

- `ChartStream`: `type ChartStream<D extends string> = { readonly capacity: number; readonly dimensions: readonly D[]; readonly length: number; readonly window: number | undefined; readonly paused: boolean; append(batch: Readonly<Record<D, ArrayLike<number>>>): void; backfill(batch: Readonly<Record<D, ArrayLike<number>>>): void; clear(): void; setWindow(size?: number): void; pause(): void; resume(): void; snapshot(): ChartStreamSnapshot<D>; subscribe(listener: () => void): () => void; };`
- `ChartStreamSnapshot`: `type ChartStreamSnapshot<D extends string> = Readonly<{ length: number; version: number; columns: Readonly<Record<D, Float64Array>>; }>;`
- `createChartStream`: `<const D extends string>(options: { capacity: number; dimensions: readonly D[]; window?: number; }) => ChartStream<D>`

## ./chart-canvas

- `CanvasMark`: `type CanvasMark = | { type: 'line'; points: readonly (readonly [number, number])[]; color: string; width?: number } | { type: 'area'; points: readonly (readonly [number, number])[]; color: string; baseline: number; opacity?: number } | { type: 'point'; x: number; y: number; radius?: number; color: string } | { type: 'rect'; x: number; y: number; width: number; height: number; color: string; opacity?: number };`
- `ChartWorkerInput`: `type ChartWorkerInput = | { operation: 'decimate'; points: { x: number; y: number }[]; width: number } | { operation: 'heatmap'; points: { x: number; y: number; value?: number }[]; columns: number; rows: number };`
- `ChartWorkerRequest`: `type ChartWorkerRequest = | { id: number; operation: 'decimate'; points: { x: number; y: number }[]; width: number } | { id: number; operation: 'heatmap'; points: { x: number; y: number; value?: number }[]; columns: number; rows: number };`
- `ChartWorkerResponse`: `type ChartWorkerResponse = { id: number; result?: unknown; error?: string };`
- `createChartWorker`: `() => Worker | null`
- `drawChartCanvas`: `(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, marks: readonly CanvasMark[], width: number, height: number, pixelRatio?: number) => void`
- `drawChartCanvasProgressive`: `(context: CanvasRenderingContext2D, marks: readonly CanvasMark[], width: number, height: number, options?: { pixelRatio?: number; chunkSize?: number; }) => () => void`
- `drawChartWebGL`: `(context: WebGLRenderingContext, marks: readonly CanvasMark[], width: number, height: number) => boolean`
- `runChartWorker`: `<T>(worker: Worker, request: ChartWorkerInput) => Promise<T>`
- `supportsWorkerCanvas`: `() => boolean`

## ./chart-export

- `ChartExportPoint`: `type ChartExportPoint = { seriesId: string; index: number; xValue: ChartValue; yValue: number };`
- `chartToCsv`: `(points: readonly ChartExportPoint[], delimiter?: string, headers?: readonly [string, string, string, string]) => string`
- `copyChartText`: `(text: string) => Promise<void>`
- `downloadChartBlob`: `(blob: Blob, filename: string) => void`
- `printChart`: `(svg: string) => void`
- `svgToDataUri`: `(svg: string) => string`
- `svgToPng`: `(svg: string, width: number, height: number) => Promise<Blob>`

## ./specialty-charts

- `SpecialtyChartKind`: `type SpecialtyChartKind = 'candlestick' | 'ohlc' | 'box-plot' | 'violin' | 'histogram' | 'funnel' | 'gauge' | 'polar-area' | 'waterfall' | 'treemap' | 'sankey' | 'geo';`
- `specialtyChartMarks`: `(kind: SpecialtyChartKind, data: readonly SpecialtyDatum[], width?: number, height?: number) => SpecialtyMark[]`
- `specialtyChartSummary`: `(kind: SpecialtyChartKind, marks: readonly SpecialtyMark[]) => string`
- `SpecialtyDatum`: `type SpecialtyDatum = { label?: string; value?: number; open?: number; high?: number; low?: number; close?: number; values?: readonly number[]; source?: string; target?: string; latitude?: number; longitude?: number; };`
- `SpecialtyMark`: `type SpecialtyMark = { type: 'path' | 'rect' | 'line' | 'circle' | 'text'; part: string; label: string; value: number; x: number; y: number; x2: number; y2: number; width: number; height: number; radius: number; path: string; };`

