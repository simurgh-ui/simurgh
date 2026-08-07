export type Direction = 'ltr' | 'rtl';
export type Orientation = 'horizontal' | 'vertical';
export type MaybeGetter<T> = T | (() => T);

let id = 0;
export function createId(prefix = 'simurgh'): string {
  id += 1;
  return `${prefix}-${id}`;
}

export function resolveDirection(element?: Element | null, explicit?: Direction): Direction {
  if (explicit) return explicit;
  if (element && typeof getComputedStyle === 'function') {
    return getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr';
  }
  return 'ltr';
}

export function nextIndex(
  current: number,
  size: number,
  key: string,
  options: { orientation?: Orientation; direction?: Direction; loop?: boolean } = {},
): number {
  if (size <= 0) return -1;
  const { orientation = 'horizontal', direction = 'ltr', loop = true } = options;
  const previous = orientation === 'vertical' ? 'ArrowUp' : direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const next = orientation === 'vertical' ? 'ArrowDown' : direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  if (key === 'Home') return 0;
  if (key === 'End') return size - 1;
  const delta = key === previous ? -1 : key === next ? 1 : 0;
  if (!delta) return current;
  const candidate = current + delta;
  if (loop) return (candidate + size) % size;
  return Math.max(0, Math.min(size - 1, candidate));
}

export function focusable(container: ParentNode): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  ).filter((node) => !node.hidden && node.getAttribute('aria-hidden') !== 'true');
}

export function trapFocus(event: KeyboardEvent, container: ParentNode): void {
  if (event.key !== 'Tab') return;
  const nodes = focusable(container);
  const first = nodes[0];
  const last = nodes.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function createControllableState<T>(initial: T, onChange?: (value: T) => void) {
  let value = initial;
  return {
    get value() { return value; },
    set(next: T) { if (!Object.is(value, next)) { value = next; onChange?.(next); } },
    toggle() { if (typeof value === 'boolean') this.set(!value as T); },
  };
}

export function restoreFocus(previous: Element | null): void {
  if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
}

export function formValue(value: string, checked = true): string | null {
  return checked ? value : null;
}

export const isBrowser = typeof document !== 'undefined';
