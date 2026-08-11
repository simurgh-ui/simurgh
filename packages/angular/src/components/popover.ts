import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingBase } from '../internal.js';

const floatingTemplate = `<button #reference type="button" class="simurgh-trigger" aria-haspopup="dialog" [attr.aria-expanded]="open" [disabled]="disabled" (click)="toggle()"><ng-content select="[trigger]"/></button><div #floating *ngIf="open" role="dialog" [attr.aria-label]="contentLabel" class="simurgh-content" style="position:fixed" (keydown.escape)="close()"><ng-content/></div>`;

@Component({
  selector: 'simurgh-popover',
  standalone: true,
  imports: [CommonModule],
  template: floatingTemplate,
})
export class PopoverComponent extends FloatingBase {}
