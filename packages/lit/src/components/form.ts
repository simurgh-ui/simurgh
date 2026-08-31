import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-form')
export class Form extends LitElement {
  @property({ type: Boolean, attribute: 'focus-invalid' }) focusInvalid = true;
  private invalid(event: Event) {
    if (this.focusInvalid)
      queueMicrotask(() => (event.target as HTMLElement).focus());
  }
  render() {
    return html`<form part="form" data-slot="form" @invalid=${this.invalid}>
        <slot></slot>
      </form>
      <div
        part="errors"
        role="alert"
        aria-live="assertive"
        tabindex="-1"
        data-slot="form-error-summary"
      >
        <slot name="errors"></slot>
      </div>`;
  }
}
