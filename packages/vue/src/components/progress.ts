import { computed, defineComponent, h, type PropType } from 'vue';

export const Progress = /* @__PURE__ */ defineComponent({
  name: 'SimurghProgress',
  props: {
    value: { type: Number as PropType<number | null>, default: null },
    max: { type: Number, default: 100 },
    getValueLabel: Function as PropType<(value: number, max: number) => string>,
  },
  setup(props, { attrs, slots }) {
    const safeMax = computed(() =>
      Number.isFinite(props.max) && props.max > 0 ? props.max : 100,
    );
    const safeValue = computed(() =>
      props.value == null || !Number.isFinite(props.value)
        ? null
        : Math.min(safeMax.value, Math.max(0, props.value)),
    );
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': safeMax.value,
          'aria-valuenow': safeValue.value ?? undefined,
          'aria-valuetext':
            safeValue.value == null
              ? undefined
              : props.getValueLabel?.(safeValue.value, safeMax.value),
          'data-state':
            safeValue.value == null ? 'indeterminate' : 'determinate',
          'data-value': safeValue.value ?? undefined,
          'data-max': safeMax.value,
        },
        slots.default?.() ??
          h('span', {
            'data-part': 'indicator',
            style:
              safeValue.value == null
                ? undefined
                : { inlineSize: `${(safeValue.value / safeMax.value) * 100}%` },
          }),
      );
  },
});
