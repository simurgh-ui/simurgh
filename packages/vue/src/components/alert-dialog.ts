import { trapFocus } from '@simurgh-ui/core';
import {
  Teleport,
  defineComponent,
  h,
  inject,
  nextTick,
  ref,
  watch,
} from 'vue';
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  dialogKey,
} from './dialog.js';

export const AlertDialog = Dialog;
export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghAlertDialogContent',
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    const element = ref<HTMLElement | null>(null);
    let previous: HTMLElement | null = null;
    watch(context.open, async (open) => {
      if (open) {
        previous = document.activeElement as HTMLElement;
        await nextTick();
        element.value
          ?.querySelector<HTMLElement>('[data-slot=alert-dialog-cancel]')
          ?.focus();
      } else if (previous?.isConnected) previous.focus();
    });
    return () =>
      context.open.value
        ? h(Teleport, { to: 'body' }, [
            h('div', {
              class: 'simurgh-overlay',
              onMousedown: (event: MouseEvent) => {
                if (event.target === event.currentTarget)
                  context.setOpen(false);
              },
            }),
            h(
              'div',
              {
                ...attrs,
                ref: element,
                role: 'alertdialog',
                'aria-modal': 'true',
                'aria-labelledby': attrs['aria-label']
                  ? undefined
                  : `${context.id}-title`,
                'aria-describedby':
                  attrs['aria-describedby'] ?? `${context.id}-description`,
                tabindex: -1,
                'data-slot': 'alert-dialog-content',
                class: ['simurgh-content simurgh-dialog', attrs.class],
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === 'Escape') context.setOpen(false);
                  else if (element.value) trapFocus(event, element.value);
                },
              },
              slots.default?.(),
            ),
          ])
        : null;
  },
});

function alertDialogButton(name: string, slot: string) {
  return defineComponent({
    name,
    emits: ['select'],
    setup(_, { attrs, slots, emit }) {
      const context = inject(dialogKey)!;
      return () =>
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            'data-slot': slot,
            onClick: () => {
              emit('select');
              context.setOpen(false);
            },
          },
          slots.default?.(),
        );
    },
  });
}

export const AlertDialogAction = /* @__PURE__ */ alertDialogButton(
  'SimurghAlertDialogAction',
  'alert-dialog-action',
);
export const AlertDialogCancel = /* @__PURE__ */ alertDialogButton(
  'SimurghAlertDialogCancel',
  'alert-dialog-cancel',
);
