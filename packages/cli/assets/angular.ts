export * from './components/dialog.js';
export * from './components/alert-dialog.js';
export * from './components/sheet.js';
export * from './components/drawer.js';
export * from './components/popover.js';
export * from './components/tooltip.js';
export * from './components/hover-card.js';
export * from './components/dropdown-menu.js';
export * from './components/context-menu.js';
export * from './components/select.js';
export * from './components/native-select.js';
export * from './components/combobox.js';
export * from './components/command.js';
export * from './components/calendar.js';
export * from './components/date-picker.js';
export * from './components/carousel.js';
export * from './components/resizable.js';
export * from './components/sidebar.js';
export * from './components/tree.js';
export * from './components/file-upload.js';
export * from './components/password-input.js';
export * from './components/number-input.js';
export * from './components/rating.js';
export * from './components/tags-input.js';
export * from './components/tabs.js';
export * from './components/accordion.js';
export * from './components/checkbox.js';
export * from './components/label.js';
export * from './components/separator.js';
export * from './components/progress.js';
export * from './components/toggle.js';
export * from './components/visually-hidden.js';
export * from './components/avatar.js';
export * from './components/alert.js';
export * from './components/aspect-ratio.js';
export * from './components/skeleton.js';
export * from './components/spinner.js';
export * from './components/button.js';
export * from './components/button-group.js';
export * from './components/link.js';
export * from './components/input.js';
export * from './components/input-group.js';
export * from './components/input-otp.js';
export * from './components/slider.js';
export * from './components/meter.js';
export * from './components/toolbar.js';
export * from './components/toggle-group.js';
export * from './components/scroll-area.js';
export * from './components/textarea.js';
export * from './components/badge.js';
export * from './components/breadcrumb.js';
export * from './components/navigation-menu.js';
export * from './components/menubar.js';
export * from './components/card.js';
export * from './components/empty.js';
export * from './components/item.js';
export * from './components/kbd.js';
export * from './components/field.js';
export * from './components/form.js';
export * from './components/table.js';
export * from './components/pagination.js';
export * from './components/collapsible.js';
export * from './components/disclosure.js';
export * from './components/description-list.js';
export * from './components/switch.js';
export * from './components/radio-group.js';
export * from './components/toast.js';
export * from './components/chart.js';

import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'simurgh-accordion',
  standalone: true,
  template: `<ng-content />`,
})
export class AccordionComponent {
  @Input() multiple = false;
  readonly open = signal<string[]>([]);
  toggle(value: string) {
    this.open.update((items) =>
      items.includes(value)
        ? items.filter((x) => x !== value)
        : this.multiple
          ? [...items, value]
          : [value],
    );
  }
}

