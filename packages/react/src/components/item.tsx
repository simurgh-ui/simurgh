import { forwardRef, type HTMLAttributes } from 'react';

export const ItemGroup = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ItemGroup({ role = 'list', ...props }, ref) {
  return <div ref={ref} role={role} data-slot="item-group" {...props} />;
});

export const Item = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function Item({ role = 'listitem', ...props }, ref) {
  return <div ref={ref} role={role} data-slot="item" {...props} />;
});

export const ItemMedia = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { decorative?: boolean }
>(function ItemMedia({ decorative = true, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      data-slot="item-media"
      {...props}
    />
  );
});

export const ItemContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ItemContent(props, ref) {
  return <div ref={ref} data-slot="item-content" {...props} />;
});

export const ItemTitle = /* @__PURE__ */ forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function ItemTitle(props, ref) {
  return <h3 ref={ref} data-slot="item-title" {...props} />;
});

export const ItemDescription = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function ItemDescription(props, ref) {
  return <p ref={ref} data-slot="item-description" {...props} />;
});

export const ItemActions = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ItemActions(props, ref) {
  return <div ref={ref} data-slot="item-actions" {...props} />;
});
