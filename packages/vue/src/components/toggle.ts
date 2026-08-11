import { computed, defineComponent, h, ref } from 'vue';

export const Toggle = /* @__PURE__ */ defineComponent({
  name: 'SimurghToggle',
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultPressed: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const localPressed = ref(props.defaultPressed);
    const pressed = computed(() => props.modelValue ?? localPressed.value);
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'aria-pressed': pressed.value,
          'data-state': pressed.value ? 'on' : 'off',
          disabled: props.disabled,
          onClick: () => {
            if (props.disabled) return;
            const next = !pressed.value;
            if (props.modelValue === undefined) localPressed.value = next;
            emit('update:modelValue', next);
          },
        },
        slots.default?.(),
      );
  },
});
