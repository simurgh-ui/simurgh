import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormResetBase } from './form-reset.js';

@Directive()
export abstract class CheckBase extends FormResetBase {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() name?: string;
  @Input() value = 'on';
  @Output() checkedChange = new EventEmitter<boolean>();
  protected createFormReset() {
    const initial = this.checked;
    return () => {
      this.checked = initial;
      this.checkedChange.emit(initial);
      queueMicrotask(() => {
        const control =
          this.element.nativeElement.querySelector<HTMLInputElement>(
            'input[type=checkbox]',
          );
        if (control) control.checked = initial;
      });
    };
  }
  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
