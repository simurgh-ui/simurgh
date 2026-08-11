import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-breadcrumb',
  standalone: true,
  template: `<nav [attr.aria-label]="label"><ng-content /></nav>`,
})
export class BreadcrumbComponent {
  @Input() label = 'Breadcrumb';
}
