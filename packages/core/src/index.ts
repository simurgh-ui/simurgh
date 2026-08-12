export type Direction = 'ltr' | 'rtl';
export type Orientation = 'horizontal' | 'vertical';
export type MaybeGetter<T> = T | (() => T);

let id = 0;
export function createId(prefix = 'simurgh'): string {
  id += 1;
  return `${prefix}-${id}`;
}

export function resolveDirection(
  element?: Element | null,
  explicit?: Direction,
): Direction {
  if (explicit) return explicit;
  if (element && typeof getComputedStyle === 'function') {
    return getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr';
  }
  return 'ltr';
}

export function nextIndex(
  current: number,
  size: number,
  key: string,
  options: {
    orientation?: Orientation;
    direction?: Direction;
    loop?: boolean;
  } = {},
): number {
  if (size <= 0) return -1;
  const {
    orientation = 'horizontal',
    direction = 'ltr',
    loop = true,
  } = options;
  const previous =
    orientation === 'vertical'
      ? 'ArrowUp'
      : direction === 'rtl'
        ? 'ArrowRight'
        : 'ArrowLeft';
  const next =
    orientation === 'vertical'
      ? 'ArrowDown'
      : direction === 'rtl'
        ? 'ArrowLeft'
        : 'ArrowRight';
  if (key === 'Home') return 0;
  if (key === 'End') return size - 1;
  const delta = key === previous ? -1 : key === next ? 1 : 0;
  if (!delta) return current;
  const candidate = current + delta;
  if (loop) return (candidate + size) % size;
  return Math.max(0, Math.min(size - 1, candidate));
}

export function focusable(container: ParentNode): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (node) => !node.hidden && node.getAttribute('aria-hidden') !== 'true',
  );
}

export function trapFocus(event: KeyboardEvent, container: ParentNode): void {
  if (event.key !== 'Tab') return;
  const nodes = focusable(container);
  const first = nodes[0];
  const last = nodes.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function createControllableState<T>(
  initial: T,
  onChange?: (value: T) => void,
) {
  let value = initial;
  return {
    get value() {
      return value;
    },
    set(next: T) {
      if (!Object.is(value, next)) {
        value = next;
        onChange?.(next);
      }
    },
    toggle() {
      if (typeof value === 'boolean') this.set(!value as T);
    },
  };
}

export function restoreFocus(previous: Element | null): void {
  if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
}

export function formValue(value: string, checked = true): string | null {
  return checked ? value : null;
}

export const isBrowser = typeof document !== 'undefined';

export type CalendarDay = {
  value: string;
  day: number;
  outside: boolean;
};

function parseCalendarDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
  );
  return date.getUTCFullYear() === Number(match[1]) &&
    date.getUTCMonth() === Number(match[2]) - 1 &&
    date.getUTCDate() === Number(match[3])
    ? date
    : null;
}

export function calendarDateValue(date: Date): string {
  return `${date.getUTCFullYear().toString().padStart(4, '0')}-${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
}

export function calendarToday(): string {
  const now = new Date();
  return `${now.getFullYear().toString().padStart(4, '0')}-${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
}

export function addCalendarDays(value: string, amount: number): string {
  const date = parseCalendarDate(value);
  if (!date) return value;
  date.setUTCDate(date.getUTCDate() + amount);
  return calendarDateValue(date);
}

export function addCalendarMonths(value: string, amount: number): string {
  const date = parseCalendarDate(value);
  if (!date) return value;
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + amount);
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return calendarDateValue(date);
}

export function calendarMonthDays(
  month: string,
  firstDayOfWeek = 0,
): CalendarDay[] {
  const first = parseCalendarDate(`${month}-01`);
  if (!first) return [];
  const normalizedFirstDay = ((firstDayOfWeek % 7) + 7) % 7;
  const offset = (first.getUTCDay() - normalizedFirstDay + 7) % 7;
  const start = addCalendarDays(calendarDateValue(first), -offset);
  return Array.from({ length: 42 }, (_, index) => {
    const value = addCalendarDays(start, index);
    return {
      value,
      day: Number(value.slice(8, 10)),
      outside: value.slice(0, 7) !== month,
    };
  });
}

export function moveCalendarDate(
  value: string,
  key: string,
  options: { direction?: Direction; firstDayOfWeek?: number } = {},
): string {
  const { direction = 'ltr', firstDayOfWeek = 0 } = options;
  const date = parseCalendarDate(value);
  if (!date) return value;
  if (key === 'ArrowUp') return addCalendarDays(value, -7);
  if (key === 'ArrowDown') return addCalendarDays(value, 7);
  if (key === 'ArrowLeft')
    return addCalendarDays(value, direction === 'rtl' ? 1 : -1);
  if (key === 'ArrowRight')
    return addCalendarDays(value, direction === 'rtl' ? -1 : 1);
  if (key === 'PageUp') return addCalendarMonths(value, -1);
  if (key === 'PageDown') return addCalendarMonths(value, 1);
  const weekdayOffset = (date.getUTCDay() - firstDayOfWeek + 7) % 7;
  if (key === 'Home') return addCalendarDays(value, -weekdayOffset);
  if (key === 'End') return addCalendarDays(value, 6 - weekdayOffset);
  return value;
}
