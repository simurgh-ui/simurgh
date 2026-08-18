import { createContext, useContext } from 'react';

export type OverlayContextValue = {
  open: boolean;
  setOpen(value: boolean): void;
  titleId: string;
  descriptionId: string;
};
export const DialogContext =
  /* @__PURE__ */ createContext<OverlayContextValue | null>(null);
export const useDialog = () => {
  const value = useContext(DialogContext);
  if (!value) throw new Error('Dialog parts must be inside Dialog');
  return value;
};
