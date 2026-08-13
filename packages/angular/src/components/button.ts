import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-button',
  standalone: true,
  template: `<button
    [attr.type]="type"
    [disabled]="disabled || loading"
    [attr.aria-busy]="loading || null"
    data-slot="button"
    [attr.data-state]="loading ? 'loading' : 'idle'"
    [attr.data-variant]="variant"
    [attr.data-size]="size"
    [attr.data-full-width]="fullWidth || null"
    [attr.data-icon-only]="iconOnly || null"
  >
    <ng-content />
  </button>`,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' | 'destructive' | 'quiet' =
    'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth = false;
  @Input() iconOnly = false;
}
