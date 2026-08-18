import React, { forwardRef, type HTMLAttributes } from 'react';
import { type OpenProps, useOpen } from '../internal/open.js';

export const Disclosure = forwardRef<
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement> & OpenProps
>(function Disclosure(
  { open: controlled, defaultOpen, onOpenChange, onToggle, ...props },
  ref,
) {
  const stateOptions: OpenProps = {};
  if (controlled !== undefined) stateOptions.open = controlled;
  if (defaultOpen !== undefined) stateOptions.defaultOpen = defaultOpen;
  if (onOpenChange) stateOptions.onOpenChange = onOpenChange;
  const [open, setOpen] = useOpen(stateOptions);
  return (
    <details
      ref={ref}
      {...props}
      open={open}
      data-slot="disclosure"
      data-state={open ? 'open' : 'closed'}
      onToggle={(event) => {
        setOpen(event.currentTarget.open);
        onToggle?.(event);
      }}
    />
  );
});
export const DisclosureSummary = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(function DisclosureSummary(props, ref) {
  return <summary ref={ref} data-slot="disclosure-summary" {...props} />;
});
export const DisclosureContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DisclosureContent(props, ref) {
  return <div ref={ref} data-slot="disclosure-content" {...props} />;
});
