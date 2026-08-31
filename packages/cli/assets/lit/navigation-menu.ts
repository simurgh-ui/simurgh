import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type NavigationItem = { href: string; label: string; current?: boolean };
@customElement('simurgh-navigation-menu')
export class NavigationMenu extends LitElement {
  @property({ attribute: false }) items: NavigationItem[] = [];
  @property() label = 'Main navigation';
  render() {
    return html`<nav
      part="nav"
      aria-label=${this.label}
      data-slot="navigation-menu"
    >
      <ul>
        ${this.items.map((item) => html`<li><a href=${item.href} aria-current=${item.current ? 'page' : 'false'} data-slot="navigation-menu-link">${item.label}</a></li>`)}
      </ul>
    </nav>`;
  }
}
