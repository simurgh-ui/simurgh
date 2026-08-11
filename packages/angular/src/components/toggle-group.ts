import type { Direction, Orientation } from '@simurgh-ui/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-toggle-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'group',
    'data-slot': 'toggle-group',
    '[attr.aria-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ToggleGroupComponent {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() value: string[] = [];
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string[]>();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  toggle(item: string) {
    this.value = this.value.includes(item)
      ? this.value.filter((entry) => entry !== item)
      : this.type === 'single'
        ? [item]
        : [...this.value, item];
    this.valueChange.emit(this.value);
  }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[data-toggle-group-item]:not(:disabled)',
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
  selector: 'button[simurghToggleGroupItem]',
  standalone: true,
  host: {
    type: 'button',
    'data-toggle-group-item': '',
    'data-slot': 'toggle-group-item',
    '[attr.aria-pressed]': 'pressed',
    '[attr.data-state]': "pressed ? 'on' : 'off'",
    '(click)': 'activate()',
  },
})
export class ToggleGroupItemDirective {
  @Input({ alias: 'simurghToggleGroupItem', required: true }) value = '';
  @Input() disabled = false;
  private readonly group = inject(ToggleGroupComponent);
  get pressed() {
    return this.group.value.includes(this.value);
  }
  activate() {
    if (!this.disabled) this.group.toggle(this.value);
  }
}
