import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-date-picker')
export class DatePicker extends FormControlElement {
  @property() value = '';
  @property() min = '';
  @property() max = '';
  @property() label = 'Choose date';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<input
      part="input"
      type="date"
      .value=${this.value}
      min=${this.min}
      max=${this.max}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-label=${this.label}
      data-slot="date-picker"
      @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
    />`;
  }
}
