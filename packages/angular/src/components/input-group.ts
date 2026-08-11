import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-input-group',
  standalone: true,
  template: `<ng-content />`,
  host: { role: 'group', '[attr.data-slot]': "'input-group'" },
})
export class InputGroupComponent {}

@Component({
  selector: 'simurgh-input-group-addon',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.data-align]': 'align',
    '[attr.data-slot]': "'input-group-addon'",
  },
})
export class InputGroupAddonComponent {
  @Input() align: 'inline-start' | 'inline-end' | 'block-start' | 'block-end' =
    'inline-start';
  @Input() decorative = false;
}

@Component({
  selector: 'simurgh-input-group-text',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'input-group-text'" },
})
export class InputGroupTextComponent {}
