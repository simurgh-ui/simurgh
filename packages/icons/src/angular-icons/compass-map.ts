import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { explicitMirrorTransform, iconDirectionMode, iconDirectionStyles } from '../direction.js';
import { definition } from '../definitions/compass-map.js';
import type { IconDefinition } from '../types.js';
@Component({ selector: 'simurgh-compass-map-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg [attr.width]="size()" [attr.height]="size()" [attr.viewBox]="icon.viewBox"
    [attr.role]="title() ? 'img' : null" [attr.aria-hidden]="title() ? null : 'true'"
    [attr.aria-label]="title() || null" [attr.data-simurgh-direction]="directionMode()" focusable="false">
    <g class="simurgh-icon-directional" [attr.transform]="mirrorTransform()"><g [attr.transform]="icon.transform">
      @for (path of icon.paths; track $index) {<path [attr.d]="path.d" [attr.fill]="pathFill(path.fill, $index)" [attr.opacity]="path.opacity ?? null" />}
    </g></g></svg>`, styles: [iconDirectionStyles] })
export class CompassMap {
  readonly size = input<number | string>(24); readonly title = input<string>(); readonly colorMode = input<'duotone' | 'currentColor'>('duotone');
  readonly direction = input<'ltr' | 'rtl'>(); readonly mirrorInRtl = input(true);
  readonly icon: IconDefinition = definition;
  readonly directionMode = computed(() => iconDirectionMode(this.direction(), this.mirrorInRtl(), this.icon.direction === 'directional'));
  readonly mirrorTransform = computed(() => explicitMirrorTransform(this.directionMode()));
  pathFill(fill: string, index: number): string { return this.colorMode() === 'currentColor' ? 'currentColor' : index === 0 ? `var(--simurgh-icon-primary, ${fill})` : `var(--simurgh-icon-secondary, ${fill})`; }
}
