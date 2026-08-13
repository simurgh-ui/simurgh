import { forwardRef, type HTMLAttributes } from 'react';

export const Empty = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { status?: boolean }
>(function Empty({ status = false, role, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      role={status ? 'status' : role}
      aria-live={status ? 'polite' : props['aria-live']}
      data-slot="empty"
    />
  );
});

export const EmptyHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function EmptyHeader(props, ref) {
  return <div ref={ref} data-slot="empty-header" {...props} />;
});

export const EmptyMedia = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { decorative?: boolean }
>(function EmptyMedia({ decorative = true, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      data-slot="empty-media"
      {...props}
    />
  );
});

export const EmptyTitle = /* @__PURE__ */ forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function EmptyTitle(props, ref) {
  return <h3 ref={ref} data-slot="empty-title" {...props} />;
});

export const EmptyDescription = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function EmptyDescription(props, ref) {
  return <p ref={ref} data-slot="empty-description" {...props} />;
});

export const EmptyContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function EmptyContent(props, ref) {
  return <div ref={ref} data-slot="empty-content" {...props} />;
});
