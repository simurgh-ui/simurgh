// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  autoUpdateFloating,
  computeFloatingPosition,
  createFloatingInteractions,
  nextIndex,
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
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'preact/compat';
import { createPortal } from 'preact/compat';
import {
  useBrowser,
  useOpen,
  type OpenProps,
  type OverlayContextValue,
} from './open.js';

export type FloatingKind =
  'popover' | 'tooltip' | 'hovercard' | 'menu' | 'listbox';
type FloatingContextValue = OverlayContextValue & {
  kind: FloatingKind;
  refs: {
    reference: React.RefObject<HTMLElement | null>;
    floating: React.RefObject<HTMLElement | null>;
    setReference(node: HTMLElement | null): void;
    setFloating(node: HTMLElement | null): void;
  };
  floatingStyles: CSSProperties;
  getReferenceProps(props?: Record<string, unknown>): Record<string, unknown>;
  getFloatingProps(props?: Record<string, unknown>): Record<string, unknown>;
};
const FloatingContext =
  /* @__PURE__ */ createContext<FloatingContextValue | null>(null);

function invoke(
  props: Record<string, unknown>,
  name: string,
  event: React.SyntheticEvent,
) {
  const handler = props[name];
  if (typeof handler === 'function') handler(event);
}

export function FloatingRoot({
  children,
  kind,
  ...props
}: PropsWithChildren<OpenProps & { kind: FloatingKind }>) {
  const [open, setOpen] = useOpen(props);
  const uid = useId();
  const reference = useRef<HTMLElement | null>(null);
  const floating = useRef<HTMLElement | null>(null);
  const [floatingStyles, setFloatingStyles] = useState<CSSProperties>({
    position: 'fixed',
    left: 0,
    top: 0,
  });
  const interactions = createFloatingInteractions({
    kind,
    id: uid,
    getOpen: () => open,
    setOpen,
    getReference: () => reference.current,
    getFloating: () => floating.current,
  });
  useEffect(() => {
    if (!open || !reference.current || !floating.current) return;
    return autoUpdateFloating(reference.current, floating.current, () => {
      if (!reference.current || !floating.current) return;
      const result = computeFloatingPosition(
        reference.current,
        floating.current,
        {
          offset: kind === 'tooltip' ? 6 : 8,
        },
      );
      setFloatingStyles({ position: 'fixed', left: result.x, top: result.y });
    });
  }, [kind, open]);
  useEffect(() => {
    if (!open || typeof document === 'undefined') return;
    return interactions.listenForOutsidePress(document);
  }, [open, setOpen]);
  const getReferenceProps = (given: Record<string, unknown> = {}) => {
    const interactive = kind === 'tooltip' || kind === 'hovercard';
    return {
      ...given,
      ...interactions.referenceAttributes,
      onClick: interactive
        ? given.onClick
        : (event: React.MouseEvent) => {
            invoke(given, 'onClick', event);
            interactions.onReferenceClick(event);
          },
      onMouseEnter: interactive
        ? (event: React.MouseEvent) => {
            invoke(given, 'onMouseEnter', event);
            interactions.onReferenceMouseEnter?.(event);
          }
        : given.onMouseEnter,
      onMouseLeave: interactive
        ? (event: React.MouseEvent) => {
            invoke(given, 'onMouseLeave', event);
            interactions.onReferenceMouseLeave?.(event);
          }
        : given.onMouseLeave,
      onFocusCapture: interactive
        ? (event: React.FocusEvent) => {
            invoke(given, 'onFocus', event);
            interactions.onReferenceFocus?.(event);
          }
        : given.onFocus,
      onBlurCapture: interactive
        ? (event: React.FocusEvent) => {
            invoke(given, 'onBlur', event);
            interactions.onReferenceBlur?.(event);
          }
        : given.onBlur,
      onKeyDown: (event: React.KeyboardEvent) => {
        invoke(given, 'onKeyDown', event);
        interactions.onReferenceKeyDown(event);
      },
    };
  };
  const getFloatingProps = (given: Record<string, unknown> = {}) => ({
    ...given,
    'data-simurgh-floating-content':
      interactions.floatingAttributes['data-simurgh-floating-content'],
    id: given.id ?? interactions.floatingAttributes.id,
    role: given.role ?? interactions.floatingAttributes.role,
    onKeyDown: (event: React.KeyboardEvent) => {
      invoke(given, 'onKeyDown', event);
      interactions.onFloatingKeyDown(event);
    },
  });
  const refs = {
    reference,
    floating,
    setReference: (node: HTMLElement | null) => (reference.current = node),
    setFloating: (node: HTMLElement | null) => (floating.current = node),
  };
  const value = useMemo(
    () => ({
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      kind,
      open,
      setOpen,
      titleId: `${uid}-title`,
      descriptionId: `${uid}-description`,
    }),
    [floatingStyles, kind, open, uid],
  );
  return (
    <FloatingContext.Provider value={value}>
      {children}
    </FloatingContext.Provider>
  );
}
export const useFloatingRoot = () => {
  const c = useContext(FloatingContext);
  if (!c) throw new Error('Floating parts require a root');
  return c;
};
export const FloatingTrigger = /* @__PURE__ */ forwardRef<
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
export function FloatingContent({
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

export function onCompositeKeyDown(
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
