import type { Orientation } from '@simurgh-ui/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-separator',
  standalone: true,
  template: '',
  host: {
    '[attr.role]': "decorative ? 'none' : 'separator'",
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.aria-orientation]': 'decorative ? null : orientation',
    '[attr.data-orientation]': 'orientation',
  },
})
export class SeparatorComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() decorative = false;
}