@Component({
  selector: 'simurgh-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `<h3>
      <button type="button" [attr.aria-expanded]="expanded" (click)="toggle()">
        <ng-content select="[trigger]" />
      </button>
    </h3>
    <div *ngIf="expanded" role="region"><ng-content /></div>`,
})
export class AccordionItemComponent {
  @Input({ required: true }) value = '';
  constructor(private accordion: AccordionComponent) {}
  get expanded() {
    return this.accordion.open().includes(this.value);
  }
  toggle() {
    this.accordion.toggle(this.value);
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { DialogComponent } from './dialog.js';

@Component({
  selector: 'simurgh-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-dialog"
      data-slot="alert-dialog-content"
      role="alertdialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class AlertDialogComponent extends DialogComponent {
  override show() {
    super.show();
    setTimeout(() =>
      this.content?.nativeElement
        .querySelector<HTMLElement>('[simurghAlertDialogCancel]')
        ?.focus(),
    );
  }
}

@Directive({
  selector: 'button[simurghAlertDialogAction]',
  standalone: true,
  host: { type: 'button', 'data-slot': 'alert-dialog-action' },
})
export class AlertDialogActionDirective {
  @Output() action = new EventEmitter<void>();
  private dialog = inject(AlertDialogComponent);
  @HostListener('click') choose() {
    this.action.emit();
    this.dialog.close();
  }
}

@Directive({
  selector: 'button[simurghAlertDialogCancel]',
  standalone: true,
  host: { type: 'button', 'data-slot': 'alert-dialog-cancel' },
})
export class AlertDialogCancelDirective {
  private dialog = inject(AlertDialogComponent);
  @HostListener('click') cancel() {
    this.dialog.close();
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.role]': "urgent ? 'alert' : 'status'",
    '[attr.aria-live]': "urgent ? 'assertive' : 'polite'",
    '[attr.aria-atomic]': "'true'",
    '[attr.data-urgent]': 'urgent || null',
  },
})
export class AlertComponent {
  @Input() urgent = false;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-aspect-ratio',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[style.aspect-ratio]': "'' + safeRatio",
    '[attr.data-ratio]': 'safeRatio',
  },
})
export class AspectRatioComponent {
  @Input() ratio = 1;
  get safeRatio() {
    return Number.isFinite(this.ratio) && this.ratio > 0 ? this.ratio : 1;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `<img
      *ngIf="src"
      [src]="src"
      [alt]="alt"
      [hidden]="!loaded"
      (load)="loaded = true"
      (error)="loaded = false"
    /><span *ngIf="!loaded" data-part="fallback">{{ fallback }}</span>`,
  host: { '[attr.data-state]': "loaded ? 'loaded' : 'fallback'" },
})
export class AvatarComponent {
  private source: string | undefined;
  @Input() set src(value: string | undefined) {
    this.source = value;
    this.loaded = false;
  }
  get src() {
    return this.source;
  }
  @Input({ required: true }) alt = '';
  @Input({ required: true }) fallback = '';
  loaded = false;
}

import { Component, Input } from '@angular/core';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'simurgh-badge',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.data-tone]': 'tone',
    '[attr.role]': "status ? 'status' : null",
    '[attr.aria-live]': "status ? 'polite' : null",
  },
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input() status = false;
}

export * from './accordion.js';
export * from './alert.js';
export * from './badge.js';
export * from './button.js';
export * from './card.js';
export * from './checkbox.js';
export * from './input.js';
export * from './label.js';
export * from './native-select.js';
export * from './number-input.js';
export * from './progress.js';
export * from './radio-group.js';
export * from './rating.js';
export * from './separator.js';
export * from './skeleton.js';
export * from './spinner.js';
export * from './switch.js';
export * from './tabs.js';
export * from './tags-input.js';
export * from './textarea.js';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-breadcrumb',
  standalone: true,
  template: `<nav [attr.aria-label]="label"><ng-content /></nav>`,
})
export class BreadcrumbComponent {
  @Input() label = 'Breadcrumb';
}

import type { Orientation } from '@simurgh-ui/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-button-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'group',
    '[attr.aria-orientation]': 'orientation',
    '[attr.data-slot]': "'button-group'",
  },
})
export class ButtonGroupComponent {
  @Input() orientation: Orientation = 'horizontal';
}

@Component({
  selector: 'simurgh-button-group-text',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'button-group-text'" },
})
export class ButtonGroupTextComponent {}

@Component({
  selector: 'simurgh-button-group-separator',
  standalone: true,
  template: ``,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation',
    '[attr.data-slot]': "'button-group-separator'",
  },
})
export class ButtonGroupSeparatorComponent {
  @Input() orientation: Orientation = 'vertical';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-button',
  standalone: true,
  template: `<button
    [attr.type]="type"
    [disabled]="disabled || loading"
    [attr.aria-busy]="loading || null"
    data-slot="button"
    [attr.data-state]="loading ? 'loading' : 'idle'"
    [attr.data-variant]="variant"
    [attr.data-size]="size"
    [attr.data-full-width]="fullWidth || null"
    [attr.data-icon-only]="iconOnly || null"
  >
    <ng-content />
  </button>`,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' | 'destructive' | 'quiet' =
    'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth = false;
  @Input() iconOnly = false;
}

import type { Direction } from '@simurgh-ui/core';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  addCalendarMonths,
  calendarMonthDays,
  calendarToday,
  createId,
  moveCalendarDate,
} from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    #root
    data-slot="calendar"
    role="group"
    [attr.dir]="direction"
    [attr.aria-label]="label"
  >
    <div data-slot="calendar-header">
      <button type="button" aria-label="Previous month" (click)="moveMonth(-1)">
        ‹
      </button>
      <h2 [id]="titleId" aria-live="polite">{{ monthLabel }}</h2>
      <button type="button" aria-label="Next month" (click)="moveMonth(1)">
        ›
      </button>
    </div>
    <table role="grid" [attr.aria-labelledby]="titleId">
      <thead>
        <tr>
          <th *ngFor="let index of weekdayIndexes" scope="col">
            {{ weekdayLabel(index) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let week of weeks">
          <td
            *ngFor="let day of weekDays(week)"
            role="gridcell"
            [attr.aria-selected]="value === day.value"
          >
            <button
              type="button"
              data-slot="calendar-day"
              [attr.data-date]="day.value"
              [attr.data-outside]="day.outside ? '' : null"
              [attr.data-state]="value === day.value ? 'selected' : null"
              [attr.aria-current]="today === day.value ? 'date' : null"
              [attr.aria-label]="dayLabel(day.value)"
              [attr.aria-disabled]="isDisabled(day.value) ? 'true' : null"
              [tabIndex]="tabIndex(day.value)"
              (click)="choose(day.value)"
              (keydown)="onDayKeydown($event, day.value)"
            >
              {{ day.day }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <input *ngIf="name" type="hidden" [name]="name" [value]="value" />
  </div>`,
})
export class CalendarComponent extends FormResetBase {
  @Input() value = '';
  @Input() month = calendarToday().slice(0, 7);
  @Input() locale = 'en';
  @Input() direction: Direction = 'ltr';
  @Input() firstDayOfWeek = 0;
  @Input() min: string | undefined;
  @Input() max: string | undefined;
  @Input() disabledDates: string[] = [];
  @Input() name?: string;
  @Input() label = 'Calendar';
  @Output() valueChange = new EventEmitter<string>();
  @Output() monthChange = new EventEmitter<string>();
  @ViewChild('root') root?: ElementRef<HTMLElement>;
  readonly today = calendarToday();
  readonly titleId = createId('calendar-title');
  readonly weeks = [0, 1, 2, 3, 4, 5];
  readonly weekdayIndexes = [0, 1, 2, 3, 4, 5, 6];

  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      if (initial) this.month = initial.slice(0, 7);
      this.valueChange.emit(initial);
    };
  }

  get days() {
    return calendarMonthDays(this.month, this.firstDayOfWeek);
  }
  get monthLabel() {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${this.month}-01T00:00:00Z`));
  }
  weekDays(week: number) {
    return this.days.slice(week * 7, week * 7 + 7);
  }
  weekdayLabel(index: number) {
    const day = (this.firstDayOfWeek + index) % 7;
    return new Intl.DateTimeFormat(this.locale, {
      weekday: 'short',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(2023, 0, 1 + day)));
  }
  dayLabel(value: string) {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'full',
      timeZone: 'UTC',
    }).format(new Date(`${value}T00:00:00Z`));
  }
  isDisabled(value: string) {
    return (
      (this.min !== undefined && value < this.min) ||
      (this.max !== undefined && value > this.max) ||
      this.disabledDates.includes(value)
    );
  }
  tabIndex(value: string) {
    const anchor =
      this.value.slice(0, 7) === this.month ? this.value : `${this.month}-01`;
    return value === anchor ? 0 : -1;
  }
  setMonth(month: string) {
    this.month = month;
    this.monthChange.emit(month);
  }
  moveMonth(amount: number) {
    this.setMonth(addCalendarMonths(`${this.month}-01`, amount).slice(0, 7));
  }
  choose(value: string) {
    if (this.isDisabled(value)) return;
    this.value = value;
    if (value.slice(0, 7) !== this.month) this.setMonth(value.slice(0, 7));
    this.valueChange.emit(value);
  }
  onDayKeydown(event: KeyboardEvent, value: string) {
    if (
      ![
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'PageUp',
        'PageDown',
      ].includes(event.key)
    )
      return;
    event.preventDefault();
    const next = moveCalendarDate(value, event.key, {
      direction: this.direction,
      firstDayOfWeek: this.firstDayOfWeek,
    });
    if (next.slice(0, 7) !== this.month) this.setMonth(next.slice(0, 7));
    requestAnimationFrame(() =>
      this.root?.nativeElement
        .querySelector<HTMLElement>(`[data-date="${next}"]`)
        ?.focus(),
    );
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-card',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card' },
})
export class CardComponent {}

@Component({
  selector: 'simurgh-card-header',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-header' },
})
export class CardHeaderComponent {}

@Component({
  selector: 'simurgh-card-title',
  standalone: true,
  template: `<h3 data-slot="card-title"><ng-content /></h3>`,
})
export class CardTitleComponent {}

@Component({
  selector: 'simurgh-card-description',
  standalone: true,
  template: `<p data-slot="card-description"><ng-content /></p>`,
})
export class CardDescriptionComponent {}

@Component({
  selector: 'simurgh-card-content',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-content' },
})
export class CardContentComponent {}

@Component({
  selector: 'simurgh-card-footer',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-footer' },
})
export class CardFooterComponent {}

import type { Direction } from '@simurgh-ui/core';
import type { OnDestroy } from '@angular/core';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'simurgh-carousel',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'carousel',
    role: 'region',
    'aria-roledescription': 'carousel',
    '[attr.aria-label]': 'label',
    '[attr.dir]': 'direction',
    tabindex: '0',
  },
})
export class CarouselComponent {
  @Input() label = 'Carousel';
  @Input() direction: Direction = 'ltr';
  @Input() loop = false;
  @Output() indexChange = new EventEmitter<number>();
  index = 0;
  readonly items: CarouselItemComponent[] = [];

  @Input() set defaultIndex(value: number) {
    this.index = Math.max(0, value);
  }
  get count() {
    return this.items.length;
  }
  register(item: CarouselItemComponent) {
    this.items.push(item);
  }
  unregister(item: CarouselItemComponent) {
    const index = this.items.indexOf(item);
    if (index >= 0) this.items.splice(index, 1);
    this.index = Math.min(this.index, Math.max(0, this.count - 1));
  }
  itemIndex(item: CarouselItemComponent) {
    return this.items.indexOf(item);
  }
  goTo(next: number) {
    if (!this.count) return;
    const resolved = this.loop
      ? (next + this.count) % this.count
      : Math.max(0, Math.min(this.count - 1, next));
    if (resolved !== this.index) {
      this.index = resolved;
      this.indexChange.emit(resolved);
    }
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const previous = this.direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const next = this.direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === previous || event.key === next) {
      event.preventDefault();
      this.goTo(this.index + (event.key === next ? 1 : -1));
    }
  }
}

@Component({
  selector: 'simurgh-carousel-content',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'carousel-content', 'aria-live': 'polite' },
})
export class CarouselContentComponent {}

@Component({
  selector: 'simurgh-carousel-item',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'carousel-item',
    role: 'group',
    'aria-roledescription': 'slide',
  },
})
export class CarouselItemComponent implements OnDestroy {
  private carousel = inject(CarouselComponent);
  constructor() {
    this.carousel.register(this);
  }
  get position() {
    return this.carousel.itemIndex(this);
  }
  @HostBinding('attr.aria-label') get label() {
    return `${this.position + 1} of ${this.carousel.count}`;
  }
  @HostBinding('attr.aria-hidden') get ariaHidden() {
    return this.carousel.index !== this.position;
  }
  @HostBinding('attr.hidden') get hidden() {
    return this.carousel.index === this.position ? null : '';
  }
  ngOnDestroy() {
    this.carousel.unregister(this);
  }
}

function carouselUnavailable(carousel: CarouselComponent, step: -1 | 1) {
  return (
    !carousel.loop &&
    (step < 0 ? carousel.index <= 0 : carousel.index >= carousel.count - 1)
  );
}

@Component({
  selector: 'simurgh-carousel-previous',
  standalone: true,
  template: `<button
    type="button"
    data-slot="carousel-previous"
    aria-label="Previous slide"
    [disabled]="unavailable"
    (click)="carousel.goTo(carousel.index - 1)"
  >
    <ng-content />
  </button>`,
})
export class CarouselPreviousComponent {
  readonly carousel = inject(CarouselComponent);
  get unavailable() {
    return carouselUnavailable(this.carousel, -1);
  }
}

@Component({
  selector: 'simurgh-carousel-next',
  standalone: true,
  template: `<button
    type="button"
    data-slot="carousel-next"
    aria-label="Next slide"
    [disabled]="unavailable"
    (click)="carousel.goTo(carousel.index + 1)"
  >
    <ng-content />
  </button>`,
})
export class CarouselNextComponent {
  readonly carousel = inject(CarouselComponent);
  get unavailable() {
    return carouselUnavailable(this.carousel, 1);
  }
}

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
} from '@simurgh-ui/core/charts';
import type { CanvasMark } from '@simurgh-ui/core/chart-canvas';
import type { ChartStream } from '@simurgh-ui/core/chart-stream';

type Datum = Record<PropertyKey, unknown>;
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
  <div data-part="viewport" [style.aspect-ratio]="width + ' / ' + height">
    <canvas #canvas *ngIf="model.useCanvas" [attr.width]="width" [attr.height]="height" aria-hidden="true"></canvas>
    <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" data-part="plot" aria-hidden="true">
      <ng-container *ngIf="!model.useCanvas">
        <ng-container *ngFor="let mark of model.marks">
          <path *ngIf="mark.path" data-part="series" [attr.data-series]="mark.id" [attr.d]="mark.path" [attr.fill]="mark.type === 'line' ? 'none' : mark.color" [attr.stroke]="mark.color"></path>
          <rect *ngIf="mark.type === 'bar' || mark.type === 'heatmap'" data-part="series" [attr.x]="mark.x" [attr.y]="mark.y" [attr.width]="mark.width" [attr.height]="mark.height" [attr.fill]="mark.color"></rect>
          <circle *ngIf="mark.type === 'scatter' || mark.type === 'bubble'" data-part="series" [attr.cx]="mark.x" [attr.cy]="mark.y" [attr.r]="mark.radius" [attr.fill]="mark.color"></circle>
        </ng-container>
      </ng-container>
    </svg>
    <button type="button" data-part="keyboard-target" aria-label="Explore chart data" (keydown)="onKeydown($event)"></button>
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
  @Input() renderMode: 'auto' | 'svg' | 'canvas' = 'auto';
  @Input() canvasThreshold = 2000;
  @Input() hiddenSeries?: readonly string[];
  @Input() defaultHiddenSeries: readonly string[] = [];
  @Input() innerRadius?: number;
  @Input() emptyContent = 'No chart data';
  @Output() readonly hiddenSeriesChange = new EventEmitter<string[]>();
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;
  abstract readonly kind: ChartSeriesType | 'combo' | 'pie' | 'donut';
  focused = 0;
  tablePage = 0;
  private uncontrolledHiddenSeries?: readonly string[];
  private drawn = '';
  constructor(private readonly changeDetector?: ChangeDetectorRef) {}

  get effectiveHiddenSeries() { return this.hiddenSeries ?? this.uncontrolledHiddenSeries ?? this.defaultHiddenSeries; }

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
        ? null : { index, xValue, numericX: numericX ?? index, yValue, definition, radius: numericValue(definition.radius ? chartValue(datum, definition.radius, index) : 4) ?? 4 };
    }).filter((item): item is NonNullable<typeof item> => item != null));
    const raw = stackChartValues(unstacked.map((item) => ({ ...item, stack: item.definition.stack, x: item.xValue, value: item.yValue })));
    const xDomain = chartDomain(raw.map((item) => item.numericX)) ?? [0, 1];
    const yDomain = chartDomain(raw.flatMap((item) => [item.start, item.end]), { includeZero: active.some((item) => item.type === 'bar' || this.kind === 'bar') }) ?? [0, 1];
    const bands = this.xScale === 'band' ? bandScale(raw.map((item) => item.xValue), [layout.left, layout.left + layout.plotWidth]) : null;
    const xMap = (this.xScale === 'log' ? logScale : linearScale)(xDomain, [layout.left, layout.left + layout.plotWidth]);
    const yMap = (this.yScale === 'log' ? logScale : linearScale)(yDomain, [layout.top + layout.plotHeight, layout.top]);
    const marks: Mark[] = [];
    const canvasMarks: CanvasMark[] = [];
    const points: { id: string; label: string; yValue: number }[] = [];
    for (const [seriesIndex, definition] of active.entries()) {
      const type = definition.type ?? (this.kind === 'combo' ? 'line' : this.kind);
      const color = definition.color ?? colors[seriesIndex % colors.length]!;
      const values = raw.filter((item) => item.definition === definition).map((item) => ({ ...item, x: bands ? bands.map(item.xValue) + bands.bandwidth / 2 : xMap(item.numericX), y: yMap(item.end), y0: yMap(item.start) }));
      points.push(...values.map((item) => ({ id: definition.id, label: definition.label ?? definition.id, yValue: item.yValue })));
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
    return { marks, canvasMarks, useCanvas, summary: chartSummary(points.map((item) => item.yValue)), tooltip: current ? `${current.label}: ${current.yValue}` : '', legend: definitions.map((item, index) => ({ id: item.id, label: item.label ?? item.id, color: item.color ?? colors[index % colors.length] })) };
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
    const size = this.model.marks.length;
    if (event.key === 'Home') this.focused = 0;
    else if (event.key === 'End') this.focused = Math.max(0, size - 1);
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) this.focused = Math.max(0, this.focused - 1);
    else if (['ArrowRight', 'ArrowDown'].includes(event.key)) this.focused = Math.min(Math.max(0, size - 1), this.focused + 1);
    else return;
    event.preventDefault();
  }
  toggleSeries(id: string) {
    const hidden = this.effectiveHiddenSeries;
    const next = hidden.includes(id) ? hidden.filter((item) => item !== id) : [...hidden, id];
    if (this.hiddenSeries === undefined) this.uncontrolledHiddenSeries = next;
    this.hiddenSeriesChange.emit(next);
  }
  ngOnDestroy(): void { this.unsubscribeStream?.(); }
  private polarModel() {
    const value = this.y ?? this.series?.[0]?.y;
    const radius = Math.min(this.width, this.height) / 2 - 16;
    const arcs = value ? pieArcs(this.rows, value, radius, this.kind === 'donut' ? this.innerRadius ?? radius * 0.55 : this.innerRadius ?? 0) : [];
    return { marks: arcs.map((arc, index): Mark => ({ id: String(arc.index), type: 'area', color: colors[index % colors.length]!, path: arc.path })), canvasMarks: [], useCanvas: false, summary: chartSummary(arcs.map((arc) => arc.value), 'Slices'), tooltip: '', legend: [] };
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

import { CheckBase } from '../internal/check-base.js';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="checkbox"
      data-slot="checkbox"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      (click)="toggle()"
    >
      <ng-content /></button
    ><input
      *ngIf="name"
      hidden
      type="checkbox"
      [name]="name"
      [value]="value"
      [checked]="checked"
      [required]="required"
      [disabled]="disabled"
    />`,
})
export class CheckboxComponent extends CheckBase {}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-collapsible',
  standalone: true,
  template: `<button
      type="button"
      [disabled]="disabled"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="contentId"
      (click)="toggle()"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      [id]="contentId"
      [hidden]="!open"
      [attr.data-state]="open ? 'open' : 'closed'"
    >
      <ng-content />
    </div>`,
})
export class CollapsibleComponent {
  @Input() open = false;
  @Input() disabled = false;
  @Output() openChange = new EventEmitter<boolean>();
  readonly contentId = createId('collapsible-content');
  toggle() {
    if (!this.disabled) {
      this.open = !this.open;
      this.openChange.emit(this.open);
    }
  }
}

