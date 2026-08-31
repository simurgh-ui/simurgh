import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-slider')
export class Slider extends FormControlElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  protected updated() {
    this.updateFormValue(String(this.value));
  }
  formResetCallback() {
    this.value = 0;
  }
  render() {
    return html`<input
      part="input"
      type="range"
      .value=${String(this.value)}
      min=${this.min}
      max=${this.max}
      step=${this.step}
      ?disabled=${this.disabled}
      data-slot="slider"
      @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).valueAsNumber)}
    />`;
  }
}
