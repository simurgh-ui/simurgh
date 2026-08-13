import type { Orientation } from '@simurgh-ui/core';
import { forwardRef, type HTMLAttributes } from 'react';

export const ButtonGroup = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { orientation?: Orientation }
>(function ButtonGroup(
  { orientation = 'horizontal', role = 'group', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      aria-orientation={orientation}
      data-slot="button-group"
      {...props}
    />
  );
});

export const ButtonGroupText = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function ButtonGroupText(props, ref) {
  return <span ref={ref} data-slot="button-group-text" {...props} />;
});

export const ButtonGroupSeparator = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { orientation?: Orientation }
>(function ButtonGroupSeparator(
  { orientation = 'vertical', role = 'separator', ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role={role}
      aria-orientation={orientation}
      data-slot="button-group-separator"
      {...props}
    />
  );
});
