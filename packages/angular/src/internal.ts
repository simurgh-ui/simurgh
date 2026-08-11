import type { OnDestroy } from '@angular/core';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from './floating.js';

export function compositeKeydown(event: KeyboardEvent, selector: string) {
  const root = event.currentTarget as HTMLElement;
  const items = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (item) =>
      item.getAttribute('aria-disabled') !== 'true' &&
      !item.hasAttribute('disabled'),
  );
  const current = items.indexOf(document.activeElement as HTMLElement);
  const target = nextIndex(current < 0 ? 0 : current, items.length, event.key, {
    orientation: 'vertical',
  });
  if (
    target !== current &&
    ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
  ) {
    event.preventDefault();
    items[target]?.focus();
  } else if ((event.key === 'Enter' || event.key === ' ') && current >= 0) {
    event.preventDefault();
    items[current]?.click();
  }
}

@Directive()
export abstract class FloatingBase implements OnDestroy {
  @Input() open = false;
  @Input() disabled = false;
  @Input() contentLabel = 'Popover';
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('reference') reference?: ElementRef<HTMLElement>;
  @ViewChild('floating') floating?: ElementRef<HTMLElement>;
  private cleanup: (() => void) | undefined;
  toggle() {
    if (!this.disabled) this.setOpen(!this.open);
  }
  close() {
    this.setOpen(false);
  }
  protected setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
    if (value) queueMicrotask(() => this.position());
    else {
      this.cleanup?.();
      this.cleanup = undefined;
    }
  }
  private position() {
    const reference = this.reference?.nativeElement,
      floating = this.floating?.nativeElement;
    if (!reference || !floating) return;
    this.cleanup?.();
    this.cleanup = autoUpdate(reference, floating, async () => {
      const result = await computePosition(reference, floating, {
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      });
      Object.assign(floating.style, {
        left: `${result.x}px`,
        top: `${result.y}px`,
      });
    });
  }
  ngOnDestroy() {
    this.cleanup?.();
  }
}

@Directive()
export abstract class CheckBase {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() name?: string;
  @Input() value = 'on';
  @Output() checkedChange = new EventEmitter<boolean>();
  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
