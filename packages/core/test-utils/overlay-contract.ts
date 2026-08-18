import { expect, vi } from 'vitest';
import { computeFloatingPosition } from '../src/floating.js';

export type OverlayContractHarness = {
  document: Document;
  host: HTMLElement;
  portal: 'body' | 'host';
  getParentTrigger(): HTMLElement;
  getChildTrigger(): HTMLElement;
  getParentContent(): HTMLElement | null;
  getChildContent(): HTMLElement | null;
  activate(element: HTMLElement): Promise<void>;
  pressEscape(element: HTMLElement): Promise<void>;
  pointerDown(element: HTMLElement): Promise<void>;
  flush(): Promise<void>;
  unmount(): void;
};

function rect(left: number, top: number, width: number, height: number) {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

export async function runSharedOverlayContract(
  harness: OverlayContractHarness,
) {
  const removeListener = vi.spyOn(harness.document, 'removeEventListener');
  const parentTrigger = harness.getParentTrigger();
  expect(harness.getParentContent()).toBeNull();

  parentTrigger.focus();
  await harness.activate(parentTrigger);
  const parentContent = harness.getParentContent();
  expect(parentContent).not.toBeNull();
  expect(parentContent?.getAttribute('role')).toBe('dialog');
  expect(parentTrigger.getAttribute('aria-haspopup')).toBe('dialog');
  expect(parentTrigger.getAttribute('aria-expanded')).toBe('true');
  expect(parentContent?.getAttribute('data-simurgh-floating-content')).toBe(
    parentTrigger.getAttribute('data-simurgh-floating-reference'),
  );
  if (harness.portal === 'body')
    expect(parentContent?.parentElement).toBe(harness.document.body);
  else expect(harness.host.contains(parentContent)).toBe(true);

  Object.defineProperties(harness.document.documentElement, {
    clientWidth: { configurable: true, value: 320 },
    clientHeight: { configurable: true, value: 240 },
  });
  parentTrigger.style.direction = 'rtl';
  parentTrigger.getBoundingClientRect = () => rect(100, 40, 40, 20);
  parentContent!.getBoundingClientRect = () => rect(0, 0, 80, 30);
  expect(
    computeFloatingPosition(parentTrigger, parentContent!, {
      placement: 'bottom-start',
    }),
  ).toEqual({ x: 60, y: 68, placement: 'bottom-start' });
  parentTrigger.getBoundingClientRect = () => rect(300, 210, 20, 20);
  parentContent!.getBoundingClientRect = () => rect(0, 0, 80, 40);
  expect(computeFloatingPosition(parentTrigger, parentContent!)).toEqual({
    x: 232,
    y: 162,
    placement: 'top',
  });

  const childTrigger = harness.getChildTrigger();
  await harness.activate(childTrigger);
  const childContent = harness.getChildContent();
  expect(childContent).not.toBeNull();
  await harness.pointerDown(childContent!);
  expect(harness.getParentContent()).not.toBeNull();
  expect(harness.getChildContent()).not.toBeNull();

  childTrigger.focus();
  await harness.pressEscape(childTrigger);
  expect(harness.getChildContent()).toBeNull();
  expect(harness.getParentContent()).not.toBeNull();
  expect(harness.document.activeElement).toBe(childTrigger);

  await harness.pointerDown(harness.document.body);
  expect(harness.getParentContent()).toBeNull();
  expect(harness.document.activeElement).toBe(parentTrigger);

  await harness.activate(parentTrigger);
  expect(harness.getParentContent()).not.toBeNull();
  harness.unmount();
  await harness.flush();
  expect(removeListener).toHaveBeenCalledWith(
    'pointerdown',
    expect.any(Function),
  );
}
