import { listenFormReset } from '@simurgh-ui/core';
import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

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
    const control = ref<HTMLInputElement | null>(null);
    const initialValue = props.modelValue;
    let removeResetListener: (() => void) | undefined;
    onMounted(() => {
      if (!control.value) return;
      control.value.defaultValue = String(initialValue);
      removeResetListener = listenFormReset(control.value, () => {
        emit('update:modelValue', initialValue);
        void nextTick(() => {
          if (control.value) control.value.value = String(initialValue);
        });
      });
    });
    onBeforeUnmount(() => removeResetListener?.());
    return () =>
      h('input', {
        ...attrs,
        ref: control,
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
