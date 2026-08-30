export type ReducedMotionMode = 'user' | 'always' | 'never';
export type MotionValue = string | number | Array<string | number>;
export type MotionKeyframes = Omit<Keyframe, 'transform'> & {
  transform?: MotionValue;
  x?: MotionValue;
  y?: MotionValue;
  scale?: MotionValue;
  scaleX?: MotionValue;
  scaleY?: MotionValue;
  rotate?: MotionValue;
  skewX?: MotionValue;
  skewY?: MotionValue;
  transformOrigin?: string | Array<string>;
};
export type MotionTarget = MotionKeyframes | MotionKeyframes[];

export type MotionTransition = {
  type?: 'tween' | 'spring';
  duration?: number;
  delay?: number;
  easing?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  repeat?: number;
  direction?: PlaybackDirection;
  fill?: FillMode;
  stagger?: number | ((index: number, total: number) => number);
  velocity?: number;
};

export type MotionVariant = MotionTarget & { transition?: MotionTransition };
export type MotionDefinition = {
  initial?: MotionTarget | string;
  animate?: MotionTarget | string;
  exit?: MotionTarget | string;
  whileHover?: MotionTarget | string;
  whilePress?: MotionTarget | string;
  whileFocus?: MotionTarget | string;
  whileInView?: MotionTarget | string;
  variants?: Record<string, MotionVariant>;
  transition?: MotionTransition;
  reducedMotion?: ReducedMotionMode;
  stagger?: number;
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
};

export type MotionControls = {
  readonly finished: Promise<void>;
  readonly playState: AnimationPlayState | 'idle';
  play(): void;
  pause(): void;
  cancel(): void;
  finish(): void;
};
export type MotionBinding = (() => void) & {
  readonly controls: MotionControls;
};

const transforms = new Set([
  'x',
  'y',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
  'skewX',
  'skewY',
]);
const unit = (name: string, value: string | number) =>
  typeof value === 'number' && (name === 'x' || name === 'y')
    ? `${value}px`
    : typeof value === 'number' && (name === 'rotate' || name.startsWith('skew'))
      ? `${value}deg`
      : String(value);

function frameCount(target: MotionTarget): number {
  if (Array.isArray(target)) return target.length;
  let count = 1;
  for (const [key, value] of Object.entries(target))
    if (!transforms.has(key) && Array.isArray(value))
      count = Math.max(count, value.length);
  for (const key of transforms) {
    const value = target[key as keyof MotionKeyframes];
    if (Array.isArray(value)) count = Math.max(count, value.length);
  }
  return count;
}

function at(value: unknown, index: number, count: number): unknown {
  if (!Array.isArray(value)) return value;
  if (value.length <= 1 || count <= 1) return value[0];
  const position = (index / (count - 1)) * (value.length - 1);
  return value[Math.round(position)];
}

export function toKeyframes(
  target: MotionTarget,
  baseTransform = '',
): Keyframe[] {
  if (Array.isArray(target))
    return target.flatMap((frame) => toKeyframes(frame, baseTransform));
  const count = frameCount(target);
  return Array.from({ length: count }, (_, index) => {
    const frame: Record<string, unknown> = {};
    const transform: string[] = [];
    for (const [key, value] of Object.entries(target)) {
      if (key === 'transition') continue;
      const current = at(value, index, count);
      if (current == null) continue;
      if (transforms.has(key)) {
        const fn =
          key === 'x' ? 'translateX' : key === 'y' ? 'translateY' : key;
        transform.push(`${fn}(${unit(key, current as string | number)})`);
      } else frame[key] = current;
    }
    if (transform.length)
      frame.transform = [baseTransform, ...transform].filter(Boolean).join(' ');
    return frame as Keyframe;
  });
}

