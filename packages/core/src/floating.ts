export type FloatingPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type FloatingOptions = {
  placement?: FloatingPlacement;
  offset?: number;
  padding?: number;
  direction?: 'ltr' | 'rtl';
};

export type FloatingPosition = {
  x: number;
  y: number;
  placement: FloatingPlacement;
};

type Side = 'top' | 'right' | 'bottom' | 'left';

const opposite: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

function coordinates(
  reference: DOMRect,
  floating: DOMRect,
  placement: FloatingPlacement,
  gap: number,
  rtl: boolean,
) {
  const [side, alignment] = placement.split('-') as [
    Side,
    'start' | 'end' | undefined,
  ];
  let x = reference.left + (reference.width - floating.width) / 2;
  let y = reference.top + (reference.height - floating.height) / 2;
  if (side === 'top') y = reference.top - floating.height - gap;
  if (side === 'bottom') y = reference.bottom + gap;
  if (side === 'left') x = reference.left - floating.width - gap;
  if (side === 'right') x = reference.right + gap;
  if (alignment && (side === 'top' || side === 'bottom')) {
    const start = rtl ? reference.right - floating.width : reference.left;
    const end = rtl ? reference.left : reference.right - floating.width;
    x = alignment === 'start' ? start : end;
  } else if (alignment) {
    y =
      alignment === 'start'
        ? reference.top
        : reference.bottom - floating.height;
  }
  return { x, y };
}

function overflow(
  point: { x: number; y: number },
  floating: DOMRect,
  bounds: { left: number; top: number; right: number; bottom: number },
  padding: number,
) {
  return (
    Math.max(0, bounds.left + padding - point.x) +
    Math.max(0, bounds.top + padding - point.y) +
    Math.max(0, point.x + floating.width + padding - bounds.right) +
    Math.max(0, point.y + floating.height + padding - bounds.bottom)
  );
}

/** Positions an element using the supported offset, flip, and viewport-shift subset. */
export function computeFloatingPosition(
  reference: Element,
  floating: Element,
  options: FloatingOptions = {},
): FloatingPosition {
  const placement = options.placement ?? 'bottom';
  const gap = options.offset ?? 8;
  const padding = options.padding ?? 8;
  const referenceRect = reference.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  const doc = reference.ownerDocument;
  const view = doc.defaultView;
  const viewport = view?.visualViewport;
  const left = viewport?.offsetLeft ?? 0;
  const top = viewport?.offsetTop ?? 0;
  const bounds = {
    left,
    top,
    right: left + (viewport?.width ?? doc.documentElement.clientWidth),
    bottom: top + (viewport?.height ?? doc.documentElement.clientHeight),
  };
  const rtl =
    (options.direction ?? view?.getComputedStyle(reference).direction) ===
    'rtl';
  let resolved = placement;
  let point = coordinates(referenceRect, floatingRect, resolved, gap, rtl);
  const [side, alignment] = placement.split('-') as [Side, string?];
  const flipped =
    `${opposite[side]}${alignment ? `-${alignment}` : ''}` as FloatingPlacement;
  const alternative = coordinates(
    referenceRect,
    floatingRect,
    flipped,
    gap,
    rtl,
  );
  if (
    overflow(alternative, floatingRect, bounds, padding) <
    overflow(point, floatingRect, bounds, padding)
  ) {
    point = alternative;
    resolved = flipped;
  }
  return {
    x: Math.min(
      Math.max(point.x, bounds.left + padding),
      Math.max(
        bounds.left + padding,
        bounds.right - floatingRect.width - padding,
      ),
    ),
    y: Math.min(
      Math.max(point.y, bounds.top + padding),
      Math.max(
        bounds.top + padding,
        bounds.bottom - floatingRect.height - padding,
      ),
    ),
    placement: resolved,
  };
}

/** Keeps a floating element positioned and returns a complete teardown function. */
export function autoUpdateFloating(
  reference: Element,
  floating: Element,
  update: () => void,
): () => void {
  const view = reference.ownerDocument.defaultView;
  if (!view) return () => {};
  let frame = 0;
  const schedule = () => {
    view.cancelAnimationFrame(frame);
    frame = view.requestAnimationFrame(update);
  };
  view.addEventListener('resize', schedule);
  view.addEventListener('scroll', schedule, true);
  view.visualViewport?.addEventListener('resize', schedule);
  view.visualViewport?.addEventListener('scroll', schedule);
  const resize =
    typeof view.ResizeObserver === 'function'
      ? new view.ResizeObserver(schedule)
      : undefined;
  resize?.observe(reference);
  resize?.observe(floating);
  const intersection =
    typeof view.IntersectionObserver === 'function'
      ? new view.IntersectionObserver(schedule, { threshold: [0, 1] })
      : undefined;
  intersection?.observe(reference);
  update();
  return () => {
    view.cancelAnimationFrame(frame);
    view.removeEventListener('resize', schedule);
    view.removeEventListener('scroll', schedule, true);
    view.visualViewport?.removeEventListener('resize', schedule);
    view.visualViewport?.removeEventListener('scroll', schedule);
    resize?.disconnect();
    intersection?.disconnect();
  };
}
