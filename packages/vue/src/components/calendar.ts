import type { Direction } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref, type PropType } from 'vue';

const dateValue = (date: Date) => date.toISOString().slice(0, 10);
const dateFrom = (value: string) => new Date(value);
const addDays = (value: string, amount: number) => {
  const date = dateFrom(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return dateValue(date);
};
const addMonths = (value: string, amount: number) => {
  const date = dateFrom(value);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + amount);
  const last = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return dateValue(date);
};
const monthDays = (month: string, firstDay: number) => {
  const first = dateFrom(`${month}-01`);
  const offset = (first.getUTCDay() - firstDay + 7) % 7;
  const start = addDays(dateValue(first), -offset);
  return Array.from({ length: 42 }, (_, index) => {
    const value = addDays(start, index);
    return {
      value,
      day: Number(value.slice(8, 10)),
      outside: value.slice(0, 7) !== month,
    };
  });
};
const moveDate = (
  value: string,
  key: string,
  direction: Direction,
  firstDay: number,
) => {
  if (key === 'ArrowUp') return addDays(value, -7);
  if (key === 'ArrowDown') return addDays(value, 7);
  if (key === 'ArrowLeft') return addDays(value, direction === 'rtl' ? 1 : -1);
  if (key === 'ArrowRight') return addDays(value, direction === 'rtl' ? -1 : 1);
  if (key === 'PageUp') return addMonths(value, -1);
  if (key === 'PageDown') return addMonths(value, 1);
  const offset = (dateFrom(value).getUTCDay() - firstDay + 7) % 7;
  return addDays(value, key === 'Home' ? -offset : 6 - offset);
};
const todayValue = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return dateValue(today);
};

export const Calendar = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: String,
    defaultValue: { type: String, default: '' },
    month: String,
    defaultMonth: String,
    locale: { type: String, default: 'en' },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
    firstDayOfWeek: { type: Number, default: 0 },
    min: String,
    max: String,
    disabledDates: { type: Array as PropType<string[]>, default: () => [] },
    name: String,
    label: { type: String, default: 'Calendar' },
  },
  emits: ['update:modelValue', 'update:month'],
  setup(props, { emit }) {
    const today = todayValue();
    const localValue = ref(props.defaultValue);
    const localMonth = ref(
      props.defaultMonth ?? (props.defaultValue || today).slice(0, 7),
    );
    const root = ref<HTMLElement | null>(null);
    const selected = computed(() => props.modelValue ?? localValue.value);
    const displayedMonth = computed(() => props.month ?? localMonth.value);
    const days = computed(() =>
      monthDays(displayedMonth.value, props.firstDayOfWeek),
    );
    const isDisabled = (date: string) =>
      (props.min !== undefined && date < props.min) ||
      (props.max !== undefined && date > props.max) ||
      props.disabledDates.includes(date);
    const setMonth = (next: string) => {
      if (props.month === undefined) localMonth.value = next;
      emit('update:month', next);
    };
    const choose = (date: string) => {
      if (isDisabled(date)) return;
      if (props.modelValue === undefined) localValue.value = date;
      if (date.slice(0, 7) !== displayedMonth.value) setMonth(date.slice(0, 7));
      emit('update:modelValue', date);
    };
    const focusDate = (date: string) => {
      if (date.slice(0, 7) !== displayedMonth.value) setMonth(date.slice(0, 7));
      requestAnimationFrame(() =>
        root.value
          ?.querySelector<HTMLElement>(`[data-date="${date}"]`)
          ?.focus(),
      );
    };
    return () => {
      const monthValue = displayedMonth.value;
      const anchor =
        selected.value.slice(0, 7) === monthValue
          ? selected.value
          : `${monthValue}-01`;
      const monthLabel = dateFrom(`${monthValue}-01`).toLocaleDateString(
        props.locale,
        {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        },
      );
      const fullDate = (value: string) =>
        dateFrom(value).toLocaleDateString(props.locale, {
          dateStyle: 'full',
          timeZone: 'UTC',
        });
      const weekday = (date: Date) =>
        date.toLocaleDateString(props.locale, {
          weekday: 'short',
          timeZone: 'UTC',
        });
      return h(
        'div',
        {
          ref: root,
          'data-slot': 'calendar',
          dir: props.direction,
          role: 'group',
          'aria-label': props.label,
        },
        [
          h('div', { 'data-slot': 'calendar-header' }, [
            h(
              'button',
              {
                type: 'button',
                'aria-label': 'Previous month',
                onClick: () =>
                  setMonth(addMonths(`${monthValue}-01`, -1).slice(0, 7)),
              },
              '\u2039',
            ),
            h('h2', { 'aria-live': 'polite' }, monthLabel),
            h(
              'button',
              {
                type: 'button',
                'aria-label': 'Next month',
                onClick: () =>
                  setMonth(addMonths(`${monthValue}-01`, 1).slice(0, 7)),
              },
              '\u203a',
            ),
          ]),
          h('table', { role: 'grid', 'aria-label': monthLabel }, [
            h('thead', [
              h(
                'tr',
                Array.from({ length: 7 }, (_, index) => {
                  const date = new Date(
                    Date.UTC(2023, 0, 1 + ((props.firstDayOfWeek + index) % 7)),
                  );
                  return h('th', { scope: 'col' }, weekday(date));
                }),
              ),
            ]),
            h(
              'tbody',
              Array.from({ length: 6 }, (_, week) =>
                h(
                  'tr',
                  days.value.slice(week * 7, week * 7 + 7).map((day) =>
                    h(
                      'td',
                      {
                        role: 'gridcell',
                        'aria-selected': selected.value === day.value,
                      },
                      h(
                        'button',
                        {
                          type: 'button',
                          'data-slot': 'calendar-day',
                          'data-date': day.value,
                          'data-outside': day.outside || undefined,
                          'data-state':
                            selected.value === day.value
                              ? 'selected'
                              : undefined,
                          'aria-current':
                            today === day.value ? 'date' : undefined,
                          'aria-label': fullDate(day.value),
                          'aria-disabled': isDisabled(day.value) || undefined,
                          tabindex: day.value === anchor ? 0 : -1,
                          onClick: () => choose(day.value),
                          onKeydown: (event: KeyboardEvent) => {
                            if (
                              !/^(Arrow(Left|Right|Up|Down)|Home|End|Page(Up|Down))$/.test(
                                event.key,
                              )
                            )
                              return;
                            event.preventDefault();
                            focusDate(
                              moveDate(
                                day.value,
                                event.key,
                                props.direction,
                                props.firstDayOfWeek,
                              ),
                            );
                          },
                        },
                        String(day.day),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ]),
          props.name
            ? h('input', {
                type: 'hidden',
                name: props.name,
                value: selected.value,
              })
            : null,
        ],
      );
    };
  },
});
