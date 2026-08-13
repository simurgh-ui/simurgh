import { forwardRef, type HTMLAttributes } from 'react';

export const ScrollArea = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    orientation?: 'vertical' | 'horizontal' | 'both';
    label?: string;
  }
>(function ScrollArea(
  { orientation = 'vertical', label, tabIndex = 0, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={label ? 'region' : undefined}
      aria-label={label}
      tabIndex={tabIndex}
      data-orientation={orientation}
      data-slot="scroll-area"
      {...props}
    />
  );
});
