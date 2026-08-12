import { defineComponent, h } from 'vue';

export const Label = /* @__PURE__ */ defineComponent({
  name: 'SimurghLabel',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('label', attrs, slots.default?.());
  },
});
