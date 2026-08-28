import { describe, expect, it, vi } from 'vitest';
import { drawChartCanvasProgressive, drawChartWebGL } from '../src/chart-canvas.js';

describe('chart large-data renderers', () => {
  it('renders Canvas marks progressively in bounded chunks', async () => {
    const fillRect = vi.fn();
    const context = {
      canvas: { width: 0, height: 0 }, setTransform: vi.fn(), clearRect: vi.fn(), fillRect,
      beginPath: vi.fn(), arc: vi.fn(), fill: vi.fn(), lineTo: vi.fn(), moveTo: vi.fn(),
      closePath: vi.fn(), stroke: vi.fn(), globalAlpha: 1, fillStyle: '', strokeStyle: '', lineWidth: 1,
    } as unknown as CanvasRenderingContext2D;
    drawChartCanvasProgressive(context, [
      { type: 'rect', x: 0, y: 0, width: 1, height: 1, color: '#000' },
      { type: 'rect', x: 1, y: 1, width: 1, height: 1, color: '#000' },
    ], 10, 10, { chunkSize: 1 });
    expect(fillRect).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fillRect).toHaveBeenCalledTimes(2);
  });

  it('renders line marks through WebGL when available', () => {
    const drawArrays = vi.fn();
    const context = {
      VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, ARRAY_BUFFER: 3, STREAM_DRAW: 4, FLOAT: 5,
      LINE_STRIP: 6, COLOR_BUFFER_BIT: 7, createShader: vi.fn(() => ({})), shaderSource: vi.fn(),
      compileShader: vi.fn(), createProgram: vi.fn(() => ({})), attachShader: vi.fn(), linkProgram: vi.fn(),
      useProgram: vi.fn(), viewport: vi.fn(), clearColor: vi.fn(), clear: vi.fn(), getAttribLocation: vi.fn(() => 0),
      createBuffer: vi.fn(() => ({})), bindBuffer: vi.fn(), bufferData: vi.fn(), enableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(), drawArrays,
    } as unknown as WebGLRenderingContext;
    expect(drawChartWebGL(context, [{ type: 'line', points: [[0, 0], [10, 10]], color: '#000' }], 10, 10)).toBe(true);
    expect(drawArrays).toHaveBeenCalledWith(6, 0, 2);
  });
});
