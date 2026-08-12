import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref, watch, type PropType } from 'vue';

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const Combobox = /* @__PURE__ */ defineComponent({
  name: 'SimurghCombobox',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<ComboboxOption[]>,
      required: true,
    },
    name: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: { type: String, default: 'Search options' },
    noResults: { type: String, default: 'No results' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const listId = createId('combobox-list');
    const query = ref('');
    const open = ref(false);
    const activeIndex = ref(-1);
    const selected = computed(() =>
      props.options.find((option) => option.value === props.modelValue),
    );
    const filtered = computed(() => {
      const needle = query.value.trim().toLocaleLowerCase();
      return needle
        ? props.options.filter((option) =>
            option.label.toLocaleLowerCase().includes(needle),
          )
        : props.options;
    });
    const optionId = (index: number) => `${listId}-option-${index}`;
    const move = (step: 1 | -1) => {
      if (!filtered.value.some((option) => !option.disabled)) return;
      let index = activeIndex.value;
      do {
        index = (index + step + filtered.value.length) % filtered.value.length;
      } while (filtered.value[index]?.disabled);
      activeIndex.value = index;
    };
    const choose = (option: ComboboxOption) => {
      if (option.disabled) return;
      emit('update:modelValue', option.value);
      query.value = option.label;
      open.value = false;
      activeIndex.value = -1;
    };
    watch(
      () => props.modelValue,
      () => {
        if (!open.value) query.value = selected.value?.label ?? '';
      },
      { immediate: true },
    );
    return () =>
      h('div', { class: 'simurgh-combobox' }, [
        h('input', {
          ...attrs,
          role: 'combobox',
          'aria-label': attrs['aria-label'] ?? props.placeholder,
          'aria-autocomplete': 'list',
          'aria-expanded': open.value,
          'aria-controls': listId,
          'aria-activedescendant':
            open.value && activeIndex.value >= 0
              ? optionId(activeIndex.value)
              : undefined,
          disabled: props.disabled,
          placeholder: props.placeholder,
          value: query.value,
          onFocus: () => {
            if (!props.disabled) open.value = true;
          },
          onInput: (event: Event) => {
            query.value = (event.target as HTMLInputElement).value;
            open.value = true;
            activeIndex.value = -1;
          },
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              open.value = true;
              move(event.key === 'ArrowDown' ? 1 : -1);
            } else if (event.key === 'Home' && open.value) {
              event.preventDefault();
              activeIndex.value = -1;
              move(1);
            } else if (event.key === 'End' && open.value) {
              event.preventDefault();
              activeIndex.value = 0;
              move(-1);
            } else if (event.key === 'Enter' && activeIndex.value >= 0) {
              event.preventDefault();
              const option = filtered.value[activeIndex.value];
              if (option) choose(option);
            } else if (event.key === 'Escape') {
              event.preventDefault();
              query.value = selected.value?.label ?? '';
              open.value = false;
              activeIndex.value = -1;
            }
          },
        }),
        open.value
          ? h(
              'div',
              { id: listId, role: 'listbox', class: 'simurgh-content' },
              filtered.value.length
                ? filtered.value.map((option, index) =>
                    h(
                      'div',
                      {
                        id: optionId(index),
                        role: 'option',
                        'aria-selected': option.value === props.modelValue,
                        'aria-disabled': option.disabled || undefined,
                        class: 'simurgh-item',
                        onMousedown: (event: MouseEvent) => {
                          event.preventDefault();
                          choose(option);
                        },
                      },
                      option.label,
                    ),
                  )
                : h('div', { role: 'status' }, props.noResults),
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
        props.required
          ? h('input', {
              'aria-hidden': 'true',
              tabindex: -1,
              required: true,
              value: props.modelValue,
              style: 'position:absolute;opacity:0;pointer-events:none',
            })
          : null,
      ]);
  },
});
