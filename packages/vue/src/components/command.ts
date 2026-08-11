import { defineComponent, h, type PropType } from 'vue';
import { Combobox, type ComboboxOption } from './combobox.js';

export const Command = /* @__PURE__ */ defineComponent({
  name: 'SimurghCommand',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<ComboboxOption[]>,
      required: true,
    },
    name: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: { type: String, default: 'Search commands' },
    noResults: { type: String, default: 'No commands found' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('div', { 'data-slot': 'command' }, [
        h(Combobox, {
          ...attrs,
          modelValue: props.modelValue,
          options: props.options,
          ...(props.name === undefined ? {} : { name: props.name }),
          required: props.required,
          disabled: props.disabled,
          placeholder: props.placeholder,
          noResults: props.noResults,
          'onUpdate:modelValue': (value: string) =>
            emit('update:modelValue', value),
        }),
      ]);
  },
});
