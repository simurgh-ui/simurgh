import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-avatar')
export class Avatar extends LitElement {
  @property() src = '';
  @property() alt = '';
  @property({ type: Boolean, state: true }) private loaded = false;
  updated(changed: Map<string, unknown>) {
    if (changed.has('src')) this.loaded = false;
  }
  render() {
    return html`<span
      part="root"
      data-state=${this.loaded ? 'loaded' : 'fallback'}
    >
      ${
      this.src
        ? html`<img
            part="image"
            src=${this.src}
            alt=${this.alt}
            ?hidden=${!this.loaded}
            @load=${() => (this.loaded = true)}
            @error=${() => (this.loaded = false)}
          />`
        : null
    }
      ${!this.loaded ? html`<span part="fallback" data-part="fallback"><slot name="fallback"></slot></span>` : null}</span
    >`;
  }
}
