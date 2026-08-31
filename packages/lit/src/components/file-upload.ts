import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('simurgh-file-upload')
export class FileUpload extends LitElement {
  @property() accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property() label = 'Choose file';
  @state() files: File[] = [];
  render() {
    return html`<label
      part="root"
      data-slot="file-upload"
      data-state=${this.files.length ? 'selected' : 'empty'}
      ><span>${this.label}</span
      ><input
        type="file"
        accept=${this.accept}
        ?multiple=${this.multiple}
        ?disabled=${this.disabled}
        @change=${(e: Event) => (this.files = Array.from((e.target as HTMLInputElement).files ?? []))}
      /><span aria-live="polite"
        >${this.files.map((file) => file.name).join(', ')}</span
      ></label
    >`;
  }
}
