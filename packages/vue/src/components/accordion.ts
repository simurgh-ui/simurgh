import {
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

const accordionKey: InjectionKey<{
  open: Ref<string[]>;
  toggle(value: string): void;
}> = Symbol('accordion');
const itemKey: InjectionKey<string> = Symbol('item');

export const Accordion = /* @__PURE__ */ defineComponent({
  props: {
    multiple: Boolean,
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
  },
  setup(props, { slots }) {
    const open = ref([...props.defaultValue]);
    provide(accordionKey, {
      open,
      toggle: (value) =>
        (open.value = open.value.includes(value)
          ? open.value.filter((entry) => entry !== value)
          : props.multiple
            ? [...open.value, value]
            : [value]),
    });
    return () => slots.default?.();
  },
});

export const AccordionItem = /* @__PURE__ */ defineComponent({
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    provide(itemKey, props.value);
    return () => h('div', attrs, slots.default?.());
  },
});

export const AccordionTrigger = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(accordionKey)!;
    const value = inject(itemKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'aria-expanded': context.open.value.includes(value),
          onClick: () => context.toggle(value),
        },
        slots.default?.(),
      );
  },
});

export const AccordionContent = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(accordionKey)!;
    const value = inject(itemKey)!;
    return () =>
      context.open.value.includes(value)
        ? h('div', { ...attrs, role: 'region' }, slots.default?.())
        : null;
  },
});
