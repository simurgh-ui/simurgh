import type { Direction, Orientation } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-toolbar',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'toolbar',
    'data-slot': 'toolbar',
    '[attr.aria-label]': 'label',
    '[attr.aria-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ToolbarComponent {
  @Input() label = 'Toolbar';
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[data-toolbar-item]:not(:disabled)',
      ),
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(index, items.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    if (target !== index) {
      event.preventDefault();
      items[target]?.focus();
    }
  }
}

@Directive({
  selector: 'button[simurghToolbarButton]',
  standalone: true,
  host: {
    type: 'button',
    'data-toolbar-item': '',
    'data-slot': 'toolbar-button',
  },
})
export class ToolbarButtonDirective {}
