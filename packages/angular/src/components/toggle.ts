import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simurgh-toggle',
  standalone: true,
  template: `<button
    type="button"
    [attr.aria-pressed]="pressed"
    [attr.data-state]="pressed ? 'on' : 'off'"
    [disabled]="disabled"
    (click)="toggle()"
  >
    <ng-content />
  </button>`,
})
export class ToggleComponent {
  @Input() pressed = false;
  @Input() disabled = false;
  @Output() pressedChange = new EventEmitter<boolean>();
  toggle() {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
  }
}
