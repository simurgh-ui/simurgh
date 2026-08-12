import { defineComponent, h, ref, watch } from 'vue';

export const Disclosure = /* @__PURE__ */ defineComponent({
  name: 'SimurghDisclosure',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const local = ref(props.modelValue ?? props.defaultOpen);
    watch(
      () => props.modelValue,
      (value) => {
        if (value !== undefined) local.value = value;
      },
    );
    return () =>
      h(
        'details',
        {
          ...attrs,
          open: local.value,
          'data-slot': 'disclosure',
          'data-state': local.value ? 'open' : 'closed',
          onToggle: (event: Event) => {
            const next = (event.currentTarget as HTMLDetailsElement).open;
            if (props.modelValue === undefined) local.value = next;
            emit('update:modelValue', next);
          },
        },
        slots.default?.(),
      );
  },
});

export const DisclosureSummary = /* @__PURE__ */ defineComponent({
  name: 'SimurghDisclosureSummary',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'summary',
        { ...attrs, 'data-slot': 'disclosure-summary' },
        slots.default?.(),
      );
  },
});

export const DisclosureContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghDisclosureContent',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, 'data-slot': 'disclosure-content' },
        slots.default?.(),
      );
  },
});
