import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogComponent } from './dialog.js';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'simurgh-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-sheet"
      data-slot="sheet-content"
      [attr.data-side]="side"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class SheetComponent extends DialogComponent {
  @Input() side: SheetSide = 'right';
}
