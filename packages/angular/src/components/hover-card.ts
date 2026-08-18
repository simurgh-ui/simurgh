import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-hover-card',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      [attr.data-simurgh-floating-reference]="floatingId"
      data-slot="hover-card-trigger"
      [attr.aria-expanded]="open"
      (mouseenter)="openFromHover($event)"
      (mouseleave)="closeFromHover($event)"
      (focusin)="openFromFocus($event)"
      (focusout)="closeFromFocus($event)"
      (keydown)="onReferenceKeydown($event)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      [attr.data-simurgh-floating-content]="floatingId"
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
  protected override interactionKind = 'hovercard' as const;
  @Input() label = 'Additional information';
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}
