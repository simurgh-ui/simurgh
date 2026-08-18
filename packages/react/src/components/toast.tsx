import { createId } from '@simurgh-ui/core';
import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export type ToastMessage = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
};
type ToastContextValue = {
  toasts: ToastMessage[];
  toast(message: Omit<ToastMessage, 'id'>): string;
  dismiss(id: string): void;
};
const ToastContext = /* @__PURE__ */ createContext<ToastContextValue | null>(
  null,
);
export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const dismiss = (id: string) =>
    setToasts((items) => items.filter((item) => item.id !== id));
  const toast = (message: Omit<ToastMessage, 'id'>) => {
    const id = createId('toast');
    setToasts((items) => [...items, { ...message, id }]);
    if (message.duration !== 0)
      setTimeout(() => dismiss(id), message.duration ?? 5000);
    return id;
  };
  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}
export function useToast() {
  const c = useContext(ToastContext);
  if (!c) throw new Error('useToast requires ToastProvider');
  return c;
}
export function ToastViewport(props: HTMLAttributes<HTMLDivElement>) {
  const { toasts, dismiss } = useToast();
  return (
    <div
      {...props}
      className={props.className ?? 'simurgh-toast-region'}
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="simurgh-content simurgh-toast"
        >
          <strong>{toast.title}</strong>
          {toast.description && <div>{toast.description}</div>}
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
