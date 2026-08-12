import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-kbd',
  standalone: true,
  template: `<kbd data-slot="kbd"><ng-content /></kbd>`,
})
export class KbdComponent {}
