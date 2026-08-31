import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('simurgh-tooltip')
export class Tooltip extends LitElement {
  @property() content = '';
  @state() private open = false;
  render() {
    return html`<span
      part="root"
      data-slot="tooltip"
      @mouseenter=${() => (this.open = true)}
      @mouseleave=${() => (this.open = false)}
      @focusin=${() => (this.open = true)}
      @focusout=${() => (this.open = false)}
      ><span part="trigger" aria-describedby="tooltip-content"
        ><slot></slot></span
      ><span
        part="content"
        id="tooltip-content"
        role="tooltip"
        ?hidden=${!this.open}
        >${this.content}</span
      ></span
    >`;
  }
}
