import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingBase } from '../internal/floating-base.js';

const floatingTemplate = `<button #reference type="button" class="simurgh-trigger" aria-haspopup="dialog" [attr.aria-expanded]="open" [attr.data-simurgh-floating-reference]="floatingId" [disabled]="disabled" (click)="toggle($event)" (keydown)="onReferenceKeydown($event)"><ng-content select="[trigger]"/></button><div #floating *ngIf="open" role="dialog" [attr.aria-label]="contentLabel" [attr.data-simurgh-floating-content]="floatingId" class="simurgh-content" style="position:fixed" (keydown)="onFloatingKeydown($event)"><ng-content/></div>`;

@Component({
  selector: 'simurgh-popover',
  standalone: true,
  imports: [CommonModule],
  template: floatingTemplate,
})
export class PopoverComponent extends FloatingBase {}
