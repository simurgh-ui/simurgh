import {
  prefersReducedMotion,
  toKeyframes,
  type MotionControls,
  type MotionDefinition,
  type MotionTarget,
  type MotionTransition,
} from './index.js';

export type ScrollMotionOptions = Pick<
  MotionDefinition,
  'reducedMotion' | 'onStart' | 'onComplete' | 'onCancel'
> & {
  target?: Element;
  range?: [number, number];
  once?: boolean;
  transition?: MotionTransition;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function scroll(
  element: Element | null | undefined,
  keyframes: MotionTarget,
  options: ScrollMotionOptions = {},
): MotionControls {
  if (!element || typeof element.animate !== 'function') {
    options.onStart?.();
    options.onComplete?.();
    return {
      finished: Promise.resolve(),
      playState: 'finished',
      play() {},
      pause() {},
      cancel() {},
      finish() {},
    };
  }

  const reduced = prefersReducedMotion(options.reducedMotion);
  const transition = options.transition ?? {};
  const animation = element.animate(toKeyframes(keyframes), {
    duration: 1000,
    easing: transition.easing ?? 'linear',
    fill: 'both',
    iterations: 1,
  });
  animation.pause();
  let cancelled = false;
  let completed = false;
  let frame = 0;
  const source = options.target ?? element;
  const viewport = source.ownerDocument?.defaultView;
  let resolveFinished!: () => void;
  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve;
  });

  const update = () => {
    frame = 0;
    if (cancelled || completed) return;
    if (reduced) {
      animation.currentTime = 1000;
      if (!completed) {
        completed = true;
        cleanup();
        options.onComplete?.();
        resolveFinished();
      }
      return;
    }
    const rect = source.getBoundingClientRect();
    const height = viewport?.innerHeight ?? 0;
    const [start, end] = options.range ?? [height, 0];
    const progress = clamp((start - rect.top) / (start - end));
    animation.currentTime = progress * 1000;
    if (progress >= 1 && options.once) {
      completed = true;
      cleanup();
      options.onComplete?.();
      resolveFinished();
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const cleanup = () => {
    source.removeEventListener('scroll', onScroll);
    viewport?.removeEventListener('scroll', onScroll);
    if (frame) cancelAnimationFrame(frame);
  };

  options.onStart?.();
  source.addEventListener('scroll', onScroll, { passive: true });
  if (viewport) viewport.addEventListener('scroll', onScroll, { passive: true });
  update();
  return {
    finished,
    get playState() {
      return cancelled ? 'idle' : 'running';
    },
    play: () => animation.play(),
    pause: () => animation.pause(),
    cancel() {
      cancelled = true;
      cleanup();
      animation.cancel();
      options.onCancel?.();
      resolveFinished();
    },
    finish() {
      if (completed) return;
      animation.currentTime = 1000;
      completed = true;
      cleanup();
      options.onComplete?.();
      resolveFinished();
    },
  };
}
