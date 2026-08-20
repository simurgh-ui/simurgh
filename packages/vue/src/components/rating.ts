import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref, type PropType } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const Rating = /* @__PURE__ */ defineComponent({
  name: 'SimurghRating',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    name: { type: String, default: undefined },
    disabled: Boolean,
    required: Boolean,
    getLabel: {
      type: Function as PropType<(value: number, max: number) => string>,
      default: (value: number, max: number) => `${value} of ${max}`,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const localValue = ref(props.defaultValue);
    const generatedName = createId('rating');
    const control = ref<HTMLInputElement | null>(null);
    const initialValue = props.modelValue ?? props.defaultValue;
    const count = computed(() =>
      Number.isFinite(props.max)
        ? Math.min(100, Math.max(1, Math.floor(props.max)))
        : 5,
    );
    const current = computed(() =>
      Math.min(
        count.value,
        Math.max(0, Math.round(props.modelValue ?? localValue.value)),
      ),
    );
    const commit = (value: number) => {
      if (props.modelValue === undefined) localValue.value = value;
      emit('update:modelValue', value);
    };
    useFormReset(control, () => {
      localValue.value = initialValue;
      emit('update:modelValue', initialValue);
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'radiogroup',
          'data-slot': 'rating',
          'data-disabled': props.disabled || undefined,
        },
        Array.from({ length: count.value }, (_, index) => {
          const item = index + 1;
          return h('label', { 'data-slot': 'rating-item' }, [
            h('input', {
              ...(index === 0 ? { ref: control } : {}),
              type: 'radio',
              'data-slot': 'rating-control',
              name: props.name ?? generatedName,
              value: item,
              checked: current.value === item,
              disabled: props.disabled,
              required: props.required,
              'aria-label': props.getLabel(item, count.value),
              onChange: () => commit(item),
            }),
            h(
              'span',
              {
                'data-slot': 'rating-icon',
                'data-selected': item <= current.value || undefined,
                'aria-hidden': 'true',
              },
              '\u2605',
            ),
          ]);
        }),
      );
  },
});
