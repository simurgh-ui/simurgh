import { defineComponent, h } from 'vue';

export const Alert = /* @__PURE__ */ defineComponent({
  name: 'SimurghAlert',
  props: { urgent: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: props.urgent ? 'alert' : 'status',
          'aria-live': props.urgent ? 'assertive' : 'polite',
          'aria-atomic': 'true',
          'data-urgent': props.urgent || undefined,
        },
        slots.default?.(),
      );
  },
});