export type { SelectOption } from './select.js';
import type { SelectOption } from './select.js';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { InternalIdService } from '../internal/id.js';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-combobox',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="simurgh-combobox">
    <input
      role="combobox"
      [attr.aria-label]="ariaLabel || placeholder"
      aria-autocomplete="list"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="listId"
      [attr.aria-activedescendant]="activeId"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [value]="query"
      (focus)="show()"
      (input)="onInput($event)"
      (keydown)="onKeydown($event)"
    />
    <div *ngIf="open" [id]="listId" role="listbox" class="simurgh-content">
      <div
        *ngFor="let option of filteredOptions; let index = index"
        [id]="optionId(index)"
        role="option"
        class="simurgh-item"
        [attr.aria-selected]="option.value === value"
        [attr.aria-disabled]="option.disabled || null"
        (mousedown)="chooseFromPointer($event, option)"
      >
        {{ option.label }}
      </div>
      <div *ngIf="filteredOptions.length === 0" role="status">
        {{ noResults }}
      </div>
    </div>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />
    <input
      *ngIf="required"
      aria-hidden="true"
      tabindex="-1"
      required
      [value]="value"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class ComboboxComponent extends FormResetBase {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() name: string | undefined;
  @Input() required = false;
  @Input() disabled = false;
  @Input() placeholder = 'Search options';
  @Input() noResults = 'No results';
  @Input() ariaLabel: string | undefined;
  @Output() valueChange = new EventEmitter<string>();
  readonly listId = inject(InternalIdService).next('combobox-list');
  query = '';
  open = false;
  activeIndex = -1;

  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.query =
        this.options.find((option) => option.value === initial)?.label ?? '';
      this.open = false;
      this.activeIndex = -1;
      this.valueChange.emit(initial);
    };
  }

  get filteredOptions() {
    const needle = this.query.trim().toLocaleLowerCase();
    return needle
      ? this.options.filter((option) =>
          option.label.toLocaleLowerCase().includes(needle),
        )
      : this.options;
  }
  get activeId() {
    return this.open && this.activeIndex >= 0
      ? this.optionId(this.activeIndex)
      : null;
  }
  optionId(index: number) {
    return `${this.listId}-option-${index}`;
  }
  show() {
    if (!this.disabled) this.open = true;
  }
  onInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.open = true;
    this.activeIndex = -1;
  }
  move(step: 1 | -1) {
    const options = this.filteredOptions;
    if (!options.some((option) => !option.disabled)) return;
    let index = this.activeIndex;
    do {
      index = (index + step + options.length) % options.length;
    } while (options[index]?.disabled);
    this.activeIndex = index;
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open = true;
      this.move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Home' && this.open) {
      event.preventDefault();
      this.activeIndex = -1;
      this.move(1);
    } else if (event.key === 'End' && this.open) {
      event.preventDefault();
      this.activeIndex = 0;
      this.move(-1);
    } else if (
      event.key === 'Enter' &&
      !event.isComposing &&
      this.activeIndex >= 0
    ) {
      event.preventDefault();
      const option = this.filteredOptions[this.activeIndex];
      if (option) this.choose(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.query =
        this.options.find((option) => option.value === this.value)?.label ?? '';
      this.open = false;
      this.activeIndex = -1;
    }
  }
  chooseFromPointer(event: MouseEvent, option: SelectOption) {
    event.preventDefault();
    this.choose(option);
  }
  choose(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this.query = option.label;
    this.open = false;
    this.activeIndex = -1;
    this.valueChange.emit(option.value);
  }
}

import type { SelectOption } from './select.js';
import { ComboboxComponent } from './combobox.js';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simurgh-command',
  standalone: true,
  imports: [ComboboxComponent],
  template: `<div data-slot="command">
    <simurgh-combobox
      [options]="options"
      [value]="value"
      [name]="name"
      [required]="required"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [noResults]="noResults"
      [ariaLabel]="ariaLabel"
      (valueChange)="choose($event)"
    />
  </div>`,
})
export class CommandComponent {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() placeholder = 'Search commands';
  @Input() noResults = 'No commands found';
  @Input() ariaLabel?: string;
  @Output() valueChange = new EventEmitter<string>();
  choose(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { compositeKeydown } from '../internal/composite-keydown.js';

@Component({
  selector: 'simurgh-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<div
      #trigger
      tabindex="0"
      aria-haspopup="menu"
      data-slot="context-menu-trigger"
      [attr.aria-expanded]="open"
      (contextmenu)="openPointer($event)"
      (keydown)="openKeyboard($event, trigger)"
    >
      <ng-content select="[trigger]" />
    </div>
    <div
      #content
      *ngIf="open"
      role="menu"
      data-slot="context-menu-content"
      class="simurgh-content"
      style="position:fixed"
      [style.left.px]="x"
      [style.top.px]="y"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>`,
})
export class ContextMenuComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('content') content?: ElementRef<HTMLElement>;
  x = 0;
  y = 0;
  private setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
    if (value)
      setTimeout(() =>
        this.content?.nativeElement
          .querySelector<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          )
          ?.focus(),
      );
  }
  openPointer(event: MouseEvent) {
    event.preventDefault();
    this.x = event.clientX;
    this.y = event.clientY;
    this.setOpen(true);
  }
  openKeyboard(event: KeyboardEvent, trigger: HTMLElement) {
    if (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))
      return;
    event.preventDefault();
    const rect = trigger.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.bottom;
    this.setOpen(true);
  }
  close() {
    this.setOpen(false);
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else compositeKeydown(event, '[role=menuitem]');
  }
}

@Directive({
  selector: '[simurghContextMenuItem]',
  standalone: true,
  host: { role: 'menuitem', class: 'simurgh-item' },
})
export class ContextMenuItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  private menu = inject(ContextMenuComponent);
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? null : -1;
  }
  @HostListener('click') choose() {
    if (!this.disabled) {
      this.select.emit();
      this.menu.close();
    }
  }
}

import type { Direction } from '@simurgh-ui/core';
import { CalendarComponent } from './calendar.js';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PopoverComponent } from './popover.js';
import { calendarToday } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-date-picker',
  standalone: true,
  imports: [CommonModule, PopoverComponent, CalendarComponent],
  template: `<div data-slot="date-picker">
    <simurgh-popover [disabled]="disabled" [contentLabel]="label">
      <span trigger data-slot="date-picker-trigger">{{ displayValue }}</span>
      <div data-slot="date-picker-content">
        <simurgh-calendar
          [value]="value"
          [month]="month"
          [locale]="locale"
          [direction]="direction"
          [firstDayOfWeek]="firstDayOfWeek"
          [min]="min"
          [max]="max"
          [disabledDates]="disabledDates"
          [label]="label"
          (valueChange)="choose($event)"
          (monthChange)="updateMonth($event)"
        />
      </div>
    </simurgh-popover>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />
    <input
      *ngIf="required"
      tabindex="-1"
      aria-hidden="true"
      required
      [value]="value"
      [disabled]="disabled"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class DatePickerComponent extends FormResetBase {
  @Input() value = '';
  @Input() month = calendarToday().slice(0, 7);
  @Input() locale = 'en';
  @Input() direction: Direction = 'ltr';
  @Input() firstDayOfWeek = 0;
  @Input() min?: string;
  @Input() max?: string;
  @Input() disabledDates: string[] = [];
  @Input() name?: string;
  @Input() label = 'Date picker calendar';
  @Input() placeholder = 'Pick a date';
  @Input() required = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() monthChange = new EventEmitter<string>();
  @ViewChild(PopoverComponent) popover?: PopoverComponent;

  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      if (initial) this.month = initial.slice(0, 7);
      this.valueChange.emit(initial);
      this.popover?.close();
    };
  }

  get displayValue() {
    return this.value
      ? new Intl.DateTimeFormat(this.locale, {
          dateStyle: 'medium',
          timeZone: 'UTC',
        }).format(new Date(`${this.value}T00:00:00Z`))
      : this.placeholder;
  }
  choose(value: string) {
    this.value = value;
    this.valueChange.emit(value);
    this.popover?.close();
    requestAnimationFrame(() => this.popover?.reference?.nativeElement.focus());
  }
  updateMonth(month: string) {
    this.month = month;
    this.monthChange.emit(month);
  }
}

import { Directive } from '@angular/core';

@Directive({
  selector: 'dl[simurghDescriptionList]',
  standalone: true,
  host: { 'data-slot': 'description-list' },
})
export class DescriptionListDirective {}

@Directive({
  selector: 'div[simurghDescriptionListGroup]',
  standalone: true,
  host: { 'data-slot': 'description-list-group' },
})
export class DescriptionListGroupDirective {}

@Directive({
  selector: 'dt[simurghDescriptionListTerm]',
  standalone: true,
  host: { 'data-slot': 'description-list-term' },
})
export class DescriptionListTermDirective {}

@Directive({
  selector: 'dd[simurghDescriptionListDetails]',
  standalone: true,
  host: { 'data-slot': 'description-list-details' },
})
export class DescriptionListDetailsDirective {}

import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import type { OnDestroy } from '@angular/core';
import { isolateModal, trapFocus } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div
      *ngIf="open"
      class="simurgh-overlay"
      data-slot="dialog-overlay"
      (click)="close()"
    ></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-dialog"
      role="dialog"
      data-slot="dialog-content"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class DialogComponent implements OnDestroy {
  @Input() open = false;
  @Input() labelledBy?: string;
  @Input() describedBy?: string;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('content') content?: ElementRef<HTMLElement>;
  private previous: HTMLElement | null = null;
  private restoreIsolation: (() => void) | undefined;
  show() {
    this.previous = document.activeElement as HTMLElement | null;
    this.open = true;
    this.openChange.emit(true);
    setTimeout(() => {
      if (this.content) {
        this.restoreIsolation = isolateModal(this.content.nativeElement);
        this.content.nativeElement.focus();
      }
    });
  }
  close() {
    this.open = false;
    this.openChange.emit(false);
    this.restoreIsolation?.();
    this.restoreIsolation = undefined;
    setTimeout(() => this.previous?.isConnected && this.previous.focus());
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') this.close();
    else if (this.content) trapFocus(event, this.content.nativeElement);
  }
  ngOnDestroy() {
    this.restoreIsolation?.();
  }
}

import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'simurgh-disclosure',
  standalone: true,
  template: `<details
    data-slot="disclosure"
    [open]="open"
    [attr.data-state]="open ? 'open' : 'closed'"
    (toggle)="onToggle($event)"
  >
    <ng-content />
  </details>`,
})
export class DisclosureComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  onToggle(event: Event) {
    const next = (event.currentTarget as HTMLDetailsElement).open;
    if (next === this.open) return;
    this.open = next;
    this.openChange.emit(next);
  }
}

