import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-hover-card',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      data-slot="hover-card-trigger"
      [attr.aria-expanded]="open"
      (mouseenter)="setOpen(true)"
      (mouseleave)="setOpen(false)"
      (focusin)="setOpen(true)"
      (focusout)="setOpen(false)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      *ngIf="open"
      role="dialog"
      data-slot="hover-card-content"
      [attr.aria-label]="label"
      class="simurgh-content"
      style="position:fixed"
    >
      <ng-content />
    </div>`,
})
export class HoverCardComponent extends FloatingBase {
  @Input() label = 'Additional information';
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}
