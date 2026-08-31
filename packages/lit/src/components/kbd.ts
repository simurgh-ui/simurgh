import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-kbd')
export class Kbd extends LitElement {
  render() {
    return html`<kbd part="kbd" data-slot="kbd"><slot></slot></kbd>`;
  }
}
