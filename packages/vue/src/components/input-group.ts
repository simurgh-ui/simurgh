import { defineComponent, h, type PropType } from 'vue';

export const InputGroup = /* @__PURE__ */ defineComponent({
  name: 'SimurghInputGroup',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: attrs['role'] ?? 'group',
          'data-slot': 'input-group',
        },
        slots.default?.(),
      );
  },
});

export const InputGroupAddon = /* @__PURE__ */ defineComponent({
  name: 'SimurghInputGroupAddon',
  props: {
    align: {
      type: String as PropType<
        'inline-start' | 'inline-end' | 'block-start' | 'block-end'
      >,
      default: 'inline-start',
    },
    decorative: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-hidden': props.decorative || undefined,
          'data-align': props.align,
          'data-slot': 'input-group-addon',
        },
        slots.default?.(),
      );
  },
});

export const InputGroupText = /* @__PURE__ */ defineComponent({
  name: 'SimurghInputGroupText',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'span',
        { ...attrs, 'data-slot': 'input-group-text' },
        slots.default?.(),
      );
  },
});
