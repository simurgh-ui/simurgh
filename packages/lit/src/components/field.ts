import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-field')
export class Field extends LitElement {
  @property({ type: Boolean, reflect: true }) invalid = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  render() {
    return html`<fieldset
      part="field"
      ?disabled=${this.disabled}
      data-slot="field"
      ?data-invalid=${this.invalid}
    >
      <legend part="legend" data-slot="field-legend">
        <slot name="legend"></slot>
      </legend>
      <slot></slot>
      <div part="description" data-slot="field-description">
        <slot name="description"></slot>
      </div>
      <div part="error" role="alert" data-slot="field-error">
        <slot name="error"></slot>
      </div>
    </fieldset>`;
  }
}
