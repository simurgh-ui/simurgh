export type ChartStreamSnapshot<D extends string> = Readonly<{
  length: number;
  version: number;
  columns: Readonly<Record<D, Float64Array>>;
}>;

export type ChartStream<D extends string> = {
  readonly capacity: number;
  readonly dimensions: readonly D[];
  readonly length: number;
  readonly window: number | undefined;
  readonly paused: boolean;
  append(batch: Readonly<Record<D, ArrayLike<number>>>): void;
  backfill(batch: Readonly<Record<D, ArrayLike<number>>>): void;
  clear(): void;
  setWindow(size?: number): void;
  pause(): void;
  resume(): void;
  snapshot(): ChartStreamSnapshot<D>;
  subscribe(listener: () => void): () => void;
};

export function createChartStream<const D extends string>(options: {
  capacity: number;
  dimensions: readonly D[];
  window?: number;
}): ChartStream<D> {
  const capacity = Math.floor(options.capacity);
  if (!Number.isFinite(capacity) || capacity <= 0) throw new RangeError('Chart stream capacity must be positive.');
  if (!options.dimensions.length || new Set(options.dimensions).size !== options.dimensions.length)
    throw new TypeError('Chart stream dimensions must be unique and non-empty.');
  const storage = Object.fromEntries(options.dimensions.map((key) => [key, new Float64Array(capacity)])) as Record<D, Float64Array>;
  const listeners = new Set<() => void>();
  let start = 0;
  let length = 0;
  let version = 0;
  let cached: ChartStreamSnapshot<D> | undefined;
  let scheduled = false;
  let paused = false;
  let liveWindow = options.window == null ? undefined : Math.max(1, Math.floor(options.window));
  const validateBatch = (batch: Readonly<Record<D, ArrayLike<number>>>) => {
    const size = batch[options.dimensions[0]!]!.length;
    if (!options.dimensions.every((key) => batch[key]?.length === size)) throw new RangeError('Every chart stream column must have the same length.');
    return size;
  };
  const notify = () => {
    if (scheduled) return;
    scheduled = true;
    const schedule = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (callback: FrameRequestCallback) => setTimeout(callback, 0);
    schedule(() => {
      scheduled = false;
      if (paused) return;
      for (const listener of listeners) listener();
    });
  };
  return {
    capacity,
    dimensions: [...options.dimensions],
    get length() {
      return length;
    },
    get window() { return liveWindow; },
    get paused() {
      return paused;
    },
    append(batch) {
      const size = validateBatch(batch);
      for (let item = 0; item < size; item += 1) {
        const position = length < capacity ? (start + length) % capacity : start;
        for (const key of options.dimensions) storage[key][position] = Number(batch[key][item]);
        if (length < capacity) length += 1;
        else start = (start + 1) % capacity;
      }
      version += 1;
      cached = undefined;
      if (!paused) notify();
    },
    clear() {
      start = 0;
      length = 0;
      version += 1;
      cached = undefined;
      if (!paused) notify();
    },
    backfill(batch) {
      const size = validateBatch(batch);
      const current = Object.fromEntries(options.dimensions.map((key) => [key, Array.from({ length }, (_, index) => storage[key][(start + index) % capacity]!)])) as Record<D, number[]>;
      const combinedLength = Math.min(capacity, size + length);
      const drop = Math.max(0, size + length - capacity);
      for (const key of options.dimensions) {
        const combined = [...Array.from(batch[key], Number), ...current[key]].slice(drop);
        storage[key].fill(0); combined.forEach((value, index) => { storage[key][index] = value; });
      }
      start = 0; length = combinedLength; version += 1; cached = undefined; if (!paused) notify();
    },
    pause() { paused = true; },
    resume() { paused = false; notify(); },
    setWindow(size) { liveWindow = size == null ? undefined : Math.max(1, Math.floor(size)); version += 1; cached = undefined; if (!paused) notify(); },
    snapshot() {
      if (cached) return cached;
      const outputLength = Math.min(length, liveWindow ?? length);
      const offset = length - outputLength;
      const columns = {} as Record<D, Float64Array>;
      for (const key of options.dimensions) {
        const output = new Float64Array(outputLength);
        const source = storage[key];
        for (let index = 0; index < outputLength; index += 1) output[index] = source[(start + offset + index) % capacity]!;
        columns[key] = output;
      }
      cached = { length: outputLength, version, columns };
      return cached;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
