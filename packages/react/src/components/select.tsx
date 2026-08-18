import { useId, useState, type ReactNode } from 'react';
import {
  FloatingContent,
  FloatingRoot,
  FloatingTrigger,
  onCompositeKeyDown,
} from '../internal/floating.js';
import { useOpen } from '../internal/open.js';

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};
export function Select({
  options,
  name,
  value,
  defaultValue = '',
  required,
  disabled,
  onValueChange,
  placeholder = 'Select…',
}: {
  options: SelectOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  placeholder?: ReactNode;
}) {
  const [local, setLocal] = useState(defaultValue);
  const selected = value ?? local;
  const root = useOpen({});
  const [open, setOpen] = root;
  const listId = `${useId()}-listbox`;
  const set = (next: string) => {
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
    setOpen(false);
  };
  const chosen = options.find((o) => o.value === selected);
  return (
    <FloatingRoot open={open} onOpenChange={setOpen} kind="listbox">
      <FloatingTrigger
        data-slot="select-trigger"
        disabled={disabled}
        role="combobox"
        aria-controls={listId}
        aria-label={typeof placeholder === 'string' ? placeholder : undefined}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {chosen?.label ?? placeholder}
      </FloatingTrigger>
      <FloatingContent
        data-slot="select-content"
        id={listId}
        onKeyDown={(event) => onCompositeKeyDown(event, '[role=option]')}
      >
        {options.map((option) => (
          <div
            key={option.value}
            role="option"
            data-slot="select-option"
            tabIndex={-1}
            aria-selected={selected === option.value}
            aria-disabled={option.disabled || undefined}
            className="simurgh-item"
            onClick={() => !option.disabled && set(option.value)}
          >
            {option.label}
          </div>
        ))}
      </FloatingContent>
      {name && (
        <input type="hidden" name={name} value={selected} disabled={disabled} />
      )}
      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          required
          value={selected}
          onChange={() => undefined}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
      )}
    </FloatingRoot>
  );
}
