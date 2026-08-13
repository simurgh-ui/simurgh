import { forwardRef, type HTMLAttributes } from 'react';

export const AspectRatio = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { ratio?: number }
>(function AspectRatio({ ratio = 1, style, ...props }, ref) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  return (
    <div
      ref={ref}
      data-ratio={safeRatio}
      style={{ aspectRatio: String(safeRatio), ...style }}
      {...props}
    />
  );
});
