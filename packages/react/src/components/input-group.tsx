import { forwardRef, type HTMLAttributes } from 'react';

export const InputGroup = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function InputGroup({ role = 'group', ...props }, ref) {
  return <div ref={ref} role={role} data-slot="input-group" {...props} />;
});

export const InputGroupAddon = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
    decorative?: boolean;
  }
>(function InputGroupAddon(
  { align = 'inline-start', decorative = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      data-align={align}
      data-slot="input-group-addon"
      {...props}
    />
  );
});

export const InputGroupText = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function InputGroupText(props, ref) {
  return <span ref={ref} data-slot="input-group-text" {...props} />;
});
