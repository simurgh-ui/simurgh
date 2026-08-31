// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useState } from 'preact/compat';

export function useControlledState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value: T | undefined;
  defaultValue: T;
  onChange?: ((value: T) => void) | undefined;
}) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const current = value ?? localValue;
  const setValue = (next: T) => {
    if (value === undefined) setLocalValue(next);
    onChange?.(next);
  };
  return [current, setValue] as const;
}
