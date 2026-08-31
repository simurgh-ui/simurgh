// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'preact/compat';
import { createPortal } from 'preact/compat';
import { onCompositeKeyDown } from '../internal/floating.js';
import { type OpenProps, useBrowser, useOpen } from '../internal/open.js';

type ContextMenuContextValue = {
  open: boolean;
  setOpen(open: boolean): void;
  point: { x: number; y: number };
  openAt(x: number, y: number): void;
};
const ContextMenuContext =
  /* @__PURE__ */ createContext<ContextMenuContextValue | null>(null);
const useContextMenu = () => {
  const value = useContext(ContextMenuContext);
  if (!value) throw new Error('Context menu parts require a root');
  return value;
};
export function ContextMenu({
  children,
  ...props
}: PropsWithChildren<OpenProps>) {
  const [open, setOpen] = useOpen(props);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const openAt = (x: number, y: number) => {
    setPoint({ x, y });
    setOpen(true);
  };
  return (
    <ContextMenuContext.Provider value={{ open, setOpen, point, openAt }}>
      {children}
    </ContextMenuContext.Provider>
  );
}
export const ContextMenuTrigger = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ContextMenuTrigger({ onContextMenu, onKeyDown, ...props }, ref) {
  const menu = useContextMenu();
  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={menu.open}
      data-slot="context-menu-trigger"
      onContextMenu={(event) => {
        onContextMenu?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        menu.openAt(event.clientX, event.clientY);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          (event.key !== 'ContextMenu' &&
            !(event.shiftKey && event.key === 'F10'))
        )
          return;
        event.preventDefault();
        const rect = event.currentTarget.getBoundingClientRect();
        menu.openAt(rect.left, rect.bottom);
      }}
      {...props}
    />
  );
});
export function ContextMenuContent({
  className,
  style,
  onKeyDown,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const menu = useContextMenu();
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!menu.open) return;
    requestAnimationFrame(() =>
      contentRef.current
        ?.querySelector<HTMLElement>(
          '[role=menuitem]:not([aria-disabled=true])',
        )
        ?.focus(),
    );
    const dismiss = (event: PointerEvent) => {
      if (!contentRef.current?.contains(event.target as Node))
        menu.setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [menu.open, menu.setOpen]);
  if (!menu.open || !useBrowser()) return null;
  return createPortal(
    <div
      {...props}
      ref={contentRef}
      role="menu"
      data-slot="context-menu-content"
      className={className ?? 'simurgh-content'}
      style={{
        position: 'fixed',
        left: menu.point.x,
        top: menu.point.y,
        ...style,
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          menu.setOpen(false);
        } else onCompositeKeyDown(event, '[role=menuitem]');
      }}
    />,
    document.body,
  );
}
export const ContextMenuItem = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void }
>(function ContextMenuItem({ disabled, onSelect, onClick, ...props }, ref) {
  const menu = useContextMenu();
  return (
    <div
      {...props}
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? undefined : -1}
      aria-disabled={disabled || undefined}
      className={props.className ?? 'simurgh-item'}
      onClick={(event) => {
        onClick?.(event);
        if (!disabled) {
          onSelect?.();
          menu.setOpen(false);
        }
      }}
    />
  );
});
