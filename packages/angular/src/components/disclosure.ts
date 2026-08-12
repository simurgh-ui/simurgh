import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'simurgh-disclosure',
  standalone: true,
  template: `<details
    data-slot="disclosure"
    [open]="open"
    [attr.data-state]="open ? 'open' : 'closed'"
    (toggle)="onToggle($event)"
  >
    <ng-content />
  </details>`,
})
export class DisclosureComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  onToggle(event: Event) {
    const next = (event.currentTarget as HTMLDetailsElement).open;
    if (next === this.open) return;
    this.open = next;
    this.openChange.emit(next);
  }
}

@Directive({
  selector: 'summary[simurghDisclosureSummary]',
  standalone: true,
  host: { 'data-slot': 'disclosure-summary' },
})
export class DisclosureSummaryDirective {}

@Directive({
  selector: '[simurghDisclosureContent]',
  standalone: true,
  host: { 'data-slot': 'disclosure-content' },
})
export class DisclosureContentDirective {}
