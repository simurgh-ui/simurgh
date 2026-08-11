import { nextIndex, type Direction } from '@simurgh-ui/core';
import { defineComponent, h, onMounted, ref, type PropType } from 'vue';

export const Menubar = /* @__PURE__ */ defineComponent({
  name: 'SimurghMenubar',
  props: {
    label: { type: String, default: 'Application menu' },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  setup(props, { attrs, slots }) {
    const root = ref<HTMLElement | null>(null);
    onMounted(() => {
      const first = root.value?.querySelector<HTMLElement>(
        '[role=menuitem]:not([aria-disabled=true])',
      );
      if (first) first.tabIndex = 0;
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          ref: root,
          role: 'menubar',
          'aria-label': props.label,
          dir: props.direction,
          'data-slot': 'menubar',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[role=menuitem]:not([aria-disabled=true])',
              ),
            );
            const current = items.indexOf(
              document.activeElement as HTMLElement,
            );
            const target = nextIndex(current, items.length, event.key, {
              orientation: 'horizontal',
              direction: props.direction,
            });
            if (target !== current) {
              event.preventDefault();
              items.forEach((item, index) =>
                item.setAttribute('tabindex', index === target ? '0' : '-1'),
              );
              items[target]?.focus();
            }
          },
        },
        slots.default?.(),
      );
  },
});

export const MenubarItem = /* @__PURE__ */ defineComponent({
  name: 'SimurghMenubarItem',
  props: { disabled: Boolean },
  emits: ['select'],
  setup(props, { attrs, slots, emit }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'menuitem',
          tabindex: -1,
          disabled: props.disabled,
          'aria-disabled': props.disabled || undefined,
          'data-slot': 'menubar-item',
          onClick: () => !props.disabled && emit('select'),
        },
        slots.default?.(),
      );
  },
});
