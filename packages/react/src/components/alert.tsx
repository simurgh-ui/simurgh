import { forwardRef, type HTMLAttributes } from 'react';

export const Alert = /* @__PURE__ */ forwardRef<
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
