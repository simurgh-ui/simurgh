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
  type ChartAccessor,
  type ChartSeries,
  type ChartSeriesType,
  type ChartDomain,
} from '@simurgh-ui/core/charts';
import { chartInteractionKey, clampDomain, domainFromSelection, panDomain, resizeChartSelection, zoomDomain, type ChartBrushHandle, type ChartSync } from '@simurgh-ui/core/chart-interactions';
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
};
const colors = Array.from({ length: 10 }, (_, index) => `hsl(var(--simurgh-chart-${index + 1}))`);

const template = `
  <figcaption *ngIf="!decorative">{{ accessibility.title }}</figcaption>
  <p *ngIf="!decorative" data-part="description">{{ accessibility.description }} {{ model.summary }}</p>
  <div data-part="viewport" [style.aspect-ratio]="width + ' / ' + height" (wheel)="onWheel($event)" (mousemove)="onMouseMove($event)" (mouseleave)="pointHover.emit(null)" (click)="onPointClick($event)" (dblclick)="onPointDoubleClick($event)" (contextmenu)="onPointContextMenu($event)" (pointerdown)="onPointerDown($event)" (pointermove)="onPointerMove($event)" (pointerup)="onPointerUp($event)" (pointercancel)="onPointerCancel()">
    <canvas #canvas *ngIf="model.useCanvas" [attr.width]="width" [attr.height]="height" aria-hidden="true"></canvas>
    <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" data-part="plot" aria-hidden="true">
      <ng-container *ngIf="!model.useCanvas">
        <ng-container *ngFor="let mark of model.marks">
          <path *ngIf="mark.path" data-part="series" [attr.data-series]="mark.id" [attr.d]="mark.path" [attr.fill]="mark.type === 'line' ? 'none' : mark.color" [attr.stroke]="mark.color"></path>
          <rect *ngIf="mark.type === 'bar' || mark.type === 'heatmap'" data-part="series" [attr.x]="mark.x" [attr.y]="mark.y" [attr.width]="mark.width" [attr.height]="mark.height" [attr.fill]="mark.color"></rect>
          <circle *ngIf="mark.type === 'scatter' || mark.type === 'bubble'" data-part="series" [attr.cx]="mark.x" [attr.cy]="mark.y" [attr.r]="mark.radius" [attr.fill]="mark.color"></circle>
        </ng-container>
      </ng-container>
      <rect *ngIf="selection" data-part="brush" [attr.x]="selection.start[0]" [attr.y]="selection.start[1]" [attr.width]="selection.end[0] - selection.start[0]" [attr.height]="selection.end[1] - selection.start[1]"></rect>
      <ng-container *ngIf="selection"><rect data-part="brush-handle" [attr.x]="selection.start[0] - 4" [attr.y]="selection.start[1] - 4" width="8" height="8"></rect><rect data-part="brush-handle" [attr.x]="selection.end[0] - 4" [attr.y]="selection.end[1] - 4" width="8" height="8"></rect></ng-container>
    </svg>
    <button type="button" data-part="keyboard-target" aria-label="Explore chart data" (keydown)="onKeydown($event)"></button>
    <button *ngIf="interaction" type="button" data-part="reset-viewport" (click)="resetViewport()">Reset view</button>
    <div *ngIf="model.tooltip" role="tooltip" data-part="tooltip">{{ model.tooltip }}</div>
  </div>
  <div data-part="legend">
    <button *ngFor="let item of model.legend; let index = index" type="button" [attr.aria-pressed]="!effectiveHiddenSeries.includes(item.id)" (click)="toggleSeries(item.id)">
      <span [style.background]="item.color"></span>{{ item.label }}
    </button>
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
  @Input() viewport?: { x?: ChartDomain; y?: ChartDomain };
  @Input() defaultViewport: { x?: ChartDomain; y?: ChartDomain } = {};
  @Input() interaction?: { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy' };
  private syncValue: ChartSync | undefined = undefined;
  private unsubscribeSync: (() => void) | undefined = undefined;
  @Input() set sync(value: ChartSync | undefined) { this.unsubscribeSync?.(); this.syncValue = value; this.unsubscribeSync = value?.subscribe(() => this.changeDetector?.markForCheck()); }
  get sync() { return this.syncValue; }
  @Input() renderMode: 'auto' | 'svg' | 'canvas' = 'auto';
  @Input() canvasThreshold = 2000;
  @Input() hiddenSeries?: readonly string[];
  @Input() defaultHiddenSeries: readonly string[] = [];
  @Input() innerRadius?: number;
  @Input() emptyContent = 'No chart data';
  @Output() readonly hiddenSeriesChange = new EventEmitter<string[]>();
  @Output() readonly viewportChange = new EventEmitter<{ x?: ChartDomain; y?: ChartDomain }>();
  @Output() readonly selectionChange = new EventEmitter<{ start: readonly [number, number]; end: readonly [number, number] } | null>();
  @Output() readonly selectedDataChange = new EventEmitter<readonly Datum[]>();
  @Output() readonly pointHover = new EventEmitter<ChartPointInteraction | null>();
  @Output() readonly pointClick = new EventEmitter<ChartPointInteraction>();
  @Output() readonly pointDoubleClick = new EventEmitter<ChartPointInteraction>();
  @Output() readonly pointContextMenu = new EventEmitter<ChartPointInteraction>();
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
  private drawn = '';
  constructor(private readonly changeDetector?: ChangeDetectorRef) {}

  get effectiveHiddenSeries() { return this.hiddenSeries ?? this.uncontrolledHiddenSeries ?? this.defaultHiddenSeries; }
  get effectiveViewport() { return this.viewport ?? (Object.keys(this.uncontrolledViewport).length ? this.uncontrolledViewport : this.defaultViewport ?? this.sync?.state.viewport ?? {}); }

  get decorative() {
    return 'decorative' in this.accessibility && this.accessibility.decorative;
  }
  get xAccessor(): ChartAccessor<Datum> { return this.x ?? ((_: Datum, index: number) => index); }
  get activeSeries(): readonly ChartSeries<Datum>[] { return (this.series?.length ? this.series : this.y ? [{ id: 'value', y: this.y, x: this.xAccessor, type: this.kind === 'combo' ? 'line' : this.kind as ChartSeriesType }] : []).filter((item) => !this.effectiveHiddenSeries.includes(item.id)); }
  get tableEnabled() { return !this.decorative && 'table' in this.accessibility && Boolean(this.accessibility.table); }
  get tablePageSize() { const table = 'table' in this.accessibility ? this.accessibility.table : false; return typeof table === 'object' ? table.pageSize ?? 50 : 50; }
  get rows(): readonly Datum[] {
    if (!this.streamValue) return this.data;
    if (this.data.length) throw new TypeError('Chart accepts either data or stream, not both.');
    const snapshot = this.streamValue.snapshot();
    const limit = Math.max(2, Math.floor(this.width * 2));
    const step = Math.max(1, Math.ceil(snapshot.length / limit));
    const indexes = Array.from({ length: Math.ceil(snapshot.length / step) }, (_, index) => index * step);
    if (snapshot.length && indexes.at(-1) !== snapshot.length - 1) indexes.push(snapshot.length - 1);
    return indexes.map((index) => Object.fromEntries(this.streamValue!.dimensions.map((key) => [key, snapshot.columns[key]![index]])) as Datum);
  }
  get tablePages() { return Math.max(1, Math.ceil(this.rows.length / this.tablePageSize)); }
  get tableRows() { return this.rows.slice(this.tablePage * this.tablePageSize, this.tablePage * this.tablePageSize + this.tablePageSize); }
  tableValue(datum: Datum, value: ChartAccessor<Datum>, row: number) { return String(chartValue(datum, value, this.tablePage * this.tablePageSize + row) ?? ''); }

  get model() {
    if (this.kind === 'pie' || this.kind === 'donut') return this.polarModel();
    const layout = chartLayout(this.width, this.height);
    const xAccessor = this.xAccessor;
    const definitions: readonly ChartSeries<Datum>[] = this.series?.length
      ? this.series
      : this.y ? [{ id: 'value', y: this.y, x: xAccessor, type: this.kind === 'combo' ? 'line' : this.kind }] : [];
    const active = this.activeSeries;
    const unstacked = active.flatMap((definition) => this.rows.map((datum, index) => {
      const xValue = chartValue(datum, definition.x ?? xAccessor, index);
      const yValue = numericValue(chartValue(datum, definition.y, index));
      const numericX = numericValue(xValue);
      return xValue == null || yValue == null || (this.xScale !== 'band' && numericX == null) || (this.yScale === 'log' && yValue <= 0)
        ? null : { datum, index, xValue, numericX: numericX ?? index, yValue, definition, radius: numericValue(definition.radius ? chartValue(datum, definition.radius, index) : 4) ?? 4 };
    }).filter((item): item is NonNullable<typeof item> => item != null));
    const raw = stackChartValues(unstacked.map((item) => ({ ...item, stack: item.definition.stack, x: item.xValue, value: item.yValue })));
    const fullX = this.xDomain ?? chartDomain(raw.map((item) => item.numericX)) ?? [0, 1];
    const fullY = this.yDomain ?? chartDomain(raw.flatMap((item) => [item.start, item.end]), { includeZero: active.some((item) => item.type === 'bar' || this.kind === 'bar') }) ?? [0, 1];
    const xDomain = this.effectiveViewport.x ?? fullX;
    const yDomain = this.effectiveViewport.y ?? fullY;
    const bands = this.xScale === 'band' ? bandScale(raw.map((item) => item.xValue), [layout.left, layout.left + layout.plotWidth]) : null;
    const xMap = (this.xScale === 'log' ? logScale : linearScale)(xDomain, [layout.left, layout.left + layout.plotWidth]);
    const yMap = (this.yScale === 'log' ? logScale : linearScale)(yDomain, [layout.top + layout.plotHeight, layout.top]);
    const marks: Mark[] = [];
    const canvasMarks: CanvasMark[] = [];
    const points: ChartPointInteraction[] = [];
    for (const [seriesIndex, definition] of active.entries()) {
      const type = definition.type ?? (this.kind === 'combo' ? 'line' : this.kind);
      const color = definition.color ?? colors[seriesIndex % colors.length]!;
      const values = raw.filter((item) => item.definition === definition).map((item) => ({ ...item, x: bands ? bands.map(item.xValue) + bands.bandwidth / 2 : xMap(item.numericX), y: yMap(item.end), y0: yMap(item.start) }));
      points.push(...values.map((item) => ({ datum: item.datum, index: item.index, x: item.x, y: item.y, xValue: item.xValue, yValue: item.yValue, radius: item.radius, seriesId: definition.id })));
      if (type === 'line' || type === 'area') {
        const path = type === 'line' ? linePath(values.map((item) => [item.x, item.y])) : definition.stack ? stackedAreaPath(values.map((item) => ({ x: item.x, y0: item.y0, y1: item.y }))) : areaPath(values.map((item) => [item.x, item.y]), yMap(0));
        marks.push({ id: definition.id, type, color, path });
        canvasMarks.push(type === 'line' ? { type: 'line', points: values.map((item) => [item.x, item.y]), color } : { type: 'area', points: values.map((item) => [item.x, item.y]), baseline: yMap(0), color, opacity: 0.3 });
      } else for (const item of values) {
        if (type === 'bar' || type === 'heatmap') {
          const width = type === 'bar' ? bands?.bandwidth ?? 8 : 10;
          const origin = definition.stack ? item.y0 : yMap(0);
          const y = type === 'bar' ? Math.min(item.y, origin) : item.y - 5;
          const height = type === 'bar' ? Math.abs(item.y - origin) : 10;
          marks.push({ id: definition.id, type, color, x: item.x - width / 2, y, width, height });
          canvasMarks.push({ type: 'rect', x: item.x - width / 2, y, width, height, color });
        } else {
          const radius = type === 'bubble' ? item.radius : 3;
          marks.push({ id: definition.id, type, color, x: item.x, y: item.y, radius });
          canvasMarks.push({ type: 'point', x: item.x, y: item.y, radius, color });
        }
      }
    }
    const useCanvas = this.renderMode === 'canvas' || (this.renderMode === 'auto' && points.length > this.canvasThreshold);
    const current = points[Math.min(this.focused, points.length - 1)];
    return { marks, canvasMarks, useCanvas, points, xDomain: fullX, yDomain: fullY, summary: chartSummary(points.map((item) => item.yValue)), tooltip: current ? `${current.seriesId}: ${current.yValue}` : '', legend: definitions.map((item, index) => ({ id: item.id, label: item.label ?? item.id, color: item.color ?? colors[index % colors.length] })) };
  }

  ngAfterViewChecked(): void {
    const model = this.model;
    const signature = `${this.rows.length}:${model.marks.length}:${this.width}:${this.height}`;
    if (!model.useCanvas || !this.canvas || signature === this.drawn) return;
    this.drawn = signature;
    void import('@simurgh-ui/core/chart-canvas').then(({ drawChartCanvas }) => {
      const context = this.canvas?.nativeElement.getContext('2d');
      if (context) drawChartCanvas(context, model.canvasMarks, this.width, this.height, globalThis.devicePixelRatio || 1);
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
    this.changeDetector?.markForCheck();
  }
  private pointFromPointer(event: PointerEvent): readonly [number, number] {
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    return [((event.clientX - bounds.left) / bounds.width) * this.width, ((event.clientY - bounds.top) / bounds.height) * this.height];
  }
  onPointerDown(event: PointerEvent) {
    if (!this.interaction || (!this.axisEnabled(this.interaction.pan, 'x') && !this.axisEnabled(this.interaction.pan, 'y') && !this.axisEnabled(this.interaction.brush, 'x') && !this.axisEnabled(this.interaction.brush, 'y'))) return;
    const point = this.pointFromPointer(event);
    this.brushHandle = this.brushHandleFromPoint(point);
    this.pointerStart = this.brushHandle ? null : point;
    this.pointerLast = point;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  }
  onPointerMove(event: PointerEvent) {
    if (this.brushHandle && this.selection) {
      this.applySelection(resizeChartSelection(this.selection, this.brushHandle, this.pointFromPointer(event)));
      return;
    }
    if (!this.pointerLast || !this.interaction || (!this.axisEnabled(this.interaction.pan, 'x') && !this.axisEnabled(this.interaction.pan, 'y'))) return;
    const previous = this.pointerLast;
    const point = this.pointFromPointer(event);
    const layout = chartLayout(this.width, this.height);
    const model = this.model;
    const fullX = 'xDomain' in model ? model.xDomain : [0, 1] as ChartDomain;
    const fullY = 'yDomain' in model ? model.yDomain : [0, 1] as ChartDomain;
    const next = { ...this.effectiveViewport };
    if (this.axisEnabled(this.interaction.pan, 'x')) next.x = clampDomain(panDomain(this.effectiveViewport.x ?? fullX, -(point[0] - previous[0]) / (layout.plotWidth || 1)), fullX);
    if (this.axisEnabled(this.interaction.pan, 'y')) next.y = clampDomain(panDomain(this.effectiveViewport.y ?? fullY, (point[1] - previous[1]) / (layout.plotHeight || 1)), fullY);
    this.pointerLast = point;
    if (this.viewport === undefined) this.uncontrolledViewport = next;
    this.viewportChange.emit(next);
    this.changeDetector?.markForCheck();
  }
  onPointerUp(event: PointerEvent) {
    if (this.brushHandle) {
      if (this.selection) this.applySelection(resizeChartSelection(this.selection, this.brushHandle, this.pointFromPointer(event)));
      this.brushHandle = null;
      this.pointerLast = null;
      return;
    }
    const start = this.pointerStart;
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
    this.changeDetector?.markForCheck();
  }
  private brushHandleFromPoint(point: readonly [number, number]): ChartBrushHandle | null {
    if (!this.selection || !this.interaction) return null;
    const candidates: readonly [ChartBrushHandle, readonly [number, number]][] = [['start', this.selection.start], ['end', [this.selection.end[0], this.selection.start[1]]], ['start-y', [this.selection.start[0], this.selection.end[1]]], ['end-y', this.selection.end]];
    return candidates.find(([, item]) => Math.hypot(point[0] - item[0], point[1] - item[1]) <= 12)?.[0] ?? null;
  }
  onPointerCancel() { this.pointerStart = null; this.pointerLast = null; this.brushHandle = null; }
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
    if (point) { this.focused = point.index; this.pointHover.emit(point); this.sync?.set({ focused: { seriesId: point.seriesId, index: point.index } }); }
  }
  onPointClick(event: MouseEvent) { const point = this.pointAt(event); if (point) this.pointClick.emit(point); }
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
  ngOnDestroy(): void { this.unsubscribeStream?.(); this.unsubscribeSync?.(); }
  private polarModel() {
    const value = this.y ?? this.series?.[0]?.y;
    const radius = Math.min(this.width, this.height) / 2 - 16;
    const arcs = value ? pieArcs(this.rows, value, radius, this.kind === 'donut' ? this.innerRadius ?? radius * 0.55 : this.innerRadius ?? 0) : [];
    return { marks: arcs.map((arc, index): Mark => ({ id: String(arc.index), type: 'area', color: colors[index % colors.length]!, path: arc.path })), canvasMarks: [], useCanvas: false, points: [], xDomain: [0, 1] as ChartDomain, yDomain: [0, 1] as ChartDomain, summary: chartSummary(arcs.map((arc) => arc.value), 'Slices'), tooltip: '', legend: [] };
  }
}

function chartMetadata(selector: string) {
  return Component({ selector, standalone: true, imports: [CommonModule], template, host: { class: 'simurgh-chart', 'data-slot': 'chart', '[attr.data-state]': "model.marks.length ? null : 'empty'", '[attr.aria-hidden]': 'decorative || null' } });
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
