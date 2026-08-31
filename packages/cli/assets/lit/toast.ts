import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};
@customElement('simurgh-toast')
export class Toast extends LitElement {
  @property({ attribute: false }) messages: ToastMessage[] = [];
  @property() label = 'Notifications';
  render() {
    return html`<div
      part="viewport"
      aria-label=${this.label}
      data-slot="toast-viewport"
    >
      ${this.messages.map((message) => html`<div part="toast" role=${message.tone === 'danger' ? 'alert' : 'status'} aria-live=${message.tone === 'danger' ? 'assertive' : 'polite'} data-slot="toast" data-tone=${message.tone ?? 'neutral'}><strong>${message.title}</strong>${message.description ? html`<p>${message.description}</p>` : null}<button type="button" aria-label="Dismiss notification" @click=${() => (this.messages = this.messages.filter((item) => item.id !== message.id))}>×</button></div>`)}
    </div>`;
  }
}
