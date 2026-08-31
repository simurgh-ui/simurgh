import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-carousel')
export class Carousel extends LitElement {
  @property({ type: Number }) index = 0;
  @property({ attribute: false }) items: string[] = [];
  @property() label = 'Carousel';
  private move(delta: number) {
    if (this.items.length)
      this.index = (this.index + delta + this.items.length) % this.items.length;
  }
  render() {
    return html`<section
      part="root"
      aria-roledescription="carousel"
      aria-label=${this.label}
      data-slot="carousel"
    >
      <div part="content" aria-live="polite" data-slot="carousel-content">
        ${this.items.map((item, index) => html`<div part="item" role="group" aria-roledescription="slide" aria-label=${`${index + 1} of ${this.items.length}`} ?hidden=${this.index !== index} data-slot="carousel-item">${item}</div>`)}
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        ?disabled=${this.items.length < 2}
        @click=${() => this.move(-1)}
      >
        Previous</button
      ><button
        type="button"
        aria-label="Next slide"
        ?disabled=${this.items.length < 2}
        @click=${() => this.move(1)}
      >
        Next
      </button>
    </section>`;
  }
}
