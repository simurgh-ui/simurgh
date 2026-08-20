import type { Direction } from '@simurgh-ui/core';
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
} from '@angular/core';
import { nextIndex } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div role="radiogroup" (keydown)="navigate($event)">
    <ng-content /><input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
    /><input
      *ngIf="required"
      aria-hidden="true"
      tabindex="-1"
      required
      [value]="value"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class RadioGroupComponent extends FormResetBase {
  @Input() value = '';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string>();
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.valueChange.emit(initial);
    };
  }
  select(value: string) {
    if (!this.disabled) {
      this.value = value;
      this.valueChange.emit(value);
    }
  }
  navigate(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=radio]:not([aria-disabled=true])',
      ),
    );
    const current = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(current, items.length, event.key, {
      direction: this.direction,
    });
    if (target !== current) {
      event.preventDefault();
      items[target]?.focus();
      items[target]?.click();
    }
  }
}

@Directive({
  selector: '[simurghRadio]',
  standalone: true,
  host: { role: 'radio' },
})
export class RadioGroupItemDirective {
  @Input({ alias: 'simurghRadio', required: true }) value = '';
  @Input() disabled = false;
  private group = inject(RadioGroupComponent);
  @HostBinding('attr.aria-checked') get checked() {
    return this.group.value === this.value;
  }
  @HostBinding('attr.aria-disabled') get unavailable() {
    return this.group.disabled || this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.checked ? 0 : -1;
  }
  @HostListener('click') select() {
    if (!this.unavailable) this.group.select(this.value);
  }
}
