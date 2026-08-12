import { Component, Input } from '@angular/core';

@Component({
  selector: 'simurgh-field',
  standalone: true,
  template: `<fieldset data-slot="field" [disabled]="disabled">
    <ng-content />
  </fieldset>`,
})
export class FieldComponent {
  @Input() disabled = false;
}

@Component({
  selector: 'simurgh-field-legend',
  standalone: true,
  template: `<legend data-slot="field-legend"><ng-content /></legend>`,
})
export class FieldLegendComponent {}

@Component({
  selector: 'simurgh-field-description',
  standalone: true,
  template: `<p data-slot="field-description"><ng-content /></p>`,
})
export class FieldDescriptionComponent {}

@Component({
  selector: 'simurgh-field-error',
  standalone: true,
  template: `<p data-slot="field-error" role="alert"><ng-content /></p>`,
})
export class FieldErrorComponent {}
