import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

type ToggleGroupContextValue = {
  values: string[];
  toggle(value: string): void;
};
const ToggleGroupContext =
  /* @__PURE__ */ createContext<ToggleGroupContextValue | null>(null);
export function ToggleGroup({
  type = 'single',
  value,
  defaultValue = [],
  onValueChange,
  orientation = 'horizontal',
  direction = 'ltr',
  children,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    type?: 'single' | 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?(value: string[]): void;
    orientation?: Orientation;
    direction?: Direction;
  }
>) {
  const [local, setLocal] = useState(defaultValue);
  const values = value ?? local;
  const toggle = (item: string) => {
    const next = values.includes(item)
      ? values.filter((entry) => entry !== item)
      : type === 'single'
        ? [item]
        : [...values, item];
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
  };
  return (
    <ToggleGroupContext.Provider value={{ values, toggle }}>
      <div
        {...props}
        role="group"
        aria-orientation={orientation}
        dir={direction}
        data-slot="toggle-group"
        onKeyDown={(event) => {
          props.onKeyDown?.(event);
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              '[data-toggle-group-item]:not(:disabled)',
            ),
          );
          const index = items.indexOf(document.activeElement as HTMLElement);
          const target = nextIndex(index, items.length, event.key, {
            orientation,
            direction,
          });
          if (target !== index) {
            event.preventDefault();
            items[target]?.focus();
          }
        }}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}
export function ToggleGroupItem({
  value,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const group = useContext(ToggleGroupContext)!;
  const pressed = group.values.includes(value);
  return (
    <button
      type="button"
      {...props}
      data-toggle-group-item
      data-slot="toggle-group-item"
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !props.disabled) group.toggle(value);
      }}
    />
  );
}
