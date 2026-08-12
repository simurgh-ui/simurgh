import { defineComponent, h, type PropType } from 'vue';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export const Badge = /* @__PURE__ */ defineComponent({
  name: 'SimurghBadge',
  props: {
    tone: { type: String as PropType<BadgeTone>, default: 'neutral' },
    status: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          'data-tone': props.tone,
          role: props.status ? 'status' : undefined,
          'aria-live': props.status ? 'polite' : undefined,
        },
        slots.default?.(),
      );
  },
});
