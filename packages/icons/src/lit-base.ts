import { LitElement, html, svg } from 'lit';
import {
  explicitMirrorTransform,
  iconDirectionMode,
  iconDirectionStyles,
} from './direction.js';
import type { IconDefinition } from './types.js';

export class SimurghLitIcon extends LitElement {
  static properties = {
    size: { attribute: true },
    title: { attribute: true },
    direction: { attribute: true },
    mirrorInRtl: { attribute: 'mirror-in-rtl', type: Boolean },
    colorMode: { attribute: 'color-mode' },
  };
  size: number | string = 24;
  title = '';
  direction?: 'ltr' | 'rtl';
  mirrorInRtl = true;
  colorMode: 'duotone' | 'currentColor' = 'duotone';
  protected definition!: IconDefinition;
  createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
  render() {
    const definition = this.definition;
    const mode = iconDirectionMode(
      this.direction,
      this.mirrorInRtl,
      definition.direction === 'directional',
    );
    return html`<svg
      width=${this.size}
      height=${this.size}
      viewBox=${definition.viewBox}
      role=${this.title ? 'img' : 'presentation'}
      aria-label=${this.title ?? ''}
      aria-hidden=${this.title ? 'false' : 'true'}
      focusable="false"
      data-simurgh-direction=${mode}
    >
      ${
        mode === 'auto'
          ? html`<style>
              ${iconDirectionStyles}
            </style>`
          : null
      }
      ${svg`<g class="simurgh-icon-directional" transform=${explicitMirrorTransform(mode) ?? ''}>
        <g transform=${definition.transform}>${definition.paths.map(
          (path, index) => svg`<path d=${path.d}
          fill=${this.colorMode === 'currentColor' ? 'currentColor' : index === 0 ? `var(--simurgh-icon-primary, ${path.fill})` : `var(--simurgh-icon-secondary, ${path.fill})`}
          opacity=${path.opacity ?? 1}></path>`,
        )}</g></g>`}
    </svg>`;
  }
}

export function createIconComponent(
  definition: IconDefinition,
  tagName: string,
): typeof SimurghLitIcon {
  class IconElement extends SimurghLitIcon {
    protected definition = definition;
  }
  if (typeof customElements !== 'undefined' && !customElements.get(tagName))
    customElements.define(tagName, IconElement);
  return IconElement as typeof SimurghLitIcon;
}
