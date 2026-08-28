import type { ChartDomain } from './charts.js';

export type ChartViewport = { x?: ChartDomain; y?: ChartDomain };
export type ChartSelection = { start: readonly [number, number]; end: readonly [number, number] } | null;
export type ChartSyncState = { viewport: ChartViewport; selection: ChartSelection; focused?: { seriesId: string; index: number } | null };
export type ChartSync = {
  readonly state: ChartSyncState;
  set(next: Partial<ChartSyncState>): void;
  subscribe(listener: (state: ChartSyncState) => void): () => void;
};

export function createChartSync(initial: Partial<ChartSyncState> = {}): ChartSync {
  let state: ChartSyncState = { viewport: initial.viewport ?? {}, selection: initial.selection ?? null, focused: initial.focused ?? null };
  const listeners = new Set<(state: ChartSyncState) => void>();
  return {
    get state() { return state; },
    set(next) {
      state = { ...state, ...next };
      for (const listener of listeners) listener(state);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
export type ChartBrushHandle = 'start' | 'end' | 'start-y' | 'end-y';

export type ChartInteractionConfig = {
  zoom?: boolean | 'x' | 'y' | 'xy';
  pan?: boolean | 'x' | 'y' | 'xy';
  brush?: boolean | 'x' | 'y' | 'xy';
};

export function clampDomain(domain: ChartDomain, bounds?: ChartDomain): ChartDomain {
  if (!bounds) return domain;
  const span = domain[1] - domain[0];
  const boundSpan = bounds[1] - bounds[0];
  if (span >= boundSpan) return bounds;
  const min = Math.min(bounds[1] - span, Math.max(bounds[0], domain[0]));
  return [min, min + span];
}

export function zoomDomain(domain: ChartDomain, factor: number, anchor = (domain[0] + domain[1]) / 2): ChartDomain {
  if (!Number.isFinite(factor) || factor <= 0) return domain;
  return [anchor + (domain[0] - anchor) / factor, anchor + (domain[1] - anchor) / factor];
}

export function panDomain(domain: ChartDomain, fraction: number): ChartDomain {
  const amount = (domain[1] - domain[0]) * fraction;
  return [domain[0] + amount, domain[1] + amount];
}

export function pinchZoomDomain(domain: ChartDomain, startDistance: number, endDistance: number, anchor: number): ChartDomain {
  if (!Number.isFinite(startDistance) || !Number.isFinite(endDistance) || startDistance <= 0 || endDistance <= 0) return domain;
  return zoomDomain(domain, endDistance / startDistance, anchor);
}

export function domainFromSelection(
  domain: ChartDomain,
  selection: readonly [number, number],
  pixels: readonly [number, number],
): ChartDomain {
  const pixelSpan = pixels[1] - pixels[0] || 1;
  const start = domain[0] + ((selection[0] - pixels[0]) / pixelSpan) * (domain[1] - domain[0]);
  const end = domain[0] + ((selection[1] - pixels[0]) / pixelSpan) * (domain[1] - domain[0]);
  return start <= end ? [start, end] : [end, start];
}

export function selectionFromPoints(
  start: readonly [number, number],
  end: readonly [number, number],
): ChartSelection {
  return {
    start: [Math.min(start[0], end[0]), Math.min(start[1], end[1])],
    end: [Math.max(start[0], end[0]), Math.max(start[1], end[1])],
  };
}

export function resizeChartSelection(
  selection: Exclude<ChartSelection, null>,
  handle: ChartBrushHandle,
  point: readonly [number, number],
): Exclude<ChartSelection, null> {
  const start: [number, number] = [...selection.start];
  const end: [number, number] = [...selection.end];
  if (handle === 'start' || handle === 'start-y') start[handle === 'start' ? 0 : 1] = point[handle === 'start' ? 0 : 1];
  if (handle === 'end' || handle === 'end-y') end[handle === 'end' ? 0 : 1] = point[handle === 'end' ? 0 : 1];
  return selectionFromPoints(start, end)!;
}

export function nextChartIndex(current: number, size: number, key: string, direction: 'ltr' | 'rtl' = 'ltr'): number {
  if (size <= 0) return -1;
  if (key === 'Home') return 0;
  if (key === 'End') return size - 1;
  const previous = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const next = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  if (key === previous || key === 'ArrowUp') return Math.max(0, current - 1);
  if (key === next || key === 'ArrowDown') return Math.min(size - 1, current + 1);
  return current;
}

export function chartInteractionKey(
  event: Pick<KeyboardEvent, 'key' | 'shiftKey'>,
  viewport: ChartViewport,
): { viewport: ChartViewport; clearSelection?: true } {
  if (event.key === 'Escape') return { viewport, clearSelection: true };
  const factor = event.key === '+' || event.key === '=' ? 1.25 : event.key === '-' ? 0.8 : 0;
  if (factor)
    return {
      viewport: {
        ...(viewport.x ? { x: zoomDomain(viewport.x, factor) } : {}),
        ...(viewport.y ? { y: zoomDomain(viewport.y, factor) } : {}),
      },
    };
  if (event.shiftKey && viewport.x && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const amount = event.key === 'ArrowLeft' ? -0.1 : 0.1;
    return { viewport: { ...viewport, x: panDomain(viewport.x, amount) } };
  }
  return { viewport };
}

export class SpatialGrid<T extends { x: number; y: number }> {
  readonly #cells = new Map<string, T[]>();
  constructor(readonly cellSize = 24) {}
  add(item: T): void {
    const key = this.#key(item.x, item.y);
    const cell = this.#cells.get(key) ?? [];
    cell.push(item);
    this.#cells.set(key, cell);
  }
  nearest(x: number, y: number, radius = this.cellSize): T | null {
    let match: T | null = null;
    let distance = radius * radius;
    const reach = Math.ceil(radius / this.cellSize);
    const column = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    for (let dx = -reach; dx <= reach; dx += 1)
      for (let dy = -reach; dy <= reach; dy += 1)
        for (const item of this.#cells.get(`${column + dx}:${row + dy}`) ?? []) {
          const candidate = (item.x - x) ** 2 + (item.y - y) ** 2;
          if (candidate < distance) {
            distance = candidate;
            match = item;
          }
        }
    return match;
  }
  clear(): void {
    this.#cells.clear();
  }
  #key(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)}:${Math.floor(y / this.cellSize)}`;
  }
}
