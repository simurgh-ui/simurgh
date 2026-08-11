import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-empty',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.role]': "status ? 'status' : null",
    '[attr.aria-live]': "status ? 'polite' : null",
    '[attr.data-slot]': "'empty'",
  },
})
export class EmptyComponent {
  @Input() status = false;
}

@Component({
  selector: 'simurgh-empty-header',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'empty-header'" },
})
export class EmptyHeaderComponent {}

@Component({
  selector: 'simurgh-empty-media',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.data-slot]': "'empty-media'",
  },
})
export class EmptyMediaComponent {
  @Input() decorative = true;
}

@Component({
  selector: 'simurgh-empty-title',
  standalone: true,
  template: `<h3 data-slot="empty-title"><ng-content /></h3>`,
})
export class EmptyTitleComponent {}

@Component({
  selector: 'simurgh-empty-description',
  standalone: true,
  template: `<p data-slot="empty-description"><ng-content /></p>`,
})
export class EmptyDescriptionComponent {}

@Component({
  selector: 'simurgh-empty-content',
  standalone: true,
  template: `<ng-content />`,
  host: { '[attr.data-slot]': "'empty-content'" },
})
export class EmptyContentComponent {}
