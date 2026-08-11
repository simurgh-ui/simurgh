export type { SelectOption } from './select.js';
import type { SelectOption } from './select.js';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-combobox',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="simurgh-combobox">
    <input
      role="combobox"
      [attr.aria-label]="ariaLabel || placeholder"
      aria-autocomplete="list"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="listId"
      [attr.aria-activedescendant]="activeId"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [value]="query"
      (focus)="show()"
      (input)="onInput($event)"
      (keydown)="onKeydown($event)"
    />
    <div *ngIf="open" [id]="listId" role="listbox" class="simurgh-content">
      <div
        *ngFor="let option of filteredOptions; let index = index"
        [id]="optionId(index)"
        role="option"
        class="simurgh-item"
        [attr.aria-selected]="option.value === value"
        [attr.aria-disabled]="option.disabled || null"
        (mousedown)="chooseFromPointer($event, option)"
      >
        {{ option.label }}
      </div>
      <div *ngIf="filteredOptions.length === 0" role="status">
        {{ noResults }}
      </div>
    </div>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />
    <input
      *ngIf="required"
      aria-hidden="true"
      tabindex="-1"
      required
      [value]="value"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class ComboboxComponent {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() name: string | undefined;
  @Input() required = false;
  @Input() disabled = false;
  @Input() placeholder = 'Search options';
  @Input() noResults = 'No results';
  @Input() ariaLabel: string | undefined;
  @Output() valueChange = new EventEmitter<string>();
  readonly listId = createId('combobox-list');
  query = '';
  open = false;
  activeIndex = -1;

  get filteredOptions() {
    const needle = this.query.trim().toLocaleLowerCase();
    return needle
      ? this.options.filter((option) =>
          option.label.toLocaleLowerCase().includes(needle),
        )
      : this.options;
  }
  get activeId() {
    return this.open && this.activeIndex >= 0
      ? this.optionId(this.activeIndex)
      : null;
  }
  optionId(index: number) {
    return `${this.listId}-option-${index}`;
  }
  show() {
    if (!this.disabled) this.open = true;
  }
  onInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.open = true;
    this.activeIndex = -1;
  }
  move(step: 1 | -1) {
    const options = this.filteredOptions;
    if (!options.some((option) => !option.disabled)) return;
    let index = this.activeIndex;
    do {
      index = (index + step + options.length) % options.length;
    } while (options[index]?.disabled);
    this.activeIndex = index;
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open = true;
      this.move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Home' && this.open) {
      event.preventDefault();
      this.activeIndex = -1;
      this.move(1);
    } else if (event.key === 'End' && this.open) {
      event.preventDefault();
      this.activeIndex = 0;
      this.move(-1);
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      const option = this.filteredOptions[this.activeIndex];
      if (option) this.choose(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.query =
        this.options.find((option) => option.value === this.value)?.label ?? '';
      this.open = false;
      this.activeIndex = -1;
    }
  }
  chooseFromPointer(event: MouseEvent, option: SelectOption) {
    event.preventDefault();
    this.choose(option);
  }
  choose(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this.query = option.label;
    this.open = false;
    this.activeIndex = -1;
    this.valueChange.emit(option.value);
  }
}
