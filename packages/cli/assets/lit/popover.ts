import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-popover')
export class Popover extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() label = 'Toggle popover';
  render() {
    return html`<button
        part="trigger"
        type="button"
        aria-label=${this.label}
        aria-expanded=${this.open}
        data-slot="popover-trigger"
        @click=${() => (this.open = !this.open)}
      >
        <slot name="trigger"></slot>
      </button>
      <div
        part="content"
        data-slot="popover-content"
        data-state=${this.open ? 'open' : 'closed'}
        ?hidden=${!this.open}
      >
        <slot></slot>
      </div>`;
  }
}
