import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.role]': "urgent ? 'alert' : 'status'",
    '[attr.aria-live]': "urgent ? 'assertive' : 'polite'",
    '[attr.aria-atomic]': "'true'",
    '[attr.data-urgent]': 'urgent || null',
  },
})
export class AlertComponent {
  @Input() urgent = false;
}
