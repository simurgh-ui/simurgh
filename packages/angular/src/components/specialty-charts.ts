import { CommonModule } from '@angular/common';
import { Component, Directive, Input } from '@angular/core';
import type { ChartAccessibility } from '@simurgh-ui/core/charts';
import { specialtyChartMarks, specialtyChartSummary, type SpecialtyChartKind, type SpecialtyDatum } from '@simurgh-ui/core/specialty-charts';

const template = `<figcaption *ngIf="!decorative">{{ accessibility.title }}</figcaption><svg [attr.viewBox]="'0 0 ' + width + ' ' + height" data-part="plot" aria-hidden="true"><ng-container *ngFor="let mark of marks; let index = index"><path *ngIf="mark.type === 'path'" [attr.data-part]="mark.part" [attr.d]="mark.path" [attr.fill]="mark.part === 'link' ? 'none' : color(index)" [attr.stroke]="color(index)" [attr.stroke-width]="mark.part === 'link' ? linkWidth(mark.value) : 1"></path><rect *ngIf="mark.type === 'rect'" [attr.data-part]="mark.part" [attr.x]="mark.x" [attr.y]="mark.y" [attr.width]="mark.width" [attr.height]="mark.height" [attr.fill]="color(index)" stroke="currentColor"></rect><line *ngIf="mark.type === 'line'" [attr.data-part]="mark.part" [attr.x1]="mark.x" [attr.y1]="mark.y" [attr.x2]="mark.x2" [attr.y2]="mark.y2" [attr.stroke]="color(index)" stroke-width="2"></line><circle *ngIf="mark.type === 'circle'" [attr.data-part]="mark.part" [attr.cx]="mark.x" [attr.cy]="mark.y" [attr.r]="mark.radius" [attr.fill]="color(index)"></circle></ng-container></svg><ng-container *ngIf="!decorative"><p data-part="description">{{ accessibility.description }} {{ summary }}</p><ul data-part="data-list" class="simurgh-visually-hidden"><li *ngFor="let item of uniqueMarks">{{ item.label }}: {{ item.value }}</li></ul></ng-container>`;
@Directive()
export abstract class SpecialtyChartComponent {
  @Input({ required: true }) data: readonly SpecialtyDatum[] = [];
  @Input({ required: true }) accessibility!: ChartAccessibility;
  @Input() width = 640; @Input() height = 360;
  abstract readonly kind: SpecialtyChartKind;
  get decorative() { return 'decorative' in this.accessibility && this.accessibility.decorative; }
  get marks() { return specialtyChartMarks(this.kind, this.data, this.width, this.height); }
  get uniqueMarks() { return this.marks.filter((item, index, all) => all.findIndex((candidate) => candidate.label === item.label) === index); }
  get summary() { return specialtyChartSummary(this.kind, this.marks); }
  color(index: number) { return `hsl(var(--simurgh-chart-${index % 10 + 1}))`; }
  linkWidth(value: number) { return Math.max(2, Math.sqrt(Math.abs(value))); }
}
const metadata = (selector: string) => Component({ selector, standalone: true, imports: [CommonModule], template, host: { class: 'simurgh-chart', 'data-slot': 'chart', '[attr.data-kind]': 'kind', '[attr.aria-hidden]': 'decorative || null' } });
@metadata('simurgh-candlestick-chart') export class CandlestickChartComponent extends SpecialtyChartComponent { readonly kind = 'candlestick'; }
@metadata('simurgh-ohlc-chart') export class OhlcChartComponent extends SpecialtyChartComponent { readonly kind = 'ohlc'; }
@metadata('simurgh-box-plot-chart') export class BoxPlotChartComponent extends SpecialtyChartComponent { readonly kind = 'box-plot'; }
@metadata('simurgh-violin-chart') export class ViolinChartComponent extends SpecialtyChartComponent { readonly kind = 'violin'; }
@metadata('simurgh-histogram-chart') export class HistogramChartComponent extends SpecialtyChartComponent { readonly kind = 'histogram'; }
@metadata('simurgh-funnel-chart') export class FunnelChartComponent extends SpecialtyChartComponent { readonly kind = 'funnel'; }
@metadata('simurgh-gauge-chart') export class GaugeChartComponent extends SpecialtyChartComponent { readonly kind = 'gauge'; }
@metadata('simurgh-polar-area-chart') export class PolarAreaChartComponent extends SpecialtyChartComponent { readonly kind = 'polar-area'; }
@metadata('simurgh-waterfall-chart') export class WaterfallChartComponent extends SpecialtyChartComponent { readonly kind = 'waterfall'; }
@metadata('simurgh-treemap-chart') export class TreemapChartComponent extends SpecialtyChartComponent { readonly kind = 'treemap'; }
@metadata('simurgh-sankey-chart') export class SankeyChartComponent extends SpecialtyChartComponent { readonly kind = 'sankey'; }
@metadata('simurgh-geo-chart') export class GeoChartComponent extends SpecialtyChartComponent { readonly kind = 'geo'; }
@metadata('simurgh-map-chart') export class MapChartComponent extends SpecialtyChartComponent { readonly kind = 'geo'; }
