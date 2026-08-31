import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ChartDatum = { label: string; value: number; color?: string };
@customElement('simurgh-chart')
export class Chart extends LitElement {
  @property({ attribute: false }) data: ChartDatum[] = [];
  @property() label = 'Chart';
  @property({ type: Number }) width = 400;
  @property({ type: Number }) height = 200;
  render() {
    const maximum = Math.max(1, ...this.data.map((item) => item.value));
    return html`<figure part="figure" data-slot="chart">
      <svg
        role="img"
        aria-label=${this.label}
        viewBox=${`0 0 ${this.width} ${this.height}`}
      >
        ${this.data.map((item, index) => svg`<rect x=${index * (this.width / Math.max(this.data.length, 1))} y=${this.height - (item.value / maximum) * this.height} width=${this.width / Math.max(this.data.length, 1) - 4} height=${(item.value / maximum) * this.height} fill=${item.color ?? 'currentColor'}><title>${item.label}: ${item.value}</title></rect>`)}
      </svg>
      <figcaption>${this.label}</figcaption>
    </figure>`;
  }
}
