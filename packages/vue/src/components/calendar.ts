import type { Direction } from '@simurgh-ui/core';
import { defineComponent, h, ref, type PropType } from 'vue';

const dateValue = (date: Date) => date.toJSON().slice(0, 10);
const addDays = (value: string, amount: number) => {
  const date = new Date(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return dateValue(date);
};
const addMonths = (value: string, amount: number) => {
  const date = new Date(value);
  const day = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + amount, 1);
  const month = date.getUTCMonth();
  date.setUTCDate(day);
  if (date.getUTCMonth() !== month) date.setUTCDate(0);
  return dateValue(date);
};
const monthDays = (month: string, firstDay: number) => {
  const first = new Date(`${month}-01`);
  const offset = (first.getUTCDay() - firstDay + 7) % 7;
  const start = addDays(dateValue(first), -offset);
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
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
  const offset = (new Date(value).getUTCDay() - firstDay + 7) % 7;
  return addDays(value, key === 'Home' ? -offset : 6 - offset);
};
const todayValue = () => {
  const today = new Date();
  return dateValue(
    new Date(today.getTime() - today.getTimezoneOffset() * 60_000),
  );
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
    const displayedMonth = () => props.month ?? localMonth.value;
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
      if (date.slice(0, 7) !== displayedMonth()) setMonth(date.slice(0, 7));
      emit('update:modelValue', date);
    };
    const focusDate = (date: string) => {
      if (date.slice(0, 7) !== displayedMonth()) setMonth(date.slice(0, 7));
      requestAnimationFrame(() =>
        root.value
          ?.querySelector<HTMLElement>(`[data-date="${date}"]`)
          ?.focus(),
      );
    };
    return () => {
      const monthValue = displayedMonth();
      const selectedValue = props.modelValue ?? localValue.value;
      const days = monthDays(monthValue, props.firstDayOfWeek);
      const anchor =
        selectedValue.slice(0, 7) === monthValue
          ? selectedValue
          : `${monthValue}-01`;
      const monthLabel = new Date(`${monthValue}-01`).toLocaleDateString(
        props.locale,
        {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        },
      );
      const fullDate = (value: string) =>
        new Date(value).toLocaleDateString(props.locale, {
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
                  days.slice(week * 7, week * 7 + 7).map((day) =>
                    h(
                      'td',
                      {
                        role: 'gridcell',
                        'aria-selected': selectedValue === day,
                      },
                      h(
                        'button',
                        {
                          type: 'button',
                          'data-slot': 'calendar-day',
                          'data-date': day,
                          'data-outside':
                            day.slice(0, 7) !== monthValue || undefined,
                          'data-state':
                            selectedValue === day ? 'selected' : undefined,
                          'aria-current': today === day ? 'date' : undefined,
                          'aria-label': fullDate(day),
                          'aria-disabled': isDisabled(day),
                          tabindex: day === anchor ? 0 : -1,
                          onClick: () => choose(day),
                          onKeydown: (event: KeyboardEvent) => {
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
                              moveDate(
                                day,
                                event.key,
                                props.direction,
                                props.firstDayOfWeek,
                              ),
                            );
                          },
                        },
                        Number(day.slice(8)),
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
                value: selectedValue,
              })
            : null,
        ],
      );
    };
  },
});
