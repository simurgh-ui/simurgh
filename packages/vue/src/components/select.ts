import { defineComponent, h, nextTick, ref, useId, type PropType } from 'vue';
import { compositeKeydown } from '../internal/composite-keydown.js';
import { useFormReset } from '../internal/forms.js';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const Select = /* @__PURE__ */ defineComponent({
  name: 'SimurghSelect',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    name: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: { type: String, default: 'Select…' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const open = ref(false);
    const control = ref<HTMLInputElement | null>(null);
    const initialValue = props.modelValue;
    const listId = `select-list-${useId().replace(/:/g, '')}`;
    const show = async () => {
      open.value = true;
      await nextTick();
      document
        .getElementById(listId)
        ?.querySelector<HTMLElement>('[role=option]:not([aria-disabled=true])')
        ?.focus();
    };
    useFormReset(control, () => {
      emit('update:modelValue', initialValue);
      open.value = false;
    });
    return () =>
      h('div', { 'data-slot': 'select' }, [
        h(
          'button',
          {
            type: 'button',
            role: 'combobox',
            'data-slot': 'select-trigger',
            'aria-expanded': open.value,
            'aria-controls': listId,
            disabled: props.disabled,
            onClick: () => (open.value ? (open.value = false) : void show()),
            onKeydown: (event: KeyboardEvent) => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                void show();
              }
            },
          },
          props.options.find((option) => option.value === props.modelValue)
            ?.label ?? props.placeholder,
        ),
        open.value
          ? h(
              'div',
              {
                id: listId,
                role: 'listbox',
                'data-slot': 'select-content',
                class: 'simurgh-content',
                onKeydown: (event: KeyboardEvent) =>
                  compositeKeydown(event, '[role=option]'),
              },
              props.options.map((option) =>
                h(
                  'div',
                  {
                    role: 'option',
                    'data-slot': 'select-option',
                    tabindex: -1,
                    'aria-selected': option.value === props.modelValue,
                    'aria-disabled': option.disabled,
                    class: 'simurgh-item',
                    onClick: () => {
                      if (!option.disabled) {
                        emit('update:modelValue', option.value);
                        open.value = false;
                      }
                    },
                  },
                  option.label,
                ),
              ),
            )
          : null,
        props.name
          ? h('input', {
              ref: control,
              type: 'hidden',
              name: props.name,
              value: props.modelValue,
              disabled: props.disabled,
            })
          : null,
      ]);
  },
});
