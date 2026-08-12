import { defineComponent, h } from 'vue';

export const Skeleton = /* @__PURE__ */ defineComponent({
  name: 'SimurghSkeleton',
  props: { label: String },
  setup(props, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        role: props.label ? 'status' : undefined,
        'aria-label': props.label,
        'aria-busy': props.label ? 'true' : undefined,
        'aria-hidden': props.label ? undefined : 'true',
        'data-state': 'loading',
      });
  },
});
