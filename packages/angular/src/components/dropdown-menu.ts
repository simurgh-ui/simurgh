import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FloatingBase, compositeKeydown } from '../internal.js';

@Component({
  selector: 'simurgh-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      #reference
      type="button"
      class="simurgh-trigger"
      aria-haspopup="menu"
      [attr.aria-expanded]="open"
      (click)="toggle()"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      #floating
      *ngIf="open"
      role="menu"
      class="simurgh-content"
      style="position:fixed"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>`,
})
export class DropdownMenuComponent extends FloatingBase {
  override toggle() {
    super.toggle();
    if (this.open)
      setTimeout(() =>
        this.floating?.nativeElement
          .querySelector<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          )
          ?.focus(),
      );
  }
  onKeydown(event: KeyboardEvent) {
    compositeKeydown(event, '[role=menuitem]');
  }
}

@Directive({
  selector: '[simurghMenuItem]',
  standalone: true,
  host: { role: 'menuitem', class: 'simurgh-item' },
})
export class DropdownMenuItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? null : -1;
  }
  @HostListener('click') onClick() {
    if (!this.disabled) this.select.emit();
  }
}
