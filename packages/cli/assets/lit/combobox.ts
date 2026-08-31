import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { SelectItem } from './select.js';
@customElement('simurgh-combobox')
export class Combobox extends LitElement {
  @property() value = '';
  @property({ attribute: false }) options: SelectItem[] = [];
  @property() label = 'Choose an option';
  @property() placeholder = '';
  @property({ type: Boolean }) disabled = false;
  @state() private query = '';
  @state() private open = false;
  render() {
    const filtered = this.options.filter((option) =>
      option.label.toLowerCase().includes(this.query.toLowerCase()),
    );
    return html`<div part="root" data-slot="combobox">
      <input
        part="input"
        role="combobox"
        aria-label=${this.label}
        aria-expanded=${this.open}
        aria-controls="combobox-list"
        autocomplete="off"
        .value=${this.query}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @focus=${() => (this.open = true)}
        @input=${(e: Event) => {
          this.query = (e.target as HTMLInputElement).value;
          this.open = true;
        }}
      />
      <div part="list" id="combobox-list" role="listbox" ?hidden=${!this.open}>
        ${filtered.map(
          (option) =>
            html`<button
              type="button"
              role="option"
              aria-selected=${this.value === option.value}
              ?disabled=${option.disabled}
              @click=${() => {
                this.value = option.value;
                this.query = option.label;
                this.open = false;
              }}
            >
              ${option.label}
            </button>`,
        )}
      </div>
    </div>`;
  }
}
