// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'preact/compat';

export const Table = /* @__PURE__ */ forwardRef<
  HTMLTableElement,
  TableHTMLAttributes<HTMLTableElement>
>(function Table(props, ref) {
  return <table ref={ref} data-slot="table" {...props} />;
});
export const TableHeader = /* @__PURE__ */ forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader(props, ref) {
  return <thead ref={ref} data-slot="table-header" {...props} />;
});
export const TableBody = /* @__PURE__ */ forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody(props, ref) {
  return <tbody ref={ref} data-slot="table-body" {...props} />;
});
export const TableFooter = /* @__PURE__ */ forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter(props, ref) {
  return <tfoot ref={ref} data-slot="table-footer" {...props} />;
});
export const TableRow = /* @__PURE__ */ forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(function TableRow(props, ref) {
  return <tr ref={ref} data-slot="table-row" {...props} />;
});
export const TableHead = /* @__PURE__ */ forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(function TableHead({ scope = 'col', ...props }, ref) {
  return <th ref={ref} scope={scope} data-slot="table-head" {...props} />;
});
export const TableCell = /* @__PURE__ */ forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(function TableCell(props, ref) {
  return <td ref={ref} data-slot="table-cell" {...props} />;
});
export const TableCaption = /* @__PURE__ */ forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption(props, ref) {
  return <caption ref={ref} data-slot="table-caption" {...props} />;
});
