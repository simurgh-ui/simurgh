import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import {
  addCalendarMonths,
  calendarMonthDays,
  calendarToday,
  createId,
  moveCalendarDate,
  nextIndex,
  trapFocus,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type FormHTMLAttributes,
  type LabelHTMLAttributes,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

type OpenProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};
function useOpen(props: OpenProps) {
  const [local, setLocal] = useState(props.defaultOpen ?? false);
  const open = props.open ?? local;
  const setOpen = (next: boolean) => {
    if (props.open === undefined) setLocal(next);
    props.onOpenChange?.(next);
  };
  return [open, setOpen] as const;
}
const useBrowser = () => typeof document !== 'undefined';

type OverlayContextValue = {
  open: boolean;
  setOpen(value: boolean): void;
  titleId: string;
  descriptionId: string;
};
const DialogContext = createContext<OverlayContextValue | null>(null);
const useDialog = () => {
  const value = useContext(DialogContext);
  if (!value) throw new Error('Dialog parts must be inside Dialog');
  return value;
};

export function Dialog({ children, ...props }: PropsWithChildren<OpenProps>) {
  const [open, setOpen] = useOpen(props);
  const uid = useId();
  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        titleId: `${uid}-title`,
        descriptionId: `${uid}-description`,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
export const DialogTrigger = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const context = useDialog();
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      aria-haspopup="dialog"
      aria-expanded={context.open}
      onClick={(event) => {
        props.onClick?.(event);
        context.setOpen(true);
      }}
    />
  );
});
export function DialogPortal({ children }: PropsWithChildren) {
  return useBrowser() ? createPortal(children, document.body) : null;
}
export const DialogOverlay = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { open, setOpen } = useDialog();
  return open ? (
    <div
      {...props}
      ref={ref}
      className={props.className ?? 'simurgh-overlay'}
      onMouseDown={(event) => {
        props.onMouseDown?.(event);
        if (event.target === event.currentTarget) setOpen(false);
      }}
    />
  ) : null;
});
export const DialogContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const { open, setOpen, titleId, descriptionId } = useDialog();
  const localRef = useRef<HTMLDivElement>(null);
  const previous = useRef<Element | null>(null);
  useEffect(() => {
    if (!open) return;
    previous.current = document.activeElement;
    requestAnimationFrame(() => localRef.current?.focus());
    return () => {
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open]);
  if (!open) return null;
  return (
    <div
      {...props}
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      className={props.className ?? 'simurgh-content simurgh-dialog'}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (event.key === 'Escape') setOpen(false);
        trapFocus(event.nativeEvent, event.currentTarget);
      }}
    />
  );
});
export function DialogTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useDialog();
  return <h2 {...props} id={titleId} />;
}
export function DialogDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId } = useDialog();
  return <p {...props} id={descriptionId} />;
}
export const DialogClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { setOpen } = useDialog();
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
    />
  );
});

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';
export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;
export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;
export const SheetClose = DialogClose;
export const SheetContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { side?: SheetSide }
>(function SheetContent({ side = 'right', className, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent
        {...props}
        ref={ref}
        data-slot="sheet-content"
        data-side={side}
        className={className ?? 'simurgh-content simurgh-sheet'}
      />
    </DialogPortal>
  );
});

export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;
export const DrawerTitle = DialogTitle;
export const DrawerDescription = DialogDescription;
export const DrawerClose = DialogClose;
export const DrawerContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { side?: 'top' | 'bottom' }
>(function DrawerContent({ side = 'bottom', ...props }, ref) {
  return <SheetContent {...props} ref={ref} side={side} data-drawer="" />;
});

