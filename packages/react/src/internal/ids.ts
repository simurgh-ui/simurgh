import { useId } from 'react';

export function useComponentId(prefix: string, provided?: string) {
  const generated = useId().replace(/:/g, '');
  return provided ?? `simurgh-${prefix}-${generated}`;
}
