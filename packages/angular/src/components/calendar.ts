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
  @Input() month = '';
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
    return calendarMonthDays(this.displayedMonth, this.firstDayOfWeek);
  }
  get monthLabel() {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${this.displayedMonth}-01T00:00:00Z`));
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
      this.value.slice(0, 7) === this.displayedMonth
        ? this.value
        : `${this.displayedMonth}-01`;
    return value === anchor ? 0 : -1;
  }
  setMonth(month: string) {
    this.month = month;
    this.monthChange.emit(month);
  }
  moveMonth(amount: number) {
    this.setMonth(
      addCalendarMonths(`${this.displayedMonth}-01`, amount).slice(0, 7),
    );
  }
  choose(value: string) {
    if (this.isDisabled(value)) return;
    this.value = value;
    if (value.slice(0, 7) !== this.displayedMonth)
      this.setMonth(value.slice(0, 7));
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
    if (next.slice(0, 7) !== this.displayedMonth)
      this.setMonth(next.slice(0, 7));
    requestAnimationFrame(() =>
      this.root?.nativeElement
        .querySelector<HTMLElement>(`[data-date="${next}"]`)
        ?.focus(),
    );
  }

  private get displayedMonth() {
    return this.month || this.value.slice(0, 7) || this.today.slice(0, 7);
  }
}
