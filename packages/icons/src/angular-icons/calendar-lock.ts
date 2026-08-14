import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { definition } from '../definitions/calendar-lock.js';
import type { IconDefinition } from '../types.js';
@Component({ selector: 'simurgh-calendar-lock-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg [attr.width]="size()" [attr.height]="size()" [attr.viewBox]="icon.viewBox"
    [attr.role]="title() ? 'img' : null" [attr.aria-hidden]="title() ? null : 'true'"
    [attr.aria-label]="title() || null" focusable="false"><g [attr.transform]="transform()">
    @for (path of icon.paths; track $index) {<path [attr.d]="path.d" [attr.fill]="pathFill(path.fill, $index)" [attr.opacity]="path.opacity ?? null" />}
    </g></svg>` })
export class CalendarLock {
  readonly size = input<number | string>(24); readonly title = input<string>(); readonly colorMode = input<'duotone' | 'currentColor'>('duotone');
  readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true);
  readonly icon: IconDefinition = definition;
  readonly transform = computed(() => this.mirrorInRtl() && this.direction() === 'rtl' && this.icon.direction === 'directional'
    ? `translate(144 0) scale(-1 1) ${this.icon.transform}` : this.icon.transform);
  pathFill(fill: string, index: number): string { return this.colorMode() === 'currentColor' ? 'currentColor' : index === 0 ? `var(--simurgh-icon-primary, ${fill})` : `var(--simurgh-icon-secondary, ${fill})`; }
}
