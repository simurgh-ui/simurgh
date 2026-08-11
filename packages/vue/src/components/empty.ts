import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Empty = /* @__PURE__ */ defineComponent({
  name: 'SimurghEmpty',
  props: { status: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: props.status ? 'status' : attrs['role'],
          'aria-live': props.status ? 'polite' : attrs['aria-live'],
          'data-slot': 'empty',
        },
        slots.default?.(),
      );
  },
});
export const EmptyHeader = /* @__PURE__ */ cardPart(
  'SimurghEmptyHeader',
  'div',
  'empty-header',
);
export const EmptyMedia = /* @__PURE__ */ defineComponent({
  name: 'SimurghEmptyMedia',
  props: { decorative: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-hidden': props.decorative || undefined,
          'data-slot': 'empty-media',
        },
        slots.default?.(),
      );
  },
});
export const EmptyTitle = /* @__PURE__ */ cardPart(
  'SimurghEmptyTitle',
  'h3',
  'empty-title',
);
export const EmptyDescription = /* @__PURE__ */ cardPart(
  'SimurghEmptyDescription',
  'p',
  'empty-description',
);
export const EmptyContent = /* @__PURE__ */ cardPart(
  'SimurghEmptyContent',
  'div',
  'empty-content',
);
