import { useOpen, type OpenProps, type OverlayContextValue } from './open.js';
import {
  createContext,
  useContext,
  useId,
  type PropsWithChildren,
} from 'react';

const DialogContext = /* @__PURE__ */ createContext<OverlayContextValue | null>(
  null,
);

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) throw new Error('Dialog parts must be inside Dialog');
  return context;
}

export function Dialog({ children, ...props }: PropsWithChildren<OpenProps>) {
  const [open, setOpen] = useOpen(props);
  const uid = useId();
  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        titleId: `${uid}-title`,
        descriptionId: `${uid}-description`,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
