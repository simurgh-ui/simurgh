import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const NumberInput = /* @__PURE__ */ defineComponent({
  name: 'SimurghNumberInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
    step: { type: Number, default: 1 },
    disabled: Boolean,
    readonly: Boolean,
    incrementLabel: { type: String, default: 'Increase value' },
    decrementLabel: { type: String, default: 'Decrease value' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const localValue = ref(props.defaultValue);
    const id = (attrs.id as string | undefined) ?? createId('number');
    const control = ref<HTMLInputElement | null>(null);
    const initialValue = props.modelValue ?? props.defaultValue;
    const current = computed(() => props.modelValue ?? localValue.value);
    const safeStep = computed(() =>
      Number.isFinite(props.step) && props.step > 0 ? props.step : 1,
    );
    const commit = (next: number) => {
      const normalized = Math.min(
        props.max ?? Infinity,
        Math.max(props.min ?? -Infinity, next),
      );
      if (props.modelValue === undefined) localValue.value = normalized;
      emit('update:modelValue', normalized);
    };
    useFormReset(control, () => {
      localValue.value = initialValue;
      emit('update:modelValue', initialValue);
    });
    return () =>
      h(
        'div',
        {
          'data-slot': 'number-input',
          'data-disabled': props.disabled || undefined,
          'data-readonly': props.readonly || undefined,
        },
        [
          h(
            'button',
            {
              type: 'button',
              'data-slot': 'number-input-decrement',
              'aria-label': props.decrementLabel,
              'aria-controls': id,
              disabled:
                props.disabled ||
                props.readonly ||
                current.value <= (props.min ?? -Infinity),
              onClick: () => commit(current.value - safeStep.value),
            },
            '−',
          ),
          h('input', {
            ref: control,
            ...attrs,
            id,
            type: 'number',
            'data-slot': 'number-input-control',
            value: current.value,
            min: props.min,
            max: props.max,
            step: safeStep.value,
            disabled: props.disabled,
            readonly: props.readonly,
            onInput: (event: Event) => {
              if (typeof attrs.onInput === 'function') attrs.onInput(event);
              const next = (event.currentTarget as HTMLInputElement)
                .valueAsNumber;
              if (!Number.isNaN(next)) commit(next);
            },
          }),
          h(
            'button',
            {
              type: 'button',
              'data-slot': 'number-input-increment',
              'aria-label': props.incrementLabel,
              'aria-controls': id,
              disabled:
                props.disabled ||
                props.readonly ||
                current.value >= (props.max ?? Infinity),
              onClick: () => commit(current.value + safeStep.value),
            },
            '+',
          ),
        ],
      );
  },
});
