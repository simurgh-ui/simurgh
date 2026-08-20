import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-input-otp',
  standalone: true,
  template: `<input
    type="text"
    data-slot="input-otp"
    [name]="name || ''"
    [value]="value"
    [maxLength]="length"
    [required]="required"
    [disabled]="disabled"
    [attr.autocomplete]="autocomplete"
    [attr.inputmode]="digitsOnly ? 'numeric' : 'text'"
    [attr.pattern]="digitsOnly ? '[0-9]*' : null"
    [attr.aria-invalid]="invalid || null"
    [style.--simurgh-otp-length]="length"
    (input)="update($event)"
  />`,
})
export class InputOtpComponent extends FormResetBase {
  @Input() name?: string;
  @Input() value = '';
  @Input() length = 6;
  @Input() digitsOnly = true;
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() autocomplete = 'one-time-code';
  @Output() valueChange = new EventEmitter<string>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  update(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = (
      this.digitsOnly ? input.value.replace(/\D/g, '') : input.value
    ).slice(0, this.length);
    input.value = this.value;
    this.valueChange.emit(this.value);
  }
}
