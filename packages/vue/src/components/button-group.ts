import type { Orientation } from '@simurgh-ui/core';
import { defineComponent, h, type PropType } from 'vue';

export const ButtonGroup = /* @__PURE__ */ defineComponent({
  name: 'SimurghButtonGroup',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: attrs['role'] ?? 'group',
          'aria-orientation': props.orientation,
          'data-slot': 'button-group',
        },
        slots.default?.(),
      );
  },
});

export const ButtonGroupText = /* @__PURE__ */ defineComponent({
  name: 'SimurghButtonGroupText',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'span',
        { ...attrs, 'data-slot': 'button-group-text' },
        slots.default?.(),
      );
  },
});

export const ButtonGroupSeparator = /* @__PURE__ */ defineComponent({
  name: 'SimurghButtonGroupSeparator',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'vertical',
    },
  },
  setup(props, { attrs }) {
    return () =>
      h('span', {
        ...attrs,
        role: attrs['role'] ?? 'separator',
        'aria-orientation': props.orientation,
        'data-slot': 'button-group-separator',
      });
  },
});