export const AlertDialog = Dialog;
export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function AlertDialogContent(props, forwardedRef) {
  const { open, setOpen, titleId, descriptionId } = useDialog();
  const localRef = useRef<HTMLDivElement>(null);
  const previous = useRef<Element | null>(null);
  useEffect(() => {
    if (!open) return;
    previous.current = document.activeElement;
    requestAnimationFrame(() =>
      localRef.current
        ?.querySelector<HTMLElement>('[data-slot=alert-dialog-cancel]')
        ?.focus(),
    );
    return () => {
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open]);
  if (!open) return null;
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        {...props}
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        data-slot="alert-dialog-content"
        className={props.className ?? 'simurgh-content simurgh-dialog'}
        onKeyDown={(event) => {
          props.onKeyDown?.(event);
          if (event.key === 'Escape') setOpen(false);
          trapFocus(event.nativeEvent, event.currentTarget);
        }}
      />
    </DialogPortal>
  );
});
function AlertDialogButton({
  slot,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { slot: string }) {
  const { setOpen } = useDialog();
  return (
    <button
      type="button"
      {...props}
      data-slot={slot}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
    />
  );
}
export function AlertDialogAction(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <AlertDialogButton {...props} slot="alert-dialog-action" />;
}
export function AlertDialogCancel(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <AlertDialogButton {...props} slot="alert-dialog-cancel" />;
}

type FloatingKind = 'popover' | 'tooltip' | 'hovercard' | 'menu' | 'listbox';
type FloatingContextValue = OverlayContextValue &
  ReturnType<typeof useFloating> & {
    kind: FloatingKind;
    getReferenceProps: (
      props?: Record<string, unknown>,
    ) => Record<string, unknown>;
    getFloatingProps: (
      props?: Record<string, unknown>,
    ) => Record<string, unknown>;
  };
const FloatingContext = createContext<FloatingContextValue | null>(null);
function FloatingRoot({
  children,
  kind,
  ...props
}: PropsWithChildren<OpenProps & { kind: FloatingKind }>) {
  const [open, setOpen] = useOpen(props);
  const uid = useId();
  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(kind === 'tooltip' ? 6 : 8),
      flip(),
      shift({ padding: 8 }),
    ],
  });
  const click = useClick(floating.context, {
    enabled: kind !== 'tooltip' && kind !== 'hovercard',
  });
  const hover = useHover(floating.context, {
    enabled: kind === 'tooltip' || kind === 'hovercard',
    move: false,
  });
  const focus = useFocus(floating.context, {
    enabled: kind === 'tooltip' || kind === 'hovercard',
  });
  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context, {
    role:
      kind === 'menu'
        ? 'menu'
        : kind === 'listbox'
          ? 'listbox'
          : kind === 'tooltip'
            ? 'tooltip'
            : 'dialog',
  });
  const interactions = useInteractions([click, hover, focus, dismiss, role]);
  const value = useMemo(
    () => ({
      ...floating,
      ...interactions,
      kind,
      open,
      setOpen,
      titleId: `${uid}-title`,
      descriptionId: `${uid}-description`,
    }),
    [floating, interactions, kind, open, uid],
  );
  return (
    <FloatingContext.Provider value={value}>
      {children}
    </FloatingContext.Provider>
  );
}
const useFloatingRoot = () => {
  const c = useContext(FloatingContext);
  if (!c) throw new Error('Floating parts require a root');
  return c;
};
const FloatingTrigger = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const c = useFloatingRoot();
  const interactionProps = c.getReferenceProps(
    props as unknown as Record<string, unknown>,
  );
  return (
    <button
      type="button"
      {...(interactionProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      ref={(node) => {
        c.refs.setReference(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      aria-expanded={c.open}
    />
  );
});
function FloatingContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const c = useFloatingRoot();
  useEffect(() => {
    if (!c.open || (c.kind !== 'menu' && c.kind !== 'listbox')) return;
    requestAnimationFrame(() =>
      c.refs.floating.current
        ?.querySelector<HTMLElement>(
          c.kind === 'menu'
            ? '[role=menuitem]:not([aria-disabled=true])'
            : '[role=option]:not([aria-disabled=true])',
        )
        ?.focus(),
    );
  }, [c.kind, c.open, c.refs.floating]);
  if (!c.open || !useBrowser()) return null;
  return createPortal(
    <div
      {...(c.getFloatingProps(
        props as Record<string, unknown>,
      ) as HTMLAttributes<HTMLDivElement>)}
      ref={c.refs.setFloating}
      style={{ ...c.floatingStyles, ...props.style }}
      className={className ?? 'simurgh-content'}
    >
      {children}
    </div>,
    document.body,
  );
}

function onCompositeKeyDown(
  event: React.KeyboardEvent<HTMLDivElement>,
  selector: string,
) {
  const items = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(selector),
  ).filter((item) => item.getAttribute('aria-disabled') !== 'true');
  const current = items.indexOf(document.activeElement as HTMLElement);
  const target = nextIndex(current < 0 ? 0 : current, items.length, event.key, {
    orientation: 'vertical',
  });
  if (
    target !== current &&
    ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
  ) {
    event.preventDefault();
    items[target]?.focus();
  } else if ((event.key === 'Enter' || event.key === ' ') && current >= 0) {
    event.preventDefault();
    items[current]?.click();
  }
}

export function Popover(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="popover" />;
}
export const PopoverTrigger = FloatingTrigger;
export const PopoverContent = FloatingContent;
export function Tooltip(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="tooltip" />;
}
export const TooltipTrigger = FloatingTrigger;
export const TooltipContent = FloatingContent;
export function HoverCard(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="hovercard" />;
}
export const HoverCardTrigger = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function HoverCardTrigger(props, ref) {
  return (
    <FloatingTrigger {...props} ref={ref} data-slot="hover-card-trigger" />
  );
});
export function HoverCardContent({
  label = 'Additional information',
  ...props
}: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  return (
    <FloatingContent
      {...props}
      role="dialog"
      aria-label={label}
      data-slot="hover-card-content"
    />
  );
}
export function DropdownMenu(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="menu" />;
}
export const DropdownMenuTrigger = FloatingTrigger;
export function DropdownMenuContent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <FloatingContent
      {...props}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        onCompositeKeyDown(event, '[role=menuitem]');
      }}
    />
  );
}
export function DropdownMenuItem({
  disabled,
  onSelect,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  onSelect?: () => void;
}) {
  const c = useFloatingRoot();
  return (
    <div
      {...props}
      role="menuitem"
      tabIndex={disabled ? undefined : -1}
      aria-disabled={disabled || undefined}
      className={props.className ?? 'simurgh-item'}
      onClick={(e) => {
        props.onClick?.(e);
        if (!disabled) {
          onSelect?.();
          c.setOpen(false);
        }
      }}
    />
  );
}

type ContextMenuContextValue = {
  open: boolean;
  setOpen(open: boolean): void;
  point: { x: number; y: number };
  openAt(x: number, y: number): void;
};
const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);
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
export const ContextMenuTrigger = forwardRef<
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
export const ContextMenuItem = forwardRef<
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

type TabsContextValue = {
  value: string;
  setValue(value: string): void;
  id: string;
  orientation: Orientation;
  direction: Direction;
};
const TabsContext = createContext<TabsContextValue | null>(null);
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

