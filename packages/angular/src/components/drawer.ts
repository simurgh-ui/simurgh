import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogComponent } from './dialog.js';

@Component({
  selector: 'simurgh-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-sheet"
      data-slot="drawer-content"
      data-drawer
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
export class DrawerComponent extends DialogComponent {
  @Input() side: 'top' | 'bottom' = 'bottom';
}
