import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'simurgh-accordion',
  standalone: true,
  template: `<ng-content />`,
})
export class AccordionComponent {
  @Input() multiple = false;
  readonly open = signal<string[]>([]);
  toggle(value: string) {
    this.open.update((items) =>
      items.includes(value)
        ? items.filter((x) => x !== value)
        : this.multiple
          ? [...items, value]
          : [value],
    );
  }
}

@Component({
  selector: 'simurgh-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `<h3>
      <button type="button" [attr.aria-expanded]="expanded" (click)="toggle()">
        <ng-content select="[trigger]" />
      </button>
    </h3>
    <div *ngIf="expanded" role="region"><ng-content /></div>`,
})
export class AccordionItemComponent {
  @Input({ required: true }) value = '';
  constructor(private accordion: AccordionComponent) {}
  get expanded() {
    return this.accordion.open().includes(this.value);
  }
  toggle() {
    this.accordion.toggle(this.value);
  }
}
