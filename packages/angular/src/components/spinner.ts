import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-spinner',
  standalone: true,
  template: `<span aria-hidden="true" data-part="indicator"
    ><ng-content>◌</ng-content></span
  >`,
  host: {
    role: 'status',
    '[attr.aria-label]': 'label',
    '[attr.aria-live]': "'polite'",
    '[attr.aria-busy]': "'true'",
    '[attr.data-state]': "'loading'",
  },
})
export class SpinnerComponent {
  @Input() label = 'Loading';
}
