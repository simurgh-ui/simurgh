import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type DescriptionItem = { term: string; details: string };
@customElement('simurgh-description-list')
export class DescriptionList extends LitElement {
  @property({ attribute: false }) items: DescriptionItem[] = [];
  render() {
    return html`<dl part="list" data-slot="description-list">
      ${this.items.map(
        (item) =>
          html`<div part="group" data-slot="description-list-group">
            <dt part="term" data-slot="description-list-term">${item.term}</dt>
            <dd part="details" data-slot="description-list-details">
              ${item.details}
            </dd>
          </div>`,
      )}<slot></slot>
    </dl>`;
  }
}
