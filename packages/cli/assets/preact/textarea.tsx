// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type TextareaHTMLAttributes } from 'preact/compat';

export const Textarea = /* @__PURE__ */ forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ invalid = false, ...props }, ref) {
  return <textarea ref={ref} aria-invalid={invalid || undefined} {...props} />;
});
