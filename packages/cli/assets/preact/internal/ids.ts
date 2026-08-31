// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useId } from 'preact/compat';

export function useComponentId(prefix: string, provided?: string) {
  const generated = useId().replace(/:/g, '');
  return provided ?? `simurgh-${prefix}-${generated}`;
}
