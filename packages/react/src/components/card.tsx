import { forwardRef, type HTMLAttributes } from 'react';

export const Card = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function Card(props, ref) {
  return <div ref={ref} data-slot="card" {...props} />;
});

export const CardHeader = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardHeader(props, ref) {
  return <div ref={ref} data-slot="card-header" {...props} />;
});

export const CardTitle = /* @__PURE__ */ forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function CardTitle(props, ref) {
  return <h3 ref={ref} data-slot="card-title" {...props} />;
});

export const CardDescription = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription(props, ref) {
  return <p ref={ref} data-slot="card-description" {...props} />;
});

export const CardContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardContent(props, ref) {
  return <div ref={ref} data-slot="card-content" {...props} />;
});

export const CardFooter = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardFooter(props, ref) {
  return <div ref={ref} data-slot="card-footer" {...props} />;
});
