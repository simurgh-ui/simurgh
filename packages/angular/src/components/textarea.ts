import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-textarea',
  standalone: true,
  template: `<textarea
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  ></textarea>`,
})
export class TextareaComponent extends FormResetBase {
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }
}
