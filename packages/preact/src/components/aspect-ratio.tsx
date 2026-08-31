// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type HTMLAttributes } from 'preact/compat';

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
