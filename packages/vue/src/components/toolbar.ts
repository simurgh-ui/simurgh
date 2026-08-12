import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
import { defineComponent, h, type PropType } from 'vue';

export const Toolbar = /* @__PURE__ */ defineComponent({
  name: 'SimurghToolbar',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
    label: { type: String, default: 'Toolbar' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'toolbar',
          'aria-label': props.label,
          'aria-orientation': props.orientation,
          dir: props.direction,
          'data-slot': 'toolbar',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[data-toolbar-item]:not(:disabled)',
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

export const ToolbarButton = /* @__PURE__ */ defineComponent({
  name: 'SimurghToolbarButton',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-toolbar-item': '',
          'data-slot': 'toolbar-button',
        },
        slots.default?.(),
      );
  },
});
