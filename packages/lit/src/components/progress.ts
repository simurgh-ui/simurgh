import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-progress')
export class Progress extends LitElement {
  @property({ type: Number }) value: number | null = null;
  @property({ type: Number }) max = 100;
  render() {
    const safeMax = Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    const safeValue =
      this.value == null || !Number.isFinite(this.value)
        ? null
        : Math.min(safeMax, Math.max(0, this.value));
    const percentage = safeValue == null ? null : (safeValue / safeMax) * 100;
    return html`<div
      part="root"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax=${safeMax}
      aria-valuenow=${safeValue ?? ''}
      data-state=${safeValue == null ? 'indeterminate' : 'determinate'}
      data-value=${safeValue ?? ''}
      data-max=${safeMax}
    >
      <span
        part="indicator"
        data-part="indicator"
        style=${percentage == null ? '' : `inline-size:${percentage}%`}
      ></span>
    </div>`;
  }
}
