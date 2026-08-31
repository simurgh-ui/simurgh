import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-item')
export class Item extends LitElement {
  render() {
    return html`<div part="item" data-slot="item">
      <div part="media" data-slot="item-media"><slot name="media"></slot></div>
      <div part="content" data-slot="item-content">
        <div part="title" data-slot="item-title">
          <slot name="title"></slot>
        </div>
        <p part="description" data-slot="item-description">
          <slot name="description"></slot>
        </p>
        <slot></slot>
      </div>
      <div part="actions" data-slot="item-actions">
        <slot name="actions"></slot>
      </div>
    </div>`;
  }
}
