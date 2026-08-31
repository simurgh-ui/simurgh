import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-table')
export class Table extends LitElement {
  render() {
    return html`<div part="container" data-slot="table-container">
      <table part="table" data-slot="table">
        <caption data-slot="table-caption">
          <slot name="caption"></slot>
        </caption>
        <thead data-slot="table-header">
          <slot name="head"></slot>
        </thead>
        <tbody data-slot="table-body">
          <slot></slot>
        </tbody>
        <tfoot data-slot="table-footer">
          <slot name="foot"></slot>
        </tfoot>
      </table>
    </div>`;
  }
}
