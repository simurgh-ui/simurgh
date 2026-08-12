import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-link',
  standalone: true,
  template: `<a
    data-slot="link"
    [attr.href]="disabled ? null : href"
    [attr.aria-disabled]="disabled || null"
    [attr.data-external]="external || null"
    [attr.rel]="external ? rel || 'noopener noreferrer' : rel || null"
    [attr.target]="external ? target || '_blank' : target || null"
    [attr.tabindex]="disabled ? -1 : null"
    (click)="activate($event)"
  >
    <ng-content />
  </a>`,
})
export class LinkComponent {
  @Input() href?: string;
  @Input() disabled = false;
  @Input() external = false;
  @Input() rel?: string;
  @Input() target?: string;

  activate(event: MouseEvent) {
    if (this.disabled) event.preventDefault();
  }
}
