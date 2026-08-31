import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-button-group')
export class ButtonGroup extends LitElement {
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return html`<div
      part="group"
      role="group"
      data-slot="button-group"
      data-orientation=${this.orientation}
      aria-orientation=${this.orientation}
    >
      <slot></slot>
    </div>`;
  }
}
