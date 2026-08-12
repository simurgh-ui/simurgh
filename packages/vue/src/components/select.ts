import { createId } from '@simurgh-ui/core';
import { defineComponent, h, nextTick, ref, type PropType } from 'vue';
import { compositeKeydown } from '../internal/composite-keydown.js';

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
    const listId = createId('select-list');
    const show = async () => {
      open.value = true;
      await nextTick();
      document
        .getElementById(listId)
        ?.querySelector<HTMLElement>('[role=option]:not([aria-disabled=true])')
        ?.focus();
    };
    return () =>
      h('div', [
        h(
          'button',
          {
            type: 'button',
            role: 'combobox',
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
                class: 'simurgh-content',
                onKeydown: (event: KeyboardEvent) =>
                  compositeKeydown(event, '[role=option]'),
              },
              props.options.map((option) =>
                h(
                  'div',
                  {
                    role: 'option',
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
              type: 'hidden',
              name: props.name,
              value: props.modelValue,
              disabled: props.disabled,
            })
          : null,
      ]);
  },
});
