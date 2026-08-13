import { forwardRef, type HTMLAttributes } from 'react';
import type { Orientation } from '@simurgh-ui/core';

export const Separator = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    orientation?: Orientation;
    decorative?: boolean;
  }
>(function Separator(
  { orientation = 'horizontal', decorative = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      {...props}
    />
  );
});
