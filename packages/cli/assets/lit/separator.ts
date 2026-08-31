import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-separator')
export class Separator extends LitElement {
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return html`<div
      role="separator"
      aria-orientation=${this.orientation}
      data-slot="separator"
      data-orientation=${this.orientation}
    ></div>`;
  }
}
