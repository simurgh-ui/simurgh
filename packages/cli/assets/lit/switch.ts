import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-switch')
export class Switch extends FormControlElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property() value = 'on';
  protected updated() {
    this.updateFormValue(this.checked ? this.value : null);
  }
  formResetCallback() {
    this.checked = false;
  }
  render() {
    return html`<label
      part="root"
      data-slot="switch"
      data-state=${this.checked ? 'checked' : 'unchecked'}
      ><input
        part="input"
        type="checkbox"
        role="switch"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${(e: Event) => (this.checked = (e.target as HTMLInputElement).checked)} /><span
        part="thumb"
        aria-hidden="true"
        ><slot></slot></span
    ></label>`;
  }
}
