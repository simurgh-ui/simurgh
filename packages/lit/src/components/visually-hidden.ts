import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-visually-hidden')
export class VisuallyHidden extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}
