import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-item-group',
  standalone: true,
  template: `<ng-content />`,
  host: { role: 'list', '[attr.data-slot]': "'item-group'" },
})
export class ItemGroupComponent {}

@Component({
  selector: 'simurgh-item',
  standalone: true,
  template: `<ng-content />`,
  host: { role: 'listitem', '[attr.data-slot]': "'item'" },
})
export class ItemComponent {}

@Component({
  selector: 'simurgh-item-media',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.data-slot]': "'item-media'",
  },
})
export class ItemMediaComponent {
  @Input() decorative = true;
}

@Component({
  selector: 'simurgh-item-content',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'item-content'" },
})
export class ItemContentComponent {}

@Component({
  selector: 'simurgh-item-title',
  standalone: true,
  template: `<h3 data-slot="item-title"><ng-content /></h3>`,
})
export class ItemTitleComponent {}

@Component({
  selector: 'simurgh-item-description',
  standalone: true,
  template: `<p data-slot="item-description"><ng-content /></p>`,
})
export class ItemDescriptionComponent {}

@Component({
  selector: 'simurgh-item-actions',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'item-actions'" },
})
export class ItemActionsComponent {}
