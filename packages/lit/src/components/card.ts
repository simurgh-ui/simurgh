import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-card')
export class Card extends LitElement {
  render() {
    return html`<div part="card" data-slot="card">
      <div part="header" data-slot="card-header">
        <slot name="header"></slot>
        <h3 part="title" data-slot="card-title"><slot name="title"></slot></h3>
        <p part="description" data-slot="card-description">
          <slot name="description"></slot>
        </p>
      </div>
      <div part="content" data-slot="card-content"><slot></slot></div>
      <div part="footer" data-slot="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>`;
  }
}
