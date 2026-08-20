import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createId } from '@simurgh-ui/core';
import { FormResetBase } from '../internal/form-reset.js';

@Component({
  selector: 'simurgh-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `<label
    [htmlFor]="inputId"
    data-slot="file-upload"
    [attr.data-disabled]="disabled || null"
    (dragover)="onDragover($event)"
    (drop)="onDrop($event)"
  >
    <input
      [id]="inputId"
      type="file"
      data-slot="file-upload-input"
      [attr.accept]="accept || null"
      [attr.name]="name || null"
      [multiple]="multiple"
      [disabled]="disabled"
      [required]="required"
      (change)="onChange($event)"
    />
    <strong data-slot="file-upload-label">{{ label }}</strong>
    <span *ngIf="description" data-slot="file-upload-description">{{
      description
    }}</span>
    <span data-slot="file-upload-status" aria-live="polite">{{
      selectedNames || 'No files selected'
    }}</span>
  </label>`,
})
export class FileUploadComponent extends FormResetBase {
  @Input() inputId = createId('file');
  @Input({ required: true }) label = '';
  @Input() description = 'Drop files here or browse';
  @Input() accept?: string;
  @Input() name?: string;
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() required = false;
  @Output() filesChange = new EventEmitter<File[]>();
  selectedNames = '';
  protected createFormReset() {
    return () => {
      this.selectedNames = '';
      this.filesChange.emit([]);
    };
  }
  private accepted(files: File[]) {
    if (!this.accept) return files;
    const rules = this.accept
      .split(',')
      .map((rule) => rule.trim().toLowerCase())
      .filter(Boolean);
    return files.filter((file) => {
      const name = file.name.toLowerCase();
      const type = file.type.toLowerCase();
      return rules.some((rule) =>
        rule.startsWith('.')
          ? name.endsWith(rule)
          : rule.endsWith('/*')
            ? type.startsWith(rule.slice(0, -1))
            : type === rule,
      );
    });
  }
  private update(files: File[]) {
    if (this.disabled) return;
    const accepted = this.accepted(files);
    const next = this.multiple ? accepted : accepted.slice(0, 1);
    this.selectedNames = next.map((file) => file.name).join(', ');
    this.filesChange.emit(next);
  }
  onChange(event: Event) {
    this.update(
      Array.from((event.currentTarget as HTMLInputElement).files ?? []),
    );
  }
  onDragover(event: DragEvent) {
    if (!this.disabled) event.preventDefault();
  }
  onDrop(event: DragEvent) {
    if (this.disabled) return;
    event.preventDefault();
    this.update(Array.from(event.dataTransfer?.files ?? []));
  }
}
