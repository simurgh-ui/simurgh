import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-alert')
export class Alert extends LitElement {
  @property({ type: Boolean }) urgent = false;
  render() {
    return html`<div
      part="alert"
      role=${this.urgent ? 'alert' : 'status'}
      aria-live=${this.urgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      data-urgent=${this.urgent ? 'true' : 'false'}
    >
      <slot></slot>
    </div>`;
  }
}
