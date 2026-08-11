import { createId } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type Ref,
} from 'vue';

const collapsibleKey: InjectionKey<{
  open: Ref<boolean>;
  toggle(): void;
  id: string;
}> = Symbol('collapsible');

export const Collapsible = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultOpen);
    const open = computed(() => props.modelValue ?? local.value);
    const id = createId('collapsible');
    provide(collapsibleKey, {
      open,
      id,
      toggle: () => {
        const next = !open.value;
        if (props.modelValue === undefined) local.value = next;
        emit('update:modelValue', next);
      },
    });
    return () => slots.default?.();
  },
});

export const CollapsibleTrigger = /* @__PURE__ */ defineComponent({
  props: { disabled: Boolean },
  setup(props, { attrs, slots }) {
    const context = inject(collapsibleKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          disabled: props.disabled,
          'aria-expanded': context.open.value,
          'aria-controls': `${context.id}-content`,
          onClick: props.disabled ? undefined : context.toggle,
        },
        slots.default?.(),
      );
  },
});

export const CollapsibleContent = /* @__PURE__ */ defineComponent({
  setup(_, { attrs, slots }) {
    const context = inject(collapsibleKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          id: `${context.id}-content`,
          hidden: !context.open.value,
          'data-state': context.open.value ? 'open' : 'closed',
        },
        slots.default?.(),
      );
  },
});
