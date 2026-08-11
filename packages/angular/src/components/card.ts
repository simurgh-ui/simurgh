import { Component } from '@angular/core';

@Component({
  selector: 'simurgh-card',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card' },
})
export class CardComponent {}

@Component({
  selector: 'simurgh-card-header',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-header' },
})
export class CardHeaderComponent {}

@Component({
  selector: 'simurgh-card-title',
  standalone: true,
  template: `<h3 data-slot="card-title"><ng-content /></h3>`,
})
export class CardTitleComponent {}

@Component({
  selector: 'simurgh-card-description',
  standalone: true,
  template: `<p data-slot="card-description"><ng-content /></p>`,
})
export class CardDescriptionComponent {}

@Component({
  selector: 'simurgh-card-content',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-content' },
})
export class CardContentComponent {}

@Component({
  selector: 'simurgh-card-footer',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-footer' },
})
export class CardFooterComponent {}
