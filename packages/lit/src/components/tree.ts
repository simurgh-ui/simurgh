import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type TreeItem = {
  value: string;
  label: string;
  level?: number;
  disabled?: boolean;
};
@customElement('simurgh-tree')
export class Tree extends LitElement {
  @property() value = '';
  @property({ attribute: false }) items: TreeItem[] = [];
  @property() label = 'Tree';
  render() {
    return html`<div
      part="tree"
      role="tree"
      aria-label=${this.label}
      data-slot="tree"
    >
      ${this.items.map((item) => html`<button type="button" role="treeitem" aria-level=${(item.level ?? 0) + 1} aria-selected=${this.value === item.value} ?disabled=${item.disabled} style=${`padding-inline-start:${(item.level ?? 0) * 1.25}rem`} @click=${() => (this.value = item.value)}>${item.label}</button>`)}
    </div>`;
  }
}
