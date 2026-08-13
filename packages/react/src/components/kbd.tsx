import { forwardRef, type HTMLAttributes } from 'react';

export const Kbd = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(function Kbd(props, ref) {
  return <kbd ref={ref} data-slot="kbd" {...props} />;
});
