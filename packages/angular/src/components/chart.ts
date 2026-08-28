import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import type { AfterViewChecked, OnDestroy } from '@angular/core';
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
  minMaxDecimate,
  pieArcs,
  radarPoints,
  stackChartValues,
  stackedAreaPath,
  type ChartAccessibility,
  type ChartAnnotation,
  type ChartAccessor,
  type ChartReference,
  type ChartAxisConfig,
  type ChartDataLabelConfig,
  type ChartLegendConfig,
  chartVisualStyle,
  chartMissingValue,
  prepareChartData,
  interpolateChartValues,
  chartCurvePath,
  cullChartPoints,
  type ChartVisualMap,
  type ChartDataOptions,
  type ChartSeries,
  type ChartSeriesType,
  type ChartTooltipMode,
  type ChartTooltipPosition,
  formatChartValue,
  type ChartTooltipTrigger,
  type ChartDomain,
} from '@simurgh-ui/core/charts';
import { chartInteractionKey, clampDomain, domainFromSelection, panDomain, pinchZoomDomain, resizeChartSelection, zoomDomain, type ChartBrushHandle, type ChartSync } from '@simurgh-ui/core/chart-interactions';
import type { CanvasMark } from '@simurgh-ui/core/chart-canvas';
import type { ChartStream } from '@simurgh-ui/core/chart-stream';

type Datum = Record<PropertyKey, unknown>;
export type ChartPointInteraction<T = Datum> = { datum: T; index: number; x: number; y: number; xValue: string | number | Date; yValue: number; radius: number; seriesId: string };
type Mark = {
  id: string;
  type: ChartSeriesType;
  color: string;
  path?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  opacity?: number;
  lineWidth?: number;
  lineDash?: string;
  symbol?: 'circle' | 'square' | 'diamond';
};
const colors = Array.from({ length: 10 }, (_, index) => `hsl(var(--simurgh-chart-${index + 1}))`);

