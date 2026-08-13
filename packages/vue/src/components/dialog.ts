import { createId, trapFocus } from '@simurgh-ui/core';
import {
  Teleport,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  provide,
  ref,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue';

type DialogContext = {
  open: Ref<boolean>;
  setOpen(value: boolean): void;
  id: string;
};

export const dialogKey: InjectionKey<DialogContext> =
  /* @__PURE__ */ Symbol('dialog');

export const Dialog = /* @__PURE__ */ defineComponent({
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultOpen);
    const current = computed({
      get: () => props.open ?? local.value,
      set: (value) => {
        local.value = value;
        emit('update:open', value);
      },
    });
    provide(dialogKey, {
      open: current,
      setOpen: (value) => (current.value = value),
      id: createId('simurghdialog'),
    });
    return () => slots.default?.();
  },
});

export const DialogTrigger = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-slot': 'dialog-trigger',
          'aria-haspopup': 'dialog',
          'aria-expanded': context.open.value,
          onClick: () => context.setOpen(true),
        },
        slots.default?.(),
      );
  },
});

export const DialogContent = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    const element = ref<HTMLElement | null>(null);
    let previous: HTMLElement | null = null;
    watch(context.open, async (open) => {
      if (open) {
        previous = document.activeElement as HTMLElement;
        await nextTick();
        element.value?.focus();
      } else if (previous?.isConnected) previous.focus();
    });
    return () =>
      context.open.value
        ? h(Teleport, { to: 'body' }, [
            h('div', {
              'data-slot': 'dialog-overlay',
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
                role: 'dialog',
                'data-slot': 'dialog-content',
                'aria-modal': 'true',
                'aria-labelledby': attrs['aria-label']
                  ? undefined
                  : `${context.id}-title`,
                'aria-describedby':
                  attrs['aria-describedby'] ?? `${context.id}-description`,
                tabindex: -1,
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

export const DialogTitle = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'h2',
        {
          ...attrs,
          id: attrs.id ?? `${context.id}-title`,
          'data-slot': 'dialog-title',
        },
        slots.default?.(),
      );
  },
});

export const DialogDescription = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'p',
        {
          ...attrs,
          id: attrs.id ?? `${context.id}-description`,
          'data-slot': 'dialog-description',
        },
        slots.default?.(),
      );
  },
});

export const DialogClose = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-slot': 'dialog-close',
          onClick: () => context.setOpen(false),
        },
        slots.default?.(),
      );
  },
});
