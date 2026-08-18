import { nextIndex, type Direction } from '@simurgh-ui/core';
import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

type RadioContextValue = {
  value: string;
  setValue(value: string): void;
  name: string | undefined;
  required: boolean;
  disabled: boolean;
  direction: Direction;
};
const RadioContext = /* @__PURE__ */ createContext<RadioContextValue | null>(
  null,
);
export function RadioGroup({
  children,
  value,
  defaultValue = '',
  onValueChange,
  name,
  required = false,
  disabled = false,
  direction = 'ltr',
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    direction?: Direction;
  }
>) {
  const [local, setLocal] = useState(defaultValue);
  const selected = value ?? local;
  const setValue = (next: string) => {
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
  };
  return (
    <RadioContext.Provider
      value={{ value: selected, setValue, name, required, disabled, direction }}
    >
      <div
        {...props}
        role="radiogroup"
        onKeyDown={(event) => {
          props.onKeyDown?.(event);
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              '[role=radio]:not([aria-disabled=true])',
            ),
          );
          const current = items.indexOf(document.activeElement as HTMLElement);
          const target = nextIndex(current, items.length, event.key, {
            direction,
          });
          if (target !== current) {
            event.preventDefault();
            items[target]?.focus();
            items[target]?.click();
          }
        }}
      >
        {children}
        {name && <input type="hidden" name={name} value={selected} />}
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
    </RadioContext.Provider>
  );
}
export function RadioGroupItem({
  value,
  disabled = false,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & { value: string }) {
  const c = useContext(RadioContext);
  if (!c) throw new Error('RadioGroupItem requires RadioGroup');
  const selected = c.value === value;
  const unavailable = c.disabled || disabled;
  return (
    <button
      type="button"
      {...props}
      role="radio"
      aria-checked={selected}
      aria-disabled={unavailable || undefined}
      tabIndex={selected ? 0 : -1}
      onClick={(event) => {
        props.onClick?.(event);
        if (!unavailable) c.setValue(value);
      }}
    />
  );
}
