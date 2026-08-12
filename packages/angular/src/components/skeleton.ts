import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-skeleton',
  standalone: true,
  template: '',
  host: {
    '[attr.role]': "label ? 'status' : null",
    '[attr.aria-label]': 'label || null',
    '[attr.aria-busy]': "label ? 'true' : null",
    '[attr.aria-hidden]': "label ? null : 'true'",
    '[attr.data-state]': "'loading'",
  },
})
export class SkeletonComponent {
  @Input() label?: string;
}
