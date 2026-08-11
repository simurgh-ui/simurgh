import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-rating',
  standalone: true,
  template: `<div
    role="radiogroup"
    data-slot="rating"
    [attr.aria-label]="ariaLabel"
    [attr.data-disabled]="disabled || null"
  >
    @for (item of items; track item) {
      <label data-slot="rating-item">
        <input
          type="radio"
          data-slot="rating-control"
          [name]="groupName"
          [value]="item"
          [checked]="normalizedValue === item"
          [disabled]="disabled"
          [required]="required"
          [attr.aria-label]="itemLabel(item)"
          (change)="select(item)"
        />
        <span
          data-slot="rating-icon"
          [attr.data-selected]="item <= normalizedValue || null"
          aria-hidden="true"
          >&#9733;</span
        >
      </label>
    }
  </div>`,
})
export class RatingComponent {
  private count = 5;
  readonly generatedName = createId('rating');
  items = [1, 2, 3, 4, 5];
  @Input() value = 0;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input('aria-label') ariaLabel = 'Rating';
  @Input() set max(value: number) {
    this.count = Number.isFinite(value)
      ? Math.min(100, Math.max(1, Math.floor(value)))
      : 5;
    this.items = Array.from({ length: this.count }, (_, index) => index + 1);
  }
  @Output() valueChange = new EventEmitter<number>();
  get groupName() {
    return this.name ?? this.generatedName;
  }
  get normalizedValue() {
    return Math.min(this.count, Math.max(0, Math.round(this.value)));
  }
  itemLabel(value: number) {
    return `${value} of ${this.count}`;
  }
  select(value: number) {
    if (this.disabled) return;
    this.value = value;
    this.valueChange.emit(value);
  }
}
