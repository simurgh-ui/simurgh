/// <reference lib="webworker" />
import { heatmapBins, minMaxDecimate } from './charts.js';
import type { ChartWorkerRequest, ChartWorkerResponse } from './chart-canvas.js';

declare const self: DedicatedWorkerGlobalScope;
self.addEventListener('message', (event: MessageEvent<ChartWorkerRequest>) => {
  const request = event.data;
  try {
    const result = request.operation === 'decimate'
      ? minMaxDecimate(request.points, request.width)
      : heatmapBins(request.points, request.columns, request.rows);
    self.postMessage({ id: request.id, result } satisfies ChartWorkerResponse);
  } catch (error) {
    self.postMessage({
      id: request.id,
      error: error instanceof Error ? error.message : String(error),
    } satisfies ChartWorkerResponse);
  }
});
