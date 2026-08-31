import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-native-select')
export class NativeSelect extends FormControlElement {
  @property() value = '';
  @property({ type: Boolean }) invalid = false;
  private initialValue = '';
  connectedCallback() {
    super.connectedCallback();
    this.initialValue = this.value;
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = this.initialValue;
    this.updateFormValue(this.value);
  }
  private onChange(event: Event) {
    this.value = (event.currentTarget as HTMLSelectElement).value;
    this.updateFormValue(this.value);
  }
  render() {
    return html`<select
      part="control"
      data-slot="native-select"
      .value=${this.value}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-invalid=${this.invalid ? 'true' : 'false'}
      @change=${this.onChange}
    >
      <slot></slot>
    </select>`;
  }
}
