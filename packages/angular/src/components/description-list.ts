import { Directive } from '@angular/core';

@Directive({
  selector: 'dl[simurghDescriptionList]',
  standalone: true,
  host: { 'data-slot': 'description-list' },
})
export class DescriptionListDirective {}

@Directive({
  selector: 'div[simurghDescriptionListGroup]',
  standalone: true,
  host: { 'data-slot': 'description-list-group' },
})
export class DescriptionListGroupDirective {}

@Directive({
  selector: 'dt[simurghDescriptionListTerm]',
  standalone: true,
  host: { 'data-slot': 'description-list-term' },
})
export class DescriptionListTermDirective {}

@Directive({
  selector: 'dd[simurghDescriptionListDetails]',
  standalone: true,
  host: { 'data-slot': 'description-list-details' },
})
export class DescriptionListDetailsDirective {}