export function prefersReducedMotion(
  mode: ReducedMotionMode = 'user',
): boolean {
  if (mode === 'always') return true;
  if (mode === 'never') return false;
  return (
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function springFrames(
  frames: Keyframe[],
  transition: MotionTransition,
): Keyframe[] {
  if (frames.length < 2) return frames;
  const first = frames[0] as Record<string, unknown>;
  const last = frames.at(-1) as Record<string, unknown>;
  const stiffness = transition.stiffness ?? 170;
  const damping = transition.damping ?? 26;
  const mass = transition.mass ?? 1;
  const omega = Math.sqrt(stiffness / mass);
  const ratio = damping / (2 * Math.sqrt(stiffness * mass));
  const duration =
    transition.duration ??
    Math.min(1, Math.max(0.25, 6 / (omega * Math.max(ratio, 0.1))));
  const samples = Math.max(12, Math.ceil(duration * 60));
  const velocity = transition.velocity ?? 0;
  const interpolate = (from: unknown, to: unknown, progress: number) => {
    if (typeof from === 'number' && typeof to === 'number')
      return from + (to - from) * progress;
    if (typeof from !== 'string' || typeof to !== 'string')
      return progress >= 1 ? to : from;
    const fromNumbers = from.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
    const toNumbers = to.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
    if (fromNumbers.length !== toNumbers.length || !fromNumbers.length)
      return progress >= 1 ? to : from;
    let numberIndex = 0;
    return to.replace(/-?\d*\.?\d+/g, () => {
      const fromNumber = fromNumbers[numberIndex]!;
      const toNumber = toNumbers[numberIndex++]!;
      return String(fromNumber + (toNumber - fromNumber) * progress);
    });
  };
  return Array.from({ length: samples + 1 }, (_, index) => {
    const t = (index / samples) * duration;
    const progress =
      ratio < 1
        ? 1 -
          Math.exp(-ratio * omega * t) *
            (Math.cos(omega * Math.sqrt(1 - ratio ** 2) * t) +
              ((ratio - velocity / omega) / Math.sqrt(1 - ratio ** 2)) *
                Math.sin(omega * Math.sqrt(1 - ratio ** 2) * t))
        : 1 - Math.exp(-omega * t) * (1 + omega * t);
    const frame: Record<string, unknown> = { offset: index / samples };
    for (const key of new Set([...Object.keys(first), ...Object.keys(last)])) {
      const from = first[key];
      const to = last[key];
      frame[key] = interpolate(from, to, progress);
    }
    return frame as Keyframe;
  });
}

function inertControls(callback?: () => void): MotionControls {
  callback?.();
  const finished = Promise.resolve();
  return {
    finished,
    playState: 'finished',
    play() {},
    pause() {},
    cancel() {},
    finish() {},
  };
}

export function animate(
  target: Element | null | undefined,
  keyframes: MotionTarget,
  transition: MotionTransition = {},
  callbacks: Pick<
    MotionDefinition,
    'onStart' | 'onComplete' | 'onCancel' | 'reducedMotion'
  > = {},
): MotionControls {
  if (!target || typeof target.animate !== 'function') {
    callbacks.onStart?.();
    return inertControls(callbacks.onComplete);
  }
  const reduced = prefersReducedMotion(callbacks.reducedMotion);
  const base =
    typeof HTMLElement !== 'undefined' && target instanceof HTMLElement
      ? target.style.transform
      : '';
  let frames = toKeyframes(keyframes, base);
  if (transition.type === 'spring' && !reduced)
    frames = springFrames(frames, transition);
  callbacks.onStart?.();
  const animation = target.animate(frames, {
    duration: reduced
      ? 0
      : (transition.duration ?? (transition.type === 'spring' ? 0.5 : 0.16)) *
        1000,
    delay: reduced ? 0 : (transition.delay ?? 0) * 1000,
    easing:
      transition.type === 'spring'
        ? 'linear'
        : (transition.easing ?? 'ease-out'),
    iterations: reduced ? 1 : (transition.repeat ?? 0) + 1,
    direction: transition.direction ?? 'normal',
    fill: transition.fill ?? 'both',
  });
  let cancelled = false;
  const finished = animation.finished.then(
    () => callbacks.onComplete?.(),
    () => {
      if (cancelled) callbacks.onCancel?.();
    },
  );
  return {
    finished,
    get playState() {
      return animation.playState;
    },
    play: () => animation.play(),
    pause: () => animation.pause(),
    cancel() {
      cancelled = true;
      animation.commitStyles?.();
      animation.cancel();
    },
    finish: () => animation.finish(),
  };
}

export type MotionTargets = Element | Iterable<Element>;
export type MotionBatchTransition = MotionTransition & {
  stagger?: number | ((index: number, total: number) => number);
};

function targetList(targets: MotionTargets): Element[] {
  return (typeof Element !== 'undefined' && targets instanceof Element) ||
    typeof (targets as Element).animate === 'function'
    ? [targets as Element]
    : Array.from(targets as Iterable<Element>);
}

function groupControls(controls: MotionControls[]): MotionControls {
  if (!controls.length) return inertControls();
  return {
    finished: Promise.all(controls.map((control) => control.finished)).then(
      () => undefined,
    ),
    get playState() {
      return controls.some((control) => control.playState === 'running')
        ? 'running'
        : controls[0]?.playState ?? 'idle';
    },
    play: () => controls.forEach((control) => control.play()),
    pause: () => controls.forEach((control) => control.pause()),
    cancel: () => controls.forEach((control) => control.cancel()),
    finish: () => controls.forEach((control) => control.finish()),
  };
}

export function animateAll(
  targets: MotionTargets,
  keyframes: MotionTarget,
  transition: MotionBatchTransition = {},
): MotionControls {
  const elements = targetList(targets);
  const { stagger = 0, ...options } = transition;
  const controls = elements.map((element, index) =>
    animate(element, keyframes, {
      ...options,
      delay:
        (options.delay ?? 0) +
        (typeof stagger === 'function'
          ? stagger(index, elements.length)
          : stagger * index),
    }),
  );
  return groupControls(controls);
}

export function resolveTarget(
  definition: MotionDefinition,
  state: keyof MotionDefinition,
): MotionTarget | undefined {
  const value = definition[state];
  if (typeof value !== 'string') return value as MotionTarget | undefined;
  return definition.variants?.[value];
}

const boundDefinitions = new WeakMap<Element, MotionDefinition>();

export function runMotion(
  element: Element,
  definition: MotionDefinition,
  state: keyof MotionDefinition = 'animate',
): MotionControls {
  const target = resolveTarget(definition, state);
  if (!target) return inertControls();
  const variantTransition = !Array.isArray(target)
    ? (target as MotionVariant).transition
    : undefined;
  const own = animate(
    element,
    target,
    variantTransition ?? definition.transition,
    definition,
  );
  const children = Array.from(element.children).flatMap((child, index) => {
    const childDefinition = boundDefinitions.get(child);
    if (!childDefinition) return [];
    const transition = childDefinition.transition ?? {};
    return [
      runMotion(
        child,
        {
          ...childDefinition,
          transition: {
            ...transition,
            delay: (transition.delay ?? 0) + (definition.stagger ?? 0) * index,
          },
        },
        state,
      ),
    ];
  });
  if (!children.length) return own;
  const controls = [own, ...children];
  return {
    finished: Promise.all(controls.map((control) => control.finished)).then(
      () => undefined,
    ),
    get playState() {
      return own.playState;
    },
    play: () => controls.forEach((control) => control.play()),
    pause: () => controls.forEach((control) => control.pause()),
    cancel: () => controls.forEach((control) => control.cancel()),
    finish: () => controls.forEach((control) => control.finish()),
  };
}

export function sequence(
  steps: Array<[Element, MotionTarget, MotionTransition?]>,
): MotionControls {
  let current: MotionControls | undefined;
  let cancelled = false;
  const finished = steps.reduce<Promise<void>>(
    async (chain, [element, frames, transition]) => {
      await chain;
      if (cancelled) return;
      current = animate(element, frames, transition);
      await current.finished;
    },
    Promise.resolve(),
  );
  return {
    finished,
    get playState() {
      return current?.playState ?? 'idle';
    },
    play: () => current?.play(),
    pause: () => current?.pause(),
    cancel() {
      cancelled = true;
      current?.cancel();
    },
    finish: () => current?.finish(),
  };
}

export type MotionTimelineStep = {
  target: MotionTargets;
  keyframes: MotionTarget;
  transition?: MotionTransition;
  at?: number | string;
};

export type MotionTimelineOptions = {
  labels?: Record<string, number>;
};

function transitionLength(transition: MotionTransition = {}): number {
  return (
    (transition.delay ?? 0) +
    (transition.duration ?? (transition.type === 'spring' ? 0.5 : 0.16)) *
      ((transition.repeat ?? 0) + 1)
  );
}

export function timeline(
  steps: MotionTimelineStep[],
  options: MotionTimelineOptions = {},
): MotionControls {
  let cursor = 0;
  const controls: MotionControls[] = [];
  for (const step of steps) {
    const transition = step.transition ?? {};
    const start =
      step.at == null
        ? cursor
        : typeof step.at === 'number'
          ? step.at
          : options.labels?.[step.at] ?? cursor;
    const duration = transitionLength(transition);
    const targetControls = animateAll(step.target, step.keyframes, {
      ...transition,
      delay: (transition.delay ?? 0) + start,
    });
    controls.push(targetControls);
    cursor = Math.max(cursor, start + duration);
  }
  return groupControls(controls);
}

export function bindMotion(
  element: Element,
  definition: MotionDefinition,
): MotionBinding {
  boundDefinitions.set(element, definition);
  let disposed = false;
  let active = runMotion(
    element,
    definition,
    definition.initial ? 'initial' : 'animate',
  );
  if (definition.initial)
    active.finished.then(() => {
      if (!disposed) active = runMotion(element, definition);
    });
  const bindings: Array<[string, EventListener]> = [];
  const bind = (event: string, state: keyof MotionDefinition) => {
    if (!definition[state]) return;
    const listener = () => {
      active.cancel();
      active = runMotion(element, definition, state);
    };
    element.addEventListener(event, listener);
    bindings.push([event, listener]);
  };
  bind('pointerenter', 'whileHover');
  bind('pointerdown', 'whilePress');
  bind('focusin', 'whileFocus');
  const restore = () => {
    active.cancel();
    active = runMotion(element, definition);
  };
  for (const event of [
    'pointerleave',
    'pointerup',
    'pointercancel',
    'focusout',
  ]) {
    element.addEventListener(event, restore);
    bindings.push([event, restore]);
  }
  let observer: IntersectionObserver | undefined;
  if (definition.whileInView && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        active.cancel();
        active = runMotion(element, definition, 'whileInView');
      }
    });
    observer.observe(element);
  }
  const cleanup = (() => {
    disposed = true;
    active.cancel();
    boundDefinitions.delete(element);
    for (const [event, listener] of bindings)
      element.removeEventListener(event, listener);
    observer?.disconnect();
  }) as MotionBinding;
  Object.defineProperty(cleanup, 'controls', { get: () => active });
  return cleanup;
}
