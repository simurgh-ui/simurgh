import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-rating')
export class Rating extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 5;
  @property() label = 'Rating';
  @property({ type: Boolean }) disabled = false;
  render() {
    return html`<div
      part="root"
      role="radiogroup"
      aria-label=${this.label}
      data-slot="rating"
    >
      ${Array.from({ length: this.max }, (_, index) => html`<button type="button" role="radio" aria-checked=${this.value === index + 1} aria-label=${`${index + 1} of ${this.max}`} ?disabled=${this.disabled} data-state=${this.value >= index + 1 ? 'on' : 'off'} @click=${() => (this.value = index + 1)}>★</button>`)}
    </div>`;
  }
}
