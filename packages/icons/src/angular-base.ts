import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { getIcon, type IconName } from './icons.generated.js';

@Component({
  selector: 'simurgh-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg [attr.width]="size()" [attr.height]="size()" [attr.viewBox]="icon().viewBox"
    [attr.role]="title() ? 'img' : null" [attr.aria-hidden]="title() ? null : 'true'"
    [attr.aria-label]="title() || null" focusable="false"><g [attr.transform]="transform()">
    @for (path of icon().paths; track $index) {<path [attr.d]="path.d" [attr.fill]="path.fill" [attr.opacity]="path.opacity ?? null" />}
    </g></svg>`,
})
export class SimurghIcon {
  readonly name = input.required<IconName>();
  readonly size = input<number | string>(24);
  readonly title = input<string>();
  readonly direction = input<'ltr' | 'rtl'>('ltr');
  readonly mirrorInRtl = input(true);
  readonly icon = computed(() => getIcon(this.name()));
  readonly transform = computed(() => this.mirrorInRtl() && this.direction() === 'rtl' && this.icon().direction === 'directional'
    ? `translate(144 0) scale(-1 1) ${this.icon().transform}` : this.icon().transform);
}
