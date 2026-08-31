import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-toggle')
export class Toggle extends LitElement {
  @property({ type: Boolean, reflect: true }) pressed = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  render() {
    return html`<button
      part="button"
      type="button"
      aria-pressed=${this.pressed}
      ?disabled=${this.disabled}
      data-slot="toggle"
      data-state=${this.pressed ? 'on' : 'off'}
      @click=${() => {
        if (!this.disabled) this.pressed = !this.pressed;
      }}
    >
      <slot></slot>
    </button>`;
  }
}
