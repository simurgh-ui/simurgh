import { CheckControl, type CheckProps } from '../internal/check-control.js';

export function Switch(props: CheckProps) {
  return <CheckControl {...props} role="switch" />;
}
