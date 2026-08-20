export function focusElement(element: Element | null | undefined) {
  if (element instanceof HTMLElement) element.focus();
}

export function focusAfterFrame(element: Element | null | undefined) {
  requestAnimationFrame(() => focusElement(element));
}
