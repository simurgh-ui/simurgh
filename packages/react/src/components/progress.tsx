import { forwardRef, type HTMLAttributes } from 'react';

export const Progress = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    value?: number | null;
    max?: number;
    getValueLabel?: (value: number, max: number) => string;
  }
>(function Progress(
  { value = null, max = 100, getValueLabel, children, ...props },
  ref,
) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue =
    value == null || !Number.isFinite(value)
      ? null
      : Math.min(safeMax, Math.max(0, value));
  const percentage = safeValue == null ? null : (safeValue / safeMax) * 100;
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue ?? undefined}
      aria-valuetext={
        safeValue == null ? undefined : getValueLabel?.(safeValue, safeMax)
      }
      data-state={safeValue == null ? 'indeterminate' : 'determinate'}
      data-value={safeValue ?? undefined}
      data-max={safeMax}
      {...props}
    >
      {children ?? (
        <span
          data-part="indicator"
          style={{
            inlineSize: percentage == null ? undefined : `${percentage}%`,
          }}
        />
      )}
    </div>
  );
});
