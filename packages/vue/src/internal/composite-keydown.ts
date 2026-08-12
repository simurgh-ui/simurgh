import { nextIndex } from '@simurgh-ui/core';

export function compositeKeydown(event: KeyboardEvent, selector: string) {
  const root = event.currentTarget as HTMLElement;
  const items = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (item) => item.getAttribute('aria-disabled') !== 'true',
  );
  const current = items.indexOf(document.activeElement as HTMLElement);
  const target = nextIndex(current < 0 ? 0 : current, items.length, event.key, {
    orientation: 'vertical',
  });
  if (
    target !== current &&
    ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
  ) {
    event.preventDefault();
    items[target]?.focus();
  } else if ((event.key === 'Enter' || event.key === ' ') && current >= 0) {
    event.preventDefault();
    items[current]?.click();
  }
}
