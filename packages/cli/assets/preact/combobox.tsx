// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useId, useState, type ReactNode } from 'preact/compat';
import { useFormReset } from '../internal/forms.js';
import type { SelectOption } from './select.js';
export type { SelectOption } from './select.js';

export type ComboboxProps = {
  options: Array<Omit<SelectOption, 'label'> & { label: string }>;
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  noResults?: ReactNode;
  onValueChange?: (value: string) => void;
};

export function Combobox({
  options,
  name,
  value,
  defaultValue = '',
  required = false,
  disabled = false,
  placeholder = 'Search…',
  noResults = 'No results',
  onValueChange,
}: ComboboxProps) {
  const [local, setLocal] = useState(defaultValue);
  const selected = value ?? local;
  const selectedOption = options.find((option) => option.value === selected);
  const [query, setQuery] = useState(selectedOption?.label ?? '');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const control = useFormReset<HTMLInputElement>(() => {
    if (value === undefined) setLocal(defaultValue);
    setQuery(
      options.find((option) => option.value === defaultValue)?.label ?? '',
    );
    setOpen(false);
    setActive(-1);
  });
  const listId = `${useId()}-combobox`;
  const filtered = options.filter((option) =>
    option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const enabled = filtered
    .map((option, index) => (option.disabled ? -1 : index))
    .filter((index) => index >= 0);
  const choose = (option: (typeof options)[number]) => {
    if (option.disabled) return;
    if (value === undefined) setLocal(option.value);
    setQuery(option.label);
    setOpen(false);
    setActive(-1);
    onValueChange?.(option.value);
  };
  const move = (key: string) => {
    if (!enabled.length) return;
    const current = enabled.indexOf(active);
    const next =
      key === 'Home'
        ? 0
        : key === 'End'
          ? enabled.length - 1
          : key === 'ArrowUp'
            ? (current - 1 + enabled.length) % enabled.length
            : (current + 1) % enabled.length;
    setActive(enabled[next]!);
  };
  return (
    <div>
      <input
        ref={control}
        role="combobox"
        aria-label={placeholder}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && active >= 0 ? `${listId}-${active}` : undefined
        }
        disabled={disabled}
        placeholder={placeholder}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
            move(event.key);
          } else if (
            event.key === 'Enter' &&
            active >= 0 &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            const option = filtered[active];
            if (option) choose(option);
          } else if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false);
          }
        }}
      />
      {open && (
        <div id={listId} role="listbox" className="simurgh-content">
          {filtered.length ? (
            filtered.map((option, index) => (
              <div
                id={`${listId}-${index}`}
                key={option.value}
                role="option"
                aria-selected={selected === option.value}
                aria-disabled={option.disabled || undefined}
                data-highlighted={active === index || undefined}
                className="simurgh-item"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div>{noResults}</div>
          )}
        </div>
      )}
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
    </div>
  );
}
