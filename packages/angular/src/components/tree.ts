import type { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { createId } from '@simurgh-ui/core';

@Directive({
  selector: 'ul[simurghTree]',
  standalone: true,
  host: { role: 'tree', 'data-slot': 'tree' },
})
export class TreeDirective implements AfterViewInit {
  private element: ElementRef<HTMLElement> = inject(ElementRef);
  ngAfterViewInit() {
    this.element.nativeElement
      .querySelectorAll<HTMLButtonElement>('[role="treeitem"]')
      .forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
  }
  private focusItem(
    items: HTMLButtonElement[],
    current: number,
    target: number,
  ) {
    if (target < 0 || target === current) return;
    items[current]?.setAttribute('tabindex', '-1');
    if (items[target]) {
      items[target].tabIndex = 0;
      items[target].focus();
    }
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const root = event.currentTarget as HTMLElement;
    const items = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[role="treeitem"]'),
    ).filter(
      (item) => !item.disabled && !item.closest('[role="group"][hidden]'),
    );
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    let target = current;
    if (event.key === 'ArrowDown')
      target = Math.min(current + 1, items.length - 1);
    else if (event.key === 'ArrowUp') target = Math.max(current - 1, 0);
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = items.length - 1;
    else if (event.key === 'ArrowRight' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'false') item.click();
      else {
        const child = item
          .closest('simurgh-tree-item')
          ?.querySelector<HTMLButtonElement>(
            '[role="group"] [role="treeitem"]',
          );
        if (child) this.focusItem(items, current, items.indexOf(child));
      }
      event.preventDefault();
      return;
    } else if (event.key === 'ArrowLeft' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'true') item.click();
      else {
        const parent = item
          .closest('[role="group"]')
          ?.closest('simurgh-tree-item')
          ?.querySelector<HTMLButtonElement>(
            ':scope > button[role="treeitem"]',
          );
        if (parent) this.focusItem(items, current, items.indexOf(parent));
      }
      event.preventDefault();
      return;
    } else return;
    if (target !== current && target >= 0) {
      event.preventDefault();
      this.focusItem(items, current, target);
    }
  }
}

@Component({
  selector: 'simurgh-tree-item',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="treeitem"
      data-slot="tree-item"
      [attr.aria-expanded]="expandable ? expanded : null"
      [attr.aria-controls]="expandable ? groupId : null"
      [attr.aria-disabled]="disabled || null"
      [disabled]="disabled"
      tabindex="-1"
      (click)="toggle()"
    >
      {{ label }}
    </button>
    <ul
      *ngIf="expandable"
      [id]="groupId"
      role="group"
      data-slot="tree-group"
      [hidden]="!expanded"
    >
      <ng-content />
    </ul>`,
  host: { role: 'none', 'data-slot': 'tree-node' },
})
export class TreeItemComponent {
  @Input({ required: true }) label = '';
  @Input() expandable = false;
  @Input() expanded = false;
  @Input() disabled = false;
  @Output() expandedChange = new EventEmitter<boolean>();
  readonly groupId = createId('tree-group');
  toggle() {
    if (!this.expandable || this.disabled) return;
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