@Directive({
  selector: 'summary[simurghDisclosureSummary]',
  standalone: true,
  host: { 'data-slot': 'disclosure-summary' },
})
export class DisclosureSummaryDirective {}

@Directive({
  selector: '[simurghDisclosureContent]',
  standalone: true,
  host: { 'data-slot': 'disclosure-content' },
})
export class DisclosureContentDirective {}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogComponent } from './dialog.js';

@Component({
  selector: 'simurgh-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-sheet"
      data-slot="drawer-content"
      data-drawer
      [attr.data-side]="side"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class DrawerComponent extends DialogComponent {
  @Input() side: 'top' | 'bottom' = 'bottom';
}

import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { compositeKeydown } from '../internal/composite-keydown.js';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      #reference
      [attr.data-simurgh-floating-reference]="floatingId"
      type="button"
      class="simurgh-trigger"
      aria-haspopup="menu"
      [attr.aria-expanded]="open"
      (click)="toggle($event)"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      #floating
      [attr.data-simurgh-floating-content]="floatingId"
      *ngIf="open"
      role="menu"
      class="simurgh-content"
      style="position:fixed"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>`,
})
export class DropdownMenuComponent extends FloatingBase {
  protected override interactionKind = 'menu' as const;
  override toggle(event?: Event) {
    super.toggle(event);
    if (this.open)
      setTimeout(() =>
        this.floating?.nativeElement
          .querySelector<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          )
          ?.focus(),
      );
  }
  onKeydown(event: KeyboardEvent) {
    this.onFloatingKeydown(event);
    compositeKeydown(event, '[role=menuitem]');
  }
}

@Directive({
  selector: '[simurghMenuItem]',
  standalone: true,
  host: { role: 'menuitem', class: 'simurgh-item' },
})
export class DropdownMenuItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? null : -1;
  }
  @HostListener('click') onClick() {
    if (!this.disabled) this.select.emit();
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-empty',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.role]': "status ? 'status' : null",
    '[attr.aria-live]': "status ? 'polite' : null",
    '[attr.data-slot]': "'empty'",
  },
})
export class EmptyComponent {
  @Input() status = false;
}

@Component({
  selector: 'simurgh-empty-header',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'empty-header'" },
})
export class EmptyHeaderComponent {}

@Component({
  selector: 'simurgh-empty-media',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.data-slot]': "'empty-media'",
  },
})
export class EmptyMediaComponent {
  @Input() decorative = true;
}

@Component({
  selector: 'simurgh-empty-title',
  standalone: true,
  template: `<h3 data-slot="empty-title"><ng-content /></h3>`,
})
export class EmptyTitleComponent {}

@Component({
  selector: 'simurgh-empty-description',
  standalone: true,
  template: `<p data-slot="empty-description"><ng-content /></p>`,
})
export class EmptyDescriptionComponent {}

@Component({
  selector: 'simurgh-empty-content',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'empty-content'" },
})
export class EmptyContentComponent {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-field',
  standalone: true,
  template: `<fieldset data-slot="field" [disabled]="disabled">
    <ng-content />
  </fieldset>`,
})
export class FieldComponent {
  @Input() disabled = false;
}

@Component({
  selector: 'simurgh-field-legend',
  standalone: true,
  template: `<legend data-slot="field-legend"><ng-content /></legend>`,
})
export class FieldLegendComponent {}

@Component({
  selector: 'simurgh-field-description',
  standalone: true,
  template: `<p data-slot="field-description"><ng-content /></p>`,
})
export class FieldDescriptionComponent {}

@Component({
  selector: 'simurgh-field-error',
  standalone: true,
  template: `<p data-slot="field-error" role="alert"><ng-content /></p>`,
})
export class FieldErrorComponent {}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `<label
    [htmlFor]="inputId"
    data-slot="file-upload"
    [attr.data-disabled]="disabled || null"
    (dragover)="onDragover($event)"
    (drop)="onDrop($event)"
  >
    <input
      [id]="inputId"
      type="file"
      data-slot="file-upload-input"
      [attr.accept]="accept || null"
      [attr.name]="name || null"
      [multiple]="multiple"
      [disabled]="disabled"
      [required]="required"
      (change)="onChange($event)"
    />
    <strong data-slot="file-upload-label">{{ label }}</strong>
    <span *ngIf="description" data-slot="file-upload-description">{{
      description
    }}</span>
    <span data-slot="file-upload-status" aria-live="polite">{{
      selectedNames || 'No files selected'
    }}</span>
  </label>`,
})
export class FileUploadComponent extends FormResetBase {
  @Input() inputId = createId('file');
  @Input({ required: true }) label = '';
  @Input() description = 'Drop files here or browse';
  @Input() accept?: string;
  @Input() name?: string;
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() required = false;
  @Output() filesChange = new EventEmitter<File[]>();
  selectedNames = '';
  protected createFormReset() {
    return () => {
      this.selectedNames = '';
      this.filesChange.emit([]);
    };
  }
  private accepted(files: File[]) {
    if (!this.accept) return files;
    const rules = this.accept
      .split(',')
      .map((rule) => rule.trim().toLowerCase())
      .filter(Boolean);
    return files.filter((file) => {
      const name = file.name.toLowerCase();
      const type = file.type.toLowerCase();
      return rules.some((rule) =>
        rule.startsWith('.')
          ? name.endsWith(rule)
          : rule.endsWith('/*')
            ? type.startsWith(rule.slice(0, -1))
            : type === rule,
      );
    });
  }
  private update(files: File[]) {
    if (this.disabled) return;
    const accepted = this.accepted(files);
    const next = this.multiple ? accepted : accepted.slice(0, 1);
    this.selectedNames = next.map((file) => file.name).join(', ');
    this.filesChange.emit(next);
  }
  onChange(event: Event) {
    this.update(
      Array.from((event.currentTarget as HTMLInputElement).files ?? []),
    );
  }
  onDragover(event: DragEvent) {
    if (!this.disabled) event.preventDefault();
  }
  onDrop(event: DragEvent) {
    if (this.disabled) return;
    event.preventDefault();
    this.update(Array.from(event.dataTransfer?.files ?? []));
  }
}

import type { OnDestroy } from '@angular/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: 'form[simurghForm]',
  standalone: true,
  host: { 'data-slot': 'form' },
})
export class FormDirective implements OnDestroy {
  @Input() focusInvalid = true;
  @Output() invalidControl = new EventEmitter<HTMLElement>();
  private form = inject<ElementRef<HTMLFormElement>>(ElementRef);
  private queued = false;
  private firstInvalid: HTMLElement | null = null;
  private onInvalid = (event: Event) => {
    const target = event.target as HTMLElement;
    this.invalidControl.emit(target);
    if (!this.focusInvalid || event.defaultPrevented || this.queued) return;
    this.queued = true;
    this.firstInvalid = target;
    queueMicrotask(() => {
      this.firstInvalid?.focus();
      this.firstInvalid = null;
      this.queued = false;
    });
  };
  constructor() {
    this.form.nativeElement.addEventListener('invalid', this.onInvalid, true);
  }
  ngOnDestroy() {
    this.form.nativeElement.removeEventListener(
      'invalid',
      this.onInvalid,
      true,
    );
  }
}

@Component({
  selector: 'simurgh-form-error-summary',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'alert',
    'aria-live': 'assertive',
    tabindex: '-1',
    'data-slot': 'form-error-summary',
  },
})
export class FormErrorSummaryComponent {}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-hover-card',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      [attr.data-simurgh-floating-reference]="floatingId"
      data-slot="hover-card-trigger"
      [attr.aria-expanded]="open"
      (mouseenter)="openFromHover($event)"
      (mouseleave)="closeFromHover($event)"
      (focusin)="openFromFocus($event)"
      (focusout)="closeFromFocus($event)"
      (keydown)="onReferenceKeydown($event)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      [attr.data-simurgh-floating-content]="floatingId"
      *ngIf="open"
      role="dialog"
      data-slot="hover-card-content"
      [attr.aria-label]="label"
      class="simurgh-content"
      style="position:fixed"
    >
      <ng-content />
    </div>`,
})
export class HoverCardComponent extends FloatingBase {
  protected override interactionKind = 'hovercard' as const;
  @Input() label = 'Additional information';
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-input-group',
  standalone: true,
  template: `<ng-content />`,
  host: { role: 'group', '[attr.data-slot]': "'input-group'" },
})
export class InputGroupComponent {}

@Component({
  selector: 'simurgh-input-group-addon',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.data-align]': 'align',
    '[attr.data-slot]': "'input-group-addon'",
  },
})
export class InputGroupAddonComponent {
  @Input() align: 'inline-start' | 'inline-end' | 'block-start' | 'block-end' =
    'inline-start';
  @Input() decorative = false;
}

