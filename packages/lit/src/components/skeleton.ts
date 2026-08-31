import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-skeleton')
export class Skeleton extends LitElement {
  @property() label = '';
  render() {
    return html`<div
      part="skeleton"
      role=${this.label ? 'status' : 'presentation'}
      aria-label=${this.label}
      aria-busy=${this.label ? 'true' : 'false'}
      aria-hidden=${this.label ? 'false' : 'true'}
      data-state="loading"
    >
      <slot></slot>
    </div>`;
  }
}
