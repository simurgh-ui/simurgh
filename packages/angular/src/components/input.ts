import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simurgh-input',
  standalone: true,
  template: `<input
    data-slot="input"
    [type]="type"
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  />`,
})
export class InputComponent {
  @Input() type = 'text';
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