@Component({
  selector: 'simurgh-input-group-text',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'input-group-text'" },
})
export class InputGroupTextComponent {}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-input-otp',
  standalone: true,
  template: `<input
    type="text"
    data-slot="input-otp"
    [name]="name || ''"
    [value]="value"
    [maxLength]="length"
    [required]="required"
    [disabled]="disabled"
    [attr.autocomplete]="autocomplete"
    [attr.inputmode]="digitsOnly ? 'numeric' : 'text'"
    [attr.pattern]="digitsOnly ? '[0-9]*' : null"
    [attr.aria-invalid]="invalid || null"
    [style.--simurgh-otp-length]="length"
    (input)="update($event)"
  />`,
})
export class InputOtpComponent extends FormResetBase {
  @Input() name?: string;
  @Input() value = '';
  @Input() length = 6;
  @Input() digitsOnly = true;
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() autocomplete = 'one-time-code';
  @Output() valueChange = new EventEmitter<string>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  update(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = (
      this.digitsOnly ? input.value.replace(/\D/g, '') : input.value
    ).slice(0, this.length);
    input.value = this.value;
    this.valueChange.emit(this.value);
  }
}

import { listenFormReset } from '@simurgh-ui/core';
import {
  Component,
  booleanAttribute,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import type { AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'simurgh-input',
  standalone: true,
  template: `<input
    #control
    data-slot="input"
    [type]="type"
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  />`,
})
export class InputComponent implements AfterViewInit, OnDestroy {
  @Input() type = 'text';
  @Input() name?: string;
  @Input() value = '';
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('control', { static: true })
  control!: ElementRef<HTMLInputElement>;
  private initialValue = '';
  private removeResetListener?: () => void;
  ngAfterViewInit() {
    this.initialValue = this.value;
    this.control.nativeElement.defaultValue = this.initialValue;
    this.removeResetListener = listenFormReset(
      this.control.nativeElement,
      () => {
        this.value = this.initialValue;
        this.valueChange.emit(this.initialValue);
        this.control.nativeElement.value = this.initialValue;
      },
    );
  }
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
  ngOnDestroy() {
    this.removeResetListener?.();
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-item-group',
  standalone: true,
  template: `<ng-content />`,
  host: { role: 'list', '[attr.data-slot]': "'item-group'" },
})
export class ItemGroupComponent {}

@Component({
  selector: 'simurgh-item',
  standalone: true,
  template: `<ng-content />`,
  host: { role: 'listitem', '[attr.data-slot]': "'item'" },
})
export class ItemComponent {}

@Component({
  selector: 'simurgh-item-media',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.data-slot]': "'item-media'",
  },
})
export class ItemMediaComponent {
  @Input() decorative = true;
}

@Component({
  selector: 'simurgh-item-content',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'item-content'" },
})
export class ItemContentComponent {}

@Component({
  selector: 'simurgh-item-title',
  standalone: true,
  template: `<h3 data-slot="item-title"><ng-content /></h3>`,
})
export class ItemTitleComponent {}

@Component({
  selector: 'simurgh-item-description',
  standalone: true,
  template: `<p data-slot="item-description"><ng-content /></p>`,
})
export class ItemDescriptionComponent {}

@Component({
  selector: 'simurgh-item-actions',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'item-actions'" },
})
export class ItemActionsComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-kbd',
  standalone: true,
  template: `<kbd data-slot="kbd"><ng-content /></kbd>`,
})
export class KbdComponent {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-label',
  standalone: true,
  template: `<label [attr.for]="for"><ng-content /></label>`,
})
export class LabelComponent {
  @Input() for?: string;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-link',
  standalone: true,
  template: `<a
    data-slot="link"
    [attr.href]="disabled ? null : href"
    [attr.aria-disabled]="disabled || null"
    [attr.data-external]="external || null"
    [attr.rel]="external ? rel || 'noopener noreferrer' : rel || null"
    [attr.target]="external ? target || '_blank' : target || null"
    [attr.tabindex]="disabled ? -1 : null"
    (click)="activate($event)"
  >
    <ng-content />
  </a>`,
})
export class LinkComponent {
  @Input() href?: string;
  @Input() disabled = false;
  @Input() external = false;
  @Input() rel?: string;
  @Input() target?: string;

  activate(event: MouseEvent) {
    if (this.disabled) event.preventDefault();
  }
}

import type { Direction } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-menubar',
  standalone: true,
  template: `<div
    role="menubar"
    data-slot="menubar"
    [attr.aria-label]="label"
    [attr.dir]="direction"
    (keydown)="navigate($event)"
  >
    <ng-content />
  </div>`,
})
export class MenubarComponent {
  @Input() label = 'Application menu';
  @Input() direction: Direction = 'ltr';
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  ngAfterViewInit() {
    const first = this.element.nativeElement.querySelector<HTMLElement>(
      '[role=menuitem]:not([aria-disabled=true])',
    );
    if (first) first.tabIndex = 0;
  }
  navigate(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=menuitem]:not([aria-disabled=true])',
      ),
    );
    const current = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(current, items.length, event.key, {
      orientation: 'horizontal',
      direction: this.direction,
    });
    if (target !== current) {
      event.preventDefault();
      items.forEach(
        (item, index) => (item.tabIndex = index === target ? 0 : -1),
      );
      items[target]?.focus();
    }
  }
}

@Directive({
  selector: 'button[simurghMenubarItem]',
  standalone: true,
  host: {
    role: 'menuitem',
    type: 'button',
    'data-slot': 'menubar-item',
    '[attr.aria-disabled]': 'disabled || null',
    '[attr.disabled]': "disabled ? '' : null",
  },
})
export class MenubarItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  @HostBinding('attr.tabindex') tabIndex = -1;
  @HostListener('click') choose() {
    if (!this.disabled) this.select.emit();
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-meter',
  standalone: true,
  template: `<meter
    data-slot="meter"
    role="meter"
    [value]="safeValue"
    [min]="min"
    [max]="max"
    [attr.low]="low ?? null"
    [attr.high]="high ?? null"
    [attr.optimum]="optimum ?? null"
    [attr.aria-label]="label || null"
  >
    <ng-content />{{ safeValue }}
  </meter>`,
})
export class MeterComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() low?: number;
  @Input() high?: number;
  @Input() optimum?: number;
  @Input() label?: string;
  get safeValue() {
    return Math.min(this.max, Math.max(this.min, this.value));
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-native-select',
  standalone: true,
  template: `<select
    data-slot="native-select"
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [multiple]="multiple"
    [attr.aria-invalid]="invalid || null"
    (change)="onChange($event)"
  >
    <ng-content />
  </select>`,
})
export class NativeSelectComponent extends FormResetBase {
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() multiple = false;
  @Output() valueChange = new EventEmitter<string | string[]>();
  @Output() change = new EventEmitter<Event>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.valueChange.emit(
      this.multiple
        ? Array.from(select.selectedOptions, (option) => option.value)
        : this.value,
    );
    this.change.emit(event);
  }
}

import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'simurgh-navigation-menu',
  standalone: true,
  template: `<nav data-slot="navigation-menu" [attr.aria-label]="label">
    <ng-content />
  </nav>`,
})
export class NavigationMenuComponent {
  @Input() label = 'Main navigation';
}

@Directive({
  selector: 'ul[simurghNavigationMenuList]',
  standalone: true,
  host: { 'data-slot': 'navigation-menu-list' },
})
export class NavigationMenuListDirective {}

@Directive({
  selector: 'li[simurghNavigationMenuItem]',
  standalone: true,
  host: { 'data-slot': 'navigation-menu-item' },
})
export class NavigationMenuItemDirective {}

@Directive({
  selector: 'a[simurghNavigationMenuLink]',
  standalone: true,
  host: {
    'data-slot': 'navigation-menu-link',
    '[attr.aria-current]': "current ? 'page' : null",
  },
})
export class NavigationMenuLinkDirective {
  @Input() current = false;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-number-input',
  standalone: true,
  template: `<div
    data-slot="number-input"
    [attr.data-disabled]="disabled || null"
    [attr.data-readonly]="readonly || null"
  >
    <button
      type="button"
      data-slot="number-input-decrement"
      [attr.aria-label]="decrementLabel"
      [attr.aria-controls]="inputId"
      [disabled]="disabled || readonly || value <= lowerBound"
      (click)="changeBy(-safeStep)"
    >
      −
    </button>
    <input
      #control
      [id]="inputId"
      type="number"
      data-slot="number-input-control"
      [attr.aria-label]="ariaLabel"
      [attr.name]="name || null"
      [value]="value"
      [min]="min"
      [max]="max"
      [step]="safeStep"
      [disabled]="disabled"
      [readOnly]="readonly"
      [required]="required"
      (input)="setValue(control.valueAsNumber)"
    />
    <button
      type="button"
      data-slot="number-input-increment"
      [attr.aria-label]="incrementLabel"
      [attr.aria-controls]="inputId"
      [disabled]="disabled || readonly || value >= upperBound"
      (click)="changeBy(safeStep)"
    >
      +
    </button>
  </div>`,
})
export class NumberInputComponent extends FormResetBase {
  @Input() inputId = createId('number');
  @Input('aria-label') ariaLabel = 'Number';
  @Input() value = 0;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() step = 1;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() incrementLabel = 'Increase value';
  @Input() decrementLabel = 'Decrease value';
  @Output() valueChange = new EventEmitter<number>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  get safeStep() {
    return Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
  }
  get lowerBound() {
    return this.min ?? -Infinity;
  }
  get upperBound() {
    return this.max ?? Infinity;
  }
  changeBy(amount: number) {
    this.setValue(this.value + amount);
  }
  setValue(next: number) {
    if (Number.isNaN(next)) return;
    this.value = Math.min(this.upperBound, Math.max(this.lowerBound, next));
    this.valueChange.emit(this.value);
  }
}

export * from './alert-dialog.js';
export * from './context-menu.js';
export * from './dialog.js';
export * from './drawer.js';
export * from './dropdown-menu.js';
export * from './hover-card.js';
export * from './popover.js';
export * from './sheet.js';
export * from './tooltip.js';

import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'simurgh-pagination',
  standalone: true,
  template: `<nav [attr.aria-label]="label" data-slot="pagination">
    <ng-content />
  </nav>`,
})
export class PaginationComponent {
  @Input() label = 'Pagination';
}

@Directive({
  selector: 'ul[simurghPaginationContent]',
  standalone: true,
  host: { 'data-slot': 'pagination-content' },
})
export class PaginationContentDirective {}

@Directive({
  selector: 'li[simurghPaginationItem]',
  standalone: true,
  host: { 'data-slot': 'pagination-item' },
})
export class PaginationItemDirective {}

