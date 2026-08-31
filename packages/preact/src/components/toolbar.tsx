// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'preact/compat';

export const Toolbar = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    orientation?: Orientation;
    direction?: Direction;
    label?: string;
  }
>(function Toolbar(
  {
    orientation = 'horizontal',
    direction = 'ltr',
    label = 'Toolbar',
    onKeyDown,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      dir={direction}
      data-slot="toolbar"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const items = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            '[data-toolbar-item]:not(:disabled)',
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
      {...props}
    />
  );
});

export const ToolbarButton = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function ToolbarButton(props, ref) {
  return (
    <button
      ref={ref}
      type="button"
      data-toolbar-item
      data-slot="toolbar-button"
      {...props}
    />
  );
});
