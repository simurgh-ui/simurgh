// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type HTMLAttributes } from 'preact/compat';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export const Badge = /* @__PURE__ */ forwardRef<
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
