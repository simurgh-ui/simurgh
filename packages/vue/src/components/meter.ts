import { computed, defineComponent, h } from 'vue';

export const Meter = /* @__PURE__ */ defineComponent({
  name: 'SimurghMeter',
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    low: Number,
    high: Number,
    optimum: Number,
    label: String,
  },
  setup(props, { attrs, slots }) {
    const safeValue = computed(() =>
      Math.min(props.max, Math.max(props.min, props.value)),
    );
    return () =>
      h(
        'meter',
        {
          ...attrs,
          value: safeValue.value,
          min: props.min,
          max: props.max,
          low: props.low,
          high: props.high,
          optimum: props.optimum,
          role: 'meter',
          'aria-label': props.label,
          'data-slot': 'meter',
        },
        slots.default?.() ?? `${safeValue.value}`,
      );
  },
});
