import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';

const visuallyHiddenStyle: CSSProperties = {
  position: 'absolute',
  inlineSize: 1,
  blockSize: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export const VisuallyHidden = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function VisuallyHidden({ style, ...props }, ref) {
  return (
    <span ref={ref} style={{ ...visuallyHiddenStyle, ...style }} {...props} />
  );
});
