import { createContext, useContext, type RefObject } from 'react';

export type OverlayContextValue = {
  open: boolean;
  setOpen(value: boolean): void;
  titleId: string;
  descriptionId: string;
};
type DialogContextValue = OverlayContextValue & {
  triggerRef: RefObject<HTMLButtonElement | null>;
};
export const DialogContext =
  /* @__PURE__ */ createContext<DialogContextValue | null>(null);
export const useDialog = () => {
  const value = useContext(DialogContext);
  if (!value) throw new Error('Dialog parts must be inside Dialog');
  return value;
};
