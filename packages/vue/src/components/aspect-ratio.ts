import { computed, defineComponent, h } from 'vue';

export const AspectRatio = /* @__PURE__ */ defineComponent({
  name: 'SimurghAspectRatio',
  props: { ratio: { type: Number, default: 1 } },
  setup(props, { attrs, slots }) {
    const safeRatio = computed(() =>
      Number.isFinite(props.ratio) && props.ratio > 0 ? props.ratio : 1,
    );
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-ratio': safeRatio.value,
          style: [{ aspectRatio: String(safeRatio.value) }, attrs['style']],
        },
        slots.default?.(),
      );
  },
});
