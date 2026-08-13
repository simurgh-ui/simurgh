import { defineComponent, h } from 'vue';

export const Button = /* @__PURE__ */ defineComponent({
  name: 'SimurghButton',
  inheritAttrs: false,
  props: {
    loading: Boolean,
    disabled: Boolean,
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    fullWidth: Boolean,
    iconOnly: Boolean,
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
          'data-slot': 'button',
          'data-state': props.loading ? 'loading' : 'idle',
          'data-variant': props.variant,
          'data-size': props.size,
          'data-full-width': props.fullWidth || undefined,
          'data-icon-only': props.iconOnly || undefined,
          onClick:
            props.disabled || props.loading ? undefined : attrs['onClick'],
        },
        slots.default?.(),
      );
  },
});
