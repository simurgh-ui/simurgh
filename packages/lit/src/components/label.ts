import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-label')
export class Label extends LitElement {
  @property({ attribute: 'for' }) htmlFor = '';
  render() {
    return html`<label part="label" for=${this.htmlFor}><slot></slot></label>`;
  }
}
