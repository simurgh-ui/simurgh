import { computed, defineComponent, h, ref } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const Slider = /* @__PURE__ */ defineComponent({
  name: 'SimurghSlider',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    invalid: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const local = ref(props.defaultValue);
    const control = ref<HTMLInputElement | null>(null);
    const value = computed(() => props.modelValue ?? local.value);
    const initial = value.value;
    useFormReset(control, () => {
      local.value = initial;
      emit('update:modelValue', initial);
    });
    return () =>
      h('input', {
        ref: control,
        ...attrs,
        type: 'range',
        value: value.value,
        min: props.min,
        max: props.max,
        step: props.step,
        'aria-invalid': props.invalid || undefined,
        'data-slot': 'slider',
        onInput: (event: Event) => {
          const next = (event.target as HTMLInputElement).valueAsNumber;
          if (props.modelValue === undefined) local.value = next;
          emit('update:modelValue', next);
        },
        onChange: (event: Event) =>
          emit('change', (event.target as HTMLInputElement).valueAsNumber),
      });
  },
});
