import { defineComponent, h } from 'vue';

export const Textarea = /* @__PURE__ */ defineComponent({
  name: 'SimurghTextarea',
  props: {
    modelValue: { type: String, default: '' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    return () =>
      h('textarea', {
        ...attrs,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        onInput: (event: Event) =>
          emit(
            'update:modelValue',
            (event.target as HTMLTextAreaElement).value,
          ),
        onChange: (event: Event) => emit('change', event),
      });
  },
});
