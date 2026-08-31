// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
} from 'preact/compat';

export const Pagination = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { label?: string }
>(function Pagination({ label = 'Pagination', ...props }, ref) {
  return <nav ref={ref} aria-label={label} data-slot="pagination" {...props} />;
});
export const PaginationContent = /* @__PURE__ */ forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(function PaginationContent(props, ref) {
  return <ul ref={ref} data-slot="pagination-content" {...props} />;
});
export const PaginationItem = /* @__PURE__ */ forwardRef<
  HTMLLIElement,
  LiHTMLAttributes<HTMLLIElement>
>(function PaginationItem(props, ref) {
  return <li ref={ref} data-slot="pagination-item" {...props} />;
});
export const PaginationLink = /* @__PURE__ */ forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean }
>(function PaginationLink({ current = false, ...props }, ref) {
  return (
    <a
      ref={ref}
      aria-current={current ? 'page' : undefined}
      data-slot="pagination-link"
      {...props}
    />
  );
});
