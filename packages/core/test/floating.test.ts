// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import {
  autoUpdateFloating,
  computeFloatingPosition,
} from '../src/floating.js';

function rect(
  left: number,
  top: number,
  width: number,
  height: number,
): DOMRect {
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
  };
}

function elements(referenceRect: DOMRect, floatingRect: DOMRect) {
  const reference = document.createElement('button');
  const floating = document.createElement('div');
  reference.getBoundingClientRect = () => referenceRect;
  floating.getBoundingClientRect = () => floatingRect;
  Object.defineProperties(document.documentElement, {
    clientWidth: { configurable: true, value: 320 },
    clientHeight: { configurable: true, value: 240 },
  });
  return { reference, floating };
}

describe('floating positioning', () => {
  it('applies the offset and alignment', () => {
    const { reference, floating } = elements(
      rect(100, 40, 40, 20),
      rect(0, 0, 80, 30),
    );
    expect(
      computeFloatingPosition(reference, floating, {
        placement: 'bottom-start',
      }),
    ).toEqual({ x: 100, y: 68, placement: 'bottom-start' });
  });

  it('flips at an edge and shifts inside viewport padding', () => {
    const { reference, floating } = elements(
      rect(300, 210, 20, 20),
      rect(0, 0, 80, 40),
    );
    expect(computeFloatingPosition(reference, floating)).toEqual({
      x: 232,
      y: 162,
      placement: 'top',
    });
  });

  it('resolves start alignment in RTL', () => {
    const { reference, floating } = elements(
      rect(100, 40, 40, 20),
      rect(0, 0, 80, 30),
    );
    expect(
      computeFloatingPosition(reference, floating, {
        placement: 'bottom-start',
        direction: 'rtl',
      }).x,
    ).toBe(60);
  });

  it('updates immediately and tears event listeners down', () => {
    const { reference, floating } = elements(
      rect(100, 40, 40, 20),
      rect(0, 0, 80, 30),
    );
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const update = vi.fn();
    const cleanup = autoUpdateFloating(reference, floating, update);
    expect(update).toHaveBeenCalledOnce();
    expect(add).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    cleanup();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function), true);
  });

  it('observes element, layout, and visual viewport changes and disconnects everything', () => {
    const { reference, floating } = elements(
      rect(100, 40, 40, 20),
      rect(0, 0, 80, 30),
    );
    const resizeObserve = vi.fn();
    const resizeDisconnect = vi.fn();
    const intersectionObserve = vi.fn();
    const intersectionDisconnect = vi.fn();
    const viewportAdd = vi.fn();
    const viewportRemove = vi.fn();
    Object.defineProperties(window, {
      ResizeObserver: {
        configurable: true,
        value: class {
          observe = resizeObserve;
          disconnect = resizeDisconnect;
        },
      },
      IntersectionObserver: {
        configurable: true,
        value: class {
          observe = intersectionObserve;
          disconnect = intersectionDisconnect;
        },
      },
      visualViewport: {
        configurable: true,
        value: {
          addEventListener: viewportAdd,
          removeEventListener: viewportRemove,
        },
      },
    });

    const cleanup = autoUpdateFloating(reference, floating, vi.fn());
    expect(resizeObserve).toHaveBeenCalledWith(reference);
    expect(resizeObserve).toHaveBeenCalledWith(floating);
    expect(intersectionObserve).toHaveBeenCalledWith(reference);
    expect(viewportAdd).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(viewportAdd).toHaveBeenCalledWith('scroll', expect.any(Function));

    cleanup();
    expect(resizeDisconnect).toHaveBeenCalledOnce();
    expect(intersectionDisconnect).toHaveBeenCalledOnce();
    expect(viewportRemove).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(viewportRemove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
