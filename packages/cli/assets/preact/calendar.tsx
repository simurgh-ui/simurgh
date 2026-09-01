// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  addCalendarMonths,
  calendarMonthDays,
  calendarToday,
  moveCalendarDate,
  type Direction,
} from '@simurgh-ui/core';
import { useId, useMemo, useRef, useState } from 'preact/compat';
import { useFormReset } from '../internal/forms.js';

export type CalendarProps = {
  value?: string;
  defaultValue?: string;
  month?: string;
  defaultMonth?: string;
  locale?: string;
  direction?: Direction;
  firstDayOfWeek?: number;
  min?: string;
  max?: string;
  disabledDates?: string[];
  name?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  onMonthChange?: (month: string) => void;
};

export function Calendar({
  value,
  defaultValue = '',
  month,
  defaultMonth,
  locale = 'en',
  direction = 'ltr',
  firstDayOfWeek = 0,
  min,
  max,
  disabledDates = [],
  name,
  label = 'Calendar',
  onValueChange,
  onMonthChange,
}: CalendarProps) {
  const today = useMemo(calendarToday, []);
  const [localValue, setLocalValue] = useState(defaultValue);
  const selected = value ?? localValue;
  const [localMonth, setLocalMonth] = useState(
    defaultMonth ?? (value || defaultValue || today).slice(0, 7),
  );
  const displayedMonth = month ?? localMonth;
  const days = calendarMonthDays(displayedMonth, firstDayOfWeek);
  const root = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const resetRef = useFormReset<HTMLInputElement>(() => {
    if (value === undefined) setLocalValue(defaultValue);
    if (month === undefined)
      setLocalMonth(defaultMonth ?? (value || defaultValue || today).slice(0, 7));
  });
  const disabled = new Set(disabledDates);
  const isDisabled = (date: string) =>
    (min !== undefined && date < min) ||
    (max !== undefined && date > max) ||
    disabled.has(date);
  const anchor =
    selected.slice(0, 7) === displayedMonth ? selected : `${displayedMonth}-01`;
  const dateFor = (date: string) => new Date(`${date}T00:00:00Z`);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dateFor(`${displayedMonth}-01`));
  const dayLabel = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeZone: 'UTC',
  });
  const weekdayLabel = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    timeZone: 'UTC',
  });
  const setMonth = (next: string) => {
    if (month === undefined) setLocalMonth(next);
    onMonthChange?.(next);
  };
  const choose = (date: string) => {
    if (isDisabled(date)) return;
    if (value === undefined) setLocalValue(date);
    if (date.slice(0, 7) !== displayedMonth) setMonth(date.slice(0, 7));
    onValueChange?.(date);
  };
  const focusDate = (date: string) => {
    if (date.slice(0, 7) !== displayedMonth) setMonth(date.slice(0, 7));
    requestAnimationFrame(() =>
      root.current
        ?.querySelector<HTMLElement>(`[data-date="${date}"]`)
        ?.focus(),
    );
  };
  return (
    <div
      ref={root}
      data-slot="calendar"
      dir={direction}
      role="group"
      aria-label={label}
    >
      <div data-slot="calendar-header">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() =>
            setMonth(addCalendarMonths(`${displayedMonth}-01`, -1).slice(0, 7))
          }
        >
          ‹
        </button>
        <h2 id={titleId} aria-live="polite">
          {monthLabel}
        </h2>
        <button
          type="button"
          aria-label="Next month"
          onClick={() =>
            setMonth(addCalendarMonths(`${displayedMonth}-01`, 1).slice(0, 7))
          }
        >
          ›
        </button>
      </div>
      <table role="grid" aria-labelledby={titleId}>
        <thead>
          <tr>
            {Array.from({ length: 7 }, (_, index) => {
              const date = new Date(
                Date.UTC(2023, 0, 1 + ((firstDayOfWeek + index) % 7)),
              );
              return (
                <th key={index} scope="col">
                  {weekdayLabel.format(date)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, week) => (
            <tr key={week}>
              {days.slice(week * 7, week * 7 + 7).map((day) => (
                <td
                  key={day.value}
                  role="gridcell"
                  aria-selected={selected === day.value}
                >
                  <button
                    type="button"
                    data-slot="calendar-day"
                    data-date={day.value}
                    data-outside={day.outside || undefined}
                    data-state={selected === day.value ? 'selected' : undefined}
                    aria-current={today === day.value ? 'date' : undefined}
                    aria-label={dayLabel.format(dateFor(day.value))}
                    aria-disabled={isDisabled(day.value) || undefined}
                    tabIndex={day.value === anchor ? 0 : -1}
                    onClick={() => choose(day.value)}
                    onKeyDown={(event) => {
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
                      focusDate(
                        moveCalendarDate(day.value, event.key, {
                          direction,
                          firstDayOfWeek,
                        }),
                      );
                    }}
                  >
                    {day.day}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {name && (
        <input ref={resetRef} type="hidden" name={name} value={selected} />
      )}
    </div>
  );
}
