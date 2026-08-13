import { defineComponent, h } from 'vue';

export const Input = /* @__PURE__ */ defineComponent({
  name: 'SimurghInput',
  props: {
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    return () =>
      h('input', {
        ...attrs,
        type: props.type,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        value: props.modelValue,
        'data-slot': 'input',
        'aria-invalid': props.invalid || undefined,
        onInput: (event: Event) =>
          emit('update:modelValue', (event.target as HTMLInputElement).value),
        onChange: (event: Event) => emit('change', event),
      });
  },
});
