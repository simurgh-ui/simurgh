import { forwardRef, type HTMLAttributes } from 'react';

export const Breadcrumb = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { label?: string }
>(function Breadcrumb({ label = 'Breadcrumb', ...props }, ref) {
  return <nav ref={ref} aria-label={label} {...props} />;
});
