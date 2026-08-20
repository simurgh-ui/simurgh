import { forwardRef, type InputHTMLAttributes } from 'react';
import { useControlledState } from '../internal/controlled-state.js';
import { useComponentId } from '../internal/ids.js';

type NumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'
> & {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  incrementLabel?: string;
  decrementLabel?: string;
  onValueChange?: (value: number) => void;
};
export const NumberInput = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  NumberInputProps
>(function NumberInput(
  {
    value,
    defaultValue = 0,
    min,
    max,
    step = 1,
    disabled,
    readOnly,
    incrementLabel = 'Increase value',
    decrementLabel = 'Decrease value',
    onValueChange,
    onChange,
    ...props
  },
  ref,
) {
  const [current, setValue] = useControlledState<number>({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const inputId = useComponentId('number', props.id);
  const normalize = (next: number) =>
    Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));
  const commit = (next: number) => {
    const normalized = normalize(next);
    setValue(normalized);
  };
  return (
    <div
      data-slot="number-input"
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      <button
        type="button"
        data-slot="number-input-decrement"
        aria-label={decrementLabel}
        aria-controls={inputId}
        disabled={disabled || readOnly || current <= (min ?? -Infinity)}
        onClick={() => commit(current - safeStep)}
      >
        −
      </button>
      <input
        {...props}
        ref={ref}
        id={inputId}
        type="number"
        data-slot="number-input-control"
        value={current}
        min={min}
        max={max}
        step={safeStep}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => {
          onChange?.(event);
          if (!Number.isNaN(event.currentTarget.valueAsNumber))
            commit(event.currentTarget.valueAsNumber);
        }}
      />
      <button
        type="button"
        data-slot="number-input-increment"
        aria-label={incrementLabel}
        aria-controls={inputId}
        disabled={disabled || readOnly || current >= (max ?? Infinity)}
        onClick={() => commit(current + safeStep)}
      >
        +
      </button>
    </div>
  );
});
