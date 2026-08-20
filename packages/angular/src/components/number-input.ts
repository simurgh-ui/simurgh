import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-number-input',
  standalone: true,
  template: `<div
    data-slot="number-input"
    [attr.data-disabled]="disabled || null"
    [attr.data-readonly]="readonly || null"
  >
    <button
      type="button"
      data-slot="number-input-decrement"
      [attr.aria-label]="decrementLabel"
      [attr.aria-controls]="inputId"
      [disabled]="disabled || readonly || value <= lowerBound"
      (click)="changeBy(-safeStep)"
    >
      −
    </button>
    <input
      #control
      [id]="inputId"
      type="number"
      data-slot="number-input-control"
      [attr.aria-label]="ariaLabel"
      [attr.name]="name || null"
      [value]="value"
      [min]="min"
      [max]="max"
      [step]="safeStep"
      [disabled]="disabled"
      [readOnly]="readonly"
      [required]="required"
      (input)="setValue(control.valueAsNumber)"
    />
    <button
      type="button"
      data-slot="number-input-increment"
      [attr.aria-label]="incrementLabel"
      [attr.aria-controls]="inputId"
      [disabled]="disabled || readonly || value >= upperBound"
      (click)="changeBy(safeStep)"
    >
      +
    </button>
  </div>`,
})
export class NumberInputComponent extends FormResetBase {
  @Input() inputId = createId('number');
  @Input('aria-label') ariaLabel = 'Number';
  @Input() value = 0;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() step = 1;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() incrementLabel = 'Increase value';
  @Input() decrementLabel = 'Decrease value';
  @Output() valueChange = new EventEmitter<number>();
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  get safeStep() {
    return Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
  }
  get lowerBound() {
    return this.min ?? -Infinity;
  }
  get upperBound() {
    return this.max ?? Infinity;
  }
  changeBy(amount: number) {
    this.setValue(this.value + amount);
  }
  setValue(next: number) {
    if (Number.isNaN(next)) return;
    this.value = Math.min(this.upperBound, Math.max(this.lowerBound, next));
    this.valueChange.emit(this.value);
  }
}