@Directive({
  selector: 'a[simurghPaginationLink]',
  standalone: true,
  host: {
    'data-slot': 'pagination-link',
    '[attr.aria-current]': "current ? 'page' : null",
  },
})
export class PaginationLinkDirective {
  @Input() current = false;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-password-input',
  standalone: true,
  template: `<div
    data-slot="password-input"
    [attr.data-disabled]="disabled || null"
  >
    <input
      [id]="inputId"
      [type]="revealed ? 'text' : 'password'"
      data-slot="password-input-control"
      [attr.aria-label]="ariaLabel"
      [attr.name]="name || null"
      [attr.autocomplete]="autocomplete || null"
      [attr.placeholder]="placeholder || null"
      [value]="value"
      [disabled]="disabled"
      [readOnly]="readonly"
      [required]="required"
      (input)="onInput($event)"
    />
    <button
      type="button"
      data-slot="password-input-toggle"
      [attr.aria-controls]="inputId"
      [attr.aria-label]="revealed ? concealLabel : revealLabel"
      [attr.aria-pressed]="revealed"
      [disabled]="disabled"
      (click)="revealed = !revealed"
    >
      {{ revealed ? 'Hide' : 'Show' }}
    </button>
  </div>`,
})
export class PasswordInputComponent extends FormResetBase {
  @Input() inputId = createId('password');
  @Input('aria-label') ariaLabel = 'Password';
  @Input() value = '';
  @Input() name?: string;
  @Input() autocomplete = 'current-password';
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() revealLabel = 'Show password';
  @Input() concealLabel = 'Hide password';
  @Output() valueChange = new EventEmitter<string>();
  revealed = false;
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.revealed = false;
      this.valueChange.emit(initial);
    };
  }
  onInput(event: Event) {
    this.value = (event.currentTarget as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

const floatingTemplate = `<button #reference type="button" class="simurgh-trigger" aria-haspopup="dialog" [attr.aria-expanded]="open" [attr.data-simurgh-floating-reference]="floatingId" [disabled]="disabled" (click)="toggle($event)" (keydown)="onReferenceKeydown($event)"><ng-content select="[trigger]"/></button><div #floating *ngIf="open" role="dialog" [attr.aria-label]="contentLabel" [attr.data-simurgh-floating-content]="floatingId" class="simurgh-content" style="position:fixed" (keydown)="onFloatingKeydown($event)"><ng-content/></div>`;

@Component({
  selector: 'simurgh-popover',
  standalone: true,
  imports: [CommonModule],
  template: floatingTemplate,
})
export class PopoverComponent extends FloatingBase {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-progress',
  standalone: true,
  template: `<span
    data-part="indicator"
    [style.inline-size.%]="percentage"
  ></span>`,
  host: {
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'safeMax',
    '[attr.aria-valuenow]': 'safeValue',
    '[attr.aria-valuetext]': 'valueText',
    '[attr.data-state]': "safeValue === null ? 'indeterminate' : 'determinate'",
    '[attr.data-value]': 'safeValue',
    '[attr.data-max]': 'safeMax',
  },
})
export class ProgressComponent {
  @Input() value: number | null = null;
  @Input() max = 100;
  @Input() getValueLabel?: (value: number, max: number) => string;
  get safeMax() {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
  }
  get safeValue() {
    return this.value == null || !Number.isFinite(this.value)
      ? null
      : Math.min(this.safeMax, Math.max(0, this.value));
  }
  get percentage() {
    return this.safeValue == null
      ? null
      : (this.safeValue / this.safeMax) * 100;
  }
  get valueText() {
    return this.safeValue == null
      ? null
      : this.getValueLabel?.(this.safeValue, this.safeMax);
  }
}

import type { Direction } from '@simurgh-ui/core';
import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div role="radiogroup" (keydown)="navigate($event)">
    <ng-content /><input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
    /><input
      *ngIf="required"
      aria-hidden="true"
      tabindex="-1"
      required
      [value]="value"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class RadioGroupComponent extends FormResetBase {
  @Input() value = '';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string>();
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  select(value: string) {
    if (!this.disabled) {
      this.value = value;
      this.valueChange.emit(value);
    }
  }
  navigate(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=radio]:not([aria-disabled=true])',
      ),
    );
    const current = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(current, items.length, event.key, {
      direction: this.direction,
    });
    if (target !== current) {
      event.preventDefault();
      items[target]?.focus();
      items[target]?.click();
    }
  }
}

@Directive({
  selector: '[simurghRadio]',
  standalone: true,
  host: { role: 'radio' },
})
export class RadioGroupItemDirective {
  @Input({ alias: 'simurghRadio', required: true }) value = '';
  @Input() disabled = false;
  private group = inject(RadioGroupComponent);
  @HostBinding('attr.aria-checked') get checked() {
    return this.group.value === this.value;
  }
  @HostBinding('attr.aria-disabled') get unavailable() {
    return this.group.disabled || this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.checked ? 0 : -1;
  }
  @HostListener('click') select() {
    if (!this.unavailable) this.group.select(this.value);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-rating',
  standalone: true,
  template: `<div
    role="radiogroup"
    data-slot="rating"
    [attr.aria-label]="ariaLabel"
    [attr.data-disabled]="disabled || null"
  >
    @for (item of items; track item) {
      <label data-slot="rating-item">
        <input
          type="radio"
          data-slot="rating-control"
          [name]="groupName"
          [value]="item"
          [checked]="normalizedValue === item"
          [disabled]="disabled"
          [required]="required"
          [attr.aria-label]="itemLabel(item)"
          (change)="select(item)"
        />
        <span
          data-slot="rating-icon"
          [attr.data-selected]="item <= normalizedValue || null"
          aria-hidden="true"
          >&#9733;</span
        >
      </label>
    }
  </div>`,
})
export class RatingComponent extends FormResetBase {
  private count = 5;
  readonly generatedName = createId('rating');
  items = [1, 2, 3, 4, 5];
  @Input() value = 0;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input('aria-label') ariaLabel = 'Rating';
  @Input() set max(value: number) {
    this.count = Number.isFinite(value)
      ? Math.min(100, Math.max(1, Math.floor(value)))
      : 5;
    this.items = Array.from({ length: this.count }, (_, index) => index + 1);
  }
  @Output() valueChange = new EventEmitter<number>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  get groupName() {
    return this.name ?? this.generatedName;
  }
  get normalizedValue() {
    return Math.min(this.count, Math.max(0, Math.round(this.value)));
  }
  itemLabel(value: number) {
    return `${value} of ${this.count}`;
  }
  select(value: number) {
    if (this.disabled) return;
    this.value = value;
    this.valueChange.emit(value);
  }
}

import type { Direction, Orientation } from '@simurgh-ui/core';
import type { OnDestroy, OnInit } from '@angular/core';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
} from '@angular/core';

@Component({
  selector: 'simurgh-resizable-panel-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'resizable-panel-group',
    '[attr.data-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ResizablePanelGroupComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly panels: ResizablePanelComponent[] = [];
  sizes: number[] = [];
  minimums: number[] = [];
  maximums: number[] = [];
  defaults: number[] = [];

  get count() {
    return this.panels.length;
  }
  register(panel: ResizablePanelComponent) {
    this.panels.push(panel);
    this.defaults.push(1);
    this.minimums.push(10);
    this.maximums.push(90);
    this.normalize();
  }
  configure(
    panel: ResizablePanelComponent,
    defaultSize: number,
    minSize: number,
    maxSize: number,
  ) {
    const index = this.panels.indexOf(panel);
    if (index < 0) return;
    this.defaults[index] = defaultSize;
    this.minimums[index] = minSize;
    this.maximums[index] = maxSize;
    this.normalize();
  }
  unregister(panel: ResizablePanelComponent) {
    const index = this.panels.indexOf(panel);
    if (index < 0) return;
    this.panels.splice(index, 1);
    this.defaults.splice(index, 1);
    this.minimums.splice(index, 1);
    this.maximums.splice(index, 1);
    this.normalize();
  }
  panelIndex(panel: ResizablePanelComponent) {
    return this.panels.indexOf(panel);
  }
  normalize() {
    const total = this.defaults.reduce(
      (sum, value) => sum + Math.max(0, value),
      0,
    );
    this.sizes = this.defaults.map((value) =>
      total ? (Math.max(0, value) / total) * 100 : 100 / this.count,
    );
  }
  adjust(boundary: number, delta: number) {
    if (boundary < 0 || boundary >= this.sizes.length - 1) return;
    const total = this.sizes[boundary]! + this.sizes[boundary + 1]!;
    const low = Math.max(
      this.minimums[boundary]!,
      total - this.maximums[boundary + 1]!,
    );
    const high = Math.min(
      this.maximums[boundary]!,
      total - this.minimums[boundary + 1]!,
    );
    const before = Math.max(low, Math.min(high, this.sizes[boundary]! + delta));
    this.sizes[boundary] = before;
    this.sizes[boundary + 1] = total - before;
  }
}

@Component({
  selector: 'simurgh-resizable-panel',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'resizable-panel' },
})
export class ResizablePanelComponent implements OnInit, OnDestroy {
  @Input() defaultSize = 1;
  @Input() minSize = 10;
  @Input() maxSize = 90;
  private group = inject(ResizablePanelGroupComponent);
  constructor() {
    this.group.register(this);
  }
  @HostBinding('style.flex-basis') get basis() {
    return `${this.group.sizes[this.group.panelIndex(this)] ?? 100}%`;
  }
  ngOnInit() {
    this.group.configure(this, this.defaultSize, this.minSize, this.maxSize);
  }
  ngOnDestroy() {
    this.group.unregister(this);
  }
}

