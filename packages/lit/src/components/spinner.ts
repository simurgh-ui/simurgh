import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-spinner')
export class Spinner extends LitElement {
  @property() label = 'Loading';
  render() {
    return html`<span
      part="spinner"
      role="status"
      aria-label=${this.label}
      aria-live="polite"
      aria-busy="true"
      data-state="loading"
      ><span aria-hidden="true" data-part="indicator"
        ><slot>◌</slot></span
      ></span
    >`;
  }
}
