import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
  content?: string;
};
@customElement('simurgh-tabs')
export class Tabs extends LitElement {
  @property() value = '';
  @property({ attribute: false }) tabs: TabItem[] = [];
  @property() label = 'Tabs';
  protected willUpdate() {
    if (!this.value && this.tabs[0]) this.value = this.tabs[0].value;
  }
  render() {
    return html`<div part="root" data-slot="tabs">
      <div part="list" role="tablist" aria-label=${this.label}>
        ${this.tabs.map((tab) => html`<button type="button" role="tab" aria-selected=${this.value === tab.value} aria-controls=${`panel-${tab.value}`} id=${`tab-${tab.value}`} ?disabled=${tab.disabled} tabindex=${this.value === tab.value ? 0 : -1} @click=${() => (this.value = tab.value)}>${tab.label}</button>`)}
      </div>
      ${this.tabs.map((tab) => html`<div part="panel" role="tabpanel" id=${`panel-${tab.value}`} aria-labelledby=${`tab-${tab.value}`} ?hidden=${this.value !== tab.value}>${tab.content ?? ''}</div>`)}
    </div>`;
  }
}
