import type { Orientation } from '@simurgh-ui/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-button-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'group',
    '[attr.aria-orientation]': 'orientation',
    '[attr.data-slot]': "'button-group'",
  },
})
export class ButtonGroupComponent {
  @Input() orientation: Orientation = 'horizontal';
}

@Component({
  selector: 'simurgh-button-group-text',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'button-group-text'" },
})
export class ButtonGroupTextComponent {}

@Component({
  selector: 'simurgh-button-group-separator',
  standalone: true,
  template: ``,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation',
    '[attr.data-slot]': "'button-group-separator'",
  },
})
export class ButtonGroupSeparatorComponent {
  @Input() orientation: Orientation = 'vertical';
}
