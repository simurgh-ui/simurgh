import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-input-otp')
export class InputOtp extends FormControlElement {
  @property() value = '';
  @property({ type: Number }) length = 6;
  @property() label = 'One-time code';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<div part="root" data-slot="input-otp">
      <input
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength=${this.length}
        .value=${this.value}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, this.length))}
      />
      <div part="slots" aria-hidden="true">
        ${Array.from({ length: this.length }, (_, index) => html`<span part="slot" data-slot="input-otp-slot" data-state=${index === this.value.length ? 'active' : 'idle'}>${this.value[index] ?? ''}</span>`)}
      </div>
    </div>`;
  }
}
