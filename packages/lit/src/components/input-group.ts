import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-input-group')
export class InputGroup extends LitElement {
  render() {
    return html`<div part="group" data-slot="input-group">
      <span part="addon start" data-slot="input-group-addon" data-align="start"
        ><slot name="prefix"></slot></span
      ><slot></slot
      ><span part="addon end" data-slot="input-group-addon" data-align="end"
        ><slot name="suffix"></slot
      ></span>
    </div>`;
  }
}
