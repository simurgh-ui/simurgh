import { defineComponent, h } from 'vue';
import {
  FloatingContent,
  FloatingTrigger,
  floatingRoot,
} from '../internal/floating-parts.js';

export const HoverCard = /* @__PURE__ */ floatingRoot(
  'SimurghHoverCard',
  'hovercard',
);
export const HoverCardTrigger = /* @__PURE__ */ defineComponent({
  name: 'SimurghHoverCardTrigger',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        FloatingTrigger,
        { ...attrs, 'data-slot': 'hover-card-trigger' },
        slots,
      );
  },
});
export const HoverCardContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghHoverCardContent',
  props: { label: { type: String, default: 'Additional information' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        FloatingContent,
        {
          ...attrs,
          role: 'dialog',
          'aria-label': props.label,
          'data-slot': 'hover-card-content',
        },
        slots,
      );
  },
});
