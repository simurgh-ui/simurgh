import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const ItemGroup = /* @__PURE__ */ defineComponent({
  name: 'SimurghItemGroup',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, role: attrs['role'] ?? 'list', 'data-slot': 'item-group' },
        slots.default?.(),
      );
  },
});
export const Item = /* @__PURE__ */ defineComponent({
  name: 'SimurghItem',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, role: attrs['role'] ?? 'listitem', 'data-slot': 'item' },
        slots.default?.(),
      );
  },
});
export const ItemMedia = /* @__PURE__ */ defineComponent({
  name: 'SimurghItemMedia',
  props: { decorative: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-hidden': props.decorative || undefined,
          'data-slot': 'item-media',
        },
        slots.default?.(),
      );
  },
});
export const ItemContent = /* @__PURE__ */ cardPart(
  'SimurghItemContent',
  'div',
  'item-content',
);
export const ItemTitle = /* @__PURE__ */ cardPart(
  'SimurghItemTitle',
  'h3',
  'item-title',
);
export const ItemDescription = /* @__PURE__ */ cardPart(
  'SimurghItemDescription',
  'p',
  'item-description',
);
export const ItemActions = /* @__PURE__ */ cardPart(
  'SimurghItemActions',
  'div',
  'item-actions',
);
