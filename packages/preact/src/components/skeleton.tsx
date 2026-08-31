// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type HTMLAttributes } from 'preact/compat';

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