const template = `
  <figcaption *ngIf="!decorative">{{ accessibility.title }}</figcaption>
  <p *ngIf="!decorative" data-part="description">{{ accessibility.description }} {{ model.summary }}</p>
  <div data-part="viewport" [style.aspect-ratio]="width + ' / ' + height" (wheel)="onWheel($event)" (mousemove)="onMouseMove($event)" (mouseleave)="onMouseLeave()" (click)="onPointClick($event)" (dblclick)="onPointDoubleClick($event)" (contextmenu)="onPointContextMenu($event)" (pointerdown)="onPointerDown($event)" (pointermove)="onPointerMove($event)" (pointerup)="onPointerUp($event)" (pointercancel)="onPointerCancel()">
    <canvas #canvas *ngIf="model.useCanvas" [attr.width]="width" [attr.height]="height" aria-hidden="true"></canvas>
    <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" data-part="plot" aria-hidden="true">
      <ng-container *ngIf="yAxis?.grid !== false"><g data-part="grid"><line *ngFor="let tick of model.yTicks" [attr.x1]="layoutLeft" [attr.x2]="layoutLeft + plotWidth" [attr.y1]="tick.position" [attr.y2]="tick.position"></line></g></ng-container>
      <g data-part="y-axis"><text *ngFor="let tick of model.yTicks" [attr.x]="yAxis?.position === 'end' ? layoutLeft + plotWidth + 8 : layoutLeft - 8" [attr.y]="tick.position" [attr.text-anchor]="yAxis?.position === 'end' ? 'start' : 'end'">{{ formatAxisTick(tick.value, yAxis) }}</text><text *ngIf="yAxis?.title" [attr.x]="yAxis?.position === 'end' ? layoutLeft + plotWidth + 32 : 16" [attr.y]="layoutTop + plotHeight / 2" [attr.transform]="'rotate(-90 ' + (yAxis?.position === 'end' ? layoutLeft + plotWidth + 32 : 16) + ' ' + (layoutTop + plotHeight / 2) + ')'">{{ yAxis.title }}</text></g>
      <g data-part="x-axis"><text *ngFor="let tick of model.xTicks" [attr.x]="tick.position" [attr.y]="layoutTop + plotHeight + 20" text-anchor="middle" [attr.transform]="xAxis?.tickRotation ? 'rotate(' + xAxis.tickRotation + ' ' + tick.position + ' ' + (layoutTop + plotHeight + 20) + ')' : null">{{ formatAxisTick(tick.value, xAxis) }}</text><text *ngIf="xAxis?.title" [attr.x]="layoutLeft + plotWidth / 2" [attr.y]="height - 4" text-anchor="middle">{{ xAxis.title }}</text></g>
      <ng-container *ngFor="let reference of model.references"><rect *ngIf="reference.endPosition != null" data-part="reference-area" [attr.x]="reference.axis === 'x' ? min(reference.position, reference.endPosition) : layoutLeft" [attr.y]="reference.axis === 'y' ? min(reference.position, reference.endPosition) : layoutTop" [attr.width]="reference.axis === 'x' ? abs(reference.endPosition - reference.position) : plotWidth" [attr.height]="reference.axis === 'y' ? abs(reference.endPosition - reference.position) : plotHeight" [attr.fill]="reference.color" opacity="0.15"></rect><g data-part="reference"><line *ngIf="reference.axis === 'x'" [attr.x1]="reference.position" [attr.x2]="reference.position" [attr.y1]="layoutTop" [attr.y2]="layoutTop + plotHeight" [attr.stroke]="reference.color"></line><line *ngIf="reference.axis === 'y'" [attr.x1]="layoutLeft" [attr.x2]="layoutLeft + plotWidth" [attr.y1]="reference.position" [attr.y2]="reference.position" [attr.stroke]="reference.color"></line><text [attr.x]="reference.axis === 'x' ? reference.position + 4 : layoutLeft + 4" [attr.y]="reference.axis === 'x' ? layoutTop + 14 : reference.position - 4">{{ reference.label }}</text></g></ng-container>
      <ng-container *ngFor="let annotation of model.annotations"><g data-part="annotation" [attr.aria-label]="annotation.description"><circle [attr.cx]="annotation.x" [attr.cy]="annotation.y" r="4" [attr.fill]="annotation.color"></circle><text [attr.x]="annotation.x + 6" [attr.y]="annotation.y - 6">{{ annotation.label }}</text></g></ng-container>
      <g *ngIf="model.dataLabels.length" data-part="data-labels"><text *ngFor="let label of model.dataLabels" [attr.x]="label.x" [attr.y]="label.y">{{ label.text }}</text></g>
      <g *ngIf="(kind === 'pie' || kind === 'donut') && (centerLabel || showTotal)" data-part="center-label"><text x="width / 2" [attr.y]="height / 2 - (centerLabel ? 4 : -4)" text-anchor="middle">{{ centerLabel }}</text><text *ngIf="showTotal" x="width / 2" [attr.y]="height / 2 + (centerLabel ? 14 : 18)" text-anchor="middle">{{ model.polarTotal }}</text></g>
      <ng-container *ngIf="!model.useCanvas">
        <ng-container *ngFor="let mark of model.marks">
          <path *ngIf="mark.path" data-part="series" [attr.data-series]="mark.id" [attr.d]="mark.path" [attr.fill]="mark.type === 'line' ? 'none' : mark.color" [attr.stroke]="mark.color" [attr.stroke-width]="mark.lineWidth" [attr.stroke-dasharray]="mark.lineDash" [attr.opacity]="mark.opacity" (mouseenter)="onPolarSliceHover(mark.id)" (click)="onPolarSliceClick(mark.id)"></path>
          <rect *ngIf="mark.type === 'bar' || mark.type === 'heatmap'" data-part="series" [attr.x]="mark.x" [attr.y]="mark.y" [attr.width]="mark.width" [attr.height]="mark.height" [attr.fill]="mark.color"></rect>
          <rect *ngIf="(mark.type === 'scatter' || mark.type === 'bubble') && mark.symbol === 'square'" data-part="series" [attr.x]="(mark.x || 0) - (mark.radius || 3)" [attr.y]="(mark.y || 0) - (mark.radius || 3)" [attr.width]="(mark.radius || 3) * 2" [attr.height]="(mark.radius || 3) * 2" [attr.fill]="mark.color" [attr.opacity]="mark.opacity"></rect>
          <path *ngIf="(mark.type === 'scatter' || mark.type === 'bubble') && mark.symbol === 'diamond'" data-part="series" [attr.d]="'M' + mark.x + ',' + ((mark.y || 0) - (mark.radius || 3)) + 'L' + ((mark.x || 0) + (mark.radius || 3)) + ',' + mark.y + 'L' + mark.x + ',' + ((mark.y || 0) + (mark.radius || 3)) + 'L' + ((mark.x || 0) - (mark.radius || 3)) + ',' + mark.y + 'Z'" [attr.fill]="mark.color" [attr.opacity]="mark.opacity"></path>
          <circle *ngIf="(mark.type === 'scatter' || mark.type === 'bubble') && (!mark.symbol || mark.symbol === 'circle')" data-part="series" [attr.cx]="mark.x" [attr.cy]="mark.y" [attr.r]="mark.radius" [attr.fill]="mark.color" [attr.opacity]="mark.opacity"></circle>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="model.points.length"><g data-part="crosshair"><line [attr.x1]="model.points[focused]?.x" [attr.x2]="model.points[focused]?.x" [attr.y1]="layoutTop" [attr.y2]="layoutTop + plotHeight"></line><line [attr.x1]="layoutLeft" [attr.x2]="layoutLeft + plotWidth" [attr.y1]="model.points[focused]?.y" [attr.y2]="model.points[focused]?.y"></line><text [attr.x]="(model.points[focused]?.x ?? 0) + 6" [attr.y]="layoutTop + 14">{{ model.points[focused]?.xValue }}</text><text [attr.x]="layoutLeft + 6" [attr.y]="(model.points[focused]?.y ?? 0) - 6">{{ model.points[focused]?.yValue }}</text><circle [attr.cx]="model.points[focused]?.x" [attr.cy]="model.points[focused]?.y" r="4"></circle></g></ng-container>
      <rect *ngIf="selection" data-part="brush" [attr.x]="selection.start[0]" [attr.y]="selection.start[1]" [attr.width]="selection.end[0] - selection.start[0]" [attr.height]="selection.end[1] - selection.start[1]"></rect>
      <ng-container *ngIf="selection"><rect data-part="brush-handle" [attr.x]="selection.start[0] - 4" [attr.y]="selection.start[1] - 4" width="8" height="8"></rect><rect data-part="brush-handle" [attr.x]="selection.end[0] - 4" [attr.y]="selection.end[1] - 4" width="8" height="8"></rect></ng-container>
    </svg>
    <button type="button" data-part="keyboard-target" aria-label="Explore chart data" (keydown)="onKeydown($event)"></button>
    <button *ngIf="interaction" type="button" data-part="reset-viewport" (click)="resetViewport()">Reset view</button>
    <button *ngIf="drilldownDepth > 0" type="button" data-part="drilldown-back" (click)="onDrilldownBack.emit()">Back</button>
    <button *ngIf="streamControls && stream" type="button" data-part="stream-toggle" [attr.aria-pressed]="streamPaused" (click)="toggleStream()">{{ streamPaused ? 'Resume stream' : 'Pause stream' }}</button>
    <div *ngIf="stream && streamAnnouncement" data-part="stream-announcement" aria-live="polite">{{ stream.length }} data points{{ streamAutoScroll ? ', following latest data' : '' }}</div>
    <div *ngIf="model.tooltip && tooltipVisible" role="tooltip" data-part="tooltip" [style.position]="tooltipPosition === 'cursor' ? 'absolute' : null" [style.left.px]="tooltipPosition === 'cursor' ? tooltipX : null" [style.top.px]="tooltipPosition === 'cursor' ? tooltipY : null">{{ model.tooltip }}</div>
  </div>
  <div data-part="legend" [attr.data-placement]="legend?.placement || 'bottom'" [attr.data-orientation]="legend?.orientation || 'horizontal'" [style.max-height.px]="legend?.maxHeight" [style.overflow-y]="legend?.maxHeight ? 'auto' : null">
    <button *ngIf="legend?.selectAll !== false" type="button" data-action="select-all" (click)="selectAllSeries()">Select all</button>
    <ng-container *ngIf="!legendContent; else customLegend"><span *ngFor="let item of model.legend; let index = index"><button type="button" [attr.aria-pressed]="!effectiveHiddenSeries.includes(item.id)" (click)="toggleSeries(item.id)">
      <span [style.background]="item.color"></span>{{ item.label }}
      </button><button *ngIf="legend?.isolate" type="button" data-action="isolate" [attr.aria-label]="'Isolate ' + item.label" (click)="isolateSeries(item.id)">Isolate</button></span></ng-container>
    <ng-template #customLegend><span [innerHTML]="legendContent?.(activeSeries, effectiveHiddenSeries)"></span></ng-template>
  </div>
  <div *ngIf="tableEnabled" data-part="data-table">
    <table>
      <thead><tr><th scope="col">Category</th><th *ngFor="let item of model.legend" scope="col">{{ item.label }}</th></tr></thead>
      <tbody><tr *ngFor="let datum of tableRows; let row = index"><td>{{ tableValue(datum, xAccessor, row) }}</td><td *ngFor="let item of activeSeries">{{ tableValue(datum, item.y, row) }}</td></tr></tbody>
    </table>
    <nav *ngIf="tablePages > 1" aria-label="Chart data pages"><button type="button" [disabled]="tablePage === 0" (click)="tablePage = tablePage - 1">Previous</button><span>{{ tablePage + 1 }} / {{ tablePages }}</span><button type="button" [disabled]="tablePage + 1 >= tablePages" (click)="tablePage = tablePage + 1">Next</button></nav>
  </div>
  <div *ngIf="!model.marks.length" data-part="empty">{{ emptyContent }}</div>
`;