type AccordionContextValue = {
  open: string[];
  toggle(value: string): void;
  multiple: boolean;
  id: string;
};
const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<string>('');
export function Accordion({
  children,
  type = 'single',
  defaultValue = [],
}: PropsWithChildren<{
  type?: 'single' | 'multiple';
  defaultValue?: string[];
}>) {
  const [open, setOpen] = useState(defaultValue);
  const multiple = type === 'multiple';
  const toggle = (value: string) =>
    setOpen((items) =>
      items.includes(value)
        ? items.filter((x) => x !== value)
        : multiple
          ? [...items, value]
          : [value],
    );
  return (
    <AccordionContext.Provider value={{ open, toggle, multiple, id: useId() }}>
      {children}
    </AccordionContext.Provider>
  );
}
export function AccordionItem({
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div {...props} />
    </AccordionItemContext.Provider>
  );
}
export function AccordionTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const c = useContext(AccordionContext)!;
  const value = useContext(AccordionItemContext);
  const open = c.open.includes(value);
  return (
    <h3>
      <button
        type="button"
        {...props}
        id={`${c.id}-trigger-${value}`}
        aria-expanded={open}
        aria-controls={`${c.id}-content-${value}`}
        onClick={(e) => {
          props.onClick?.(e);
          c.toggle(value);
        }}
      />
    </h3>
  );
}
export function AccordionContent(props: HTMLAttributes<HTMLDivElement>) {
  const c = useContext(AccordionContext)!;
  const value = useContext(AccordionItemContext);
  return c.open.includes(value) ? (
    <div
      {...props}
      role="region"
      id={`${c.id}-content-${value}`}
      aria-labelledby={`${c.id}-trigger-${value}`}
    />
  ) : null;
}
type CollapsibleContextValue = { open: boolean; toggle(): void; id: string };
const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);
export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}>) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const expanded = open ?? localOpen;
  const toggle = () => {
    const next = !expanded;
    if (open === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  };
  return (
    <CollapsibleContext.Provider
      value={{ open: expanded, toggle, id: useId() }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
}
export function CollapsibleTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const c = useContext(CollapsibleContext)!;
  return (
    <button
      type="button"
      {...props}
      aria-expanded={c.open}
      aria-controls={`${c.id}-content`}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented && !props.disabled) c.toggle();
      }}
    />
  );
}
export function CollapsibleContent(props: HTMLAttributes<HTMLDivElement>) {
  const c = useContext(CollapsibleContext)!;
  return (
    <div
      {...props}
      id={`${c.id}-content`}
      hidden={!c.open}
      data-state={c.open ? 'open' : 'closed'}
    />
  );
}

type CheckProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> & {
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};
function CheckControl({
  role,
  name,
  value = 'on',
  checked,
  defaultChecked,
  required,
  onCheckedChange,
  children,
  ...props
}: PropsWithChildren<CheckProps & { role: 'checkbox' | 'switch' }>) {
  const [local, setLocal] = useState(defaultChecked ?? false);
  const active = checked ?? local;
  const set = (next: boolean) => {
    if (checked === undefined) setLocal(next);
    onCheckedChange?.(next);
  };
  return (
    <>
      <button
        type="button"
        {...props}
        role={role}
        aria-checked={active}
        onClick={(e) => {
          props.onClick?.(e);
          if (!props.disabled) set(!active);
        }}
      >
        {children}
      </button>
      {name && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          type="checkbox"
          name={name}
          value={value}
          checked={active}
          required={required}
          disabled={props.disabled}
          onChange={() => undefined}
        />
      )}
    </>
  );
}
export const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(function Label(props, ref) {
  return <label ref={ref} {...props} />;
});

export const Separator = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    orientation?: Orientation;
    decorative?: boolean;
  }
>(function Separator(
  { orientation = 'horizontal', decorative = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      {...props}
    />
  );
});

export const Progress = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    value?: number | null;
    max?: number;
    getValueLabel?: (value: number, max: number) => string;
  }
>(function Progress(
  { value = null, max = 100, getValueLabel, children, ...props },
  ref,
) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue =
    value == null || !Number.isFinite(value)
      ? null
      : Math.min(safeMax, Math.max(0, value));
  const percentage = safeValue == null ? null : (safeValue / safeMax) * 100;
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue ?? undefined}
      aria-valuetext={
        safeValue == null ? undefined : getValueLabel?.(safeValue, safeMax)
      }
      data-state={safeValue == null ? 'indeterminate' : 'determinate'}
      data-value={safeValue ?? undefined}
      data-max={safeMax}
      {...props}
    >
      {children ?? (
        <span
          data-part="indicator"
          style={{
            inlineSize: percentage == null ? undefined : `${percentage}%`,
          }}
        />
      )}
    </div>
  );
});

export const Toggle = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  }
>(function Toggle(
  {
    pressed,
    defaultPressed = false,
    onPressedChange,
    disabled,
    type = 'button',
    onClick,
    ...props
  },
  ref,
) {
  const [localPressed, setLocalPressed] = useState(defaultPressed);
  const current = pressed ?? localPressed;
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={current}
      data-state={current ? 'on' : 'off'}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        const next = !current;
        if (pressed === undefined) setLocalPressed(next);
        onPressedChange?.(next);
      }}
      {...props}
    />
  );
});

type ToggleGroupContextValue = {
  values: string[];
  toggle(value: string): void;
};
const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);
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

const visuallyHiddenStyle: React.CSSProperties = {
  position: 'absolute',
  inlineSize: 1,
  blockSize: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function VisuallyHidden({ style, ...props }, ref) {
  return (
    <span ref={ref} style={{ ...visuallyHiddenStyle, ...style }} {...props} />
  );
});

export const Avatar = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & {
    src?: string;
    alt: string;
    fallback: ReactNode;
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  }
>(function Avatar({ src, alt, fallback, imageProps, ...props }, ref) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(false), [src]);
  return (
    <span ref={ref} data-state={loaded ? 'loaded' : 'fallback'} {...props}>
      {src ? (
        <img
          {...imageProps}
          src={src}
          alt={alt}
          hidden={!loaded}
          onLoad={(event) => {
            setLoaded(true);
            imageProps?.onLoad?.(event);
          }}
          onError={(event) => {
            setLoaded(false);
            imageProps?.onError?.(event);
          }}
        />
      ) : null}
      {!loaded ? <span data-part="fallback">{fallback}</span> : null}
    </span>
  );
});