@Component({
  selector: 'simurgh-resizable-handle',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'resizable-handle',
    role: 'separator',
    tabindex: '0',
  },
})
export class ResizableHandleComponent {
  private group = inject(ResizablePanelGroupComponent);
  readonly boundary = this.group.count - 1;
  @HostBinding('attr.aria-orientation') get ariaOrientation() {
    return this.group.orientation === 'horizontal' ? 'vertical' : 'horizontal';
  }
  @HostBinding('attr.aria-valuemin') get minimum() {
    return Math.max(
      this.group.minimums[this.boundary]!,
      (this.group.sizes[this.boundary] ?? 0) +
        (this.group.sizes[this.boundary + 1] ?? 0) -
        this.group.maximums[this.boundary + 1]!,
    );
  }
  @HostBinding('attr.aria-valuemax') get maximum() {
    return Math.min(
      this.group.maximums[this.boundary]!,
      (this.group.sizes[this.boundary] ?? 0) +
        (this.group.sizes[this.boundary + 1] ?? 0) -
        this.group.minimums[this.boundary + 1]!,
    );
  }
  @HostBinding('attr.aria-valuenow') get value() {
    return Math.round(this.group.sizes[this.boundary] ?? 0);
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const current = this.group.sizes[this.boundary] ?? 0;
    if (event.key === 'Home')
      this.group.adjust(this.boundary, this.minimum - current);
    else if (event.key === 'End')
      this.group.adjust(this.boundary, this.maximum - current);
    else {
      const previous =
        this.group.orientation === 'vertical'
          ? 'ArrowUp'
          : this.group.direction === 'rtl'
            ? 'ArrowRight'
            : 'ArrowLeft';
      const next =
        this.group.orientation === 'vertical'
          ? 'ArrowDown'
          : this.group.direction === 'rtl'
            ? 'ArrowLeft'
            : 'ArrowRight';
      if (event.key === previous) this.group.adjust(this.boundary, -5);
      else if (event.key === next) this.group.adjust(this.boundary, 5);
      else return;
    }
    event.preventDefault();
  }
  @HostListener('pointerdown', ['$event']) onPointerdown(event: PointerEvent) {
    let previous =
      this.group.orientation === 'horizontal' ? event.clientX : event.clientY;
    const root = this.group.element.nativeElement;
    const size =
      this.group.orientation === 'horizontal'
        ? root.clientWidth
        : root.clientHeight;
    if (!size) return;
    const onMove = (next: PointerEvent) => {
      const coordinate =
        this.group.orientation === 'horizontal' ? next.clientX : next.clientY;
      let delta = ((coordinate - previous) / size) * 100;
      previous = coordinate;
      if (
        this.group.orientation === 'horizontal' &&
        this.group.direction === 'rtl'
      )
        delta *= -1;
      this.group.adjust(this.boundary, delta);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-scroll-area',
  standalone: true,
  template: `<div
    data-slot="scroll-area"
    [attr.data-orientation]="orientation"
    [attr.role]="label ? 'region' : null"
    [attr.aria-label]="label || null"
    [tabIndex]="tabIndex"
  >
    <ng-content />
  </div>`,
})
export class ScrollAreaComponent {
  @Input() orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Input() label?: string;
  @Input() tabIndex = 0;
}

import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { compositeKeydown } from '../internal/composite-keydown.js';
import { InternalIdService } from '../internal/id.js';
import { FormResetBase } from '../internal/form-reset.js';

export type SelectOption = { value: string; label: string; disabled?: boolean };

@Component({
  selector: 'simurgh-select',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="combobox"
      data-slot="select-trigger"
      class="simurgh-trigger"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="listId"
      [disabled]="disabled"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      {{ label }}
    </button>
    <div
      #list
      *ngIf="open"
      [id]="listId"
      role="listbox"
      data-slot="select-content"
      class="simurgh-content"
      (keydown)="onListKeydown($event)"
    >
      <button
        *ngFor="let option of options"
        type="button"
        role="option"
        data-slot="select-option"
        class="simurgh-item"
        tabindex="-1"
        [attr.aria-selected]="option.value === value"
        [attr.aria-disabled]="option.disabled || null"
        [disabled]="option.disabled"
        (click)="select(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />`,
})
export class SelectComponent extends FormResetBase {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() placeholder = 'Select…';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('list') list?: ElementRef<HTMLElement>;
  readonly listId = inject(InternalIdService).next('select-list');
  open = false;
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.open = false;
      this.valueChange.emit(initial);
    };
  }
  get label() {
    return (
      this.options.find((o) => o.value === this.value)?.label ??
      this.placeholder
    );
  }
  toggle() {
    if (this.open) this.open = false;
    else this.show();
  }
  show() {
    this.open = true;
    setTimeout(() =>
      this.list?.nativeElement
        .querySelector<HTMLElement>('[role=option]:not([disabled])')
        ?.focus(),
    );
  }
  onTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.show();
    }
  }
  onListKeydown(event: KeyboardEvent) {
    compositeKeydown(event, '[role=option]');
  }
  select(value: string) {
    this.value = value;
    this.open = false;
    this.valueChange.emit(value);
  }
}

import type { Orientation } from '@simurgh-ui/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-separator',
  standalone: true,
  template: '',
  host: {
    '[attr.role]': "decorative ? 'none' : 'separator'",
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.aria-orientation]': 'decorative ? null : orientation',
    '[attr.data-orientation]': 'orientation',
  },
})
export class SeparatorComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() decorative = false;
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogComponent } from './dialog.js';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'simurgh-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-sheet"
      data-slot="sheet-content"
      [attr.data-side]="side"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class SheetComponent extends DialogComponent {
  @Input() side: SheetSide = 'right';
}

import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-sidebar-provider',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'sidebar-provider' },
})
export class SidebarProviderComponent {
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();
  readonly contentId = createId('sidebar');
  @HostBinding('attr.data-state') get state() {
    return this.open ? 'open' : 'closed';
  }
  setOpen(open: boolean) {
    this.open = open;
    this.openChange.emit(open);
  }
}

@Directive({
  selector: 'aside[simurghSidebar]',
  standalone: true,
  host: { 'data-slot': 'sidebar' },
})
export class SidebarDirective {
  @Input() side: 'start' | 'end' = 'start';
  private provider = inject(SidebarProviderComponent);
  @HostBinding('id') get id() {
    return this.provider.contentId;
  }
  @HostBinding('attr.data-side') get dataSide() {
    return this.side;
  }
  @HostBinding('attr.data-state') get state() {
    return this.provider.open ? 'open' : 'closed';
  }
  @HostBinding('attr.hidden') get hidden() {
    return this.provider.open ? null : '';
  }
}

@Directive({
  selector: 'button[simurghSidebarTrigger]',
  standalone: true,
  host: { 'data-slot': 'sidebar-trigger', type: 'button' },
})
export class SidebarTriggerDirective {
  private provider = inject(SidebarProviderComponent);
  @HostBinding('attr.aria-controls') get controls() {
    return this.provider.contentId;
  }
  @HostBinding('attr.aria-expanded') get expanded() {
    return this.provider.open;
  }
  @HostListener('click') toggle() {
    this.provider.setOpen(!this.provider.open);
  }
}

@Directive({
  selector: '[simurghSidebarHeader]',
  standalone: true,
  host: { 'data-slot': 'sidebar-header' },
})
export class SidebarHeaderDirective {}

@Directive({
  selector: '[simurghSidebarContent]',
  standalone: true,
  host: { 'data-slot': 'sidebar-content' },
})
export class SidebarContentDirective {}

@Directive({
  selector: '[simurghSidebarFooter]',
  standalone: true,
  host: { 'data-slot': 'sidebar-footer' },
})
export class SidebarFooterDirective {}

@Directive({
  selector: '[simurghSidebarGroup]',
  standalone: true,
  host: { 'data-slot': 'sidebar-group' },
})
export class SidebarGroupDirective {}

