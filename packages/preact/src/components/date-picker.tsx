// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useRef, useState } from 'preact/compat';
import { Calendar, type CalendarProps } from './calendar.js';
import { Popover, PopoverContent, PopoverTrigger } from './popover.js';
import { useFormReset } from '../internal/forms.js';

export type DatePickerProps = CalendarProps & {
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export function DatePicker({
  value,
  defaultValue = '',
  name,
  locale = 'en',
  label = 'Date picker calendar',
  placeholder = 'Pick a date',
  required = false,
  disabled = false,
  onValueChange,
  ...calendarProps
}: DatePickerProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const selected = value ?? localValue;
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const resetRef = useFormReset<HTMLInputElement>(() => {
    if (value === undefined) setLocalValue(defaultValue);
    setOpen(false);
  });
  const displayValue = selected
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeZone: 'UTC',
      }).format(new Date(`${selected}T00:00:00Z`))
    : placeholder;
  const choose = (date: string) => {
    if (value === undefined) setLocalValue(date);
    onValueChange?.(date);
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  return (
    <div data-slot="date-picker">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={trigger}
          data-slot="date-picker-trigger"
          disabled={disabled}
        >
          {displayValue}
        </PopoverTrigger>
        <PopoverContent data-slot="date-picker-content" aria-label={label}>
          <Calendar
            {...calendarProps}
            value={selected}
            locale={locale}
            label={label}
            onValueChange={choose}
          />
        </PopoverContent>
      </Popover>
      {name && (
        <input
          ref={resetRef}
          type="hidden"
          name={name}
          value={selected}
          disabled={disabled}
        />
      )}
      {required && (
        <input
          ref={resetRef}
          tabIndex={-1}
          aria-hidden="true"
          required
          disabled={disabled}
          value={selected}
          onChange={() => undefined}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
      )}
    </div>
  );
}
