import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-number-input')
export class NumberInput extends FormControlElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) step = 1;
  @property() label = 'Number';
  private set(next: number) {
    this.value = Math.min(
      this.max ?? Infinity,
      Math.max(this.min ?? -Infinity, next),
    );
  }
  protected updated() {
    this.updateFormValue(String(this.value));
  }
  formResetCallback() {
    this.value = 0;
  }
  render() {
    return html`<div part="root" data-slot="number-input">
      <button
        type="button"
        aria-label=${`Decrease ${this.label}`}
        ?disabled=${this.disabled}
        @click=${() => this.set(this.value - this.step)}
      >
        −</button
      ><input
        type="number"
        .value=${String(this.value)}
        min=${this.min ?? ''}
        max=${this.max ?? ''}
        step=${this.step}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: Event) => this.set((e.target as HTMLInputElement).valueAsNumber)}
      /><button
        type="button"
        aria-label=${`Increase ${this.label}`}
        ?disabled=${this.disabled}
        @click=${() => this.set(this.value + this.step)}
      >
        +
      </button>
    </div>`;
  }
}
