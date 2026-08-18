import { createId } from '@simurgh-ui/core';
import {
  Teleport,
  computed,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue';
import { autoUpdateFloating, computeFloatingPosition } from '../floating.js';

type FloatingKind = 'popover' | 'tooltip' | 'hovercard' | 'menu';

type FloatingContext = {
  open: Ref<boolean>;
  setOpen(value: boolean): void;
  id: string;
  trigger: Ref<HTMLElement | null>;
  content: Ref<HTMLElement | null>;
  kind: FloatingKind;
};

export const floatingKey: InjectionKey<FloatingContext> =
  /* @__PURE__ */ Symbol('floating');

export function floatingRoot(name: string, kind: FloatingKind) {
  return defineComponent({
    name,
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
      const trigger = ref<HTMLElement | null>(null);
      const content = ref<HTMLElement | null>(null);
      let cleanup: (() => void) | undefined;
      watch([current, trigger, content], ([open, reference, floating]) => {
        cleanup?.();
        if (open && reference && floating)
          cleanup = autoUpdateFloating(reference, floating, () => {
            const position = computeFloatingPosition(reference, floating);
            Object.assign(floating.style, {
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
            });
          });
      });
      onBeforeUnmount(() => cleanup?.());
      provide(floatingKey, {
        open: current,
        setOpen: (value) => (current.value = value),
        id: createId('floating'),
        trigger,
        content,
        kind,
      });
      return () => slots.default?.();
    },
  });
}

export const FloatingTrigger = /* @__PURE__ */ defineComponent({
  name: 'SimurghFloatingTrigger',
  setup(_, { slots, attrs }) {
    const context = inject(floatingKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: context.trigger,
          type: 'button',
          'aria-expanded':
            context.kind === 'tooltip' ? undefined : context.open.value,
          'aria-haspopup':
            context.kind === 'tooltip'
              ? undefined
              : context.kind === 'menu'
                ? 'menu'
                : 'dialog',
          'aria-describedby':
            context.kind === 'tooltip' ? context.id : undefined,
          onClick:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? undefined
              : () => context.setOpen(!context.open.value),
          onMouseenter:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? () => context.setOpen(true)
              : undefined,
          onMouseleave:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? () => context.setOpen(false)
              : undefined,
          onFocus:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? () => context.setOpen(true)
              : undefined,
          onBlur:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? () => context.setOpen(false)
              : undefined,
        },
        slots.default?.(),
      );
  },
});

export const FloatingContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghFloatingContent',
  setup(_, { slots, attrs }) {
    const context = inject(floatingKey)!;
    return () =>
      context.open.value
        ? h(
            Teleport,
            { to: 'body' },
            h(
              'div',
              {
                ...attrs,
                id:
                  attrs.id ??
                  (context.kind === 'tooltip' ? context.id : undefined),
                role:
                  attrs.role ??
                  (context.kind === 'tooltip'
                    ? 'tooltip'
                    : context.kind === 'menu'
                      ? 'menu'
                      : 'dialog'),
                ref: context.content,
                class: ['simurgh-content', attrs.class],
                style: [{ position: 'absolute' }, attrs.style],
                onKeydown: (event: KeyboardEvent) => {
                  if (typeof attrs.onKeydown === 'function')
                    attrs.onKeydown(event);
                  if (!event.defaultPrevented && event.key === 'Escape')
                    context.setOpen(false);
                },
              },
              slots.default?.(),
            ),
          )
        : null;
  },
});
