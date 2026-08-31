import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-drawer')
export class Drawer extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = '';
  @query('dialog') private dialog?: HTMLDialogElement;
  protected updated() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
  }
  render() {
    return html`<button
        type="button"
        data-slot="drawer-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="drawer-content"
        data-side="bottom"
        @close=${() => (this.open = false)}
      >
        ${this.title ? html`<h2 data-slot="drawer-title">${this.title}</h2>` : null}<slot
        ></slot
        ><button
          type="button"
          aria-label="Close"
          data-slot="drawer-close"
          @click=${() => (this.open = false)}
        >
          ×
        </button>
      </dialog>`;
  }
}