export const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { urgent?: boolean }
>(function Alert({ urgent = false, ...props }, ref) {
  return (
    <div
      ref={ref}
      role={urgent ? 'alert' : 'status'}
      aria-live={urgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      data-urgent={urgent || undefined}
      {...props}
    />
  );
});

export const AspectRatio = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { ratio?: number }
>(function AspectRatio({ ratio = 1, style, ...props }, ref) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  return (
    <div
      ref={ref}
      data-ratio={safeRatio}
      style={{ aspectRatio: String(safeRatio), ...style }}
      {...props}
    />
  );
});

export const Skeleton = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { label?: string }
>(function Skeleton({ label, ...props }, ref) {
  return (
    <div
      ref={ref}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-busy={label ? 'true' : undefined}
      aria-hidden={label ? undefined : 'true'}
      data-state="loading"
      {...props}
    />
  );
});

export const Spinner = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { label?: string }
>(function Spinner({ label = 'Loading', children, ...props }, ref) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      aria-live="polite"
      aria-busy="true"
      data-state="loading"
      {...props}
    >
      <span aria-hidden="true" data-part="indicator">
        {children ?? '◌'}
      </span>
    </span>
  );
});

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
>(function Button(
  { type = 'button', loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-state={loading ? 'loading' : 'idle'}
      {...props}
    >
      {children}
    </button>
  );
});

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { orientation?: Orientation }
>(function ButtonGroup(
  { orientation = 'horizontal', role = 'group', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      aria-orientation={orientation}
      data-slot="button-group"
      {...props}
    />
  );
});

export const ButtonGroupText = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function ButtonGroupText(props, ref) {
  return <span ref={ref} data-slot="button-group-text" {...props} />;
});

export const ButtonGroupSeparator = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { orientation?: Orientation }
>(function ButtonGroupSeparator(
  { orientation = 'vertical', role = 'separator', ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role={role}
      aria-orientation={orientation}
      data-slot="button-group-separator"
      {...props}
    />
  );
});

export const Link = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
    external?: boolean;
  }
>(function Link(
  {
    disabled = false,
    external = false,
    href,
    onClick,
    rel,
    target,
    tabIndex,
    ...props
  },
  ref,
) {
  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      data-slot="link"
      data-external={external || undefined}
      rel={external ? (rel ?? 'noopener noreferrer') : rel}
      target={external ? (target ?? '_blank') : target}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
});

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ invalid = false, ...props }, ref) {
  return <input ref={ref} aria-invalid={invalid || undefined} {...props} />;
});

export const InputGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function InputGroup({ role = 'group', ...props }, ref) {
  return <div ref={ref} role={role} data-slot="input-group" {...props} />;
});

export const InputGroupAddon = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
    decorative?: boolean;
  }
>(function InputGroupAddon(
  { align = 'inline-start', decorative = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      data-align={align}
      data-slot="input-group-addon"
      {...props}
    />
  );
});

export const InputGroupText = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function InputGroupText(props, ref) {
  return <span ref={ref} data-slot="input-group-text" {...props} />;
});

export const InputOtp = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength'> & {
    length?: number;
    digitsOnly?: boolean;
    invalid?: boolean;
  }
>(function InputOtp(
  {
    length = 6,
    digitsOnly = true,
    invalid = false,
    autoComplete = 'one-time-code',
    inputMode,
    pattern,
    style,
    onInput,
    ...props
  },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      maxLength={length}
      autoComplete={autoComplete}
      inputMode={inputMode ?? (digitsOnly ? 'numeric' : 'text')}
      pattern={pattern ?? (digitsOnly ? '[0-9]*' : undefined)}
      aria-invalid={invalid || undefined}
      data-slot="input-otp"
      style={
        { '--simurgh-otp-length': length, ...style } as React.CSSProperties
      }
      onInput={(event) => {
        if (digitsOnly) {
          event.currentTarget.value = event.currentTarget.value
            .replace(/\D/g, '')
            .slice(0, length);
        }
        onInput?.(event);
      }}
      {...props}
    />
  );
});

export const NativeSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(function NativeSelect({ invalid = false, ...props }, ref) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      data-slot="native-select"
      {...props}
    />
  );
});

export const Slider = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    invalid?: boolean;
  }
>(function Slider(
  { invalid = false, min = 0, max = 100, step = 1, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      aria-invalid={invalid || undefined}
      data-slot="slider"
      {...props}
    />
  );
});

export const Meter = forwardRef<
  HTMLMeterElement,
  React.MeterHTMLAttributes<HTMLMeterElement> & { label?: string }
>(function Meter(
  { label, min = 0, max = 100, value = 0, children, ...props },
  ref,
) {
  const safeValue = Math.min(Number(max), Math.max(Number(min), Number(value)));
  return (
    <meter
      ref={ref}
      min={min}
      max={max}
      value={safeValue}
      role="meter"
      aria-label={label}
      data-slot="meter"
      {...props}
    >
      {children ?? `${safeValue}`}
    </meter>
  );
});

export const Toolbar = forwardRef<
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
export const ToolbarButton = forwardRef<
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

export const ScrollArea = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    orientation?: 'vertical' | 'horizontal' | 'both';
    label?: string;
  }
>(function ScrollArea(
  { orientation = 'vertical', label, tabIndex = 0, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={label ? 'region' : undefined}
      aria-label={label}
      tabIndex={tabIndex}
      data-orientation={orientation}
      data-slot="scroll-area"
      {...props}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ invalid = false, ...props }, ref) {
  return <textarea ref={ref} aria-invalid={invalid || undefined} {...props} />;
});

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export const Badge = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean }
>(function Badge({ tone = 'neutral', status = false, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-tone={tone}
      role={status ? 'status' : undefined}
      aria-live={status ? 'polite' : undefined}
      {...props}
    />
  );
});

export const Breadcrumb = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { label?: string }
>(function Breadcrumb({ label = 'Breadcrumb', ...props }, ref) {
  return <nav ref={ref} aria-label={label} {...props} />;
});

