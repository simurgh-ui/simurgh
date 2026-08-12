import type { OnDestroy } from '@angular/core';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '../floating.js';

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
