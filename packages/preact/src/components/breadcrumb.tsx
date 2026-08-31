// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type HTMLAttributes } from 'preact/compat';

export const Breadcrumb = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { label?: string }
>(function Breadcrumb({ label = 'Breadcrumb', ...props }, ref) {
  return <nav ref={ref} aria-label={label} {...props} />;
});
