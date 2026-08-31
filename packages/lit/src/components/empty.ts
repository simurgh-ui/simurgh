import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-empty')
export class Empty extends LitElement {
  render() {
    return html`<div part="root" data-slot="empty">
      <div part="header" data-slot="empty-header">
        <div part="media" data-slot="empty-media">
          <slot name="media"></slot>
        </div>
        <h3 part="title" data-slot="empty-title"><slot name="title"></slot></h3>
        <p part="description" data-slot="empty-description">
          <slot name="description"></slot>
        </p>
      </div>
      <div part="content" data-slot="empty-content"><slot></slot></div>
    </div>`;
  }
}
