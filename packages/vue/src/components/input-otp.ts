import { defineComponent, h, ref } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const InputOtp = /* @__PURE__ */ defineComponent({
  name: 'SimurghInputOtp',
  props: {
    modelValue: { type: String, default: '' },
    length: { type: Number, default: 6 },
    digitsOnly: { type: Boolean, default: true },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    autocomplete: { type: String, default: 'one-time-code' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const control = ref<HTMLInputElement | null>(null);
    const initial = props.modelValue;
    useFormReset(control, () => emit('update:modelValue', initial));
    return () =>
      h('input', {
        ref: control,
        ...attrs,
        type: 'text',
        name: props.name,
        value: props.modelValue,
        maxlength: props.length,
        required: props.required,
        disabled: props.disabled,
        autocomplete: props.autocomplete,
        inputmode: props.digitsOnly ? 'numeric' : 'text',
        pattern: props.digitsOnly ? '[0-9]*' : undefined,
        'aria-invalid': props.invalid || undefined,
        'data-slot': 'input-otp',
        style: [{ '--simurgh-otp-length': props.length }, attrs['style']],
        onInput: (event: Event) => {
          const input = event.target as HTMLInputElement;
          const value = (
            props.digitsOnly ? input.value.replace(/\D/g, '') : input.value
          ).slice(0, props.length);
          input.value = value;
          emit('update:modelValue', value);
        },
        onChange: (event: Event) => emit('change', event),
      });
  },
});
