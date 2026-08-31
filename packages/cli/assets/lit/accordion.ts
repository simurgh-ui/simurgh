import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type AccordionItem = {
  value: string;
  title: string;
  content?: string;
  disabled?: boolean;
};
@customElement('simurgh-accordion')
export class Accordion extends LitElement {
  @property({ attribute: false }) value: string[] = [];
  @property({ attribute: false }) items: AccordionItem[] = [];
  @property({ type: Boolean }) multiple = false;
  private toggle(item: AccordionItem) {
    if (item.disabled) return;
    this.value = this.value.includes(item.value)
      ? this.value.filter((v) => v !== item.value)
      : this.multiple
        ? [...this.value, item.value]
        : [item.value];
  }
  render() {
    return html`<div part="root" data-slot="accordion">
      ${this.items.map(
        (item) =>
          html`<div
            part="item"
            data-slot="accordion-item"
            data-state=${this.value.includes(item.value) ? 'open' : 'closed'}
          >
            <h3>
              <button
                type="button"
                aria-expanded=${this.value.includes(item.value)}
                ?disabled=${item.disabled}
                @click=${() => this.toggle(item)}
              >
                ${item.title}
              </button>
            </h3>
            <div part="content" ?hidden=${!this.value.includes(item.value)}>
              ${item.content ?? ''}
            </div>
          </div>`,
      )}
    </div>`;
  }
}
