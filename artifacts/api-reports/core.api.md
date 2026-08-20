# @simurgh-ui/core public API

Version snapshot: 0.3.2-beta.0

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
- `computeFloatingPosition`: `(reference: Element, floating: Element, options?: FloatingOptions) => FloatingPosition`
- `createControllableState`: `<T>(initial: T, onChange?: (value: T) => void) => { readonly value: T; set(next: T): void; toggle(): void; }`
- `createFloatingInteractions`: `(options: FloatingInteractionOptions) => { referenceAttributes: { 'data-simurgh-floating-reference': string; 'aria-haspopup': "menu" | "listbox" | "dialog" | undefined; 'aria-describedby': string | undefined; }; floatingAttributes: { 'data-simurgh-floating-content': string; id: string | undefined; role: string; }; onReferenceClick(event: FloatingInteractionEvent): void; onReferenceMouseEnter: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceMouseLeave: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceFocus: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceBlur: ((event: FloatingInteractionEvent) => void) | undefined; onReferenceKeyDown(event: FloatingInteractionEvent): void; onFloatingKeyDown(event: FloatingInteractionEvent): void; listenForOutsidePress(document: Document): () => void; }`
- `createId`: `(prefix?: string) => string`
- `Direction`: `type Direction = 'ltr' | 'rtl';`
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
- `resolveDirection`: `(element?: Element | null, explicit?: Direction) => Direction`
- `restoreFocus`: `(previous: Element | null) => void`
- `trapFocus`: `(event: KeyboardEvent, container: ParentNode) => void`
- `typeaheadIndex`: `(items: readonly string[], current: number, key: string) => number`

## ./charts

- `arcPath`: `(cx: number, cy: number, radius: number, start: number, end: number, innerRadius?: number) => string`
- `areaPath`: `(points: readonly (readonly [number, number] | null)[], baseline: number) => string`
- `bandScale`: `(values: readonly ChartValue[], range: ChartDomain, padding?: number) => { bandwidth: number; values: string[]; map: (value: ChartValue) => number; }`
- `ChartAccessibility`: `type ChartAccessibility = | { title: string; description: string; table?: boolean | { pageSize?: number }; decorative?: never; } | { decorative: true; title?: never; description?: never; table?: never };`
- `ChartAccessor`: `type ChartAccessor<T, V extends ChartValue = ChartValue> = | keyof T | ((datum: T, index: number) => V | null | undefined);`
- `chartDomain`: `(values: Iterable<number>, options?: { includeZero?: boolean; log?: boolean; padding?: number; }) => ChartDomain | null`
- `ChartDomain`: `type ChartDomain = readonly [number, number];`
- `chartLayout`: `(width: number, height: number, padding?: Partial<ChartPadding>) => ChartLayout`
- `ChartLayout`: `type ChartLayout = ChartPadding & { width: number; height: number; plotWidth: number; plotHeight: number; };`
- `ChartPadding`: `type ChartPadding = { top: number; right: number; bottom: number; left: number; };`
- `ChartPoint`: `type ChartPoint<T = unknown> = { datum: T; index: number; seriesId: string; x: number; y: number; xValue: ChartValue; yValue: number; radius?: number; };`
- `ChartRenderMode`: `type ChartRenderMode = 'auto' | 'svg' | 'canvas';`
- `ChartScaleType`: `type ChartScaleType = 'linear' | 'time' | 'band' | 'log';`
- `ChartSeries`: `type ChartSeries<T> = { id: string; type?: ChartSeriesType; label?: string; x?: ChartAccessor<T>; y: ChartAccessor<T, number>; radius?: ChartAccessor<T, number>; color?: string; stack?: string; axis?: 'start' | 'end'; };`
- `ChartSeriesType`: `type ChartSeriesType = | 'line' | 'area' | 'bar' | 'scatter' | 'bubble' | 'radar' | 'heatmap';`
- `chartSummary`: `(values: readonly number[], label?: string) => string`
- `chartValue`: `<T, V extends ChartValue>(datum: T, accessor: ChartAccessor<T, V>, index: number) => V | null | undefined`
- `ChartValue`: `type ChartValue = number | Date | string;`
- `defaultChartPadding`: `ChartPadding`
- `HeatmapBin`: `type HeatmapBin = { x: number; y: number; value: number; count: number };`
- `heatmapBins`: `(points: readonly { x: number; y: number; value?: number; }[], columns: number, rows: number) => HeatmapBin[]`
- `linearScale`: `(domain: ChartDomain, range: ChartDomain) => (value: number) => number`
- `linePath`: `(points: readonly (readonly [number, number] | null)[]) => string`
- `logScale`: `(domain: ChartDomain, range: ChartDomain) => (value: number) => number`
- `minMaxDecimate`: `<T extends { x: number; y: number; }>(points: readonly T[], pixelWidth: number) => T[]`
- `numericValue`: `(value: unknown) => number | null`
- `PieArc`: `type PieArc<T = unknown> = { datum: T; index: number; value: number; startAngle: number; endAngle: number; path: string; };`
- `pieArcs`: `<T>(data: readonly T[], accessor: ChartAccessor<T, number>, radius: number, innerRadius?: number) => PieArc<T>[]`
- `radarPoints`: `(values: readonly number[], radius: number) => string`
- `stackChartValues`: `<T extends { stack: string | undefined; x: ChartValue; value: number; }>(values: readonly T[]) => (T & { start: number; end: number; })[]`
- `StackDatum`: `type StackDatum<T> = T & { stack: string | undefined; x: ChartValue; value: number };`
- `stackedAreaPath`: `(points: readonly { x: number; y0: number; y1: number; }[]) => string`

