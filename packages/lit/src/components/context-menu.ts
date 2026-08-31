import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { MenuItem } from './dropdown-menu.js';
@customElement('simurgh-context-menu')
export class ContextMenu extends LitElement {
  @property({ attribute: false }) items: MenuItem[] = [];
  @state() private open = false;
  @state() private x = 0;
  @state() private y = 0;
  render() {
    return html`<div
      part="root"
      data-slot="context-menu"
      @contextmenu=${(e: MouseEvent) => {
        e.preventDefault();
        this.x = e.clientX;
        this.y = e.clientY;
        this.open = true;
      }}
    >
      <slot></slot>
      <div
        part="content"
        role="menu"
        ?hidden=${!this.open}
        style=${`position:fixed;left:${this.x}px;top:${this.y}px`}
      >
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
      </div>
    </div>`;
  }
}
