// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { createFloatingInteractions } from '../src/floating-interactions.js';

function setup(kind: 'popover' | 'tooltip' | 'hovercard' | 'menu' | 'listbox') {
  let open = false;
  const reference = document.createElement('button');
  const floating = document.createElement('div');
  document.body.append(reference, floating);
  const setOpen = vi.fn((value: boolean) => (open = value));
  const interactions = createFloatingInteractions({
    kind,
    id: 'floating-id',
    getOpen: () => open,
    setOpen,
    getReference: () => reference,
    getFloating: () => floating,
  });
  return { interactions, reference, floating, setOpen };
}

describe('floating interactions', () => {
  it('assigns roles and click semantics by interaction kind', () => {
    const { interactions, setOpen } = setup('menu');
    expect(interactions.referenceAttributes['aria-haspopup']).toBe('menu');
    expect(interactions.floatingAttributes.role).toBe('menu');
    interactions.onReferenceClick({ defaultPrevented: false });
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  it('opens and closes hover disclosures without click state', () => {
    const { interactions, setOpen } = setup('tooltip');
    expect(interactions.referenceAttributes['aria-describedby']).toBe(
      'floating-id',
    );
    interactions.onReferenceMouseEnter?.({ defaultPrevented: false });
    interactions.onReferenceFocus?.({ defaultPrevented: false });
    interactions.onReferenceMouseLeave?.({ defaultPrevented: false });
    interactions.onReferenceBlur?.({ defaultPrevented: false });
    expect(setOpen.mock.calls.map(([value]) => value)).toEqual([
      true,
      true,
      false,
      false,
    ]);
  });

  it('respects composed handlers that prevent the default action', () => {
    const { interactions, setOpen } = setup('popover');
    interactions.onReferenceClick({ defaultPrevented: true });
    interactions.onFloatingKeyDown({
      defaultPrevented: true,
      key: 'Escape',
    });
    expect(setOpen).not.toHaveBeenCalled();
  });

  it('dismisses on Escape or outside press and restores connected focus', () => {
    const { interactions, reference, floating, setOpen } = setup('popover');
    const cleanup = interactions.listenForOutsidePress(document);
    floating.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(setOpen).not.toHaveBeenCalled();
    document.body.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true }),
    );
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(reference);
    interactions.onFloatingKeyDown({ defaultPrevented: false, key: 'Escape' });
    expect(document.activeElement).toBe(reference);
    cleanup();
  });
});
