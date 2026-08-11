import { describe, expect, it, vi } from 'vitest';
import {
  addCalendarMonths,
  calendarMonthDays,
  createControllableState,
  formValue,
  moveCalendarDate,
  nextIndex,
  resolveDirection,
} from '../src/index.js';

describe('direction-aware keyboard navigation', () => {
  it('reverses horizontal arrows in RTL', () => {
    expect(nextIndex(0, 3, 'ArrowLeft', { direction: 'rtl' })).toBe(1);
    expect(nextIndex(0, 3, 'ArrowRight', { direction: 'rtl' })).toBe(2);
  });
  it('supports bounded and looping movement', () => {
    expect(nextIndex(2, 3, 'ArrowRight')).toBe(0);
    expect(nextIndex(2, 3, 'ArrowRight', { loop: false })).toBe(2);
  });
});

describe('state and forms', () => {
  it('notifies only when state changes', () => {
    const change = vi.fn();
    const state = createControllableState(false, change);
    state.set(true);
    state.set(true);
    expect(change).toHaveBeenCalledOnce();
  });
  it('serializes checked values', () => {
    expect(formValue('yes')).toBe('yes');
    expect(formValue('yes', false)).toBeNull();
  });
});

it('defaults SSR direction to LTR', () =>
  expect(resolveDirection()).toBe('ltr'));

describe('calendar arithmetic', () => {
  it('creates a stable six-week month grid', () => {
    const days = calendarMonthDays('2026-08', 1);
    expect(days).toHaveLength(42);
    expect(days[0]).toEqual({ value: '2026-07-27', day: 27, outside: true });
    expect(days[41]?.value).toBe('2026-09-06');
  });
  it('clamps month changes and supports logical RTL arrows', () => {
    expect(addCalendarMonths('2024-01-31', 1)).toBe('2024-02-29');
    expect(
      moveCalendarDate('2026-08-12', 'ArrowLeft', { direction: 'rtl' }),
    ).toBe('2026-08-13');
    expect(moveCalendarDate('2026-08-12', 'Home', { firstDayOfWeek: 1 })).toBe(
      '2026-08-10',
    );
  });
});
