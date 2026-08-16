import { trapFocus } from '@simurgh-ui/core';
import { Dialog, useDialogContext } from '../internal/dialog-context.js';
import { useBrowser } from '../internal/open.js';
import {
  forwardRef,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';

export { Dialog };

export const DialogTrigger = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const context = useDialogContext();
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      data-slot="dialog-trigger"
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

export const DialogOverlay = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { open, setOpen } = useDialogContext();
  return open ? (
    <div
      {...props}
      ref={ref}
      data-slot="dialog-overlay"
      className={props.className ?? 'simurgh-overlay'}
      onMouseDown={(event) => {
        props.onMouseDown?.(event);
        if (event.target === event.currentTarget) setOpen(false);
      }}
    />
  ) : null;
});
export const DialogContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const { open, setOpen, titleId, descriptionId } = useDialogContext();
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
      data-slot="dialog-content"
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
  const { titleId } = useDialogContext();
  return <h2 {...props} id={titleId} data-slot="dialog-title" />;
}

export function DialogDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId } = useDialogContext();
  return <p {...props} id={descriptionId} data-slot="dialog-description" />;
}

export const DialogClose = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { setOpen } = useDialogContext();
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      data-slot="dialog-close"
      onClick={(event) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});
