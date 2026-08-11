import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-progress',
  standalone: true,
  template: `<span
    data-part="indicator"
    [style.inline-size.%]="percentage"
  ></span>`,
  host: {
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'safeMax',
    '[attr.aria-valuenow]': 'safeValue',
    '[attr.aria-valuetext]': 'valueText',
    '[attr.data-state]': "safeValue === null ? 'indeterminate' : 'determinate'",
    '[attr.data-value]': 'safeValue',
    '[attr.data-max]': 'safeMax',
  },
})
export class ProgressComponent {
  @Input() value: number | null = null;
  @Input() max = 100;
  @Input() getValueLabel?: (value: number, max: number) => string;
  get safeMax() {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
  }
  get safeValue() {
    return this.value == null || !Number.isFinite(this.value)
      ? null
      : Math.min(this.safeMax, Math.max(0, this.value));
  }
  get percentage() {
    return this.safeValue == null
      ? null
      : (this.safeValue / this.safeMax) * 100;
  }
  get valueText() {
    return this.safeValue == null
      ? null
      : this.getValueLabel?.(this.safeValue, this.safeMax);
  }
}
