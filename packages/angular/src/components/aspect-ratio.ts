import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-aspect-ratio',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[style.aspect-ratio]': "'' + safeRatio",
    '[attr.data-ratio]': 'safeRatio',
  },
})
export class AspectRatioComponent {
  @Input() ratio = 1;
  get safeRatio() {
    return Number.isFinite(this.ratio) && this.ratio > 0 ? this.ratio : 1;
  }
}
