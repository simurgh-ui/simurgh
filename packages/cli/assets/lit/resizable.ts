import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-resizable')
export class Resizable extends LitElement {
  @property({ type: Number }) size = 50;
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Number }) min = 10;
  @property({ type: Number }) max = 90;
  render() {
    return html`<div
      part="group"
      data-slot="resizable-panel-group"
      data-orientation=${this.orientation}
    >
      <div
        part="panel first"
        data-slot="resizable-panel"
        style=${`flex-basis:${this.size}%`}
      >
        <slot name="first"></slot>
      </div>
      <input
        part="handle"
        type="range"
        aria-label="Resize panels"
        .value=${String(this.size)}
        min=${this.min}
        max=${this.max}
        data-slot="resizable-handle"
        @input=${(e: Event) => (this.size = (e.target as HTMLInputElement).valueAsNumber)}
      />
      <div
        part="panel second"
        data-slot="resizable-panel"
        style=${`flex-basis:${100 - this.size}%`}
      >
        <slot name="second"></slot>
      </div>
    </div>`;
  }
}
