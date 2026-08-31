import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-link')
export class Link extends LitElement {
  @property() href = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) external = false;
  render() {
    return html`<a
      part="link"
      href=${this.disabled ? '' : this.href}
      aria-disabled=${this.disabled ? 'true' : 'false'}
      data-slot="link"
      data-external=${this.external ? 'true' : 'false'}
      rel=${this.external ? 'noopener noreferrer' : ''}
      target=${this.external ? '_blank' : ''}
      tabindex=${this.disabled ? -1 : 0}
      @click=${(event: Event) => {
      if (this.disabled) event.preventDefault();
    }}
      ><slot></slot
    ></a>`;
  }
}
