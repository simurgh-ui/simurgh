import { forwardRef, type HTMLAttributes } from 'react';

export const Skeleton = /* @__PURE__ */ forwardRef<
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
