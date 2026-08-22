import { useControlledState } from './controlled-state.js';
import type { RefObject } from 'react';

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