export const NavigationMenu = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { label?: string }
>(function NavigationMenu({ label = 'Main navigation', ...props }, ref) {
  return (
    <nav ref={ref} aria-label={label} data-slot="navigation-menu" {...props} />
  );
});
export const NavigationMenuList = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function NavigationMenuList(props, ref) {
  return <ul ref={ref} data-slot="navigation-menu-list" {...props} />;
});
export const NavigationMenuItem = forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function NavigationMenuItem(props, ref) {
  return <li ref={ref} data-slot="navigation-menu-item" {...props} />;
});
export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean }
>(function NavigationMenuLink({ current = false, ...props }, ref) {
  return (
    <a
      ref={ref}
      {...props}
      aria-current={current ? 'page' : props['aria-current']}
      data-slot="navigation-menu-link"
    />
  );
});

export const Menubar = forwardRef<
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
export const MenubarItem = forwardRef<
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

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Card(props, ref) {
    return <div ref={ref} data-slot="card" {...props} />;
  },
);
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardHeader(props, ref) {
  return <div ref={ref} data-slot="card-header" {...props} />;
});
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function CardTitle(props, ref) {
  return <h3 ref={ref} data-slot="card-title" {...props} />;
});
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription(props, ref) {
  return <p ref={ref} data-slot="card-description" {...props} />;
});
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardContent(props, ref) {
  return <div ref={ref} data-slot="card-content" {...props} />;
});
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardFooter(props, ref) {
  return <div ref={ref} data-slot="card-footer" {...props} />;
});

export const Empty = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { status?: boolean }
>(function Empty({ status = false, role, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      role={status ? 'status' : role}
      aria-live={status ? 'polite' : props['aria-live']}
      data-slot="empty"
    />
  );
});
export const EmptyHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function EmptyHeader(props, ref) {
  return <div ref={ref} data-slot="empty-header" {...props} />;
});
export const EmptyMedia = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { decorative?: boolean }
>(function EmptyMedia({ decorative = true, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      data-slot="empty-media"
      {...props}
    />
  );
});
export const EmptyTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function EmptyTitle(props, ref) {
  return <h3 ref={ref} data-slot="empty-title" {...props} />;
});
export const EmptyDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function EmptyDescription(props, ref) {
  return <p ref={ref} data-slot="empty-description" {...props} />;
});
export const EmptyContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function EmptyContent(props, ref) {
  return <div ref={ref} data-slot="empty-content" {...props} />;
});

export const ItemGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ItemGroup({ role = 'list', ...props }, ref) {
  return <div ref={ref} role={role} data-slot="item-group" {...props} />;
});
export const Item = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Item({ role = 'listitem', ...props }, ref) {
    return <div ref={ref} role={role} data-slot="item" {...props} />;
  },
);
export const ItemMedia = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { decorative?: boolean }
>(function ItemMedia({ decorative = true, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      data-slot="item-media"
      {...props}
    />
  );
});
export const ItemContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ItemContent(props, ref) {
  return <div ref={ref} data-slot="item-content" {...props} />;
});
export const ItemTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function ItemTitle(props, ref) {
  return <h3 ref={ref} data-slot="item-title" {...props} />;
});
export const ItemDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function ItemDescription(props, ref) {
  return <p ref={ref} data-slot="item-description" {...props} />;
});
export const ItemActions = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ItemActions(props, ref) {
  return <div ref={ref} data-slot="item-actions" {...props} />;
});

export const Kbd = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Kbd(props, ref) {
    return <kbd ref={ref} data-slot="kbd" {...props} />;
  },
);

export const Field = forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(function Field(props, ref) {
  return <fieldset ref={ref} data-slot="field" {...props} />;
});
export const FieldLegend = forwardRef<
  HTMLLegendElement,
  HTMLAttributes<HTMLLegendElement>
>(function FieldLegend(props, ref) {
  return <legend ref={ref} data-slot="field-legend" {...props} />;
});
export const FieldDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function FieldDescription(props, ref) {
  return <p ref={ref} data-slot="field-description" {...props} />;
});
export const FieldError = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function FieldError(props, ref) {
  return <p ref={ref} data-slot="field-error" role="alert" {...props} />;
});

export const Form = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean }
>(function Form({ focusInvalid = true, onInvalid, ...props }, ref) {
  const focusQueued = useRef(false);
  return (
    <form
      {...props}
      ref={ref}
      data-slot="form"
      onInvalid={(event) => {
        onInvalid?.(event);
        if (focusQueued.current || !focusInvalid || event.defaultPrevented)
          return;
        focusQueued.current = true;
        const first = event.target as HTMLElement;
        requestAnimationFrame(() => {
          first.focus();
          focusQueued.current = false;
        });
      }}
    />
  );
});
export const FormErrorSummary = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function FormErrorSummary(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      data-slot="form-error-summary"
    />
  );
});

export const Table = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(function Table(props, ref) {
  return <table ref={ref} data-slot="table" {...props} />;
});
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader(props, ref) {
  return <thead ref={ref} data-slot="table-header" {...props} />;
});
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody(props, ref) {
  return <tbody ref={ref} data-slot="table-body" {...props} />;
});
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter(props, ref) {
  return <tfoot ref={ref} data-slot="table-footer" {...props} />;
});
export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TableRow(props, ref) {
  return <tr ref={ref} data-slot="table-row" {...props} />;
});
export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(function TableHead({ scope = 'col', ...props }, ref) {
  return <th ref={ref} scope={scope} data-slot="table-head" {...props} />;
});
export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(function TableCell(props, ref) {
  return <td ref={ref} data-slot="table-cell" {...props} />;
});
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption(props, ref) {
  return <caption ref={ref} data-slot="table-caption" {...props} />;
});

