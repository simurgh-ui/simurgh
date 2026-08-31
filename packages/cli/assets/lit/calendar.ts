import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('simurgh-calendar')
export class Calendar extends LitElement {
  @property() value = '';
  @property() label = 'Calendar';
  @state() private shown = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );
  private move(delta: number) {
    this.shown = new Date(
      this.shown.getFullYear(),
      this.shown.getMonth() + delta,
      1,
    );
  }
  private iso(day: number) {
    return `${this.shown.getFullYear()}-${String(this.shown.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  render() {
    const days = new Date(
      this.shown.getFullYear(),
      this.shown.getMonth() + 1,
      0,
    ).getDate();
    return html`<div part="root" aria-label=${this.label} data-slot="calendar">
      <header>
        <button
          type="button"
          aria-label="Previous month"
          @click=${() => this.move(-1)}
        >
          ‹</button
        ><span aria-live="polite"
          >${this.shown.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</span
        ><button
          type="button"
          aria-label="Next month"
          @click=${() => this.move(1)}
        >
          ›
        </button>
      </header>
      <div part="grid" role="grid">
        ${Array.from({ length: days }, (_, index) => html`<button type="button" role="gridcell" aria-selected=${this.value === this.iso(index + 1)} @click=${() => (this.value = this.iso(index + 1))}>${index + 1}</button>`)}
      </div>
    </div>`;
  }
}
