import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-collapsible',
  standalone: true,
  template: `<button
      type="button"
      [disabled]="disabled"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="contentId"
      (click)="toggle()"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      [id]="contentId"
      [hidden]="!open"
      [attr.data-state]="open ? 'open' : 'closed'"
    >
      <ng-content />
    </div>`,
})
export class CollapsibleComponent {
  @Input() open = false;
  @Input() disabled = false;
  @Output() openChange = new EventEmitter<boolean>();
  readonly contentId = createId('collapsible-content');
  toggle() {
    if (!this.disabled) {
      this.open = !this.open;
      this.openChange.emit(this.open);
    }
  }
}
