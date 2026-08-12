import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'simurgh-pagination',
  standalone: true,
  template: `<nav [attr.aria-label]="label" data-slot="pagination">
    <ng-content />
  </nav>`,
})
export class PaginationComponent {
  @Input() label = 'Pagination';
}

@Directive({
  selector: 'ul[simurghPaginationContent]',
  standalone: true,
  host: { 'data-slot': 'pagination-content' },
})
export class PaginationContentDirective {}

@Directive({
  selector: 'li[simurghPaginationItem]',
  standalone: true,
  host: { 'data-slot': 'pagination-item' },
})
export class PaginationItemDirective {}

@Directive({
  selector: 'a[simurghPaginationLink]',
  standalone: true,
  host: {
    'data-slot': 'pagination-link',
    '[attr.aria-current]': "current ? 'page' : null",
  },
})
export class PaginationLinkDirective {
  @Input() current = false;
}
