// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useOpen, type OpenProps, type OverlayContextValue } from './open.js';
import {
  createContext,
  useContext,
  useId,
  useRef,
  type PropsWithChildren,
} from 'preact/compat';

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
  const triggerRef = useRef<HTMLElement>(null);
  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        titleId: `${uid}-title`,
        descriptionId: `${uid}-description`,
        triggerRef,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
