import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type MenuItem = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-dropdown-menu')
export class DropdownMenu extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: false }) items: MenuItem[] = [];
  @property() label = 'Menu';
  render() {
    return html`<button
        part="trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open}
        @click=${() => (this.open = !this.open)}
      >
        ${this.label}<slot name="trigger"></slot>
      </button>
      <div part="content" role="menu" ?hidden=${!this.open}>
        ${this.items.map(
          (item) =>
            html`<button
              type="button"
              role="menuitem"
              ?disabled=${item.disabled}
              @click=${() => {
                this.dispatchEvent(
                  new CustomEvent('select', { detail: item.value }),
                );
                this.open = false;
              }}
            >
              ${item.label}
            </button>`,
        )}
      </div>`;
  }
}
