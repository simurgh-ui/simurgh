import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
@customElement('simurgh-hover-card')
export class HoverCard extends LitElement {
  @state() private open = false;
  render() {
    return html`<span
      part="root"
      data-slot="hover-card"
      @mouseenter=${() => (this.open = true)}
      @mouseleave=${() => (this.open = false)}
      @focusin=${() => (this.open = true)}
      @focusout=${() => (this.open = false)}
      ><span part="trigger"><slot name="trigger"></slot></span
      ><span
        part="content"
        data-state=${this.open ? 'open' : 'closed'}
        ?hidden=${!this.open}
        ><slot></slot></span
    ></span>`;
  }
}
