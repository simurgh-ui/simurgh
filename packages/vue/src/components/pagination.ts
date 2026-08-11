import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Pagination = /* @__PURE__ */ defineComponent({
  name: 'SimurghPagination',
  props: { label: { type: String, default: 'Pagination' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'nav',
        { ...attrs, 'aria-label': props.label, 'data-slot': 'pagination' },
        slots.default?.(),
      );
  },
});
export const PaginationContent = /* @__PURE__ */ cardPart(
  'SimurghPaginationContent',
  'ul',
  'pagination-content',
);
export const PaginationItem = /* @__PURE__ */ cardPart(
  'SimurghPaginationItem',
  'li',
  'pagination-item',
);
export const PaginationLink = /* @__PURE__ */ defineComponent({
  name: 'SimurghPaginationLink',
  props: { current: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          'aria-current': props.current ? 'page' : undefined,
          'data-slot': 'pagination-link',
        },
        slots.default?.(),
      );
  },
});
