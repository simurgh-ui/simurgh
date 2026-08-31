// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useControlledState } from './controlled-state.js';
import type { RefObject } from 'preact/compat';

export type OpenProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type OverlayContextValue = {
  open: boolean;
  setOpen(value: boolean): void;
  titleId: string;
  descriptionId: string;
  triggerRef?: RefObject<HTMLElement | null>;
};

export function useOpen(props: OpenProps) {
  return useControlledState({
    value: props.open,
    defaultValue: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
  });
}

export function useBrowser() {
  return typeof document !== 'undefined';
}
