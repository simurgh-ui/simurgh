import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-visually-hidden',
  standalone: true,
  template: `<ng-content />`,
  host: {
    style:
      'position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0',
  },
})
export class VisuallyHiddenComponent {}
