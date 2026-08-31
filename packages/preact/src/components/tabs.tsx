// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { type Direction, type Orientation } from '@simurgh-ui/core';
import {
  createContext,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'preact/compat';
import { moveCompositeFocus } from '../internal/composite.js';
import { useControlledState } from '../internal/controlled-state.js';

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

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs parts require Tabs');
  return context;
}

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
  const [current, setValue] = useControlledState<string>({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  return (
    <TabsContext.Provider
      value={{ value: current, setValue, id: useId(), orientation, direction }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList(props: HTMLAttributes<HTMLDivElement>) {
  const context = useTabs();
  return (
    <div
      {...props}
      role="tablist"
      aria-orientation={context.orientation}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        moveCompositeFocus(event, '[role=tab]:not([disabled])', {
          orientation: context.orientation,
          direction: context.direction,
          activate: true,
        });
      }}
    />
  );
}
export function TabsTrigger({
  value,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = useTabs();
  const active = context.value === value;
  return (
    <button
      type="button"
      {...props}
      role="tab"
      id={`${context.id}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${context.id}-panel-${value}`}
      tabIndex={active ? 0 : -1}
      onClick={(event) => {
        props.onClick?.(event);
        context.setValue(value);
      }}
    />
  );
}
export function TabsContent({
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = useTabs();
  return context.value === value ? (
    <div
      {...props}
      role="tabpanel"
      id={`${context.id}-panel-${value}`}
      aria-labelledby={`${context.id}-tab-${value}`}
      tabIndex={0}
    />
  ) : null;
}
