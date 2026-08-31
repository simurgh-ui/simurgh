import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-sidebar')
export class Sidebar extends LitElement {
  @property({ type: Boolean, reflect: true }) open = true;
  @property() label = 'Sidebar';
  @property({ attribute: 'trigger-label' }) triggerLabel = 'Toggle sidebar';
  render() {
    return html`<div
      part="provider"
      data-slot="sidebar-provider"
      data-state=${this.open ? 'expanded' : 'collapsed'}
    >
      <button
        part="trigger"
        type="button"
        aria-label=${this.triggerLabel}
        aria-expanded=${this.open}
        @click=${() => (this.open = !this.open)}
      >
        ☰
      </button>
      <aside part="sidebar" aria-label=${this.label} ?hidden=${!this.open}>
        <slot></slot>
      </aside>
    </div>`;
  }
}
