import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-sheet')
export class Sheet extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() side: 'top' | 'right' | 'bottom' | 'left' = 'right';
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
        data-slot="sheet-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="sheet-content"
        data-side=${this.side}
        @close=${() => (this.open = false)}
      >
        ${this.title ? html`<h2 data-slot="sheet-title">${this.title}</h2>` : null}<slot
        ></slot
        ><button
          type="button"
          aria-label="Close"
          data-slot="sheet-close"
          @click=${() => (this.open = false)}
        >
          ×
        </button>
      </dialog>`;
  }
}
