import {
  createId,
  nextIndex,
  typeaheadIndex,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';
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

type TabsContext = {
  value: Ref<string>;
  setValue(value: string): void;
  id: string;
  orientation: Ref<Orientation>;
  direction: Ref<Direction>;
};
const tabsKey: InjectionKey<TabsContext> = Symbol('tabs');

export const Tabs = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabs',
  props: {
    modelValue: { type: String, default: '' },
    defaultValue: { type: String, default: '' },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultValue);
    const value = computed({
      get: () => props.modelValue || local.value,
      set: (next) => {
        local.value = next;
        emit('update:modelValue', next);
      },
    });
    provide(tabsKey, {
      value,
      setValue: (next) => (value.value = next),
      id: createId('tabs'),
      orientation: computed(() => props.orientation),
      direction: computed(() => props.direction),
    });
    return () => slots.default?.();
  },
});

export const TabsList = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabsList',
  setup(_, { slots, attrs }) {
    const context = inject(tabsKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'tablist',
          'aria-orientation': context.orientation.value,
          onKeydown: (event: KeyboardEvent) => {
            const nodes = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>('[role=tab]:not([disabled])'),
            );
            const index = nodes.indexOf(document.activeElement as HTMLElement);
            const directional = nextIndex(index, nodes.length, event.key, {
              orientation: context.orientation.value,
              direction: context.direction.value,
            });
            const next =
              directional === index
                ? typeaheadIndex(
                    nodes.map((node) => node.textContent ?? ''),
                    index,
                    event.key,
                  )
                : directional;
            if (next !== index) {
              event.preventDefault();
              nodes[next]?.focus();
              nodes[next]?.click();
            }
          },
        },
        slots.default?.(),
      );
  },
});

export const TabsTrigger = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabsTrigger',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    const context = inject(tabsKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'tab',
          'aria-selected': context.value.value === props.value,
          tabindex: context.value.value === props.value ? 0 : -1,
          onClick: () => context.setValue(props.value),
        },
        slots.default?.(),
      );
  },
});

export const TabsContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabsContent',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    const context = inject(tabsKey)!;
    return () =>
      context.value.value === props.value
        ? h(
            'div',
            { ...attrs, role: 'tabpanel', tabindex: 0 },
            slots.default?.(),
          )
        : null;
  },
});