export const Pagination = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { label?: string }
>(function Pagination({ label = 'Pagination', ...props }, ref) {
  return <nav ref={ref} aria-label={label} data-slot="pagination" {...props} />;
});
export const PaginationContent = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function PaginationContent(props, ref) {
  return <ul ref={ref} data-slot="pagination-content" {...props} />;
});
export const PaginationItem = forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function PaginationItem(props, ref) {
  return <li ref={ref} data-slot="pagination-item" {...props} />;
});
export const PaginationLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean }
>(function PaginationLink({ current = false, ...props }, ref) {
  return (
    <a
      ref={ref}
      aria-current={current ? 'page' : undefined}
      data-slot="pagination-link"
      {...props}
    />
  );
});

export function Checkbox(props: CheckProps) {
  return <CheckControl {...props} role="checkbox" />;
}
export function Switch(props: CheckProps) {
  return <CheckControl {...props} role="switch" />;
}

type RadioContextValue = {
  value: string;
  setValue(value: string): void;
  name: string | undefined;
  required: boolean;
  disabled: boolean;
  direction: Direction;
};
const RadioContext = createContext<RadioContextValue | null>(null);
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
        id={listId}
        onKeyDown={(event) => onCompositeKeyDown(event, '[role=option]')}
      >
        {options.map((option) => (
          <div
            key={option.value}
            role="option"
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
          } else if (event.key === 'Enter' && active >= 0) {
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

export function Command(props: ComboboxProps) {
  return (
    <div data-slot="command">
      <Combobox {...props} />
    </div>
  );
}

export type CalendarProps = {
  value?: string;
  defaultValue?: string;
  month?: string;
  defaultMonth?: string;
  locale?: string;
  direction?: Direction;
  firstDayOfWeek?: number;
  min?: string;
  max?: string;
  disabledDates?: string[];
  name?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  onMonthChange?: (month: string) => void;
};

export function Calendar({
  value,
  defaultValue = '',
  month,
  defaultMonth,
  locale = 'en',
  direction = 'ltr',
  firstDayOfWeek = 0,
  min,
  max,
  disabledDates = [],
  name,
  label = 'Calendar',
  onValueChange,
  onMonthChange,
}: CalendarProps) {
  const today = useMemo(calendarToday, []);
  const [localValue, setLocalValue] = useState(defaultValue);
  const selected = value ?? localValue;
  const [localMonth, setLocalMonth] = useState(
    defaultMonth ?? (defaultValue || today).slice(0, 7),
  );
  const displayedMonth = month ?? localMonth;
  const days = calendarMonthDays(displayedMonth, firstDayOfWeek);
  const root = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const disabled = new Set(disabledDates);
  const isDisabled = (date: string) =>
    (min !== undefined && date < min) ||
    (max !== undefined && date > max) ||
    disabled.has(date);
  const anchor =
    selected.slice(0, 7) === displayedMonth ? selected : `${displayedMonth}-01`;
  const dateFor = (date: string) => new Date(`${date}T00:00:00Z`);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dateFor(`${displayedMonth}-01`));
  const dayLabel = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeZone: 'UTC',
  });
  const weekdayLabel = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    timeZone: 'UTC',
  });
  const setMonth = (next: string) => {
    if (month === undefined) setLocalMonth(next);
    onMonthChange?.(next);
  };
  const choose = (date: string) => {
    if (isDisabled(date)) return;
    if (value === undefined) setLocalValue(date);
    if (date.slice(0, 7) !== displayedMonth) setMonth(date.slice(0, 7));
    onValueChange?.(date);
  };
  const focusDate = (date: string) => {
    if (date.slice(0, 7) !== displayedMonth) setMonth(date.slice(0, 7));
    requestAnimationFrame(() =>
      root.current
        ?.querySelector<HTMLElement>(`[data-date="${date}"]`)
        ?.focus(),
    );
  };
  return (
    <div
      ref={root}
      data-slot="calendar"
      dir={direction}
      role="group"
      aria-label={label}
    >
      <div data-slot="calendar-header">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() =>
            setMonth(addCalendarMonths(`${displayedMonth}-01`, -1).slice(0, 7))
          }
        >
          ‹
        </button>
        <h2 id={titleId} aria-live="polite">
          {monthLabel}
        </h2>
        <button
          type="button"
          aria-label="Next month"
          onClick={() =>
            setMonth(addCalendarMonths(`${displayedMonth}-01`, 1).slice(0, 7))
          }
        >
          ›
        </button>
      </div>
      <table role="grid" aria-labelledby={titleId}>
        <thead>
          <tr>
            {Array.from({ length: 7 }, (_, index) => {
              const date = new Date(
                Date.UTC(2023, 0, 1 + ((firstDayOfWeek + index) % 7)),
              );
              return (
                <th key={index} scope="col">
                  {weekdayLabel.format(date)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, week) => (
            <tr key={week}>
              {days.slice(week * 7, week * 7 + 7).map((day) => (
                <td
                  key={day.value}
                  role="gridcell"
                  aria-selected={selected === day.value}
                >
                  <button
                    type="button"
                    data-slot="calendar-day"
                    data-date={day.value}
                    data-outside={day.outside || undefined}
                    data-state={selected === day.value ? 'selected' : undefined}
                    aria-current={today === day.value ? 'date' : undefined}
                    aria-label={dayLabel.format(dateFor(day.value))}
                    aria-disabled={isDisabled(day.value) || undefined}
                    tabIndex={day.value === anchor ? 0 : -1}
                    onClick={() => choose(day.value)}
                    onKeyDown={(event) => {
                      if (
                        ![
                          'ArrowLeft',
                          'ArrowRight',
                          'ArrowUp',
                          'ArrowDown',
                          'Home',
                          'End',
                          'PageUp',
                          'PageDown',
                        ].includes(event.key)
                      )
                        return;
                      event.preventDefault();
                      focusDate(
                        moveCalendarDate(day.value, event.key, {
                          direction,
                          firstDayOfWeek,
                        }),
                      );
                    }}
                  >
                    {day.day}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {name && <input type="hidden" name={name} value={selected} />}
    </div>
  );
}

export type DatePickerProps = CalendarProps & {
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export function DatePicker({
  value,
  defaultValue = '',
  name,
  locale = 'en',
  label = 'Date picker calendar',
  placeholder = 'Pick a date',
  required = false,
  disabled = false,
  onValueChange,
  ...calendarProps
}: DatePickerProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const selected = value ?? localValue;
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const displayValue = selected
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeZone: 'UTC',
      }).format(new Date(`${selected}T00:00:00Z`))
    : placeholder;
  const choose = (date: string) => {
    if (value === undefined) setLocalValue(date);
    onValueChange?.(date);
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  return (
    <div data-slot="date-picker">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={trigger}
          data-slot="date-picker-trigger"
          disabled={disabled}
        >
          {displayValue}
        </PopoverTrigger>
        <PopoverContent data-slot="date-picker-content" aria-label={label}>
          <Calendar
            {...calendarProps}
            value={selected}
            locale={locale}
            label={label}
            onValueChange={choose}
          />
        </PopoverContent>
      </Popover>
      {name && (
        <input type="hidden" name={name} value={selected} disabled={disabled} />
      )}
      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          required
          disabled={disabled}
          value={selected}
          onChange={() => undefined}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
      )}
    </div>
  );
}

type CarouselContextValue = {
  index: number;
  count: number;
  loop: boolean;
  direction: Direction;
  setCount(count: number): void;
  goTo(index: number): void;
};
const CarouselContext = createContext<CarouselContextValue | null>(null);
const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('Carousel parts require a Carousel root');
  return context;
};

export function Carousel({
  label = 'Carousel',
  direction = 'ltr',
  loop = false,
  defaultIndex = 0,
  onIndexChange,
  onKeyDown,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  label?: string;
  direction?: Direction;
  loop?: boolean;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(Math.max(0, defaultIndex));
  const [count, setCount] = useState(0);
  const goTo = (next: number) => {
    if (!count) return;
    const resolved = loop
      ? (next + count) % count
      : Math.max(0, Math.min(count - 1, next));
    if (resolved !== index) {
      setIndex(resolved);
      onIndexChange?.(resolved);
    }
  };
  return (
    <CarouselContext.Provider
      value={{ index, count, loop, direction, setCount, goTo }}
    >
      <div
        {...props}
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        dir={direction}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const previous = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
          const next = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
          if (event.key === previous || event.key === next) {
            event.preventDefault();
            goTo(index + (event.key === next ? 1 : -1));
          }
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const context = useCarousel();
  const slides = React.Children.toArray(children);
  useEffect(() => context.setCount(slides.length), [context, slides.length]);
  return (
    <div {...props} data-slot="carousel-content" aria-live="polite">
      {slides.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<HTMLAttributes<HTMLDivElement>>,
              {
                'aria-label': `${index + 1} of ${slides.length}`,
                'aria-hidden': context.index !== index,
                hidden: context.index !== index,
              },
            )
          : child,
      )}
    </div>
  );
}

export const CarouselItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CarouselItem(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
    />
  );
});

function CarouselControl({
  step,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { step: -1 | 1; label: string }) {
  const context = useCarousel();
  const unavailable =
    !context.loop &&
    (step < 0 ? context.index <= 0 : context.index >= context.count - 1);
  return (
    <button
      type="button"
      {...props}
      data-slot={step < 0 ? 'carousel-previous' : 'carousel-next'}
      aria-label={label}
      disabled={unavailable || props.disabled}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) context.goTo(context.index + step);
      }}
    />
  );
}
export function CarouselPrevious(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <CarouselControl {...props} step={-1} label="Previous slide" />;
}
export function CarouselNext(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <CarouselControl {...props} step={1} label="Next slide" />;
}

