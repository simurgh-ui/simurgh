import { CheckControl, type CheckProps } from '../internal/check-control.js';

export function Checkbox(props: CheckProps) {
  return <CheckControl {...props} role="checkbox" />;
}
