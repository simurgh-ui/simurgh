import { defineComponent, h, ref } from 'vue';
import { useFormReset } from '../internal/forms.js';

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
    const control = ref<HTMLTextAreaElement | null>(null);
    const initial = props.modelValue;
    useFormReset(control, () => emit('update:modelValue', initial));
    return () =>
      h('textarea', {
        ref: control,
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