## ./chart-interactions

- `chartInteractionKey`: `(event: Pick<KeyboardEvent, "key" | "shiftKey">, viewport: ChartViewport) => { viewport: ChartViewport; clearSelection?: true; }`
- `ChartSelection`: `type ChartSelection = { start: readonly [number, number]; end: readonly [number, number] } | null;`
- `ChartViewport`: `type ChartViewport = { x?: ChartDomain; y?: ChartDomain };`
- `nextChartIndex`: `(current: number, size: number, key: string, direction?: "ltr" | "rtl") => number`
- `panDomain`: `(domain: ChartDomain, fraction: number) => ChartDomain`
- `SpatialGrid`: `typeof SpatialGrid`
- `zoomDomain`: `(domain: ChartDomain, factor: number, anchor?: number) => ChartDomain`

## ./chart-stream

- `ChartStream`: `type ChartStream<D extends string> = { readonly capacity: number; readonly dimensions: readonly D[]; readonly length: number; append(batch: Readonly<Record<D, ArrayLike<number>>>): void; clear(): void; snapshot(): ChartStreamSnapshot<D>; subscribe(listener: () => void): () => void; };`
- `ChartStreamSnapshot`: `type ChartStreamSnapshot<D extends string> = Readonly<{ length: number; version: number; columns: Readonly<Record<D, Float64Array>>; }>;`
- `createChartStream`: `<const D extends string>(options: { capacity: number; dimensions: readonly D[]; }) => ChartStream<D>`

## ./chart-canvas

- `CanvasMark`: `type CanvasMark = | { type: 'line'; points: readonly (readonly [number, number])[]; color: string; width?: number } | { type: 'area'; points: readonly (readonly [number, number])[]; color: string; baseline: number; opacity?: number } | { type: 'point'; x: number; y: number; radius?: number; color: string } | { type: 'rect'; x: number; y: number; width: number; height: number; color: string; opacity?: number };`
- `ChartWorkerRequest`: `type ChartWorkerRequest = | { id: number; operation: 'decimate'; points: { x: number; y: number }[]; width: number } | { id: number; operation: 'heatmap'; points: { x: number; y: number; value?: number }[]; columns: number; rows: number };`
- `ChartWorkerResponse`: `type ChartWorkerResponse = { id: number; result?: unknown; error?: string };`
- `createChartWorker`: `() => Worker | null`
- `drawChartCanvas`: `(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, marks: readonly CanvasMark[], width: number, height: number, pixelRatio?: number) => void`
- `runChartWorker`: `<T>(worker: Worker, request: Omit<ChartWorkerRequest, "id">) => Promise<T>`
- `supportsWorkerCanvas`: `() => boolean`

