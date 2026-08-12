import type { SelectOption } from './select.js';
import { ComboboxComponent } from './combobox.js';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simurgh-command',
  standalone: true,
  imports: [ComboboxComponent],
  template: `<div data-slot="command">
    <simurgh-combobox
      [options]="options"
      [value]="value"
      [name]="name"
      [required]="required"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [noResults]="noResults"
      [ariaLabel]="ariaLabel"
      (valueChange)="choose($event)"
    />
  </div>`,
})
export class CommandComponent {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() placeholder = 'Search commands';
  @Input() noResults = 'No commands found';
  @Input() ariaLabel?: string;
  @Output() valueChange = new EventEmitter<string>();
  choose(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
