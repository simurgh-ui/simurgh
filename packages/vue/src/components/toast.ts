import { createId } from '@simurgh-ui/core';
import {
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type Ref,
} from 'vue';

export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
};

type ToastContext = {
  messages: Ref<ToastMessage[]>;
  toast(message: Omit<ToastMessage, 'id'>): void;
  dismiss(id: string): void;
};

const toastKey: InjectionKey<ToastContext> = /* @__PURE__ */ Symbol('toast');

export const ToastProvider = /* @__PURE__ */ defineComponent({
  name: 'SimurghToastProvider',
  setup(_, { slots }) {
    const messages = ref<ToastMessage[]>([]);
    const dismiss = (id: string) => {
      messages.value = messages.value.filter((message) => message.id !== id);
    };
    provide(toastKey, {
      messages,
      dismiss,
      toast: (message) => {
        const id = createId('toast');
        messages.value.push({ ...message, id });
        setTimeout(() => dismiss(id), 5000);
      },
    });
    return () => slots.default?.();
  },
});

export function useToast() {
  const context = inject(toastKey);
  if (!context) throw new Error('useToast requires ToastProvider');
  return context;
}

export const ToastViewport = /* @__PURE__ */ defineComponent({
  name: 'SimurghToastViewport',
  setup() {
    const context = useToast();
    return () =>
      h(
        'div',
        { class: 'simurgh-toast-region', 'aria-label': 'Notifications' },
        context.messages.value.map((message) =>
          h('div', { role: 'status', class: 'simurgh-content simurgh-toast' }, [
            h('strong', message.title),
            message.description && h('div', message.description),
            h(
              'button',
              {
                onClick: () => context.dismiss(message.id),
                'aria-label': 'Dismiss notification',
              },
              '×',
            ),
          ]),
        ),
      );
  },
});
