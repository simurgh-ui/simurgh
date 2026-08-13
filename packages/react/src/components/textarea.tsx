import { forwardRef, type TextareaHTMLAttributes } from 'react';

export const Textarea = /* @__PURE__ */ forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ invalid = false, ...props }, ref) {
  return <textarea ref={ref} aria-invalid={invalid || undefined} {...props} />;
});
