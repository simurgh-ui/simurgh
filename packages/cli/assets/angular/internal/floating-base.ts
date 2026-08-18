import type { AfterViewChecked, OnDestroy } from '@angular/core';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import {
  createFloatingInteractions,
  type FloatingInteractionKind,
} from '@simurgh-ui/core';
import { autoUpdateFloating, computeFloatingPosition } from '../floating.js';
import { InternalIdService } from './id.js';

@Directive()
export abstract class FloatingBase implements AfterViewChecked, OnDestroy {
  @Input() open = false;
  @Input() disabled = false;
  @Input() contentLabel = 'Popover';
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('reference') reference?: ElementRef<HTMLElement>;
  @ViewChild('floating') floating?: ElementRef<HTMLElement>;
  protected interactionKind: FloatingInteractionKind = 'popover';
  readonly floatingId = inject(InternalIdService).next('floating');
  private cleanupPosition: (() => void) | undefined;
  private cleanupDismiss: (() => void) | undefined;
  private get interactions() {
    return createFloatingInteractions({
      kind: this.interactionKind,
      id: this.floatingId,
      getOpen: () => this.open,
      setOpen: (value) => this.setOpen(value),
      getReference: () => this.reference?.nativeElement ?? null,
      getFloating: () => this.floating?.nativeElement ?? null,
    });
  }
  toggle(event?: Event) {
    if (!this.disabled)
      this.interactions.onReferenceClick(event ?? { defaultPrevented: false });
  }
  close() {
    this.setOpen(false);
  }
  openFromHover(event: Event) {
    this.interactions.onReferenceMouseEnter?.(event);
  }
  closeFromHover(event: Event) {
    this.interactions.onReferenceMouseLeave?.(event);
  }
  openFromFocus(event: Event) {
    this.interactions.onReferenceFocus?.(event);
  }
  closeFromFocus(event: Event) {
    this.interactions.onReferenceBlur?.(event);
  }
  onFloatingKeydown(event: KeyboardEvent) {
    this.interactions.onFloatingKeyDown(event);
  }
  onReferenceKeydown(event: KeyboardEvent) {
    this.interactions.onReferenceKeyDown(event);
  }
  protected setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
    if (value) queueMicrotask(() => this.position());
    else {
      this.cleanupPosition?.();
      this.cleanupDismiss?.();
      this.cleanupPosition = undefined;
      this.cleanupDismiss = undefined;
    }
  }
  private position() {
    const reference = this.reference?.nativeElement,
      floating = this.floating?.nativeElement;
    if (!reference || !floating) return;
    this.cleanupPosition?.();
    this.cleanupDismiss?.();
    this.cleanupPosition = autoUpdateFloating(reference, floating, () => {
      const result = computeFloatingPosition(reference, floating);
      Object.assign(floating.style, {
        left: `${result.x}px`,
        top: `${result.y}px`,
      });
    });
    this.cleanupDismiss = this.interactions.listenForOutsidePress(
      reference.ownerDocument,
    );
  }
  ngAfterViewChecked() {
    if (this.open && !this.cleanupPosition) this.position();
  }
  ngOnDestroy() {
    this.cleanupPosition?.();
    this.cleanupDismiss?.();
  }
}
