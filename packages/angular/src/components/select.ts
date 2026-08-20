import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { compositeKeydown } from '../internal/composite-keydown.js';
import { InternalIdService } from '../internal/id.js';
import { FormResetBase } from '../internal/form-reset.js';

export type SelectOption = { value: string; label: string; disabled?: boolean };

@Component({
  selector: 'simurgh-select',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="combobox"
      data-slot="select-trigger"
      class="simurgh-trigger"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="listId"
      [disabled]="disabled"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      {{ label }}
    </button>
    <div
      #list
      *ngIf="open"
      [id]="listId"
      role="listbox"
      data-slot="select-content"
      class="simurgh-content"
      (keydown)="onListKeydown($event)"
    >
      <button
        *ngFor="let option of options"
        type="button"
        role="option"
        data-slot="select-option"
        class="simurgh-item"
        tabindex="-1"
        [attr.aria-selected]="option.value === value"
        [attr.aria-disabled]="option.disabled || null"
        [disabled]="option.disabled"
        (click)="select(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />`,
})
export class SelectComponent extends FormResetBase {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() placeholder = 'Select…';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('list') list?: ElementRef<HTMLElement>;
  readonly listId = inject(InternalIdService).next('select-list');
  open = false;
  protected createFormReset() {
    const initial = this.value;
    return () => {
      this.value = initial;
      this.open = false;
      this.valueChange.emit(initial);
    };
  }
  get label() {
    return (
      this.options.find((o) => o.value === this.value)?.label ??
      this.placeholder
    );
  }
  toggle() {
    if (this.open) this.open = false;
    else this.show();
  }
  show() {
    this.open = true;
    setTimeout(() =>
      this.list?.nativeElement
        .querySelector<HTMLElement>('[role=option]:not([disabled])')
        ?.focus(),
    );
  }
  onTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.show();
    }
  }
  onListKeydown(event: KeyboardEvent) {
    compositeKeydown(event, '[role=option]');
  }
  select(value: string) {
    this.value = value;
    this.open = false;
    this.valueChange.emit(value);
  }
}
