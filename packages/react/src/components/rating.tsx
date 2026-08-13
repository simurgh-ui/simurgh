import { forwardRef, useId, useState, type HTMLAttributes } from 'react';

export type RatingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> & {
  value?: number;
  defaultValue?: number;
  max?: number;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  onValueChange?: (value: number) => void;
  getLabel?: (value: number, max: number) => string;
};

export const Rating = /* @__PURE__ */ forwardRef<HTMLDivElement, RatingProps>(
  function Rating(
    {
      value,
      defaultValue = 0,
      max = 5,
      name,
      disabled,
      required,
      onValueChange,
      getLabel = (item, total) => `${item} of ${total}`,
      'aria-label': ariaLabel = 'Rating',
      ...props
    },
    ref,
  ) {
    const [localValue, setLocalValue] = useState(defaultValue);
    const count = Number.isFinite(max)
      ? Math.min(100, Math.max(1, Math.floor(max)))
      : 5;
    const current = Math.min(
      count,
      Math.max(0, Math.round(value ?? localValue)),
    );
    const generatedName = `simurgh-rating-${useId().replace(/:/g, '')}`;
    const groupName = name ?? generatedName;
    const commit = (next: number) => {
      if (value === undefined) setLocalValue(next);
      onValueChange?.(next);
    };
    return (
      <div
        {...props}
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        data-slot="rating"
        data-disabled={disabled || undefined}
      >
        {Array.from({ length: count }, (_, index) => {
          const item = index + 1;
          return (
            <label key={item} data-slot="rating-item">
              <input
                type="radio"
                data-slot="rating-control"
                name={groupName}
                value={item}
                checked={current === item}
                disabled={disabled}
                required={required}
                aria-label={getLabel(item, count)}
                onChange={() => commit(item)}
              />
              <span
                data-slot="rating-icon"
                data-selected={item <= current || undefined}
                aria-hidden="true"
              >
                {'\u2605'}
              </span>
            </label>
          );
        })}
      </div>
    );
  },
);