@Directive()
export abstract class ChartBaseComponent implements AfterViewChecked, OnDestroy {
  @Input() data: readonly Datum[] = [];
  private streamValue: ChartStream<string> | undefined;
  private unsubscribeStream: (() => void) | undefined;
  @Input() set stream(value: ChartStream<string> | undefined) {
    this.unsubscribeStream?.();
    this.streamValue = value;
    this.unsubscribeStream = value?.subscribe(() => this.changeDetector?.markForCheck());
  }
  get stream() { return this.streamValue; }
  @Input() x?: ChartAccessor<Datum>;
  @Input() y?: ChartAccessor<Datum, number>;
  @Input() series?: readonly ChartSeries<Datum>[];
  @Input({ required: true }) accessibility!: ChartAccessibility;
  @Input() width = 640;
  @Input() height = 360;
  @Input() xScale: 'linear' | 'time' | 'band' | 'log' = 'linear';
  @Input() yScale: 'linear' | 'time' | 'log' = 'linear';
  @Input() xDomain?: ChartDomain;
  @Input() yDomain?: ChartDomain;
  @Input() xAxis?: ChartAxisConfig;
  @Input() yAxis?: ChartAxisConfig;
  @Input() references: readonly ChartReference[] = [];
  @Input() annotations: readonly ChartAnnotation[] = [];
  @Input() dataLabels: boolean | ChartDataLabelConfig = false;
  @Input() legend?: ChartLegendConfig;
  @Input() visualMap?: ChartVisualMap;
  @Input() dataOptions?: ChartDataOptions<Datum>;
  @Input() streamControls = false;
  @Input() streamAutoScroll = false;
  @Input() streamAnnouncement = false;
  @Input() centerLabel?: string;
  @Input() showTotal = false;
  @Input() drilldownDepth = 0;
  @Input() legendContent?: (series: readonly ChartSeries<Datum>[], hiddenSeries: readonly string[]) => string;
  @Input() viewport?: { x?: ChartDomain; y?: ChartDomain };
  @Input() defaultViewport: { x?: ChartDomain; y?: ChartDomain } = {};
  @Input() interaction?: { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy' };
  @Input() tooltipMode: ChartTooltipMode = 'nearest';
  @Input() tooltipTrigger: ChartTooltipTrigger = 'always';
  @Input() tooltipPosition: ChartTooltipPosition = 'static';
  @Input() tooltipFormatter?: (point: ChartPointInteraction) => string;
  @Input() tooltipContent?: (points: readonly ChartPointInteraction[]) => string;
  private syncValue: ChartSync | undefined = undefined;
  private unsubscribeSync: (() => void) | undefined = undefined;
  @Input() set sync(value: ChartSync | undefined) { this.unsubscribeSync?.(); this.syncValue = value; this.unsubscribeSync = value?.subscribe((state) => { if (state.focused) this.focused = state.focused.index; this.changeDetector?.markForCheck(); }); }
  get sync() { return this.syncValue; }
  @Input() renderMode: 'auto' | 'svg' | 'canvas' = 'auto';
  @Input() canvasThreshold = 2000;
  @Input() workerProcessing = false;
  @Input() viewportCulling = false;
  @Input() motion = false;
  @Input() hiddenSeries?: readonly string[];
  @Input() defaultHiddenSeries: readonly string[] = [];
  @Input() innerRadius?: number;
  @Input() emptyContent = 'No chart data';
  @Output() readonly hiddenSeriesChange = new EventEmitter<string[]>();
  @Output() readonly viewportChange = new EventEmitter<{ x?: ChartDomain; y?: ChartDomain }>();
  @Output() readonly xDomainChange = new EventEmitter<ChartDomain>();
  @Output() readonly yDomainChange = new EventEmitter<ChartDomain>();
  @Output() readonly selectionChange = new EventEmitter<{ start: readonly [number, number]; end: readonly [number, number] } | null>();
  @Output() readonly selectedDataChange = new EventEmitter<readonly Datum[]>();
  @Output() readonly pointHover = new EventEmitter<ChartPointInteraction | null>();
  @Output() readonly pointClick = new EventEmitter<ChartPointInteraction>();
  @Output() readonly pointDoubleClick = new EventEmitter<ChartPointInteraction>();
  @Output() readonly pointContextMenu = new EventEmitter<ChartPointInteraction>();
  @Output() readonly sliceSelect = new EventEmitter<{ datum: Datum; index: number; value: number }>();
  @Output() readonly drilldown = new EventEmitter<ChartPointInteraction | { datum: Datum; index: number; value: number }>();
  @Output() readonly drilldownBack = new EventEmitter<void>();
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;
  abstract readonly kind: ChartSeriesType | 'combo' | 'pie' | 'donut';
  focused = 0;
  tablePage = 0;
  private uncontrolledHiddenSeries?: readonly string[];
  private uncontrolledViewport: { x?: ChartDomain; y?: ChartDomain } = {};
  selection: { start: readonly [number, number]; end: readonly [number, number] } | null = null;
  private pointerStart: readonly [number, number] | null = null;
  private pointerLast: readonly [number, number] | null = null;
  private brushHandle: ChartBrushHandle | null = null;
  private pointers = new Map<number, readonly [number, number]>();
  private pinchStart: { distance: number } | null = null;
  private zoomDrag = false;
  private selectedPolarSlice: number | null = null;
  streamPaused = false;
  private hoveredPolarSlice: number | null = null;
  tooltipVisible = this.tooltipTrigger !== 'click';
  tooltipIntersected = true;
  tooltipX = 0;
  tooltipY = 0;
  private drawn = '';
  constructor(private readonly changeDetector?: ChangeDetectorRef) {}

  get effectiveHiddenSeries() { return this.hiddenSeries ?? this.uncontrolledHiddenSeries ?? this.defaultHiddenSeries; }
  get layoutTop() { return chartLayout(this.width, this.height).top; }
  get layoutLeft() { return chartLayout(this.width, this.height).left; }
  get plotHeight() { return chartLayout(this.width, this.height).plotHeight; }
  get plotWidth() { return chartLayout(this.width, this.height).plotWidth; }
  get effectiveViewport() { return this.viewport ?? (Object.keys(this.uncontrolledViewport).length ? this.uncontrolledViewport : this.defaultViewport ?? this.sync?.state.viewport ?? {}); }

  get decorative() {
    return 'decorative' in this.accessibility && this.accessibility.decorative;
  }
  get xAccessor(): ChartAccessor<Datum> { return this.x ?? ((_: Datum, index: number) => index); }
  get activeSeries(): readonly ChartSeries<Datum>[] { return (this.series?.length ? this.series : this.y ? [{ id: 'value', y: this.y, x: this.xAccessor, type: this.kind === 'combo' ? 'line' : this.kind as ChartSeriesType }] : []).filter((item) => !this.effectiveHiddenSeries.includes(item.id)); }
  get tableEnabled() { return !this.decorative && 'table' in this.accessibility && Boolean(this.accessibility.table); }
  get tablePageSize() { const table = 'table' in this.accessibility ? this.accessibility.table : false; return typeof table === 'object' ? table.pageSize ?? 50 : 50; }
  get rows(): readonly Datum[] {
    if (!this.streamValue) return prepareChartData(this.data, this.dataOptions);
    if (this.data.length) throw new TypeError('Chart accepts either data or stream, not both.');
    const snapshot = this.streamValue.snapshot();
    const limit = Math.max(2, Math.floor(this.width * 2));
    const step = Math.max(1, Math.ceil(snapshot.length / limit));
    const indexes = Array.from({ length: Math.ceil(snapshot.length / step) }, (_, index) => index * step);
    if (snapshot.length && indexes.at(-1) !== snapshot.length - 1) indexes.push(snapshot.length - 1);
    return prepareChartData(indexes.map((index) => Object.fromEntries(this.streamValue!.dimensions.map((key) => [key, snapshot.columns[key]![index]])) as Datum), this.dataOptions);
  }
  get tablePages() { return Math.max(1, Math.ceil(this.rows.length / this.tablePageSize)); }
  get tableRows() { return this.rows.slice(this.tablePage * this.tablePageSize, this.tablePage * this.tablePageSize + this.tablePageSize); }
  tableValue(datum: Datum, value: ChartAccessor<Datum>, row: number) { return String(chartValue(datum, value, this.tablePage * this.tablePageSize + row) ?? ''); }
  formatAxisTick(value: number, axis: ChartAxisConfig | undefined) { return axis?.tickFormatter?.(value) ?? formatChartValue(value, axis?.locale); }
  min(a: number, b: number) { return Math.min(a, b); }
  abs(value: number) { return Math.abs(value); }

  get model() {
    if (this.kind === 'pie' || this.kind === 'donut') return this.polarModel();
    const layout = chartLayout(this.width, this.height);
    const xAccessor = this.xAccessor;
    const definitions: readonly ChartSeries<Datum>[] = this.series?.length
      ? this.series
      : this.y ? [{ id: 'value', y: this.y, x: xAccessor, type: this.kind === 'combo' ? 'line' : this.kind }] : [];
    const active = this.activeSeries;
    const unstacked = active.flatMap((definition) => {
      const values = interpolateChartValues(this.rows.map((datum, index) => chartMissingValue(numericValue(chartValue(datum, definition.y, index)), this.dataOptions?.missing)), this.dataOptions?.interpolate);
      return this.rows.map((datum, index) => {
      const xValue = chartValue(datum, definition.x ?? xAccessor, index);
      const yValue = values[index] ?? null;
      const numericX = numericValue(xValue);
      return xValue == null || yValue == null || (this.xScale !== 'band' && numericX == null) || (this.yScale === 'log' && yValue <= 0)
        ? null : { datum, index, xValue, numericX: numericX ?? index, yValue, definition, radius: numericValue(definition.radius ? chartValue(datum, definition.radius, index) : 4) ?? 4 };
      }).filter((item): item is NonNullable<typeof item> => item != null);
    });
    const raw = stackChartValues(unstacked.map((item) => ({ ...item, stack: item.definition.stack, x: item.xValue, value: item.yValue })), this.dataOptions?.stackOffset);
    const fullX = this.xDomain ?? chartDomain(raw.map((item) => item.numericX)) ?? [0, 1];
    const fullY = this.yDomain ?? chartDomain(raw.flatMap((item) => [item.start, item.end]), { includeZero: active.some((item) => item.type === 'bar' || this.kind === 'bar') }) ?? [0, 1];
    const xDomain = this.effectiveViewport.x ?? fullX;
    const yDomain = this.effectiveViewport.y ?? fullY;
    const bands = this.xScale === 'band' ? bandScale(raw.map((item) => item.xValue), [layout.left, layout.left + layout.plotWidth]) : null;
    const xMap = (this.xScale === 'log' ? logScale : linearScale)(xDomain, [layout.left, layout.left + layout.plotWidth]);
    const yMap = (this.yScale === 'log' ? logScale : linearScale)(yDomain, [layout.top + layout.plotHeight, layout.top]);
    const secondaryYDomain = chartDomain(raw.filter((item) => item.definition.axis === 'end').flatMap((item) => [item.start, item.end]), { includeZero: true }) ?? yDomain;
    const secondaryYMap = (this.yScale === 'log' ? logScale : linearScale)(secondaryYDomain, [layout.top + layout.plotHeight, layout.top]);
    const marks: Mark[] = [];
    const canvasMarks: CanvasMark[] = [];
    const points: ChartPointInteraction[] = [];
    for (const [seriesIndex, definition] of active.entries()) {
      const type = definition.type ?? (this.kind === 'combo' ? 'line' : this.kind);
      const color = definition.color ?? colors[seriesIndex % colors.length]!;
      const fill = definition.pattern ? `url(#${definition.pattern})` : definition.fill ?? color;
      const values = raw.filter((item) => item.definition === definition).map((item) => ({ ...item, x: bands ? bands.map(item.xValue) + bands.bandwidth / 2 : xMap(item.numericX), y: (definition.axis === 'end' ? secondaryYMap : yMap)(item.end), y0: (definition.axis === 'end' ? secondaryYMap : yMap)(item.start) }));
      points.push(...values.map((item) => ({ datum: item.datum, index: item.index, x: item.x, y: item.y, xValue: item.xValue, yValue: item.yValue, radius: item.radius, seriesId: definition.id })));
      if (type === 'line' || type === 'area') {
        const path = type === 'line' ? chartCurvePath(values.map((item) => [item.x, item.y]), definition.curve, definition.tension) : definition.stack ? stackedAreaPath(values.map((item) => ({ x: item.x, y0: item.y0, y1: item.y }))) : areaPath(values.map((item) => [item.x, item.y]), yMap(0));
        marks.push({ id: definition.id, type, color: fill, path, ...(definition.lineWidth == null ? {} : { lineWidth: definition.lineWidth }), ...(definition.lineDash == null ? {} : { lineDash: definition.lineDash }) });
        const visible = this.viewportCulling ? cullChartPoints(values, { x: [layout.left, layout.left + layout.plotWidth], y: [layout.top, layout.top + layout.plotHeight] }) : values;
        const decimated = minMaxDecimate(visible, this.plotWidth);
        canvasMarks.push(type === 'line' ? { type: 'line', points: decimated.map((item) => [item.x, item.y]), color } : { type: 'area', points: decimated.map((item) => [item.x, item.y]), baseline: yMap(0), color, opacity: 0.3 });
      } else for (const item of values) {
        if (type === 'bar' || type === 'heatmap') {
          const width = type === 'bar' ? bands?.bandwidth ?? 8 : 10;
          const origin = definition.stack ? item.y0 : yMap(0);
          const y = type === 'bar' ? Math.min(item.y, origin) : item.y - 5;
          const height = type === 'bar' ? Math.abs(item.y - origin) : 10;
          marks.push({ id: definition.id, type, color: fill, x: item.x - width / 2, y, width, height });
          canvasMarks.push({ type: 'rect', x: item.x - width / 2, y, width, height, color });
        } else {
          const radius = type === 'bubble' ? item.radius : 3;
          const style = chartVisualStyle(item.yValue, this.visualMap);
          marks.push({ id: definition.id, type, color: style.color ?? color, x: item.x, y: item.y, radius: style.size ?? radius, ...(definition.pointSymbol == null ? {} : { symbol: definition.pointSymbol }) });
          canvasMarks.push({ type: 'point', x: item.x, y: item.y, radius, color });
        }
      }
    }
    const useCanvas = this.renderMode === 'canvas' || (this.renderMode === 'auto' && points.length > this.canvasThreshold);
    const current = points[Math.min(this.focused, points.length - 1)];
    const tooltipPoints = this.tooltipMode === 'none' ? [] : this.tooltipMode === 'nearest' ? (current ? [current] : []) : this.tooltipMode === 'intersect' ? (this.tooltipIntersected && current ? [current] : []) : current ? points.filter((item) => item.index === current.index) : [];
    const axisYDomain = this.yAxis?.position === 'end' ? secondaryYDomain : yDomain;
    const axisYMap = this.yAxis?.position === 'end' ? secondaryYMap : yMap;
    const yTicks = chartTicks(axisYDomain, this.yAxis?.ticks ?? 5).map((value) => ({ value, position: axisYMap(value) }));
    const labelConfig: ChartDataLabelConfig | undefined = this.dataLabels === true ? {} : this.dataLabels || undefined;
    const dataLabels = labelConfig?.enabled === false ? [] : points.reduce<{ x: number; y: number; text: string }[]>((visible, point) => visible.some((item) => Math.hypot(item.x - point.x, item.y - point.y) < (labelConfig?.minDistance ?? 18)) ? visible : [...visible, { x: point.x, y: point.y + (labelConfig?.placement === 'bottom' ? 14 : labelConfig?.placement === 'inside' ? 4 : -8), text: labelConfig?.formatter?.(point.yValue, point.index, point.seriesId) ?? String(point.yValue) }], []);
    const xTicks = chartTicks(xDomain, this.xAxis?.ticks ?? 5).map((value) => ({ value, position: xMap(value) }));
    return { marks, canvasMarks, useCanvas, points, xDomain: fullX, yDomain: fullY, xTicks, yTicks, references: this.references.map((reference) => ({ ...reference, position: reference.axis === 'x' ? xMap(reference.value) : yMap(reference.value), endPosition: reference.endValue == null ? undefined : reference.axis === 'x' ? xMap(reference.endValue) : yMap(reference.endValue) })), annotations: this.annotations.map((annotation) => ({ ...annotation, x: xMap(annotation.x), y: yMap(annotation.y) })), dataLabels, polarTotal: 0, summary: chartSummary(points.map((item) => item.yValue)), tooltip: this.tooltipContent ? this.tooltipContent(tooltipPoints) : tooltipPoints.map((item) => this.tooltipFormatter?.(item) ?? `${item.seriesId}: ${item.yValue}`).join('\n'), legend: definitions.map((item, index) => ({ id: item.id, label: item.label ?? item.id, color: item.color ?? colors[index % colors.length] })) };
  }

  ngAfterViewChecked(): void {
    const model = this.model;
    const signature = `${this.rows.length}:${model.marks.length}:${this.width}:${this.height}`;
    if (!model.useCanvas || !this.canvas || signature === this.drawn) return;
    this.drawn = signature;
    void import('@simurgh-ui/core/chart-canvas').then(async ({ drawChartCanvas, createChartWorker, runChartWorker }) => {
      const context = this.canvas?.nativeElement.getContext('2d');
      if (!context) return;
      if (this.workerProcessing && model.canvasMarks.some((mark) => mark.type === 'line' || mark.type === 'area')) {
        const worker = createChartWorker();
        if (worker) try {
          const processed = await Promise.all(model.canvasMarks.map(async (mark) => mark.type === 'line' || mark.type === 'area' ? { ...mark, points: (await runChartWorker<{ x: number; y: number }[]>(worker, { operation: 'decimate', points: mark.points.map(([x, y]) => ({ x, y })), width: this.plotWidth })).map(({ x, y }) => [x, y] as const) } : mark));
          drawChartCanvas(context, processed, this.width, this.height, globalThis.devicePixelRatio || 1);
        } finally { worker.terminate(); }
        else drawChartCanvas(context, model.canvasMarks, this.width, this.height, globalThis.devicePixelRatio || 1);
      } else drawChartCanvas(context, model.canvasMarks, this.width, this.height, globalThis.devicePixelRatio || 1);
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (this.interaction && (['+', '=', '-', 'Escape'].includes(event.key) || event.shiftKey && ['ArrowLeft', 'ArrowRight'].includes(event.key))) {
      const model = this.model;
      const x = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
      const y = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
      const result = chartInteractionKey(event, { x: this.effectiveViewport.x ?? x, y: this.effectiveViewport.y ?? y });
      if (result.clearSelection) { this.resetViewport(); event.preventDefault(); return; }
      const next: { x?: ChartDomain; y?: ChartDomain } = {};
      if (result.viewport.x) next.x = clampDomain(result.viewport.x, x);
      if (result.viewport.y) next.y = clampDomain(result.viewport.y, y);
      if (next.x || next.y) { if (this.viewport === undefined) this.uncontrolledViewport = next; this.sync?.set({ viewport: next }); this.viewportChange.emit(next); this.changeDetector?.markForCheck(); event.preventDefault(); }
      if (next.x) this.xDomainChange.emit(next.x);
      if (next.y) this.yDomainChange.emit(next.y);
      return;
    }
    const size = this.model.marks.length;
    if (event.key === 'Home') this.focused = 0;
    else if (event.key === 'End') this.focused = Math.max(0, size - 1);
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) this.focused = Math.max(0, this.focused - 1);
    else if (['ArrowRight', 'ArrowDown'].includes(event.key)) this.focused = Math.min(Math.max(0, size - 1), this.focused + 1);
    else return;
    event.preventDefault();
  }
  onWheel(event: WheelEvent) {
    if (!this.interaction || (!this.axisEnabled(this.interaction.zoom, 'x') && !this.axisEnabled(this.interaction.zoom, 'y'))) return;
    this.tooltipVisible = true;
    event.preventDefault();
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const point: readonly [number, number] = [((event.clientX - bounds.left) / bounds.width) * this.width, ((event.clientY - bounds.top) / bounds.height) * this.height];
    const layout = chartLayout(this.width, this.height);
    const model = this.model;
    const fullX = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
    const fullY = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
    const next = { ...this.effectiveViewport };
    const factor = event.deltaY < 0 ? 1.2 : 1 / 1.2;
    if (this.axisEnabled(this.interaction.zoom, 'x')) next.x = clampDomain(zoomDomain(this.effectiveViewport.x ?? fullX, factor, domainFromSelection(this.effectiveViewport.x ?? fullX, [point[0], point[0]], [layout.left, layout.left + layout.plotWidth])[0]), fullX);
    if (this.axisEnabled(this.interaction.zoom, 'y')) next.y = clampDomain(zoomDomain(this.effectiveViewport.y ?? fullY, factor, domainFromSelection(this.effectiveViewport.y ?? fullY, [point[1], point[1]], [layout.top + layout.plotHeight, layout.top])[0]), fullY);
    if (this.viewport === undefined) this.uncontrolledViewport = next;
    this.sync?.set({ viewport: next });
    this.viewportChange.emit(next);
    if (next.x) this.xDomainChange.emit(next.x);
    if (next.y) this.yDomainChange.emit(next.y);
    this.changeDetector?.markForCheck();
  }
  private pointFromPointer(event: PointerEvent): readonly [number, number] {
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    return [((event.clientX - bounds.left) / bounds.width) * this.width, ((event.clientY - bounds.top) / bounds.height) * this.height];
  }
  onPointerDown(event: PointerEvent) {
    const point = this.pointFromPointer(event);
    this.pointers.set(event.pointerId, point);
    if (this.pointers.size === 2 && this.interaction && (this.axisEnabled(this.interaction.zoom, 'x') || this.axisEnabled(this.interaction.zoom, 'y'))) {
      const values = [...this.pointers.values()];
      this.pinchStart = { distance: Math.hypot(values[1]![0] - values[0]![0], values[1]![1] - values[0]![1]) };
      this.pointerStart = null;
      this.pointerLast = null;
      return;
    }
    if (!this.interaction || (!this.axisEnabled(this.interaction.zoom, 'x') && !this.axisEnabled(this.interaction.zoom, 'y') && !this.axisEnabled(this.interaction.pan, 'x') && !this.axisEnabled(this.interaction.pan, 'y') && !this.axisEnabled(this.interaction.brush, 'x') && !this.axisEnabled(this.interaction.brush, 'y'))) return;
    this.zoomDrag = (this.axisEnabled(this.interaction.zoom, 'x') || this.axisEnabled(this.interaction.zoom, 'y')) && (!(this.axisEnabled(this.interaction.pan, 'x') || this.axisEnabled(this.interaction.pan, 'y')) || event.shiftKey);
    this.brushHandle = this.brushHandleFromPoint(point);
    if (this.zoomDrag) this.brushHandle = null;
    this.pointerStart = this.brushHandle ? null : point;
    this.pointerLast = point;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  }
  onPointerMove(event: PointerEvent) {
    const point = this.pointFromPointer(event);
    if (this.pointers.has(event.pointerId)) this.pointers.set(event.pointerId, point);
    if (this.pinchStart && this.pointers.size >= 2 && this.interaction) {
      const values = [...this.pointers.values()];
      const distance = Math.hypot(values[1]![0] - values[0]![0], values[1]![1] - values[0]![1]);
      const midpoint: readonly [number, number] = [(values[0]![0] + values[1]![0]) / 2, (values[0]![1] + values[1]![1]) / 2];
      const model = this.model;
      const fullX = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
      const fullY = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
      const next = { ...this.effectiveViewport };
      if (this.axisEnabled(this.interaction.zoom, 'x')) next.x = clampDomain(pinchZoomDomain(this.effectiveViewport.x ?? fullX, this.pinchStart.distance, distance, domainFromSelection(this.effectiveViewport.x ?? fullX, [midpoint[0], midpoint[0]], [this.layoutLeft, this.layoutLeft + this.plotWidth])[0]), fullX);
      if (this.axisEnabled(this.interaction.zoom, 'y')) next.y = clampDomain(pinchZoomDomain(this.effectiveViewport.y ?? fullY, this.pinchStart.distance, distance, domainFromSelection(this.effectiveViewport.y ?? fullY, [midpoint[1], midpoint[1]], [this.layoutTop + this.plotHeight, this.layoutTop])[0]), fullY);
      if (this.viewport === undefined) this.uncontrolledViewport = next;
      this.sync?.set({ viewport: next });
      this.viewportChange.emit(next);
      if (next.x) this.xDomainChange.emit(next.x);
      if (next.y) this.yDomainChange.emit(next.y);
      return;
    }
    if (this.zoomDrag) return;
    if (this.brushHandle && this.selection) {
      this.applySelection(resizeChartSelection(this.selection, this.brushHandle, this.pointFromPointer(event)));
      return;
    }
    if (!this.pointerLast || !this.interaction || (!this.axisEnabled(this.interaction.pan, 'x') && !this.axisEnabled(this.interaction.pan, 'y'))) return;
    const previous = this.pointerLast;
    const layout = chartLayout(this.width, this.height);
    const model = this.model;
    const fullX = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
    const fullY = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
    const next = { ...this.effectiveViewport };
    if (this.axisEnabled(this.interaction.pan, 'x')) next.x = clampDomain(panDomain(this.effectiveViewport.x ?? fullX, -(point[0] - previous[0]) / (layout.plotWidth || 1)), fullX);
    if (this.axisEnabled(this.interaction.pan, 'y')) next.y = clampDomain(panDomain(this.effectiveViewport.y ?? fullY, (point[1] - previous[1]) / (layout.plotHeight || 1)), fullY);
    this.pointerLast = point;
    if (this.viewport === undefined) this.uncontrolledViewport = next;
    this.sync?.set({ viewport: next });
    this.viewportChange.emit(next);
    if (next.x) this.xDomainChange.emit(next.x);
    if (next.y) this.yDomainChange.emit(next.y);
    this.changeDetector?.markForCheck();
  }
  onPointerUp(event: PointerEvent) {
    this.pointers.delete(event.pointerId);
    if (this.pointers.size < 2) this.pinchStart = null;
    if (this.brushHandle) {
      if (this.selection) this.applySelection(resizeChartSelection(this.selection, this.brushHandle, this.pointFromPointer(event)));
      this.brushHandle = null;
      this.pointerLast = null;
      return;
    }
    const start = this.pointerStart;
    if (this.zoomDrag && !(this.interaction && (this.axisEnabled(this.interaction.brush, 'x') || this.axisEnabled(this.interaction.brush, 'y')))) {
      this.zoomDrag = false;
      this.pointerStart = null;
      this.pointerLast = null;
      if (start && this.interaction) {
        const point = this.pointFromPointer(event);
        const model = this.model;
        const fullX = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
        const fullY = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
        const next = { ...this.effectiveViewport };
        if (this.axisEnabled(this.interaction.zoom, 'x')) next.x = clampDomain(domainFromSelection(fullX, [start[0], point[0]], [this.layoutLeft, this.layoutLeft + this.plotWidth]), fullX);
        if (this.axisEnabled(this.interaction.zoom, 'y')) next.y = clampDomain(domainFromSelection(fullY, [start[1], point[1]], [this.layoutTop + this.plotHeight, this.layoutTop]), fullY);
        if (this.viewport === undefined) this.uncontrolledViewport = next;
        this.sync?.set({ viewport: next });
        this.viewportChange.emit(next);
        if (next.x) this.xDomainChange.emit(next.x);
        if (next.y) this.yDomainChange.emit(next.y);
      }
      return;
    }
    this.pointerStart = null;
    this.pointerLast = null;
    const interaction = this.interaction;
    if (!start || !interaction || (!this.axisEnabled(interaction.brush, 'x') && !this.axisEnabled(interaction.brush, 'y'))) return;
    const point = this.pointFromPointer(event);
    const nextSelection = { start: [Math.min(start[0], point[0]), Math.min(start[1], point[1])] as const, end: [Math.max(start[0], point[0]), Math.max(start[1], point[1])] as const };
    this.applySelection(nextSelection);
  }
  private applySelection(nextSelection: { start: readonly [number, number]; end: readonly [number, number] }) {
    const interaction = this.interaction;
    if (!interaction) return;
    this.selection = nextSelection;
    this.selectionChange.emit(nextSelection);
    this.sync?.set({ selection: nextSelection });
    const layout = chartLayout(this.width, this.height);
    const model = this.model;
    const fullX = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
    const fullY = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
    const next = { ...this.effectiveViewport };
    if (this.axisEnabled(interaction.brush, 'x')) next.x = domainFromSelection(fullX, [nextSelection.start[0], nextSelection.end[0]], [layout.left, layout.left + layout.plotWidth]);
    if (this.axisEnabled(interaction.brush, 'y')) next.y = domainFromSelection(fullY, [nextSelection.start[1], nextSelection.end[1]], [layout.top + layout.plotHeight, layout.top]);
    const points = 'points' in model ? model.points : [];
    this.selectedDataChange.emit([...new Set(points.filter((item) => (!this.axisEnabled(interaction.brush, 'x') || item.x >= nextSelection.start[0] && item.x <= nextSelection.end[0]) && (!this.axisEnabled(interaction.brush, 'y') || item.y >= nextSelection.start[1] && item.y <= nextSelection.end[1])).map((item) => item.datum))]);
    if (this.viewport === undefined) this.uncontrolledViewport = next;
    this.sync?.set({ viewport: next });
    this.viewportChange.emit(next);
    if (next.x) this.xDomainChange.emit(next.x);
    if (next.y) this.yDomainChange.emit(next.y);
    this.changeDetector?.markForCheck();
  }
  private brushHandleFromPoint(point: readonly [number, number]): ChartBrushHandle | null {
    if (!this.selection || !this.interaction) return null;
    const candidates: readonly [ChartBrushHandle, readonly [number, number]][] = [['start', this.selection.start], ['end', [this.selection.end[0], this.selection.start[1]]], ['start-y', [this.selection.start[0], this.selection.end[1]]], ['end-y', this.selection.end]];
    return candidates.find(([, item]) => Math.hypot(point[0] - item[0], point[1] - item[1]) <= 12)?.[0] ?? null;
  }
  onPointerCancel() { this.pointers.clear(); this.pinchStart = null; this.zoomDrag = false; this.pointerStart = null; this.pointerLast = null; this.brushHandle = null; this.selection = null; this.sync?.set({ selection: null }); this.selectionChange.emit(null); this.selectedDataChange.emit([]); }
  private pointAt(event: MouseEvent): ChartPointInteraction | null {
    const points = 'points' in this.model ? this.model.points : [];
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (!bounds.width || !bounds.height || !points.length) return null;
    const x = ((event.clientX - bounds.left) / bounds.width) * this.width;
    const y = ((event.clientY - bounds.top) / bounds.height) * this.height;
    return points.reduce((nearest, point) => Math.hypot(point.x - x, point.y - y) < Math.hypot(nearest.x - x, nearest.y - y) ? point : nearest, points[0]!);
  }
  onMouseMove(event: MouseEvent) {
    const point = this.pointAt(event);
    if (point) { const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect(); this.tooltipX = ((event.clientX - bounds.left) / bounds.width) * this.width; this.tooltipY = ((event.clientY - bounds.top) / bounds.height) * this.height; this.tooltipIntersected = Math.hypot(point.x - this.tooltipX, point.y - this.tooltipY) <= Math.max(point.radius, 8); this.focused = point.index; this.tooltipVisible = true; this.pointHover.emit(point); this.sync?.set({ focused: { seriesId: point.seriesId, index: point.index } }); }
  }
  onMouseLeave() { this.tooltipIntersected = false; this.pointHover.emit(null); if (this.tooltipTrigger === 'hover') this.tooltipVisible = false; }
  onPointClick(event: MouseEvent) { const point = this.pointAt(event); if (point) { this.tooltipVisible = true; this.pointClick.emit(point); this.drilldown.emit(point); } }
  onPointDoubleClick(event: MouseEvent) { const point = this.pointAt(event); if (point) this.pointDoubleClick.emit(point); }
  onPointContextMenu(event: MouseEvent) { const point = this.pointAt(event); if (point) { event.preventDefault(); this.pointContextMenu.emit(point); } }
  resetViewport() { this.uncontrolledViewport = {}; this.selection = null; this.sync?.set({ viewport: {}, selection: null, focused: null }); this.viewportChange.emit({}); this.selectionChange.emit(null); this.selectedDataChange.emit([]); this.changeDetector?.markForCheck(); }
  private axisEnabled(value: boolean | 'x' | 'y' | 'xy' | undefined, axis: 'x' | 'y') { return value === true || value === 'xy' || value === axis; }
  toggleSeries(id: string) {
    const hidden = this.effectiveHiddenSeries;
    const next = hidden.includes(id) ? hidden.filter((item) => item !== id) : [...hidden, id];
    if (this.hiddenSeries === undefined) this.uncontrolledHiddenSeries = next;
    this.hiddenSeriesChange.emit(next);
  }
  selectAllSeries() { if (this.hiddenSeries === undefined) this.uncontrolledHiddenSeries = []; this.hiddenSeriesChange.emit([]); }
  isolateSeries(id: string) { const next = this.activeSeries.filter((item) => item.id !== id).map((item) => item.id); if (this.hiddenSeries === undefined) this.uncontrolledHiddenSeries = next; this.hiddenSeriesChange.emit(next); }
  onPolarSliceClick(id: string) {
    if (this.kind !== 'pie' && this.kind !== 'donut') return;
    const value = this.y ?? this.series?.[0]?.y;
    if (!value) return;
    const radius = Math.min(this.width, this.height) / 2 - 16;
    const arcs = pieArcs(this.rows, value, radius, this.kind === 'donut' ? this.innerRadius ?? radius * 0.55 : this.innerRadius ?? 0);
    const arc = arcs.find((item) => String(item.index) === id);
    if (!arc) return;
    this.selectedPolarSlice = this.selectedPolarSlice === arc.index ? null : arc.index;
    this.sliceSelect.emit({ datum: arc.datum, index: arc.index, value: arc.value });
    this.drilldown.emit({ datum: arc.datum, index: arc.index, value: arc.value });
    this.changeDetector?.markForCheck();
  }
  onPolarSliceHover(id: string) { if (this.kind === 'pie' || this.kind === 'donut') { this.hoveredPolarSlice = Number(id); this.changeDetector?.markForCheck(); } }
  toggleStream() { if (!this.streamValue) return; if (this.streamPaused) this.streamValue.resume(); else this.streamValue.pause(); this.streamPaused = !this.streamPaused; }
  ngOnDestroy(): void { this.unsubscribeStream?.(); this.unsubscribeSync?.(); }
  private polarModel() {
    const value = this.y ?? this.series?.[0]?.y;
    const radius = Math.min(this.width, this.height) / 2 - 16;
    const arcs = value ? pieArcs(this.rows, value, radius, this.kind === 'donut' ? this.innerRadius ?? radius * 0.55 : this.innerRadius ?? 0) : [];
    const labelConfig: ChartDataLabelConfig | undefined = this.dataLabels === true ? {} : this.dataLabels || undefined;
    const labels = labelConfig?.enabled === false ? [] : arcs.reduce<{ x: number; y: number; text: string }[]>((visible, arc) => {
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const inner = this.kind === 'donut' ? this.innerRadius ?? radius * 0.55 : 0;
      const distance = labelConfig?.placement === 'top' ? radius + 14 : labelConfig?.placement === 'bottom' ? Math.max(inner, radius / 2) : (inner + radius) / 2;
      const point = { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
      if (visible.some((item) => Math.hypot(item.x - point.x, item.y - point.y) < (labelConfig?.minDistance ?? 18))) return visible;
      return [...visible, { ...point, text: labelConfig?.formatter?.(arc.value, arc.index, 'slices') ?? String(arc.index + 1) }];
    }, []);
    return { marks: arcs.map((arc, index): Mark => ({ id: String(arc.index), type: 'area', color: colors[index % colors.length]!, path: arc.path, opacity: this.selectedPolarSlice != null && this.selectedPolarSlice !== arc.index ? 0.35 : this.hoveredPolarSlice != null && this.hoveredPolarSlice !== arc.index ? 0.65 : 1 })), canvasMarks: [], useCanvas: false, points: [], xDomain: [0, 1] as ChartDomain, yDomain: [0, 1] as ChartDomain, xTicks: [], yTicks: [], references: [], annotations: [], dataLabels: labels, polarTotal: arcs.reduce((total, arc) => total + arc.value, 0), summary: chartSummary(arcs.map((arc) => arc.value), 'Slices'), tooltip: '', legend: [] };
  }
}

function chartMetadata(selector: string) {
  return Component({ selector, standalone: true, imports: [CommonModule], template, host: { class: 'simurgh-chart', 'data-slot': 'chart', '[attr.data-motion]': "motion ? 'on' : 'off'", '[attr.data-state]': "model.marks.length ? null : 'empty'", '[attr.aria-hidden]': 'decorative || null' } });
}

@chartMetadata('simurgh-line-chart') export class LineChartComponent extends ChartBaseComponent { readonly kind = 'line'; }
@chartMetadata('simurgh-area-chart') export class AreaChartComponent extends ChartBaseComponent { readonly kind = 'area'; }
@chartMetadata('simurgh-bar-chart') export class BarChartComponent extends ChartBaseComponent { readonly kind = 'bar'; override xScale: 'linear' | 'time' | 'band' | 'log' = 'band'; }
@chartMetadata('simurgh-scatter-chart') export class ScatterChartComponent extends ChartBaseComponent { readonly kind = 'scatter'; }
@chartMetadata('simurgh-bubble-chart') export class BubbleChartComponent extends ChartBaseComponent { readonly kind = 'bubble'; }
@chartMetadata('simurgh-heatmap-chart') export class HeatmapChartComponent extends ChartBaseComponent { readonly kind = 'heatmap'; }
@chartMetadata('simurgh-combo-chart') export class ComboChartComponent extends ChartBaseComponent { readonly kind = 'combo'; }
@chartMetadata('simurgh-pie-chart') export class PieChartComponent extends ChartBaseComponent { readonly kind = 'pie'; }
@chartMetadata('simurgh-donut-chart') export class DonutChartComponent extends ChartBaseComponent { readonly kind = 'donut'; }

@Component({ selector: 'simurgh-radar-chart', standalone: true, template: `<svg [attr.viewBox]="viewBox" data-part="plot" aria-hidden="true"><polygon data-part="series" [attr.points]="points" fill="hsl(var(--simurgh-chart-1))" stroke="hsl(var(--simurgh-chart-1))"></polygon></svg><figcaption *ngIf="!decorative">{{ accessibility.title }}</figcaption><p *ngIf="!decorative" data-part="description">{{ accessibility.description }} {{ summary }}</p>`, imports: [CommonModule], host: { class: 'simurgh-chart', 'data-slot': 'chart' } })
export class RadarChartComponent {
  @Input() data: readonly Datum[] = [];
  @Input() stream?: ChartStream<string>;
  @Input({ required: true }) y!: ChartAccessor<Datum, number>;
  @Input({ required: true }) accessibility!: ChartAccessibility;
  @Input() width = 360;
  @Input() height = 360;
  get rows(): readonly Datum[] { if (!this.stream) return this.data; const snapshot = this.stream.snapshot(); const step = Math.max(1, Math.ceil(snapshot.length / Math.max(2, this.width * 2))); return Array.from({ length: Math.ceil(snapshot.length / step) }, (_, index) => Object.fromEntries(this.stream!.dimensions.map((key) => [key, snapshot.columns[key]![index * step]])) as Datum); }
  get values() { return this.rows.map((datum, index) => numericValue(chartValue(datum, this.y, index))).filter((item): item is number => item != null); }
  get points() { return radarPoints(this.values, Math.min(this.width, this.height) / 2 - 24); }
  get viewBox() { return `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`; }
  get decorative() { return 'decorative' in this.accessibility && this.accessibility.decorative; }
  get summary() { return chartSummary(this.values); }
}

@Component({ selector: 'simurgh-chart-root', standalone: true, template: '<ng-content />', host: { class: 'simurgh-chart', 'data-slot': 'chart' } }) export class ChartRootComponent {}
@Component({ selector: 'simurgh-chart-plot', standalone: true, template: '<svg data-part="plot"><ng-content /></svg>' }) export class ChartPlotComponent {}
@Directive({ selector: '[simurghChartGrid]', standalone: true, host: { 'data-part': 'grid' } }) export class ChartGridDirective {}
@Directive({ selector: '[simurghChartXAxis]', standalone: true, host: { 'data-part': 'x-axis' } }) export class ChartXAxisDirective {}
@Directive({ selector: '[simurghChartYAxis]', standalone: true, host: { 'data-part': 'y-axis' } }) export class ChartYAxisDirective {}
@Directive({ selector: '[simurghChartLegend]', standalone: true, host: { 'data-part': 'legend' } }) export class ChartLegendDirective {}
@Directive({ selector: '[simurghChartTooltip]', standalone: true, host: { 'data-part': 'tooltip', role: 'tooltip' } }) export class ChartTooltipDirective {}
@Directive({ selector: '[simurghChartCrosshair]', standalone: true, host: { 'data-part': 'crosshair' } }) export class ChartCrosshairDirective {}
@Directive({ selector: '[simurghChartBrush]', standalone: true, host: { 'data-part': 'brush' } }) export class ChartBrushDirective {}
