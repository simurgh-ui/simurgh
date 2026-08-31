import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-meter')
export class Meter extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) value = 0;
  @property() label = '';
  render() {
    const safe = Math.min(this.max, Math.max(this.min, this.value));
    return html`<meter
      part="meter"
      min=${this.min}
      max=${this.max}
      value=${safe}
      role="meter"
      aria-valuenow=${safe}
      aria-valuemin=${this.min}
      aria-valuemax=${this.max}
      aria-label=${this.label}
      data-slot="meter"
    >
      ${safe}
    </meter>`;
  }
}
