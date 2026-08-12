import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
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

const toggleGroupKey: InjectionKey<{
  values: Ref<string[]>;
  toggle(value: string): void;
}> = Symbol('toggle-group');

export const ToggleGroup = /* @__PURE__ */ defineComponent({
  props: {
    type: {
      type: String as PropType<'single' | 'multiple'>,
      default: 'single',
    },
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const local = ref([...props.defaultValue]);
    const values = computed(() => props.modelValue ?? local.value);
    const toggle = (item: string) => {
      const next = values.value.includes(item)
        ? values.value.filter((entry) => entry !== item)
        : props.type === 'single'
          ? [item]
          : [...values.value, item];
      if (props.modelValue === undefined) local.value = next;
      emit('update:modelValue', next);
    };
    provide(toggleGroupKey, { values, toggle });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'group',
          'aria-orientation': props.orientation,
          dir: props.direction,
          'data-slot': 'toggle-group',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[data-toggle-group-item]:not(:disabled)',
              ),
            );
            const index = items.indexOf(document.activeElement as HTMLElement);
            const target = nextIndex(index, items.length, event.key, {
              orientation: props.orientation,
              direction: props.direction,
            });
            if (target !== index) {
              event.preventDefault();
              items[target]?.focus();
            }
          },
        },
        slots.default?.(),
      );
  },
});

export const ToggleGroupItem = /* @__PURE__ */ defineComponent({
  props: { value: { type: String, required: true }, disabled: Boolean },
  setup(props, { attrs, slots }) {
    const group = inject(toggleGroupKey)!;
    return () => {
      const pressed = group.values.value.includes(props.value);
      return h(
        'button',
        {
          ...attrs,
          type: 'button',
          disabled: props.disabled,
          'data-toggle-group-item': '',
          'data-slot': 'toggle-group-item',
          'aria-pressed': pressed,
          'data-state': pressed ? 'on' : 'off',
          onClick: props.disabled ? undefined : () => group.toggle(props.value),
        },
        slots.default?.(),
      );
    };
  },
});
