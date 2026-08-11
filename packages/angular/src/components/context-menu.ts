import { CommonModule } from '@angular/common';
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
  ViewChild,
} from '@angular/core';
import { compositeKeydown } from '../internal.js';

@Component({
  selector: 'simurgh-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<div
      #trigger
      tabindex="0"
      aria-haspopup="menu"
      data-slot="context-menu-trigger"
      [attr.aria-expanded]="open"
      (contextmenu)="openPointer($event)"
      (keydown)="openKeyboard($event, trigger)"
    >
      <ng-content select="[trigger]" />
    </div>
    <div
      #content
      *ngIf="open"
      role="menu"
      data-slot="context-menu-content"
      class="simurgh-content"
      style="position:fixed"
      [style.left.px]="x"
      [style.top.px]="y"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>`,
})
export class ContextMenuComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('content') content?: ElementRef<HTMLElement>;
  x = 0;
  y = 0;
  private setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
    if (value)
      setTimeout(() =>
        this.content?.nativeElement
          .querySelector<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          )
          ?.focus(),
      );
  }
  openPointer(event: MouseEvent) {
    event.preventDefault();
    this.x = event.clientX;
    this.y = event.clientY;
    this.setOpen(true);
  }
  openKeyboard(event: KeyboardEvent, trigger: HTMLElement) {
    if (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))
      return;
    event.preventDefault();
    const rect = trigger.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.bottom;
    this.setOpen(true);
  }
  close() {
    this.setOpen(false);
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else compositeKeydown(event, '[role=menuitem]');
  }
}

@Directive({
  selector: '[simurghContextMenuItem]',
  standalone: true,
  host: { role: 'menuitem', class: 'simurgh-item' },
})
export class ContextMenuItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  private menu = inject(ContextMenuComponent);
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? null : -1;
  }
  @HostListener('click') choose() {
    if (!this.disabled) {
      this.select.emit();
      this.menu.close();
    }
  }
}
