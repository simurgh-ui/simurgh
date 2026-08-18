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
import { compositeKeydown } from '../internal/composite-keydown.js';
import { FloatingBase } from '../internal/floating-base.js';

@Component({
  selector: 'simurgh-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      #reference
      [attr.data-simurgh-floating-reference]="floatingId"
      type="button"
      class="simurgh-trigger"
      aria-haspopup="menu"
      [attr.aria-expanded]="open"
      (click)="toggle($event)"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      #floating
      [attr.data-simurgh-floating-content]="floatingId"
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
  protected override interactionKind = 'menu' as const;
  override toggle(event?: Event) {
    super.toggle(event);
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
    this.onFloatingKeydown(event);
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
