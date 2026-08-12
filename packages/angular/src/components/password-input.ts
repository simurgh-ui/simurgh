import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-password-input',
  standalone: true,
  template: `<div
    data-slot="password-input"
    [attr.data-disabled]="disabled || null"
  >
    <input
      [id]="inputId"
      [type]="revealed ? 'text' : 'password'"
      data-slot="password-input-control"
      [attr.aria-label]="ariaLabel"
      [attr.name]="name || null"
      [attr.autocomplete]="autocomplete || null"
      [attr.placeholder]="placeholder || null"
      [value]="value"
      [disabled]="disabled"
      [readOnly]="readonly"
      [required]="required"
      (input)="onInput($event)"
    />
    <button
      type="button"
      data-slot="password-input-toggle"
      [attr.aria-controls]="inputId"
      [attr.aria-label]="revealed ? concealLabel : revealLabel"
      [attr.aria-pressed]="revealed"
      [disabled]="disabled"
      (click)="revealed = !revealed"
    >
      {{ revealed ? 'Hide' : 'Show' }}
    </button>
  </div>`,
})
export class PasswordInputComponent {
  @Input() inputId = createId('password');
  @Input('aria-label') ariaLabel = 'Password';
  @Input() value = '';
  @Input() name?: string;
  @Input() autocomplete = 'current-password';
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() revealLabel = 'Show password';
  @Input() concealLabel = 'Hide password';
  @Output() valueChange = new EventEmitter<string>();
  revealed = false;
  onInput(event: Event) {
    this.value = (event.currentTarget as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
