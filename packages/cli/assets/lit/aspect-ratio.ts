import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-aspect-ratio')
export class AspectRatio extends LitElement {
  @property({ type: Number }) ratio = 1;
  render() {
    const ratio =
      Number.isFinite(this.ratio) && this.ratio > 0 ? this.ratio : 1;
    return html`<div
      part="root"
      data-ratio=${ratio}
      style=${`aspect-ratio:${ratio}`}
    >
      <slot></slot>
    </div>`;
  }
}
