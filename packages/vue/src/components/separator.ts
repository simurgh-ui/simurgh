import type { Orientation } from '@simurgh-ui/core';
import { defineComponent, h, type PropType } from 'vue';

export const Separator = /* @__PURE__ */ defineComponent({
  name: 'SimurghSeparator',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    decorative: Boolean,
  },
  setup(props, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        role: props.decorative ? 'none' : 'separator',
        'aria-hidden': props.decorative || undefined,
        'aria-orientation': props.decorative ? undefined : props.orientation,
        'data-orientation': props.orientation,
      });
  },
});
