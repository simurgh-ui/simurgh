import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const PasswordInput = /* @__PURE__ */ defineComponent({
  name: 'SimurghPasswordInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: '' },
    disabled: Boolean,
    readonly: Boolean,
    revealLabel: { type: String, default: 'Show password' },
    concealLabel: { type: String, default: 'Hide password' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const revealed = ref(false);
    const localValue = ref(props.defaultValue);
    const control = ref<HTMLInputElement | null>(null);
    const id = (attrs.id as string | undefined) ?? createId('password');
    const value = computed(() => props.modelValue ?? localValue.value);
    const initial = value.value;
    useFormReset(control, () => {
      localValue.value = initial;
      revealed.value = false;
      emit('update:modelValue', initial);
    });
    return () =>
      h(
        'div',
        {
          'data-slot': 'password-input',
          'data-disabled': props.disabled || undefined,
        },
        [
          h('input', {
            ref: control,
            ...attrs,
            id,
            type: revealed.value ? 'text' : 'password',
            'data-slot': 'password-input-control',
            value: value.value,
            disabled: props.disabled,
            readonly: props.readonly,
            onInput: (event: Event) => {
              if (typeof attrs.onInput === 'function') attrs.onInput(event);
              const next = (event.currentTarget as HTMLInputElement).value;
              if (props.modelValue === undefined) localValue.value = next;
              emit('update:modelValue', next);
            },
          }),
          h(
            'button',
            {
              type: 'button',
              'data-slot': 'password-input-toggle',
              'aria-controls': id,
              'aria-label': revealed.value
                ? props.concealLabel
                : props.revealLabel,
              'aria-pressed': revealed.value,
              disabled: props.disabled,
              onClick: () => (revealed.value = !revealed.value),
            },
            revealed.value ? 'Hide' : 'Show',
          ),
        ],
      );
  },
});
