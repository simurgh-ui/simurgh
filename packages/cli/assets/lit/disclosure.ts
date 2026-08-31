import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-disclosure')
export class Disclosure extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  render() {
    return html`<details
      part="root"
      .open=${this.open}
      data-slot="disclosure"
      data-state=${this.open ? 'open' : 'closed'}
      @toggle=${(e: Event) => (this.open = (e.target as HTMLDetailsElement).open)}
    >
      <summary part="summary" data-slot="disclosure-summary">
        <slot name="summary"></slot>
      </summary>
      <div part="content" data-slot="disclosure-content"><slot></slot></div>
    </details>`;
  }
}
