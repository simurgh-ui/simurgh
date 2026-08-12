import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-button',
  standalone: true,
  template: `<button
    [attr.type]="type"
    [disabled]="disabled || loading"
    [attr.aria-busy]="loading || null"
    [attr.data-state]="loading ? 'loading' : 'idle'"
  >
    <ng-content />
  </button>`,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() disabled = false;
}
