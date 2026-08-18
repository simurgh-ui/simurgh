import { beforeEach, describe, expect, it, vi } from 'vitest';
import { applyTheme, copyInstallCommand, initNavigation } from './interactions';

describe('site interactions', () => {
  beforeEach(() => { document.documentElement.className = ''; document.documentElement.dataset.theme = ''; document.body.innerHTML = ''; });
  it('applies explicit and system themes', () => {
    applyTheme(document.documentElement, 'dark', false);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    applyTheme(document.documentElement, 'system', false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('system');
  });
  it('copies the installation command', async () => {
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    await expect(copyInstallCommand('pnpm dlx @simurgh-ui/cli init', clipboard)).resolves.toBe('Copied');
    expect(clipboard.writeText).toHaveBeenCalledWith('pnpm dlx @simurgh-ui/cli init');
  });
  it('opens and closes mobile navigation', () => {
    document.body.innerHTML = '<button data-menu-button aria-expanded="false"></button><nav data-mobile-menu hidden><a href="/">Home</a></nav>';
    initNavigation(document);
    const button = document.querySelector<HTMLButtonElement>('button')!;
    const menu = document.querySelector<HTMLElement>('nav')!;
    button.click(); expect(button.getAttribute('aria-expanded')).toBe('true'); expect(menu.hidden).toBe(false);
    menu.querySelector('a')!.click(); expect(button.getAttribute('aria-expanded')).toBe('false'); expect(menu.hidden).toBe(true);
  });
});
