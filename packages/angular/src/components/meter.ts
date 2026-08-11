import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-meter',
  standalone: true,
  template: `<meter
    data-slot="meter"
    role="meter"
    [value]="safeValue"
    [min]="min"
    [max]="max"
    [attr.low]="low ?? null"
    [attr.high]="high ?? null"
    [attr.optimum]="optimum ?? null"
    [attr.aria-label]="label || null"
  >
    <ng-content />{{ safeValue }}
  </meter>`,
})
export class MeterComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() low?: number;
  @Input() high?: number;
  @Input() optimum?: number;
  @Input() label?: string;
  get safeValue() {
    return Math.min(this.max, Math.max(this.min, this.value));
  }
}
