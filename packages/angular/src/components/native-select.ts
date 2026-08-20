import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-native-select',
  standalone: true,
  template: `<select
    data-slot="native-select"
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [multiple]="multiple"
    [attr.aria-invalid]="invalid || null"
    (change)="onChange($event)"
  >
    <ng-content />
  </select>`,
})
export class NativeSelectComponent extends FormResetBase {
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() multiple = false;
  @Output() valueChange = new EventEmitter<string | string[]>();
  @Output() change = new EventEmitter<Event>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.valueChange.emit(
      this.multiple
        ? Array.from(select.selectedOptions, (option) => option.value)
        : this.value,
    );
    this.change.emit(event);
  }
}
