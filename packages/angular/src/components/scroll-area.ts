import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-scroll-area',
  standalone: true,
  template: `<div
    data-slot="scroll-area"
    [attr.data-orientation]="orientation"
    [attr.role]="label ? 'region' : null"
    [attr.aria-label]="label || null"
    [tabIndex]="tabIndex"
  >
    <ng-content />
  </div>`,
})
export class ScrollAreaComponent {
  @Input() orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Input() label?: string;
  @Input() tabIndex = 0;
}
