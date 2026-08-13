import { forwardRef, type LabelHTMLAttributes } from 'react';

export const Label = /* @__PURE__ */ forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(function Label(props, ref) {
  return <label ref={ref} {...props} />;
});
