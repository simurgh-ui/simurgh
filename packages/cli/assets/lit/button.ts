import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';

@customElement('simurgh-button')
export class Button extends FormControlElement {
  @property({ type: Boolean }) loading = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';
  @property() variant: 'primary' | 'secondary' | 'destructive' | 'quiet' =
    'primary';
  @property() size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: Boolean, attribute: 'icon-only' }) iconOnly = false;
  formResetCallback() {}
  private activate() {
    if (this.disabled || this.loading) return;
    if (this.type === 'submit') this.internals?.form?.requestSubmit();
    if (this.type === 'reset') this.internals?.form?.reset();
  }

  render() {
    return html`<button
      part="button"
      type=${this.type}
      ?disabled=${this.disabled || this.loading}
      aria-busy=${this.loading ? 'true' : 'false'}
      data-slot="button"
      data-state=${this.loading ? 'loading' : 'idle'}
      data-variant=${this.variant}
      data-size=${this.size}
      ?data-full-width=${this.fullWidth}
      ?data-icon-only=${this.iconOnly}
      @click=${this.activate}
    >
      <slot></slot>
    </button>`;
  }
}
