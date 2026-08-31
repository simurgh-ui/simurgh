import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type RadioOption = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-radio-group')
export class RadioGroup extends LitElement {
  @property() value = '';
  @property({ attribute: false }) options: RadioOption[] = [];
  @property() name = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  render() {
    return html`<div role="radiogroup" data-slot="radio-group">
      ${this.options.map(
        (option) =>
          html`<label
            data-slot="radio-group-item"
            data-state=${this.value === option.value ? 'checked' : 'unchecked'}
            ><input
              type="radio"
              name=${this.name}
              value=${option.value}
              .checked=${this.value === option.value}
              ?required=${this.required}
              ?disabled=${this.disabled || option.disabled}
              @change=${() => {
                this.value = option.value;
                this.dispatchEvent(new Event('change', { bubbles: true }));
              }}
            /><span>${option.label}</span></label
          >`,
      )}
    </div>`;
  }
}
