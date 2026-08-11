import type { Direction } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-menubar',
  standalone: true,
  template: `<div
    role="menubar"
    data-slot="menubar"
    [attr.aria-label]="label"
    [attr.dir]="direction"
    (keydown)="navigate($event)"
  >
    <ng-content />
  </div>`,
})
export class MenubarComponent {
  @Input() label = 'Application menu';
  @Input() direction: Direction = 'ltr';
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  ngAfterViewInit() {
    const first = this.element.nativeElement.querySelector<HTMLElement>(
      '[role=menuitem]:not([aria-disabled=true])',
    );
    if (first) first.tabIndex = 0;
  }
  navigate(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=menuitem]:not([aria-disabled=true])',
      ),
    );
    const current = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(current, items.length, event.key, {
      orientation: 'horizontal',
      direction: this.direction,
    });
    if (target !== current) {
      event.preventDefault();
      items.forEach(
        (item, index) => (item.tabIndex = index === target ? 0 : -1),
      );
      items[target]?.focus();
    }
  }
}

@Directive({
  selector: 'button[simurghMenubarItem]',
  standalone: true,
  host: {
    role: 'menuitem',
    type: 'button',
    'data-slot': 'menubar-item',
    '[attr.aria-disabled]': 'disabled || null',
    '[attr.disabled]': "disabled ? '' : null",
  },
})
export class MenubarItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  @HostBinding('attr.tabindex') tabIndex = -1;
  @HostListener('click') choose() {
    if (!this.disabled) this.select.emit();
  }
}
