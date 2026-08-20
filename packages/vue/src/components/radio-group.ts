import { nextIndex, type Direction } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';
import { useFormReset } from '../internal/forms.js';

const radioKey: InjectionKey<{
  value: Ref<string>;
  setValue(value: string): void;
  disabled: boolean;
  direction: Direction;
}> = /* @__PURE__ */ Symbol('radio');

export const RadioGroup = /* @__PURE__ */ defineComponent({
  name: 'SimurghRadioGroup',
  props: {
    modelValue: { type: String, default: '' },
    defaultValue: { type: String, default: '' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const local = ref(props.defaultValue);
    const control = ref<HTMLInputElement | null>(null);
    const initialValue = props.modelValue || props.defaultValue;
    const value = computed({
      get: () => props.modelValue || local.value,
      set: (next) => {
        local.value = next;
        emit('update:modelValue', next);
      },
    });
    provide(radioKey, {
      value,
      setValue: (next) => (value.value = next),
      disabled: props.disabled,
      direction: props.direction,
    });
    useFormReset(control, () => {
      local.value = initialValue;
      emit('update:modelValue', initialValue);
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'radiogroup',
          'aria-label': attrs['aria-label'] ?? 'Rating',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[role=radio]:not([aria-disabled=true])',
              ),
            );
            const current = items.indexOf(
              document.activeElement as HTMLElement,
            );
            const target = nextIndex(current, items.length, event.key, {
              direction: props.direction,
            });
            if (target !== current) {
              event.preventDefault();
              items[target]?.focus();
              items[target]?.click();
            }
          },
        },
        [
          slots.default?.(),
          props.name
            ? h('input', {
                ref: control,
                type: 'hidden',
                name: props.name,
                value: value.value,
              })
            : null,
          props.required
            ? h('input', {
                ref: control,
                'aria-hidden': 'true',
                tabindex: -1,
                required: true,
                value: value.value,
                style: 'position:absolute;opacity:0;pointer-events:none',
              })
            : null,
        ],
      );
  },
});

export const RadioGroupItem = /* @__PURE__ */ defineComponent({
  name: 'SimurghRadioGroupItem',
  props: { value: { type: String, required: true }, disabled: Boolean },
  setup(props, { slots, attrs }) {
    const context = inject(radioKey)!;
    return () => {
      const selected = context.value.value === props.value;
      const unavailable = context.disabled || props.disabled;
      return h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'radio',
          'aria-checked': selected,
          'aria-disabled': unavailable || undefined,
          tabindex: selected ? 0 : -1,
          onClick: () => {
            if (!unavailable) context.setValue(props.value);
          },
        },
        slots.default?.(),
      );
    };
  },
});
