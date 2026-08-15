export type CanvasMark =
  | { type: 'line'; points: readonly (readonly [number, number])[]; color: string; width?: number }
  | { type: 'area'; points: readonly (readonly [number, number])[]; color: string; baseline: number; opacity?: number }
  | { type: 'point'; x: number; y: number; radius?: number; color: string }
  | { type: 'rect'; x: number; y: number; width: number; height: number; color: string; opacity?: number };

export function drawChartCanvas(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  marks: readonly CanvasMark[],
  width: number,
  height: number,
  pixelRatio = 1,
): void {
  const canvas = context.canvas;
  canvas.width = Math.max(1, Math.round(width * pixelRatio));
  canvas.height = Math.max(1, Math.round(height * pixelRatio));
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);
  for (const mark of marks) {
    context.globalAlpha = 'opacity' in mark ? mark.opacity ?? 1 : 1;
    context.fillStyle = mark.color;
    context.strokeStyle = mark.color;
    if (mark.type === 'point') {
      context.beginPath();
      context.arc(mark.x, mark.y, mark.radius ?? 3, 0, Math.PI * 2);
      context.fill();
    } else if (mark.type === 'rect') context.fillRect(mark.x, mark.y, mark.width, mark.height);
    else {
      context.beginPath();
      mark.points.forEach((point, index) => index ? context.lineTo(point[0], point[1]) : context.moveTo(point[0], point[1]));
      if (mark.type === 'area') {
        const first = mark.points[0];
        const last = mark.points.at(-1);
        if (first && last) {
          context.lineTo(last[0], mark.baseline);
          context.lineTo(first[0], mark.baseline);
          context.closePath();
          context.fill();
        }
      } else {
        context.lineWidth = mark.width ?? 2;
        context.stroke();
      }
    }
  }
  context.globalAlpha = 1;
}

export function supportsWorkerCanvas(): boolean {
  return typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined';
}

export type ChartWorkerRequest =
  | { id: number; operation: 'decimate'; points: { x: number; y: number }[]; width: number }
  | { id: number; operation: 'heatmap'; points: { x: number; y: number; value?: number }[]; columns: number; rows: number };
export type ChartWorkerResponse = { id: number; result?: unknown; error?: string };

export function createChartWorker(): Worker | null {
  if (typeof Worker === 'undefined') return null;
  return new Worker(new URL('./chart-worker.js', import.meta.url), {
    type: 'module',
    name: 'simurgh-chart',
  });
}

export function runChartWorker<T>(worker: Worker, request: Omit<ChartWorkerRequest, 'id'>): Promise<T> {
  const id = workerRequestId++;
  return new Promise<T>((resolve, reject) => {
    const listener = (event: MessageEvent<ChartWorkerResponse>) => {
      if (event.data.id !== id) return;
      worker.removeEventListener('message', listener);
      if (event.data.error) reject(new Error(event.data.error));
      else resolve(event.data.result as T);
    };
    worker.addEventListener('message', listener);
    worker.postMessage({ ...request, id });
  });
}
let workerRequestId = 0;
