import {
  createFloatingInteractions,
  type FloatingInteractionEvent,
} from '@simurgh-ui/core';
import {
  Teleport,
  computed,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  useId,
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
  interactions: ReturnType<typeof createFloatingInteractions>;
};

function invoke(handler: unknown, event: FloatingInteractionEvent) {
  if (Array.isArray(handler)) handler.forEach((entry) => invoke(entry, event));
  else if (typeof handler === 'function') handler(event);
}

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
      const id = `floating-${useId().replace(/:/g, '')}`;
      const setOpen = (value: boolean) => (current.value = value);
      const interactions = createFloatingInteractions({
        kind,
        id,
        getOpen: () => current.value,
        setOpen,
        getReference: () => trigger.value,
        getFloating: () => content.value,
      });
      let cleanupPosition: (() => void) | undefined;
      let cleanupDismiss: (() => void) | undefined;
      watch([current, trigger, content], ([open, reference, floating]) => {
        cleanupPosition?.();
        cleanupDismiss?.();
        if (open && reference && floating) {
          cleanupPosition = autoUpdateFloating(reference, floating, () => {
            const position = computeFloatingPosition(reference, floating);
            Object.assign(floating.style, {
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
            });
          });
          cleanupDismiss = interactions.listenForOutsidePress(
            reference.ownerDocument,
          );
        }
      });
      onBeforeUnmount(() => {
        cleanupPosition?.();
        cleanupDismiss?.();
      });
      provide(floatingKey, {
        open: current,
        setOpen,
        id,
        trigger,
        content,
        kind,
        interactions,
      });
      return () => slots.default?.();
    },
  });
}

export const FloatingTrigger = /* @__PURE__ */ defineComponent({
  name: 'SimurghFloatingTrigger',
  setup(_, { slots, attrs }) {
    const context = inject(floatingKey)!;
    return () => {
      const compose = (
        handler: unknown,
        internal?: (event: FloatingInteractionEvent) => void,
      ) =>
        internal
          ? (event: FloatingInteractionEvent) => {
              invoke(handler, event);
              internal(event);
            }
          : handler;
      return h(
        'button',
        {
          ...attrs,
          ...context.interactions.referenceAttributes,
          ref: context.trigger,
          type: 'button',
          'aria-expanded':
            context.kind === 'tooltip' ? undefined : context.open.value,
          onClick:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? attrs.onClick
              : compose(attrs.onClick, context.interactions.onReferenceClick),
          onMouseenter:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? compose(
                  attrs.onMouseenter,
                  context.interactions.onReferenceMouseEnter,
                )
              : undefined,
          onMouseleave:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? compose(
                  attrs.onMouseleave,
                  context.interactions.onReferenceMouseLeave,
                )
              : undefined,
          onFocus:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? compose(attrs.onFocus, context.interactions.onReferenceFocus)
              : undefined,
          onBlur:
            context.kind === 'tooltip' || context.kind === 'hovercard'
              ? compose(attrs.onBlur, context.interactions.onReferenceBlur)
              : undefined,
          onKeydown: compose(
            attrs.onKeydown,
            context.interactions.onReferenceKeyDown,
          ),
        },
        slots.default?.(),
      );
    };
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
                ...context.interactions.floatingAttributes,
                id: attrs.id ?? context.interactions.floatingAttributes.id,
                role:
                  attrs.role ?? context.interactions.floatingAttributes.role,
                ref: context.content,
                class: ['simurgh-content', attrs.class],
                style: [{ position: 'absolute' }, attrs.style],
                onKeydown: (event: KeyboardEvent) => {
                  if (typeof attrs.onKeydown === 'function')
                    attrs.onKeydown(event);
                  context.interactions.onFloatingKeyDown(event);
                },
              },
              slots.default?.(),
            ),
          )
        : null;
  },
});
