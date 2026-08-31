import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-checkbox')
export class Checkbox extends FormControlElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
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
      data-slot="checkbox"
      data-state=${this.indeterminate ? 'indeterminate' : this.checked ? 'checked' : 'unchecked'}
      ><input
        part="input"
        type="checkbox"
        .checked=${this.checked}
        .indeterminate=${this.indeterminate}
        ?disabled=${this.disabled}
        @change=${(e: Event) => (this.checked = (e.target as HTMLInputElement).checked)} /><span
        part="indicator"
        aria-hidden="true"
        ><slot></slot></span
    ></label>`;
  }
}
