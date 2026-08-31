// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type MeterHTMLAttributes } from 'preact/compat';

export const Meter = /* @__PURE__ */ forwardRef<
  HTMLMeterElement,
  MeterHTMLAttributes<HTMLMeterElement> & { label?: string }
>(function Meter(
  { label, min = 0, max = 100, value = 0, children, ...props },
  ref,
) {
  const safeValue = Math.min(Number(max), Math.max(Number(min), Number(value)));
  return (
    <meter
      ref={ref}
      min={min}
      max={max}
      value={safeValue}
      role="meter"
      aria-label={label}
      data-slot="meter"
      {...props}
    >
      {children ?? `${safeValue}`}
    </meter>
  );
});
