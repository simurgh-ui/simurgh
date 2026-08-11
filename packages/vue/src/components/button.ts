import { defineComponent, h } from 'vue';

export const Button = /* @__PURE__ */ defineComponent({
  name: 'SimurghButton',
  inheritAttrs: false,
  props: {
    loading: Boolean,
    disabled: Boolean,
    type: { type: String, default: 'button' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: props.type,
          disabled: props.disabled || props.loading,
          'aria-busy': props.loading || undefined,
          'data-state': props.loading ? 'loading' : 'idle',
          onClick:
            props.disabled || props.loading ? undefined : attrs['onClick'],
        },
        slots.default?.(),
      );
  },
});
