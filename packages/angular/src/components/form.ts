import type { OnDestroy } from '@angular/core';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: 'form[simurghForm]',
  standalone: true,
  host: { 'data-slot': 'form' },
})
export class FormDirective implements OnDestroy {
  @Input() focusInvalid = true;
  @Output() invalidControl = new EventEmitter<HTMLElement>();
  private form = inject<ElementRef<HTMLFormElement>>(ElementRef);
  private queued = false;
  private firstInvalid: HTMLElement | null = null;
  private onInvalid = (event: Event) => {
    const target = event.target as HTMLElement;
    this.invalidControl.emit(target);
    if (!this.focusInvalid || event.defaultPrevented || this.queued) return;
    this.queued = true;
    this.firstInvalid = target;
    queueMicrotask(() => {
      this.firstInvalid?.focus();
      this.firstInvalid = null;
      this.queued = false;
    });
  };
  constructor() {
    this.form.nativeElement.addEventListener('invalid', this.onInvalid, true);
  }
  ngOnDestroy() {
    this.form.nativeElement.removeEventListener(
      'invalid',
      this.onInvalid,
      true,
    );
  }
}

@Component({
  selector: 'simurgh-form-error-summary',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'alert',
    'aria-live': 'assertive',
    tabindex: '-1',
    'data-slot': 'form-error-summary',
  },
})
export class FormErrorSummaryComponent {}
