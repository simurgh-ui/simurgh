import { forwardRef, type InputHTMLAttributes } from 'react';

export const Slider = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { invalid?: boolean }
>(function Slider(
  { invalid = false, min = 0, max = 100, step = 1, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      aria-invalid={invalid || undefined}
      data-slot="slider"
      {...props}
    />
  );
});