type ResizableContextValue = {
  orientation: Orientation;
  direction: Direction;
  sizes: number[];
  minimums: number[];
  maximums: number[];
  root: React.RefObject<HTMLDivElement | null>;
  adjust(boundary: number, delta: number): void;
};
const ResizableContext = createContext<ResizableContextValue | null>(null);
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

type SidebarContextValue = {
  open: boolean;
  setOpen(open: boolean): void;
  contentId: string;
};
const SidebarContext = createContext<SidebarContextValue | null>(null);
function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('Sidebar components require SidebarProvider');
  return context;
}

export function SidebarProvider({
  open: controlledOpen,
  defaultOpen = true,
  onOpenChange,
  children,
}: PropsWithChildren<OpenProps>) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? localOpen;
  const contentId = `simurgh-sidebar-${useId().replace(/:/g, '')}`;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  };
  return (
    <SidebarContext.Provider value={{ open, setOpen, contentId }}>
      <div data-slot="sidebar-provider" data-state={open ? 'open' : 'closed'}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = 'start',
  ...props
}: HTMLAttributes<HTMLElement> & { side?: 'start' | 'end' }) {
  const context = useSidebarContext();
  return (
    <aside
      {...props}
      id={context.contentId}
      data-slot="sidebar"
      data-side={side}
      data-state={context.open ? 'open' : 'closed'}
      hidden={!context.open}
    />
  );
}

export function SidebarTrigger({
  onClick,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useSidebarContext();
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      data-slot="sidebar-trigger"
      aria-controls={context.contentId}
      aria-expanded={context.open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setOpen(!context.open);
      }}
    >
      {children ?? (context.open ? 'Close navigation' : 'Open navigation')}
    </button>
  );
}

function sidebarPart(slot: string) {
  return function SidebarPart(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} data-slot={slot} />;
  };
}
export const SidebarHeader = sidebarPart('sidebar-header');
export const SidebarContent = sidebarPart('sidebar-content');
export const SidebarFooter = sidebarPart('sidebar-footer');
export const SidebarGroup = sidebarPart('sidebar-group');
export function SidebarMenu(props: HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} data-slot="sidebar-menu" />;
}

