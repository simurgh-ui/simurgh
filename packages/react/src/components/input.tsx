import { forwardRef, type InputHTMLAttributes } from 'react';

export const Input = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ invalid = false, ...props }, ref) {
  return <input ref={ref} aria-invalid={invalid || undefined} {...props} />;
});
