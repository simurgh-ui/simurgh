import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-scroll-area')
export class ScrollArea extends LitElement {
  @property() orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
  render() {
    return html`<div
      part="root"
      data-slot="scroll-area"
      data-orientation=${this.orientation}
      tabindex="0"
    >
      <div part="viewport" data-slot="scroll-area-viewport"><slot></slot></div>
    </div>`;
  }
}
