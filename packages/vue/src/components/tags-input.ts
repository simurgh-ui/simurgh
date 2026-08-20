import { computed, defineComponent, h, ref, type PropType } from 'vue';
import { useFormReset } from '../internal/forms.js';

export const TagsInput = /* @__PURE__ */ defineComponent({
  name: 'SimurghTagsInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
    name: { type: String, default: undefined },
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    maxTags: { type: Number, default: 20 },
    placeholder: { type: String, default: 'Add a tag' },
    inputLabel: { type: String, default: 'Add a tag' },
    getRemoveLabel: {
      type: Function as PropType<(tag: string) => string>,
      default: (tag: string) => `Remove ${tag}`,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const localValue = ref([...props.defaultValue]);
    const draft = ref('');
    const input = ref<HTMLInputElement | null>(null);
    const initial = [...(props.modelValue ?? props.defaultValue)];
    const tags = computed(() =>
      (props.modelValue ?? localValue.value).slice(0, 100),
    );
    const limit = computed(() =>
      Number.isFinite(props.maxTags)
        ? Math.min(100, Math.max(1, Math.floor(props.maxTags)))
        : 20,
    );
    const commit = (next: string[]) => {
      if (props.modelValue === undefined) localValue.value = next;
      emit('update:modelValue', next);
    };
    const add = () => {
      const tag = draft.value.trim();
      if (
        props.disabled ||
        props.readonly ||
        !tag ||
        tags.value.includes(tag) ||
        tags.value.length >= limit.value
      )
        return;
      commit([...tags.value, tag]);
      draft.value = '';
    };
    const remove = (index: number) => {
      if (props.disabled || props.readonly) return;
      commit(tags.value.filter((_, itemIndex) => itemIndex !== index));
      input.value?.focus();
    };
    useFormReset(input, () => {
      localValue.value = [...initial];
      draft.value = '';
      emit('update:modelValue', [...initial]);
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'group',
          'aria-label': attrs['aria-label'] ?? 'Tags',
          'data-slot': 'tags-input',
          'data-disabled': props.disabled || undefined,
          'data-readonly': props.readonly || undefined,
          onClick: (event: MouseEvent) => {
            if (typeof attrs.onClick === 'function') attrs.onClick(event);
            input.value?.focus();
          },
        },
        [
          ...tags.value.map((tag, index) =>
            h('span', { 'data-slot': 'tags-input-tag' }, [
              h('span', { 'data-slot': 'tags-input-tag-text' }, tag),
              !props.readonly &&
                h(
                  'button',
                  {
                    type: 'button',
                    'data-slot': 'tags-input-remove',
                    'aria-label': props.getRemoveLabel(tag),
                    disabled: props.disabled,
                    onClick: (event: Event) => {
                      event.stopPropagation();
                      remove(index);
                    },
                  },
                  '\u00d7',
                ),
              props.name &&
                h('input', { type: 'hidden', name: props.name, value: tag }),
            ]),
          ),
          h('input', {
            ref: input,
            type: 'text',
            'data-slot': 'tags-input-control',
            value: draft.value,
            'aria-label': props.inputLabel,
            placeholder: tags.value.length ? undefined : props.placeholder,
            disabled: props.disabled || tags.value.length >= limit.value,
            readonly: props.readonly,
            required: props.required && tags.value.length === 0,
            onInput: (event: Event) =>
              (draft.value = (event.currentTarget as HTMLInputElement).value),
            onKeydown: (event: KeyboardEvent) => {
              if (
                (event.key === 'Enter' || event.key === ',') &&
                !event.isComposing
              ) {
                event.preventDefault();
                add();
              } else if (
                event.key === 'Backspace' &&
                !draft.value &&
                tags.value.length
              ) {
                event.preventDefault();
                remove(tags.value.length - 1);
              }
            },
          }),
        ],
      );
  },
});
