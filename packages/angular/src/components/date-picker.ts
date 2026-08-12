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
export class DatePickerComponent {
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
