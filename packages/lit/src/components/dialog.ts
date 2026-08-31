import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-dialog')
export class Dialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = '';
  @property() description = '';
  @query('dialog') private dialog?: HTMLDialogElement;
  protected updated() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
  }
  render() {
    return html`<button
        part="trigger"
        type="button"
        data-slot="dialog-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="dialog-content"
        @close=${() => (this.open = false)}
      >
        ${this.title ? html`<h2 data-slot="dialog-title">${this.title}</h2>` : null}${this.description ? html`<p data-slot="dialog-description">${this.description}</p>` : null}<slot
        ></slot
        ><button
          part="close"
          type="button"
          data-slot="dialog-close"
          @click=${() => (this.open = false)}
        >
          Close
        </button>
      </dialog>`;
  }
}
