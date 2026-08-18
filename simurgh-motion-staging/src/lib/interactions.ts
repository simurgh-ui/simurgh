export type Theme = 'light' | 'dark' | 'system';

export function applyTheme(root: HTMLElement, theme: Theme, prefersDark: boolean) {
  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark));
}

export function initTheme(doc: Document, win: Window) {
  const media = win.matchMedia('(prefers-color-scheme: dark)');
  const saved = (win.localStorage.getItem('simurgh-theme') as Theme | null) ?? 'system';
  applyTheme(doc.documentElement, saved, media.matches);
  doc.querySelectorAll<HTMLButtonElement>('[data-theme-value]').forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.dataset.themeValue as Theme;
      win.localStorage.setItem('simurgh-theme', theme);
      applyTheme(doc.documentElement, theme, media.matches);
    });
  });
  media.addEventListener('change', (event) => {
    if ((doc.documentElement.dataset.theme ?? 'system') === 'system') applyTheme(doc.documentElement, 'system', event.matches);
  });
}

export function initNavigation(doc: Document) {
  const button = doc.querySelector<HTMLButtonElement>('[data-menu-button]');
  const menu = doc.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!button || !menu) return;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { button.setAttribute('aria-expanded', 'false'); menu.hidden = true; }));
}

export async function copyInstallCommand(text: string, clipboard: Pick<Clipboard, 'writeText'>) {
  await clipboard.writeText(text);
  return 'Copied';
}
