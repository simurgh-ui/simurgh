// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { nextIndex, type Direction } from '@simurgh-ui/core';
import {
  forwardRef,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'preact/compat';

export const Menubar = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction }
>(function Menubar(
  { label = 'Application menu', direction = 'ltr', onKeyDown, ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const items = localRef.current?.querySelectorAll<HTMLElement>(
      '[role=menuitem]:not([aria-disabled=true])',
    );
    if (items?.length && !Array.from(items).some((item) => item.tabIndex === 0))
      items[0]!.tabIndex = 0;
  }, []);
  return (
    <div
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      role="menubar"
      aria-label={label}
      dir={direction}
      data-slot="menubar"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const items = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          ),
        );
        const current = items.indexOf(document.activeElement as HTMLElement);
        const target = nextIndex(current, items.length, event.key, {
          orientation: 'horizontal',
          direction,
        });
        if (target !== current) {
          event.preventDefault();
          items.forEach(
            (item, index) => (item.tabIndex = index === target ? 0 : -1),
          );
          items[target]?.focus();
        }
      }}
      {...props}
    />
  );
});

export const MenubarItem = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function MenubarItem({ disabled, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      data-slot="menubar-item"
      {...props}
    />
  );
});
