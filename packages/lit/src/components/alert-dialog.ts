import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-alert-dialog')
export class AlertDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = 'Are you sure?';
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
        data-slot="alert-dialog-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="alert-dialog-content"
        aria-labelledby="alert-title"
        @close=${() => (this.open = false)}
      >
        <h2 id="alert-title" data-slot="alert-dialog-title">${this.title}</h2>
        ${this.description ? html`<p data-slot="alert-dialog-description">${this.description}</p>` : null}<slot
        ></slot
        ><button
          type="button"
          data-slot="alert-dialog-cancel"
          @click=${() => (this.open = false)}
        >
          Cancel</button
        ><button
          type="button"
          data-slot="alert-dialog-action"
          @click=${() => {
            this.dispatchEvent(new CustomEvent('action'));
            this.open = false;
          }}
        >
          Continue
        </button>
      </dialog>`;
  }
}
