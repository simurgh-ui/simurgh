import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-toolbar')
export class Toolbar extends LitElement {
  @property() label = 'Toolbar';
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return html`<div
      part="toolbar"
      role="toolbar"
      aria-label=${this.label}
      aria-orientation=${this.orientation}
      data-slot="toolbar"
      data-orientation=${this.orientation}
    >
      <slot></slot>
    </div>`;
  }
}
