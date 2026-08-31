// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import '../src/index.js';
import { Toggle } from '../src/components/toggle.js';

const componentNames = [
  'dialog',
  'alert-dialog',
  'sheet',
  'drawer',
  'popover',
  'tooltip',
  'hover-card',
  'dropdown-menu',
  'context-menu',
  'select',
  'native-select',
  'combobox',
  'command',
  'calendar',
  'date-picker',
  'carousel',
  'resizable',
  'sidebar',
  'tree',
  'file-upload',
  'password-input',
  'number-input',
  'rating',
  'tags-input',
  'tabs',
  'accordion',
  'checkbox',
  'label',
  'separator',
  'progress',
  'chart',
  'toggle',
  'visually-hidden',
  'avatar',
  'alert',
  'aspect-ratio',
  'skeleton',
  'spinner',
  'button',
  'button-group',
  'link',
  'input',
  'input-group',
  'input-otp',
  'slider',
  'meter',
  'toolbar',
  'toggle-group',
  'scroll-area',
  'textarea',
  'badge',
  'breadcrumb',
  'navigation-menu',
  'menubar',
  'card',
  'empty',
  'item',
  'kbd',
  'field',
  'form',
  'table',
  'pagination',
  'collapsible',
  'disclosure',
  'description-list',
  'switch',
  'radio-group',
  'toast',
];

describe('Lit adapter catalog', () => {
  it('registers the complete 68-element catalog', () => {
    expect(componentNames).toHaveLength(68);
    for (const name of componentNames)
      expect(customElements.get(`simurgh-${name}`), name).toBeDefined();
  });

  it('reflects interactive state into accessible native markup', async () => {
    const toggle = new Toggle();
    document.body.append(toggle);
    await toggle.updateComplete;
    const button = toggle.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-pressed')).toBe('false');
    button?.click();
    await toggle.updateComplete;
    expect(button?.getAttribute('aria-pressed')).toBe('true');
    toggle.remove();
  });
});
