import { forwardRef, type HTMLAttributes } from 'react';

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
