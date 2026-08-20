import { useState } from 'react';

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