@Directive({
  selector: 'ul[simurghSidebarMenu]',
  standalone: true,
  host: { 'data-slot': 'sidebar-menu' },
})
export class SidebarMenuDirective {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-skeleton',
  standalone: true,
  template: '',
  host: {
    '[attr.role]': "label ? 'status' : null",
    '[attr.aria-label]': 'label || null',
    '[attr.aria-busy]': "label ? 'true' : null",
    '[attr.aria-hidden]': "label ? null : 'true'",
    '[attr.data-state]': "'loading'",
  },
})
export class SkeletonComponent {
  @Input() label?: string;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-slider',
  standalone: true,
  template: `<input
    type="range"
    data-slot="slider"
    [value]="value"
    [min]="min"
    [max]="max"
    [step]="step"
    [name]="name"
    [disabled]="disabled"
    [required]="required"
    [attr.aria-invalid]="invalid || null"
    [attr.aria-label]="label || null"
    (input)="update($event)"
  />`,
})
export class SliderComponent extends FormResetBase {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() name?: string;
  @Input() label?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<number>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  update(event: Event) {
    this.value = (event.target as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(this.value);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-spinner',
  standalone: true,
  template: `<span aria-hidden="true" data-part="indicator"
    ><ng-content>◌</ng-content></span
  >`,
  host: {
    role: 'status',
    '[attr.aria-label]': 'label',
    '[attr.aria-live]': "'polite'",
    '[attr.aria-busy]': "'true'",
    '[attr.data-state]': "'loading'",
  },
})
export class SpinnerComponent {
  @Input() label = 'Loading';
}

import { CheckBase } from '../internal/check-base.js';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-switch',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      (click)="toggle()"
    >
      <ng-content /></button
    ><input
      *ngIf="name"
      hidden
      type="checkbox"
      [name]="name"
      [value]="value"
      [checked]="checked"
      [required]="required"
      [disabled]="disabled"
    />`,
})
export class SwitchComponent extends CheckBase {}

import { Directive } from '@angular/core';

@Directive({
  selector: 'table[simurghTable]',
  standalone: true,
  host: { 'data-slot': 'table' },
})
export class TableDirective {}

@Directive({
  selector: 'thead[simurghTableHeader]',
  standalone: true,
  host: { 'data-slot': 'table-header' },
})
export class TableHeaderDirective {}

@Directive({
  selector: 'tbody[simurghTableBody]',
  standalone: true,
  host: { 'data-slot': 'table-body' },
})
export class TableBodyDirective {}

@Directive({
  selector: 'tfoot[simurghTableFooter]',
  standalone: true,
  host: { 'data-slot': 'table-footer' },
})
export class TableFooterDirective {}

@Directive({
  selector: 'tr[simurghTableRow]',
  standalone: true,
  host: { 'data-slot': 'table-row' },
})
export class TableRowDirective {}

@Directive({
  selector: 'th[simurghTableHead]',
  standalone: true,
  host: { 'data-slot': 'table-head', scope: 'col' },
})
export class TableHeadDirective {}

@Directive({
  selector: 'td[simurghTableCell]',
  standalone: true,
  host: { 'data-slot': 'table-cell' },
})
export class TableCellDirective {}

@Directive({
  selector: 'caption[simurghTableCaption]',
  standalone: true,
  host: { 'data-slot': 'table-caption' },
})
export class TableCaptionDirective {}

import type { Direction, Orientation } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { nextIndex, typeaheadIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-tabs',
  standalone: true,
  template: `<div
      role="tablist"
      [attr.aria-orientation]="orientation"
      (keydown)="navigate($event)"
    >
      <ng-content select="[tab]" />
    </div>
    <ng-content />`,
})
export class TabsComponent {
  @Input() value = '';
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string>();
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  select(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
  navigate(event: KeyboardEvent) {
    const tabs = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=tab]:not([disabled])',
      ),
    );
    const i = tabs.indexOf(document.activeElement as HTMLElement);
    const directional = nextIndex(i, tabs.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    const n =
      directional === i
        ? typeaheadIndex(
            tabs.map((tab) => tab.textContent ?? ''),
            i,
            event.key,
          )
        : directional;
    if (n !== i) {
      event.preventDefault();
      tabs[n]?.focus();
      tabs[n]?.click();
    }
  }
}

@Directive({
  selector: '[simurghTab]',
  standalone: true,
  host: { role: 'tab' },
})
export class TabDirective {
  @Input({ alias: 'simurghTab', required: true }) value = '';
  private tabs = inject(TabsComponent);
  @HostListener('click') select() {
    this.tabs.select(this.value);
  }
  @HostBinding('attr.aria-selected') get selected() {
    return this.tabs.value === this.value;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.selected ? 0 : -1;
  }
}

@Directive({
  selector: '[simurghTabPanel]',
  standalone: true,
  host: { role: 'tabpanel' },
})
export class TabPanelDirective {
  @Input({ alias: 'simurghTabPanel', required: true }) value = '';
  private tabs = inject(TabsComponent);
  @HostBinding('hidden') get hidden() {
    return this.tabs.value !== this.value;
  }
  @HostBinding('attr.tabindex') tabIndex = 0;
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-tags-input',
  standalone: true,
  template: `<div
    role="group"
    data-slot="tags-input"
    [attr.aria-label]="ariaLabel"
    [attr.data-disabled]="disabled || null"
    [attr.data-readonly]="readonly || null"
    (click)="control.focus()"
  >
    @for (tag of value; track $index) {
      <span data-slot="tags-input-tag">
        <span data-slot="tags-input-tag-text">{{ tag }}</span>
        @if (!readonly) {
          <button
            type="button"
            data-slot="tags-input-remove"
            [attr.aria-label]="removeLabel(tag)"
            [disabled]="disabled"
            (click)="remove($index, $event)"
          >
            &#215;
          </button>
        }
        @if (name) {
          <input type="hidden" [name]="name" [value]="tag" />
        }
      </span>
    }
    <input
      #control
      type="text"
      data-slot="tags-input-control"
      [value]="draft"
      [attr.aria-label]="inputLabel"
      [placeholder]="value.length ? '' : placeholder"
      [disabled]="disabled || value.length >= safeLimit"
      [readOnly]="readonly"
      [required]="required && value.length === 0"
      (input)="draft = control.value"
      (keydown)="handleKeydown($event)"
    />
  </div>`,
})
export class TagsInputComponent extends FormResetBase {
  @ViewChild('control') control?: ElementRef<HTMLInputElement>;
  private tags: string[] = [];
  @Input() set value(value: string[]) {
    this.tags = value.slice(0, 100);
  }
  get value() {
    return this.tags;
  }
  @Input() name?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() maxTags = 20;
  @Input() placeholder = 'Add a tag';
  @Input() inputLabel = 'Add a tag';
  @Input('aria-label') ariaLabel = 'Tags';
  @Output() valueChange = new EventEmitter<string[]>();
  draft = '';
  protected createFormReset() {
    const initial = [...this.value];
    return () => {
      this.value = initial;
      this.draft = '';
      this.valueChange.emit([...initial]);
    };
  }
  get safeLimit() {
    return Number.isFinite(this.maxTags)
      ? Math.min(100, Math.max(1, Math.floor(this.maxTags)))
      : 20;
  }
  removeLabel(tag: string) {
    return `Remove ${tag}`;
  }
  commit(value: string[]) {
    this.value = value;
    this.valueChange.emit(value);
  }
  add() {
    const tag = this.draft.trim();
    if (
      this.disabled ||
      this.readonly ||
      !tag ||
      this.value.includes(tag) ||
      this.value.length >= this.safeLimit
    )
      return;
    this.commit([...this.value, tag]);
    this.draft = '';
  }
  remove(index: number, event?: Event) {
    event?.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.commit(this.value.filter((_, itemIndex) => itemIndex !== index));
    this.control?.nativeElement.focus();
  }
  handleKeydown(event: KeyboardEvent) {
    if (!event.isComposing && (event.key === 'Enter' || event.key === ',')) {
      event.preventDefault();
      this.add();
    } else if (event.key === 'Backspace' && !this.draft && this.value.length) {
      event.preventDefault();
      this.remove(this.value.length - 1);
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-textarea',
  standalone: true,
  template: `<textarea
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  ></textarea>`,
})
export class TextareaComponent extends FormResetBase {
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }
}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { createId } from '@simurgh-ui/core';

export type ToastMessage = { id: string; title: string; description?: string };

@Component({
  selector: 'simurgh-toast-viewport',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="simurgh-toast-region"
    role="region"
    aria-label="Notifications"
  >
    <article
      *ngFor="let item of messages()"
      role="status"
      class="simurgh-content simurgh-toast"
    >
      <strong>{{ item.title }}</strong>
      <p *ngIf="item.description">{{ item.description }}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        (click)="dismiss(item.id)"
      >
        ×
      </button>
    </article>
  </div>`,
})
export class ToastViewportComponent {
  readonly messages = signal<ToastMessage[]>([]);
  toast(message: Omit<ToastMessage, 'id'>, duration = 5000) {
    const id = createId('toast');
    this.messages.update((items) => [...items, { ...message, id }]);
    if (duration) setTimeout(() => this.dismiss(id), duration);
    return id;
  }
  dismiss(id: string) {
    this.messages.update((items) => items.filter((x) => x.id !== id));
  }
}

import type { Direction, Orientation } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-toggle-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'group',
    'data-slot': 'toggle-group',
    '[attr.aria-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ToggleGroupComponent {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() value: string[] = [];
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string[]>();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  toggle(item: string) {
    this.value = this.value.includes(item)
      ? this.value.filter((entry) => entry !== item)
      : this.type === 'single'
        ? [item]
        : [...this.value, item];
    this.valueChange.emit(this.value);
  }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[data-toggle-group-item]:not(:disabled)',
      ),
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(index, items.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    if (target !== index) {
      event.preventDefault();
      items[target]?.focus();
    }
  }
}

@Directive({
  selector: 'button[simurghToggleGroupItem]',
  standalone: true,
  host: {
    type: 'button',
    'data-toggle-group-item': '',
    'data-slot': 'toggle-group-item',
    '[attr.aria-pressed]': 'pressed',
    '[attr.data-state]': "pressed ? 'on' : 'off'",
    '(click)': 'activate()',
  },
})
export class ToggleGroupItemDirective {
  @Input({ alias: 'simurghToggleGroupItem', required: true }) value = '';
  @Input() disabled = false;
  private readonly group = inject(ToggleGroupComponent);
  get pressed() {
    return this.group.value.includes(this.value);
  }
  activate() {
    if (!this.disabled) this.group.toggle(this.value);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simurgh-toggle',
  standalone: true,
  template: `<button
    type="button"
    [attr.aria-pressed]="pressed"
    [attr.data-state]="pressed ? 'on' : 'off'"
    [disabled]="disabled"
    (click)="toggle()"
  >
    <ng-content />
  </button>`,
})
export class ToggleComponent {
  @Input() pressed = false;
  @Input() disabled = false;
  @Output() pressedChange = new EventEmitter<boolean>();
  toggle() {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
  }
}

import type { Direction, Orientation } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-toolbar',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'toolbar',
    'data-slot': 'toolbar',
    '[attr.aria-label]': 'label',
    '[attr.aria-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ToolbarComponent {
  @Input() label = 'Toolbar';
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[data-toolbar-item]:not(:disabled)',
      ),
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(index, items.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    if (target !== index) {
      event.preventDefault();
      items[target]?.focus();
    }
  }
}

@Directive({
  selector: 'button[simurghToolbarButton]',
  standalone: true,
  host: {
    type: 'button',
    'data-toolbar-item': '',
    'data-slot': 'toolbar-button',
  },
})
export class ToolbarButtonDirective {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      [attr.data-simurgh-floating-reference]="floatingId"
      (mouseenter)="openFromHover($event)"
      (mouseleave)="closeFromHover($event)"
      (focusin)="openFromFocus($event)"
      (focusout)="closeFromFocus($event)"
      (keydown)="onReferenceKeydown($event)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      [attr.data-simurgh-floating-content]="floatingId"
      *ngIf="open"
      role="tooltip"
      class="simurgh-content"
      style="position:fixed"
    >
      <ng-content />
    </div>`,
})
export class TooltipComponent extends FloatingBase {
  protected override interactionKind = 'tooltip' as const;
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}

import type { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Directive({
  selector: 'ul[simurghTree]',
  standalone: true,
  host: { role: 'tree', 'data-slot': 'tree' },
})
export class TreeDirective implements AfterViewInit {
  private element: ElementRef<HTMLElement> = inject(ElementRef);
  ngAfterViewInit() {
    this.element.nativeElement
      .querySelectorAll<HTMLButtonElement>('[role="treeitem"]')
      .forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
  }
  private focusItem(
    items: HTMLButtonElement[],
    current: number,
    target: number,
  ) {
    if (target < 0 || target === current) return;
    items[current]?.setAttribute('tabindex', '-1');
    if (items[target]) {
      items[target].tabIndex = 0;
      items[target].focus();
    }
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const root = event.currentTarget as HTMLElement;
    const items = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[role="treeitem"]'),
    ).filter(
      (item) => !item.disabled && !item.closest('[role="group"][hidden]'),
    );
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    let target = current;
    if (event.key === 'ArrowDown')
      target = Math.min(current + 1, items.length - 1);
    else if (event.key === 'ArrowUp') target = Math.max(current - 1, 0);
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = items.length - 1;
    else if (event.key === 'ArrowRight' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'false') item.click();
      else {
        const child = item
          .closest('simurgh-tree-item')
          ?.querySelector<HTMLButtonElement>(
            '[role="group"] [role="treeitem"]',
          );
        if (child) this.focusItem(items, current, items.indexOf(child));
      }
      event.preventDefault();
      return;
    } else if (event.key === 'ArrowLeft' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'true') item.click();
      else {
        const parent = item
          .closest('[role="group"]')
          ?.closest('simurgh-tree-item')
          ?.querySelector<HTMLButtonElement>(
            ':scope > button[role="treeitem"]',
          );
        if (parent) this.focusItem(items, current, items.indexOf(parent));
      }
      event.preventDefault();
      return;
    } else return;
    if (target !== current && target >= 0) {
      event.preventDefault();
      this.focusItem(items, current, target);
    }
  }
}

@Component({
  selector: 'simurgh-tree-item',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="treeitem"
      data-slot="tree-item"
      [attr.aria-expanded]="expandable ? expanded : null"
      [attr.aria-controls]="expandable ? groupId : null"
      [attr.aria-disabled]="disabled || null"
      [disabled]="disabled"
      tabindex="-1"
      (click)="toggle()"
    >
      {{ label }}
    </button>
    <ul
      *ngIf="expandable"
      [id]="groupId"
      role="group"
      data-slot="tree-group"
      [hidden]="!expanded"
    >
      <ng-content />
    </ul>`,
  host: { role: 'none', 'data-slot': 'tree-node' },
})
export class TreeItemComponent {
  @Input({ required: true }) label = '';
  @Input() expandable = false;
  @Input() expanded = false;
  @Input() disabled = false;
  @Output() expandedChange = new EventEmitter<boolean>();
  readonly groupId = createId('tree-group');
  toggle() {
    if (!this.expandable || this.disabled) return;
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-visually-hidden',
  standalone: true,
  template: `<ng-content />`,
  host: {
    style:
      'position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0',
  },
})
export class VisuallyHiddenComponent {}
