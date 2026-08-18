import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

type TabsContextValue = {
  value: string;
  setValue(value: string): void;
  id: string;
  orientation: Orientation;
  direction: Direction;
};
const TabsContext = /* @__PURE__ */ createContext<TabsContextValue | null>(
  null,
);
const useTabs = () => {
  const c = useContext(TabsContext);
  if (!c) throw new Error('Tabs parts require Tabs');
  return c;
};
export function Tabs({
  value,
  defaultValue = '',
  onValueChange,
  orientation = 'horizontal',
  direction = 'ltr',
  children,
}: PropsWithChildren<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: Orientation;
  direction?: Direction;
}>) {
  const [local, setLocal] = useState(defaultValue);
  const current = value ?? local;
  const setValue = (next: string) => {
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider
      value={{ value: current, setValue, id: useId(), orientation, direction }}
    >
      {children}
    </TabsContext.Provider>
  );
}
export function TabsList(props: HTMLAttributes<HTMLDivElement>) {
  const c = useTabs();
  return (
    <div
      {...props}
      role="tablist"
      aria-orientation={c.orientation}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);
        const tabs = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            '[role=tab]:not([disabled])',
          ),
        );
        const index = tabs.indexOf(document.activeElement as HTMLElement);
        const target = nextIndex(index, tabs.length, e.key, {
          orientation: c.orientation,
          direction: c.direction,
        });
        if (target !== index) {
          e.preventDefault();
          tabs[target]?.focus();
          tabs[target]?.click();
        }
      }}
    />
  );
}
export function TabsTrigger({
  value,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const c = useTabs();
  const active = c.value === value;
  return (
    <button
      type="button"
      {...props}
      role="tab"
      id={`${c.id}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${c.id}-panel-${value}`}
      tabIndex={active ? 0 : -1}
      onClick={(e) => {
        props.onClick?.(e);
        c.setValue(value);
      }}
    />
  );
}
export function TabsContent({
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
  const c = useTabs();
  return c.value === value ? (
    <div
      {...props}
      role="tabpanel"
      id={`${c.id}-panel-${value}`}
      aria-labelledby={`${c.id}-tab-${value}`}
      tabIndex={0}
    />
  ) : null;
}
