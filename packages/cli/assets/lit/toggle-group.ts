import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ToggleOption = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-toggle-group')
export class ToggleGroup extends LitElement {
  @property({ attribute: false }) value: string[] = [];
  @property({ attribute: false }) options: ToggleOption[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property() label = 'Toggle group';
  private toggle(option: ToggleOption) {
    if (this.disabled || option.disabled) return;
    this.value = this.value.includes(option.value)
      ? this.value.filter((v) => v !== option.value)
      : this.multiple
        ? [...this.value, option.value]
        : [option.value];
  }
  render() {
    return html`<div
      part="group"
      role="group"
      aria-label=${this.label}
      data-slot="toggle-group"
    >
      ${this.options.map((option) => html`<button type="button" aria-pressed=${this.value.includes(option.value)} ?disabled=${this.disabled || option.disabled} data-state=${this.value.includes(option.value) ? 'on' : 'off'} @click=${() => this.toggle(option)}>${option.label}</button>`)}
    </div>`;
  }
}
