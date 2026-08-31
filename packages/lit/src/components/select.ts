import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
export type SelectItem = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-select')
export class Select extends FormControlElement {
  @property() value = '';
  @property({ attribute: false }) options: SelectItem[] = [];
  @property() placeholder = 'Select an option';
  @property() label = 'Select';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<select
      part="select"
      .value=${this.value}
      ?required=${this.required}
      ?disabled=${this.disabled}
      aria-label=${this.label}
      data-slot="select"
      @change=${(e: Event) => (this.value = (e.target as HTMLSelectElement).value)}
    >
      <option value="" disabled>${this.placeholder}</option>
      ${this.options.map((option) => html`<option value=${option.value} ?disabled=${option.disabled}>${option.label}</option>`)}
    </select>`;
  }
}
