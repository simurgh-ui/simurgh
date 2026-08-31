// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { trapFocus } from '@simurgh-ui/core';
import { useDialogContext } from '../internal/dialog-context.js';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './dialog.js';
import {
  forwardRef,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'preact/compat';

export const AlertDialog = Dialog;
export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function AlertDialogContent(props, forwardedRef) {
  const { open, setOpen, titleId, descriptionId } = useDialogContext();
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
  const { setOpen } = useDialogContext();
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
