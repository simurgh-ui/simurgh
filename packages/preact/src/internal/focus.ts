// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
export function focusElement(element: Element | null | undefined) {
  if (element instanceof HTMLElement) element.focus();
}

export function focusAfterFrame(element: Element | null | undefined) {
  requestAnimationFrame(() => focusElement(element));
}
