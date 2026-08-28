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
  prepareChartCanvas(context, width, height, pixelRatio);
  paintChartCanvas(context, marks);
}

function prepareChartCanvas(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  pixelRatio: number,
): void {
  const canvas = context.canvas;
  canvas.width = Math.max(1, Math.round(width * pixelRatio));
  canvas.height = Math.max(1, Math.round(height * pixelRatio));
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);
}

function paintChartCanvas(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  marks: readonly CanvasMark[],
): void {
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

export function drawChartCanvasProgressive(
  context: CanvasRenderingContext2D,
  marks: readonly CanvasMark[],
  width: number,
  height: number,
  options: { pixelRatio?: number; chunkSize?: number } = {},
): () => void {
  prepareChartCanvas(context, width, height, options.pixelRatio ?? 1);
  const chunkSize = Math.max(1, Math.floor(options.chunkSize ?? 500));
  let index = 0;
  let cancelled = false;
  let frame = 0;
  const schedule = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 0) as unknown as number;
  const cancel = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : (id: number) => clearTimeout(id);
  const draw = () => {
    if (cancelled) return;
    paintChartCanvas(context, marks.slice(index, index + chunkSize));
    index += chunkSize;
    if (index < marks.length) frame = schedule(draw);
  };
  draw();
  return () => { cancelled = true; if (frame) cancel(frame); };
}

/** Draw line marks with a minimal WebGL path; callers should fall back to Canvas2D for other marks. */
export function drawChartWebGL(context: WebGLRenderingContext, marks: readonly CanvasMark[], width: number, height: number): boolean {
  const lines = marks.filter((mark): mark is Extract<CanvasMark, { type: 'line' }> => mark.type === 'line');
  if (!lines.length) return false;
  const vertex = context.createShader(context.VERTEX_SHADER);
  const fragment = context.createShader(context.FRAGMENT_SHADER);
  if (!vertex || !fragment) return false;
  context.shaderSource(vertex, 'attribute vec2 p; void main(){gl_Position=vec4(p,0.0,1.0);}');
  context.shaderSource(fragment, 'precision mediump float; void main(){gl_FragColor=vec4(0.2,0.45,0.9,1.0);}');
  context.compileShader(vertex); context.compileShader(fragment);
  const program = context.createProgram();
  if (!program) return false;
  context.attachShader(program, vertex); context.attachShader(program, fragment); context.linkProgram(program); context.useProgram(program);
  context.viewport(0, 0, width, height); context.clearColor(0, 0, 0, 0); context.clear(context.COLOR_BUFFER_BIT);
  const position = context.getAttribLocation(program, 'p');
  for (const mark of lines) {
    const values = new Float32Array(mark.points.flatMap(([x, y]) => [(x / width) * 2 - 1, 1 - (y / height) * 2]));
    const buffer = context.createBuffer(); if (!buffer) continue;
    context.bindBuffer(context.ARRAY_BUFFER, buffer); context.bufferData(context.ARRAY_BUFFER, values, context.STREAM_DRAW);
    context.enableVertexAttribArray(position); context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0); context.drawArrays(context.LINE_STRIP, 0, mark.points.length);
  }
  return true;
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

export type ChartWorkerInput =
  | { operation: 'decimate'; points: { x: number; y: number }[]; width: number }
  | { operation: 'heatmap'; points: { x: number; y: number; value?: number }[]; columns: number; rows: number };

export function runChartWorker<T>(worker: Worker, request: ChartWorkerInput): Promise<T> {
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
