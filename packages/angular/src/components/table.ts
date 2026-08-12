import { Directive } from '@angular/core';

@Directive({
  selector: 'table[simurghTable]',
  standalone: true,
  host: { 'data-slot': 'table' },
})
export class TableDirective {}

@Directive({
  selector: 'thead[simurghTableHeader]',
  standalone: true,
  host: { 'data-slot': 'table-header' },
})
export class TableHeaderDirective {}

@Directive({
  selector: 'tbody[simurghTableBody]',
  standalone: true,
  host: { 'data-slot': 'table-body' },
})
export class TableBodyDirective {}

@Directive({
  selector: 'tfoot[simurghTableFooter]',
  standalone: true,
  host: { 'data-slot': 'table-footer' },
})
export class TableFooterDirective {}

@Directive({
  selector: 'tr[simurghTableRow]',
  standalone: true,
  host: { 'data-slot': 'table-row' },
})
export class TableRowDirective {}

@Directive({
  selector: 'th[simurghTableHead]',
  standalone: true,
  host: { 'data-slot': 'table-head', scope: 'col' },
})
export class TableHeadDirective {}

@Directive({
  selector: 'td[simurghTableCell]',
  standalone: true,
  host: { 'data-slot': 'table-cell' },
})
export class TableCellDirective {}

@Directive({
  selector: 'caption[simurghTableCaption]',
  standalone: true,
  host: { 'data-slot': 'table-caption' },
})
export class TableCaptionDirective {}
