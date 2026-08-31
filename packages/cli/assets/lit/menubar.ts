import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
export type MenubarMenu = {
  label: string;
  items: { value: string; label: string; disabled?: boolean }[];
};
@customElement('simurgh-menubar')
export class Menubar extends LitElement {
  @property({ attribute: false }) menus: MenubarMenu[] = [];
  @property() label = 'Menu bar';
  @state() private open = -1;
  render() {
    return html`<div
      part="menubar"
      role="menubar"
      aria-label=${this.label}
      data-slot="menubar"
    >
      ${this.menus.map(
        (menu, index) =>
          html`<div>
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded=${this.open === index}
              @click=${() => (this.open = this.open === index ? -1 : index)}
            >
              ${menu.label}
            </button>
            <div role="menu" ?hidden=${this.open !== index}>
              ${menu.items.map(
                (item) =>
                  html`<button
                    type="button"
                    role="menuitem"
                    ?disabled=${item.disabled}
                    @click=${() => {
                      this.dispatchEvent(
                        new CustomEvent('select', { detail: item.value }),
                      );
                      this.open = -1;
                    }}
                  >
                    ${item.label}
                  </button>`,
              )}
            </div>
          </div>`,
      )}
    </div>`;
  }
}
