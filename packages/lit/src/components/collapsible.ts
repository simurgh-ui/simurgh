import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-collapsible')
export class Collapsible extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  render() {
    return html`<div
      part="root"
      data-slot="collapsible"
      data-state=${this.open ? 'open' : 'closed'}
    >
      <button
        part="trigger"
        type="button"
        data-slot="collapsible-trigger"
        aria-expanded=${this.open}
        ?disabled=${this.disabled}
        @click=${() => (this.open = !this.open)}
      >
        <slot name="trigger"></slot>
      </button>
      <div part="content" data-slot="collapsible-content" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    </div>`;
  }
}
