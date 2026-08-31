import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-pagination')
export class Pagination extends LitElement {
  @property({ type: Number }) page = 1;
  @property({ type: Number }) count = 1;
  @property() label = 'Pagination';
  render() {
    return html`<nav part="nav" aria-label=${this.label} data-slot="pagination">
      <button
        type="button"
        aria-label="Previous page"
        ?disabled=${this.page <= 1}
        @click=${() => this.page--}
      >
        Previous</button
      >${Array.from({ length: this.count }, (_, index) => html`<button type="button" aria-current=${this.page === index + 1 ? 'page' : 'false'} @click=${() => (this.page = index + 1)}>${index + 1}</button>`)}<button
        type="button"
        aria-label="Next page"
        ?disabled=${this.page >= this.count}
        @click=${() => this.page++}
      >
        Next
      </button>
    </nav>`;
  }
}
