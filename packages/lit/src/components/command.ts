import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { SelectItem } from './select.js';
@customElement('simurgh-command')
export class Command extends LitElement {
  @property({ attribute: false }) items: SelectItem[] = [];
  @property() label = 'Command menu';
  @property() placeholder = 'Search commands';
  @state() private query = '';
  render() {
    const filtered = this.items.filter((item) =>
      item.label.toLowerCase().includes(this.query.toLowerCase()),
    );
    return html`<div
      part="root"
      role="dialog"
      aria-label=${this.label}
      data-slot="command"
    >
      <input
        part="input"
        aria-label="Search commands"
        placeholder=${this.placeholder}
        .value=${this.query}
        @input=${(e: Event) => (this.query = (e.target as HTMLInputElement).value)}
      />
      <div part="list" role="listbox">
        ${filtered.map((item) => html`<button type="button" role="option" aria-selected="false" ?disabled=${item.disabled} @click=${() => this.dispatchEvent(new CustomEvent('select', { detail: item.value }))}>${item.label}</button>`)}${filtered.length ? null : html`<div data-slot="command-empty">No results</div>`}
      </div>
    </div>`;
  }
}
