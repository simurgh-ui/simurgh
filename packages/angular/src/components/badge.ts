import { Component, Input } from '@angular/core';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'simurgh-badge',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.data-tone]': 'tone',
    '[attr.role]': "status ? 'status' : null",
    '[attr.aria-live]': "status ? 'polite' : null",
  },
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input() status = false;
}
