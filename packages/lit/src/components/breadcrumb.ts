import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-breadcrumb')
export class Breadcrumb extends LitElement {
  @property() label = 'Breadcrumb';
  render() {
    return html`<nav part="nav" aria-label=${this.label} data-slot="breadcrumb">
      <ol part="list">
        <slot></slot>
      </ol>
    </nav>`;
  }
}