export function Tree({
  onKeyDown,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  const rootRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const items =
      rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="treeitem"]');
    items?.forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
  }, []);
  const focusItem = (
    items: HTMLButtonElement[],
    current: number,
    target: number,
  ) => {
    if (target < 0 || target === current) return;
    items[current]?.setAttribute('tabindex', '-1');
    if (items[target]) {
      items[target].tabIndex = 0;
      items[target].focus();
    }
  };
  const moveFocus = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const root = event.currentTarget;
    const items = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[role="treeitem"]'),
    ).filter(
      (item) => !item.disabled && !item.closest('[role="group"][hidden]'),
    );
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    let target = current;
    if (event.key === 'ArrowDown')
      target = Math.min(current + 1, items.length - 1);
    else if (event.key === 'ArrowUp') target = Math.max(current - 1, 0);
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = items.length - 1;
    else if (event.key === 'ArrowRight' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'false') item.click();
      else {
        const child = item
          .closest('li')
          ?.querySelector<HTMLButtonElement>(
            '[role="group"] [role="treeitem"]',
          );
        if (child) focusItem(items, current, items.indexOf(child));
      }
      event.preventDefault();
      return;
    } else if (event.key === 'ArrowLeft' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'true') item.click();
      else {
        const parent = item.parentElement?.parentElement
          ?.closest('li')
          ?.querySelector<HTMLButtonElement>(':scope > [role="treeitem"]');
        if (parent) focusItem(items, current, items.indexOf(parent));
      }
      event.preventDefault();
      return;
    } else return;
    if (target !== current && target >= 0) {
      event.preventDefault();
      focusItem(items, current, target);
    }
  };
  return (
    <ul
      {...props}
      ref={rootRef}
      role="tree"
      data-slot="tree"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) moveFocus(event);
      }}
    />
  );
}

type TreeItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & {
  label: ReactNode;
  children?: ReactNode;
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};
export function TreeItem({
  label,
  children,
  expandable = children !== undefined,
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onExpandedChange,
  ...props
}: TreeItemProps) {
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? localExpanded;
  const groupId = `simurgh-tree-group-${useId().replace(/:/g, '')}`;
  const setExpanded = (next: boolean) => {
    if (controlledExpanded === undefined) setLocalExpanded(next);
    onExpandedChange?.(next);
  };
  return (
    <li {...props} role="none" data-slot="tree-node">
      <button
        type="button"
        role="treeitem"
        data-slot="tree-item"
        aria-expanded={expandable ? expanded : undefined}
        aria-controls={expandable ? groupId : undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={-1}
        onClick={() => expandable && setExpanded(!expanded)}
      >
        {label}
      </button>
      {expandable && (
        <ul id={groupId} role="group" data-slot="tree-group" hidden={!expanded}>
          {children}
        </ul>
      )}
    </li>
  );
}

function acceptedFiles(files: File[], accept?: string) {
  if (!accept) return files;
  const rules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  return files.filter((file) => {
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) =>
      rule.startsWith('.')
        ? name.endsWith(rule)
        : rule.endsWith('/*')
          ? type.startsWith(rule.slice(0, -1))
          : type === rule,
    );
  });
}
type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  label: ReactNode;
  description?: ReactNode;
  onFilesChange?: (files: File[]) => void;
};
export function FileUpload({
  label,
  description = 'Drop files here or browse',
  onFilesChange,
  accept,
  disabled,
  multiple,
  ...props
}: FileUploadProps) {
  const id = props.id ?? `simurgh-file-${useId().replace(/:/g, '')}`;
  const [names, setNames] = useState<string[]>([]);
  const update = (files: File[]) => {
    if (disabled) return;
    const accepted = acceptedFiles(files, accept);
    const next = multiple ? accepted : accepted.slice(0, 1);
    setNames(next.map((file) => file.name));
    onFilesChange?.(next);
  };
  return (
    <label
      htmlFor={id}
      data-slot="file-upload"
      data-disabled={disabled || undefined}
      onDragOver={(event) => {
        if (!disabled) event.preventDefault();
      }}
      onDrop={(event) => {
        if (disabled) return;
        event.preventDefault();
        update(Array.from(event.dataTransfer.files));
      }}
    >
      <input
        {...props}
        id={id}
        type="file"
        data-slot="file-upload-input"
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        onChange={(event) =>
          update(Array.from(event.currentTarget.files ?? []))
        }
      />
      <strong data-slot="file-upload-label">{label}</strong>
      {description && (
        <span data-slot="file-upload-description">{description}</span>
      )}
      <span data-slot="file-upload-status" aria-live="polite">
        {names.length ? names.join(', ') : 'No files selected'}
      </span>
    </label>
  );
}

export type ToastMessage = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
};
type ToastContextValue = {
  toasts: ToastMessage[];
  toast(message: Omit<ToastMessage, 'id'>): string;
  dismiss(id: string): void;
};
const ToastContext = createContext<ToastContextValue | null>(null);
export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const dismiss = (id: string) =>
    setToasts((items) => items.filter((item) => item.id !== id));
  const toast = (message: Omit<ToastMessage, 'id'>) => {
    const id = createId('toast');
    setToasts((items) => [...items, { ...message, id }]);
    if (message.duration !== 0)
      setTimeout(() => dismiss(id), message.duration ?? 5000);
    return id;
  };
  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}
export function useToast() {
  const c = useContext(ToastContext);
  if (!c) throw new Error('useToast requires ToastProvider');
  return c;
}
export function ToastViewport(props: HTMLAttributes<HTMLDivElement>) {
  const { toasts, dismiss } = useToast();
  return (
    <div
      {...props}
      className={props.className ?? 'simurgh-toast-region'}
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="simurgh-content simurgh-toast"
        >
          <strong>{toast.title}</strong>
          {toast.description && <div>{toast.description}</div>}
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
