import { Component, EventEmitter, Input, Output } from '@angular/core';

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
export class TextareaComponent {
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }
}
