import { type Direction, type Orientation } from '@simurgh-ui/core';
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';

type ResizableContextValue = {
  orientation: Orientation;
  direction: Direction;
  sizes: number[];
  minimums: number[];
  maximums: number[];
  root: React.RefObject<HTMLDivElement | null>;
  adjust(boundary: number, delta: number): void;
};
const ResizableContext =
  /* @__PURE__ */ createContext<ResizableContextValue | null>(null);
const normalizePanelSizes = (values: number[]) => {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  return values.map((value) =>
    total ? (Math.max(0, value) / total) * 100 : 100 / values.length,
  );
};

export function ResizablePanelGroup({
  orientation = 'horizontal',
  direction = 'ltr',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  orientation?: Orientation;
  direction?: Direction;
}) {
  const parts = React.Children.toArray(children);
  const panels = parts.filter(
    (child) => React.isValidElement(child) && child.type === ResizablePanel,
  ) as React.ReactElement<ResizablePanelProps>[];
  const [sizes, setSizes] = useState(() =>
    normalizePanelSizes(panels.map((panel) => panel.props.defaultSize ?? 1)),
  );
  const minimums = panels.map((panel) => panel.props.minSize ?? 10);
  const maximums = panels.map((panel) => panel.props.maxSize ?? 90);
  const root = useRef<HTMLDivElement>(null);
  const adjust = (boundary: number, delta: number) => {
    setSizes((current) => {
      if (boundary < 0 || boundary >= current.length - 1) return current;
      const total = current[boundary]! + current[boundary + 1]!;
      const low = Math.max(
        minimums[boundary]!,
        total - maximums[boundary + 1]!,
      );
      const high = Math.min(
        maximums[boundary]!,
        total - minimums[boundary + 1]!,
      );
      const before = Math.max(low, Math.min(high, current[boundary]! + delta));
      const next = [...current];
      next[boundary] = before;
      next[boundary + 1] = total - before;
      return next;
    });
  };
  let panelIndex = 0;
  return (
    <ResizableContext.Provider
      value={{
        orientation,
        direction,
        sizes,
        minimums,
        maximums,
        root,
        adjust,
      }}
    >
      <div
        {...props}
        ref={root}
        data-slot="resizable-panel-group"
        data-orientation={orientation}
        dir={direction}
      >
        {parts.map((child, index) => {
          if (!React.isValidElement(child)) return child;
          if (child.type === ResizablePanel) {
            const current = panelIndex++;
            return React.cloneElement(
              child as React.ReactElement<ResizablePanelProps>,
              { _index: current, key: child.key ?? index },
            );
          }
          if (child.type === ResizableHandle)
            return React.cloneElement(
              child as React.ReactElement<ResizableHandleProps>,
              { _boundary: panelIndex - 1, key: child.key ?? index },
            );
          return child;
        })}
      </div>
    </ResizableContext.Provider>
  );
}

type ResizablePanelProps = HTMLAttributes<HTMLDivElement> & {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  _index?: number;
};
export function ResizablePanel(props: ResizablePanelProps) {
  const context = useContext(ResizableContext);
  const forwardedProps = { ...props };
  delete forwardedProps.defaultSize;
  delete forwardedProps.minSize;
  delete forwardedProps.maxSize;
  delete forwardedProps._index;
  return (
    <div
      {...forwardedProps}
      data-slot="resizable-panel"
      style={{
        ...props.style,
        flexBasis: `${context?.sizes[props._index ?? 0] ?? 100}%`,
      }}
    />
  );
}

type ResizableHandleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  _boundary?: number;
};
export function ResizableHandle({
  _boundary = 0,
  onKeyDown,
  onPointerDown,
  ...props
}: ResizableHandleProps) {
  const context = useContext(ResizableContext);
  if (!context)
    throw new Error('ResizableHandle requires a ResizablePanelGroup');
  const total =
    (context.sizes[_boundary] ?? 0) + (context.sizes[_boundary + 1] ?? 0);
  const effectiveMinimum = Math.max(
    context.minimums[_boundary]!,
    total - context.maximums[_boundary + 1]!,
  );
  const effectiveMaximum = Math.min(
    context.maximums[_boundary]!,
    total - context.minimums[_boundary + 1]!,
  );
  const move = (key: string) => {
    const current = context.sizes[_boundary] ?? 0;
    if (key === 'Home')
      return context.adjust(_boundary, effectiveMinimum - current);
    if (key === 'End')
      return context.adjust(_boundary, effectiveMaximum - current);
    const previous =
      context.orientation === 'vertical'
        ? 'ArrowUp'
        : context.direction === 'rtl'
          ? 'ArrowRight'
          : 'ArrowLeft';
    const next =
      context.orientation === 'vertical'
        ? 'ArrowDown'
        : context.direction === 'rtl'
          ? 'ArrowLeft'
          : 'ArrowRight';
    if (key === previous) context.adjust(_boundary, -5);
    else if (key === next) context.adjust(_boundary, 5);
  };
  return (
    <button
      type="button"
      {...props}
      data-slot="resizable-handle"
      role="separator"
      aria-orientation={
        context.orientation === 'horizontal' ? 'vertical' : 'horizontal'
      }
      aria-valuemin={effectiveMinimum}
      aria-valuemax={effectiveMaximum}
      aria-valuenow={Math.round(context.sizes[_boundary] ?? 0)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          !event.defaultPrevented &&
          [
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
          ].includes(event.key)
        ) {
          event.preventDefault();
          move(event.key);
        }
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented) return;
        let previous =
          context.orientation === 'horizontal' ? event.clientX : event.clientY;
        const size =
          context.orientation === 'horizontal'
            ? context.root.current?.clientWidth
            : context.root.current?.clientHeight;
        if (!size) return;
        const onMove = (next: PointerEvent) => {
          const coordinate =
            context.orientation === 'horizontal' ? next.clientX : next.clientY;
          let delta = ((coordinate - previous) / size) * 100;
          previous = coordinate;
          if (
            context.orientation === 'horizontal' &&
            context.direction === 'rtl'
          )
            delta *= -1;
          context.adjust(_boundary, delta);
        };
        const onUp = () => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp, { once: true });
      }}
    />
  );
}
