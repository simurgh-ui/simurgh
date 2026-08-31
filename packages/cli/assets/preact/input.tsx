// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type InputHTMLAttributes } from 'preact/compat';

export const Input = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ invalid = false, ...props }, ref) {
  return (
    <input
      ref={ref}
      data-slot="input"
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});
