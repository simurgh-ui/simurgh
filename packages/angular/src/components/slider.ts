import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-slider',
  standalone: true,
  template: `<input
    type="range"
    data-slot="slider"
    [value]="value"
    [min]="min"
    [max]="max"
    [step]="step"
    [name]="name"
    [disabled]="disabled"
    [required]="required"
    [attr.aria-invalid]="invalid || null"
    [attr.aria-label]="label || null"
    (input)="update($event)"
  />`,
})
export class SliderComponent extends FormResetBase {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() name?: string;
  @Input() label?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<number>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  update(event: Event) {
    this.value = (event.target as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(this.value);
  }
}
