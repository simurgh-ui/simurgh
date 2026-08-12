import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      (mouseenter)="setOpen(true)"
      (mouseleave)="setOpen(false)"
      (focusin)="setOpen(true)"
      (focusout)="setOpen(false)"
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
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}
