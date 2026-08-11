import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Table = /* @__PURE__ */ cardPart('SimurghTable', 'table', 'table');
export const TableHeader = /* @__PURE__ */ cardPart(
  'SimurghTableHeader',
  'thead',
  'table-header',
);
export const TableBody = /* @__PURE__ */ cardPart(
  'SimurghTableBody',
  'tbody',
  'table-body',
);
export const TableFooter = /* @__PURE__ */ cardPart(
  'SimurghTableFooter',
  'tfoot',
  'table-footer',
);
export const TableRow = /* @__PURE__ */ cardPart(
  'SimurghTableRow',
  'tr',
  'table-row',
);
export const TableHead = /* @__PURE__ */ defineComponent({
  name: 'SimurghTableHead',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'th',
        { scope: 'col', ...attrs, 'data-slot': 'table-head' },
        slots.default?.(),
      );
  },
});
export const TableCell = /* @__PURE__ */ cardPart(
  'SimurghTableCell',
  'td',
  'table-cell',
);
export const TableCaption = /* @__PURE__ */ cardPart(
  'SimurghTableCaption',
  'caption',
  'table-caption',
);
