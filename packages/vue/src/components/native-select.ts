import { defineComponent, h, ref } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const NativeSelect = /* @__PURE__ */ defineComponent({
  name: 'SimurghNativeSelect',
  props: {
    modelValue: { type: [String, Number], default: '' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    multiple: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, slots, emit }) {
    const control = ref<HTMLSelectElement | null>(null);
    const initial = props.modelValue;
    useFormReset(control, () => emit('update:modelValue', initial));
    return () =>
      h(
        'select',
        {
          ref: control,
          ...attrs,
          name: props.name,
          required: props.required,
          disabled: props.disabled,
          multiple: props.multiple,
          value: props.modelValue,
          'aria-invalid': props.invalid || undefined,
          'data-slot': 'native-select',
          onChange: (event: Event) => {
            const select = event.target as HTMLSelectElement;
            const value = props.multiple
              ? Array.from(select.selectedOptions, (option) => option.value)
              : select.value;
            emit('update:modelValue', value);
            emit('change', event);
          },
        },
        slots.default?.(),
      );
  },
});
