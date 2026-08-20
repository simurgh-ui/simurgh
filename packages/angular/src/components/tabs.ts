import type { Direction, Orientation } from '@simurgh-ui/core';
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
import { nextIndex, typeaheadIndex } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-tabs',
  standalone: true,
  template: `<div
      role="tablist"
      [attr.aria-orientation]="orientation"
      (keydown)="navigate($event)"
    >
      <ng-content select="[tab]" />
    </div>
    <ng-content />`,
})
export class TabsComponent {
  @Input() value = '';
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string>();
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  select(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
  navigate(event: KeyboardEvent) {
    const tabs = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=tab]:not([disabled])',
      ),
    );
    const i = tabs.indexOf(document.activeElement as HTMLElement);
    const directional = nextIndex(i, tabs.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    const n =
      directional === i
        ? typeaheadIndex(
            tabs.map((tab) => tab.textContent ?? ''),
            i,
            event.key,
          )
        : directional;
    if (n !== i) {
      event.preventDefault();
      tabs[n]?.focus();
      tabs[n]?.click();
    }
  }
}

@Directive({
  selector: '[simurghTab]',
  standalone: true,
  host: { role: 'tab' },
})
export class TabDirective {
  @Input({ alias: 'simurghTab', required: true }) value = '';
  private tabs = inject(TabsComponent);
  @HostListener('click') select() {
    this.tabs.select(this.value);
  }
  @HostBinding('attr.aria-selected') get selected() {
    return this.tabs.value === this.value;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.selected ? 0 : -1;
  }
}

@Directive({
  selector: '[simurghTabPanel]',
  standalone: true,
  host: { role: 'tabpanel' },
})
export class TabPanelDirective {
  @Input({ alias: 'simurghTabPanel', required: true }) value = '';
  private tabs = inject(TabsComponent);
  @HostBinding('hidden') get hidden() {
    return this.tabs.value !== this.value;
  }
  @HostBinding('attr.tabindex') tabIndex = 0;
}
