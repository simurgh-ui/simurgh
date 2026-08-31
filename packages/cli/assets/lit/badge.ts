import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
@customElement('simurgh-badge')
export class Badge extends LitElement {
  @property() tone: BadgeTone = 'neutral';
  @property({ type: Boolean }) status = false;
  render() {
    return html`<span
      part="badge"
      data-slot="badge"
      data-tone=${this.tone}
      role=${this.status ? 'status' : 'presentation'}
      aria-live=${this.status ? 'polite' : 'off'}
      ><slot></slot
    ></span>`;
  }
}
