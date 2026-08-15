import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const bundle = await build({
  stdin: {
    contents: `export { createChartStream } from './packages/core/src/chart-stream.ts';`,
    resolveDir: root,
  },
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'SimurghBenchmark',
  platform: 'browser',
  target: 'es2022',
});

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setContent('<main>Simurgh chart telemetry benchmark</main>');
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  const result = await page.evaluate(async () => {
    const stream = SimurghBenchmark.createChartStream({ capacity: 100_000, dimensions: ['x', 'y'] });
    const x = new Float64Array(100_000);
    const y = new Float64Array(100_000);
    for (let index = 0; index < x.length; index += 1) {
      x[index] = index;
      y[index] = Math.sin(index / 50);
    }
    stream.append({ x, y });
    const durations = [];
    let droppedInput = 0;
    for (let frame = 0; frame < 600; frame += 1) {
      await new Promise(requestAnimationFrame);
      const started = performance.now();
      const batchX = new Float64Array(16);
      const batchY = new Float64Array(16);
      for (let index = 0; index < 16; index += 1) {
        batchX[index] = 100_000 + frame * 16 + index;
        batchY[index] = Math.sin(batchX[index] / 50);
      }
      stream.append({ x: batchX, y: batchY });
      const snapshot = stream.snapshot();
      const step = Math.ceil(snapshot.length / 1280);
      let checksum = 0;
      for (let index = 0; index < snapshot.length; index += step) checksum += snapshot.columns.y[index];
      if (!Number.isFinite(checksum)) droppedInput += 1;
      durations.push(performance.now() - started);
    }
    durations.sort((a, b) => a - b);
    return {
      capacity: stream.capacity,
      finalLength: stream.length,
      frames: durations.length,
      droppedInput,
      medianMs: durations[Math.floor(durations.length * 0.5)],
      p95Ms: durations[Math.floor(durations.length * 0.95)],
    };
  });
  const passed = result.finalLength === 100_000 && result.droppedInput === 0 && result.medianMs < 16.7 && result.p95Ms < 33;
  await mkdir(resolve(root, 'artifacts'), { recursive: true });
  await writeFile(resolve(root, 'artifacts/chart-performance.json'), `${JSON.stringify({ ...result, passed }, null, 2)}\n`);
  console.table(result);
  if (!passed) throw new Error(`Chart performance target missed: ${JSON.stringify(result)}`);
} finally {
  await browser.close();
}
