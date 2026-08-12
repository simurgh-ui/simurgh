import { CheckBase } from '../internal/check-base.js';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-switch',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      (click)="toggle()"
    >
      <ng-content /></button
    ><input
      *ngIf="name"
      hidden
      type="checkbox"
      [name]="name"
      [value]="value"
      [checked]="checked"
      [required]="required"
      [disabled]="disabled"
    />`,
})
export class SwitchComponent extends CheckBase {}
