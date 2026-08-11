import { defineComponent, h } from 'vue';

export const Breadcrumb = /* @__PURE__ */ defineComponent({
  name: 'SimurghBreadcrumb',
  props: { label: { type: String, default: 'Breadcrumb' } },
  setup(props, { attrs, slots }) {
    return () =>
      h('nav', { ...attrs, 'aria-label': props.label }, slots.default?.());
  },
});
