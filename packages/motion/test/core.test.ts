import { describe, expect, it, vi } from 'vitest';
import {
  animate,
  animateAll,
  prefersReducedMotion,
  sequence,
  timeline,
  toKeyframes,
} from '../src/index.js';
import { layout } from '../src/layout.js';

function mockElement() {
  const animation = {
    finished: Promise.resolve(),
    playState: 'running' as AnimationPlayState,
    play: vi.fn(),
    pause: vi.fn(),
    cancel: vi.fn(),
    finish: vi.fn(),
    commitStyles: vi.fn(),
  };
  const element = {
    animate: vi.fn(() => animation as unknown as Animation),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as Element;
  return { element, animation };
}

describe('motion engine', () => {
  it('expands transform aliases and preserves an existing transform', () => {
    expect(
      toKeyframes(
        { x: [0, 12], rotate: [0, 20], opacity: [0, 1] },
        'skewX(2deg)',
      ),
    ).toEqual([
      { opacity: 0, transform: 'skewX(2deg) translateX(0px) rotate(0deg)' },
      { opacity: 1, transform: 'skewX(2deg) translateX(12px) rotate(20deg)' },
    ]);
  });

  it('converts seconds, repeats, and callbacks to WAAPI options', async () => {
    const { element } = mockElement();
    const complete = vi.fn();
    const controls = animate(
      element,
      { opacity: [0, 1] },
      { duration: 0.2, delay: 0.1, repeat: 2 },
      { onComplete: complete, reducedMotion: 'never' },
    );
    expect(element.animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 200, delay: 100, iterations: 3 }),
    );
    await controls.finished;
    expect(complete).toHaveBeenCalledOnce();
  });

  it('honors explicit reduced motion', () => {
    const { element } = mockElement();
    animate(
      element,
      { x: [0, 20] },
      { duration: 2, repeat: 4 },
      { reducedMotion: 'always' },
    );
    expect(element.animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 0, iterations: 1 }),
    );
  });

  it('samples numeric and transform values for springs', () => {
    const { element } = mockElement();
    animate(
      element,
      { opacity: [0, 1], x: [0, 20] },
      { type: 'spring', duration: 0.3 },
      { reducedMotion: 'never' },
    );
    const frames = (element.animate as ReturnType<typeof vi.fn>).mock
      .calls[0]?.[0] as Keyframe[];
    expect(frames.length).toBeGreaterThan(12);
    expect(frames[1]?.opacity).not.toBe(0);
    expect(frames[1]?.transform).not.toBe('translateX(0px)');
  });

  it('is safe without an element and sequences steps', async () => {
    await expect(
      animate(null, { opacity: 1 }).finished,
    ).resolves.toBeUndefined();
    const first = mockElement();
    const second = mockElement();
    await sequence([
      [first.element, { opacity: 1 }],
      [second.element, { opacity: 0 }],
    ]).finished;
    expect(first.element.animate).toHaveBeenCalled();
    expect(second.element.animate).toHaveBeenCalled();
  });

  it('uses the media query only in user mode', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true })),
    );
    expect(prefersReducedMotion()).toBe(true);
    expect(prefersReducedMotion('never')).toBe(false);
    vi.unstubAllGlobals();
  });

  it('animates batches with numeric and functional stagger', () => {
    const first = mockElement();
    const second = mockElement();
    const third = mockElement();
    animateAll(
      [first.element, second.element, third.element],
      { opacity: [0, 1] },
      { duration: 0.2, stagger: (index) => index * 0.05 },
    );
    expect(first.element.animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ delay: 0 }),
    );
    expect(second.element.animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ delay: 50 }),
    );
    expect(third.element.animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ delay: 100 }),
    );
  });

  it('supports timeline offsets and labels', () => {
    const first = mockElement();
    const second = mockElement();
    timeline(
      [
        { target: first.element, keyframes: { opacity: [0, 1] }, transition: { duration: 0.2 } },
        { target: second.element, keyframes: { x: [0, 10] }, at: 'detail' },
      ],
      { labels: { detail: 0.4 } },
    );
    expect(second.element.animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ delay: 400 }),
    );
  });

  it('expands scale axes and skew transforms', () => {
    expect(toKeyframes({ scaleX: [1, 2], skewY: [0, 15] })).toEqual([
      { transform: 'scaleX(1) skewY(0deg)' },
      { transform: 'scaleX(2) skewY(15deg)' },
    ]);
  });

  it('preserves the current animation style when interrupted', () => {
    const { element, animation } = mockElement();
    animate(element, { opacity: [0, 1] }).cancel();
    expect(animation.commitStyles).toHaveBeenCalledOnce();
    expect(animation.cancel).toHaveBeenCalledOnce();
  });

  it('creates per-element FLIP keyframes for layout changes', () => {
    let first = true;
    const animateMock = vi.fn(() => ({
      finished: Promise.resolve(),
      playState: 'running' as AnimationPlayState,
      play: vi.fn(),
      pause: vi.fn(),
      cancel: vi.fn(),
      finish: vi.fn(),
    } as unknown as Animation));
    const element = {
      getBoundingClientRect: vi.fn(() =>
        first
          ? { left: 0, top: 0, width: 100, height: 100 }
          : { left: 20, top: 10, width: 200, height: 150 },
      ),
      animate: animateMock,
    } as unknown as Element;
    layout(element, () => { first = false; });
    const frames = animateMock.mock.calls[0]?.[0] as Keyframe[];
    expect(frames[0]?.transform).toContain('translate(-20px, -10px)');
    expect(frames[0]?.transform).toContain('scale(0.5, 0.6666666666666666)');
  });
});
