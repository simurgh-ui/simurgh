import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-password-input')
export class PasswordInput extends FormControlElement {
  @property() value = '';
  @property({ type: Boolean }) visible = false;
  @property() label = 'Password';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<div part="root" data-slot="password-input">
      <input
        part="input"
        type=${this.visible ? 'text' : 'password'}
        .value=${this.value}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
      /><button
        type="button"
        aria-label=${this.visible ? 'Hide password' : 'Show password'}
        aria-pressed=${this.visible}
        ?disabled=${this.disabled}
        @click=${() => (this.visible = !this.visible)}
      >
        ${this.visible ? 'Hide' : 'Show'}
      </button>
    </div>`;
  }
}
