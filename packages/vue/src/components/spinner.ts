import { defineComponent, h } from 'vue';

export const Spinner = /* @__PURE__ */ defineComponent({
  name: 'SimurghSpinner',
  props: { label: { type: String, default: 'Loading' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          role: 'status',
          'aria-label': props.label,
          'aria-live': 'polite',
          'aria-busy': 'true',
          'data-state': 'loading',
        },
        h(
          'span',
          { 'aria-hidden': 'true', 'data-part': 'indicator' },
          slots.default?.() ?? '◌',
        ),
      );
  },
});
