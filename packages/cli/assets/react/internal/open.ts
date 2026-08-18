import { useState } from 'react';

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
};

export function useOpen(props: OpenProps) {
  const [local, setLocal] = useState(props.defaultOpen ?? false);
  const open = props.open ?? local;
  const setOpen = (next: boolean) => {
    if (props.open === undefined) setLocal(next);
    props.onOpenChange?.(next);
  };
  return [open, setOpen] as const;
}

export function useBrowser() {
  return typeof document !== 'undefined';
}
