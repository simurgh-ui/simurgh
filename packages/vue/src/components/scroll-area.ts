import { defineComponent, h, type PropType } from 'vue';

export const ScrollArea = /* @__PURE__ */ defineComponent({
  name: 'SimurghScrollArea',
  props: {
    orientation: {
      type: String as PropType<'vertical' | 'horizontal' | 'both'>,
      default: 'vertical',
    },
    label: String,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: props.label ? 'region' : undefined,
          'aria-label': props.label,
          tabindex: attrs['tabindex'] ?? 0,
          'data-orientation': props.orientation,
          'data-slot': 'scroll-area',
        },
        slots.default?.(),
      );
  },
});
