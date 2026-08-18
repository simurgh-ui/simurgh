import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      (mouseenter)="openFromHover($event)"
      (mouseleave)="closeFromHover($event)"
      (focusin)="openFromFocus($event)"
      (focusout)="closeFromFocus($event)"
      (keydown)="onReferenceKeydown($event)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      *ngIf="open"
      role="tooltip"
      class="simurgh-content"
      style="position:fixed"
    >
      <ng-content />
    </div>`,
})
export class TooltipComponent extends FloatingBase {
  protected override interactionKind = 'tooltip' as const;
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}
