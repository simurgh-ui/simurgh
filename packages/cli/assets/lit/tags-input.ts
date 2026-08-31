import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-tags-input')
export class TagsInput extends FormControlElement {
  @property({ attribute: false }) value: string[] = [];
  @property() label = 'Tags';
  @state() private draft = '';
  private commit() {
    const tag = this.draft.trim();
    if (tag && !this.value.includes(tag)) this.value = [...this.value, tag];
    this.draft = '';
  }
  protected updated() {
    this.updateFormValue(this.value.join(','));
  }
  formResetCallback() {
    this.value = [];
    this.draft = '';
  }
  render() {
    return html`<div part="root" data-slot="tags-input">
      ${this.value.map((tag, index) => html`<span part="tag" data-slot="tag">${tag}<button type="button" aria-label=${`Remove ${tag}`} ?disabled=${this.disabled} @click=${() => (this.value = this.value.filter((_, i) => i !== index))}>×</button></span>`)}<input
        .value=${this.draft}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @input=${(e: Event) => (this.draft = (e.target as HTMLInputElement).value)}
        @blur=${this.commit}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            this.commit();
          }
        }}
      />
    </div>`;
  }
}
