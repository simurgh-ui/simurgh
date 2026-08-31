// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type HTMLAttributes } from 'preact/compat';

export const Spinner = /* @__PURE__ */ forwardRef<
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
