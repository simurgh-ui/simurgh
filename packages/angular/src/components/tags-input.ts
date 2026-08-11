import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'simurgh-tags-input',
  standalone: true,
  template: `<div
    role="group"
    data-slot="tags-input"
    [attr.aria-label]="ariaLabel"
    [attr.data-disabled]="disabled || null"
    [attr.data-readonly]="readonly || null"
    (click)="control.focus()"
  >
    @for (tag of value; track $index) {
      <span data-slot="tags-input-tag">
        <span data-slot="tags-input-tag-text">{{ tag }}</span>
        @if (!readonly) {
          <button
            type="button"
            data-slot="tags-input-remove"
            [attr.aria-label]="removeLabel(tag)"
            [disabled]="disabled"
            (click)="remove($index, $event)"
          >
            &#215;
          </button>
        }
        @if (name) {
          <input type="hidden" [name]="name" [value]="tag" />
        }
      </span>
    }
    <input
      #control
      type="text"
      data-slot="tags-input-control"
      [value]="draft"
      [attr.aria-label]="inputLabel"
      [placeholder]="value.length ? '' : placeholder"
      [disabled]="disabled || value.length >= safeLimit"
      [readOnly]="readonly"
      [required]="required && value.length === 0"
      (input)="draft = control.value"
      (keydown)="handleKeydown($event)"
    />
  </div>`,
})
export class TagsInputComponent {
  @ViewChild('control') control?: ElementRef<HTMLInputElement>;
  private tags: string[] = [];
  @Input() set value(value: string[]) {
    this.tags = value.slice(0, 100);
  }
  get value() {
    return this.tags;
  }
  @Input() name?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() maxTags = 20;
  @Input() placeholder = 'Add a tag';
  @Input() inputLabel = 'Add a tag';
  @Input('aria-label') ariaLabel = 'Tags';
  @Output() valueChange = new EventEmitter<string[]>();
  draft = '';
  get safeLimit() {
    return Number.isFinite(this.maxTags)
      ? Math.min(100, Math.max(1, Math.floor(this.maxTags)))
      : 20;
  }
  removeLabel(tag: string) {
    return `Remove ${tag}`;
  }
  commit(value: string[]) {
    this.value = value;
    this.valueChange.emit(value);
  }
  add() {
    const tag = this.draft.trim();
    if (
      this.disabled ||
      this.readonly ||
      !tag ||
      this.value.includes(tag) ||
      this.value.length >= this.safeLimit
    )
      return;
    this.commit([...this.value, tag]);
    this.draft = '';
  }
  remove(index: number, event?: Event) {
    event?.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.commit(this.value.filter((_, itemIndex) => itemIndex !== index));
    this.control?.nativeElement.focus();
  }
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.add();
    } else if (event.key === 'Backspace' && !this.draft && this.value.length) {
      event.preventDefault();
      this.remove(this.value.length - 1);
    }
  }
}
