import {
  animate,
  type MotionControls,
  type MotionKeyframes,
  type MotionTargets,
  type MotionTransition,
  type ReducedMotionMode,
} from './index.js';

export type LayoutMotionOptions = {
  transition?: MotionTransition;
  reducedMotion?: ReducedMotionMode;
};

type LayoutState = { left: number; top: number; width: number; height: number };

function targetsOf(targets: MotionTargets): Element[] {
  return typeof (targets as Element).getBoundingClientRect === 'function'
    ? [targets as Element]
    : Array.from(targets as Iterable<Element>);
}

function stateOf(element: Element): LayoutState {
  const rect = element.getBoundingClientRect();
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}

export function layout(
  targets: MotionTargets,
  update: () => void,
  options: LayoutMotionOptions = {},
): MotionControls {
  const elements = targetsOf(targets);
  const before = new Map(elements.map((element) => [element, stateOf(element)]));
  update();
  const frames = elements.map((element) => {
    const first = before.get(element)!;
    const last = stateOf(element);
    const scaleX = last.width ? first.width / last.width : 1;
    const scaleY = last.height ? first.height / last.height : 1;
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const current =
      typeof HTMLElement !== 'undefined' && element instanceof HTMLElement
        ? element.style.transform
        : '';
    const inverse = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
    return [
      element,
      { transform: [`${inverse} ${current}`.trim(), current] } as MotionKeyframes,
    ] as const;
  });
  const controls = frames.map(([element, keyframes]) =>
    animate(
      element,
      keyframes,
      options.transition,
      options.reducedMotion ? { reducedMotion: options.reducedMotion } : {},
    ),
  );
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
