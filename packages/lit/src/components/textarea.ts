import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';

@customElement('simurgh-textarea')
export class Textarea extends FormControlElement {
  @property() value = '';
  @property() placeholder = '';
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
  private onInput(event: Event) {
    this.value = (event.currentTarget as HTMLTextAreaElement).value;
    this.updateFormValue(this.value);
  }
  render() {
    return html`<textarea
      part="control"
      .value=${this.value}
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-invalid=${this.invalid ? 'true' : 'false'}
      @input=${this.onInput}
    ></textarea>`;
  }
}
