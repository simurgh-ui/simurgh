import { expect, test, type Page } from '@playwright/test';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const maxDiffPixelRatio = process.env.CI ? 0.04 : 0.01;

const fixtureBundle = build({
  absWorkingDir: resolve(root, 'packages/core'),
  bundle: true,
  format: 'iife',
  logLevel: 'silent',
  minify: true,
  platform: 'browser',
  stdin: {
    contents: `
      import { autoUpdateFloating, computeFloatingPosition } from './dist/floating.js';
      const cleanups = [];
      window.overlayFixture = {
        mount() {
          for (const fixture of document.querySelectorAll('[data-fixture]')) {
            const reference = fixture.querySelector('[data-anchor]');
            const floating = fixture.querySelector('[data-floating]');
            const update = () => {
              const result = computeFloatingPosition(reference, floating, {
                placement: fixture.dataset.placement || 'bottom',
              });
              floating.style.position = 'fixed';
              floating.style.left = result.x + 'px';
              floating.style.top = result.y + 'px';
              floating.dataset.resolvedPlacement = result.placement;
            };
            cleanups.push(autoUpdateFloating(reference, floating, update));
          }
        },
        reposition() {
          window.dispatchEvent(new Event('resize'));
        },
        cleanup() {
          while (cleanups.length) cleanups.pop()();
        },
      };
    `,
    loader: 'js',
    resolveDir: resolve(root, 'packages/core'),
  },
  write: false,
}).then((result) => result.outputFiles[0]!.text);

const fixtureStyles = `
  html, body { margin: 0; min-height: 100%; }
  body { background: #f4f7fb; color: #10213a; font: 14px/1.4 system-ui, sans-serif; }
  * { box-sizing: border-box; }
  [data-stage] { position: relative; width: 100%; height: 100vh; overflow: hidden; }
  [data-anchor] {
    position: absolute;
    min-width: 96px;
    height: 40px;
    padding: 0 14px;
    border: 1px solid #155eef;
    border-radius: 8px;
    background: #e9f0ff;
    color: #07377f;
    font: inherit;
  }
  [data-floating] {
    z-index: 10;
    width: 180px;
    min-height: 88px;
    padding: 16px;
    border: 1px solid #9aabca;
    border-radius: 10px;
    background: white;
    box-shadow: 0 12px 30px rgb(22 42 80 / 18%);
  }
  [data-floating] strong { display: block; margin-bottom: 6px; }
  [data-scroll] {
    position: absolute;
    inset: 72px 88px;
    overflow: auto;
    border: 2px solid #a8b8d4;
    border-radius: 12px;
    background: #e8eef8;
  }
  [data-scroll-content] { position: relative; width: 760px; height: 920px; }
  [data-transform-shell] {
    position: absolute;
    left: 92px;
    top: 70px;
    width: 360px;
    height: 240px;
    border: 2px dashed #7f56d9;
    border-radius: 16px;
    transform: translate(34px, 22px) scale(1.12);
    transform-origin: top left;
    zoom: 1.2;
  }
`;

async function mount(page: Page, body: string) {
  const [script, tokens] = await Promise.all([
    fixtureBundle,
    readFile(resolve(root, 'packages/styles/tokens.css'), 'utf8'),
  ]);
  await page.setContent(`<style>${tokens}${fixtureStyles}</style>${body}`);
  await page.addScriptTag({ content: script });
  await page.evaluate(() => {
    (
      window as typeof window & {
        overlayFixture: { mount(): void };
      }
    ).overlayFixture.mount();
  });
}

async function geometry(page: Page) {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-anchor]')!;
    const floating = document.querySelector('[data-floating]')!;
    const a = anchor.getBoundingClientRect();
    const f = floating.getBoundingClientRect();
    return {
      anchor: { left: a.left, top: a.top, right: a.right, bottom: a.bottom },
      floating: {
        left: f.left,
        top: f.top,
        right: f.right,
        bottom: f.bottom,
      },
      placement: (floating as HTMLElement).dataset.resolvedPlacement,
      viewport: { width: innerWidth, height: innerHeight },
    };
  });
}

test.use({ colorScheme: 'light', reducedMotion: 'reduce' });

test('flips and shifts at viewport edges', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 420 });
  await mount(
    page,
    `<main data-stage data-fixture data-placement="bottom-end">
      <button data-anchor style="right: 3px; bottom: 3px">Edge anchor</button>
      <section data-floating><strong>Edge content</strong>Flipped and clamped inside the viewport.</section>
    </main>`,
  );
  await expect
    .poll(async () => (await geometry(page)).placement)
    .toBe('top-end');
  const result = await geometry(page);
  expect(result.floating.left).toBeGreaterThanOrEqual(8);
  expect(result.floating.right).toBeLessThanOrEqual(result.viewport.width - 8);
  expect(result.floating.bottom).toBeLessThan(result.anchor.top);
  await expect(page.locator('[data-stage]')).toHaveScreenshot(
    'overlay-viewport-edge.png',
    { animations: 'disabled', maxDiffPixelRatio },
  );
});

test('tracks an anchor through nested scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 520 });
  await mount(
    page,
    `<main data-stage data-fixture data-placement="bottom-start">
      <div data-scroll>
        <div data-scroll-content>
          <button data-anchor style="left: 470px; top: 650px">Scroll anchor</button>
        </div>
      </div>
      <section data-floating><strong>Scroll content</strong>Following a nested scroll container.</section>
    </main>`,
  );
  const scroller = page.locator('[data-scroll]');
  await scroller.evaluate((element) => {
    element.scrollTop = 420;
    element.scrollLeft = 250;
  });
  await expect
    .poll(async () => {
      const result = await geometry(page);
      return Math.round(result.floating.top - result.anchor.bottom);
    })
    .toBe(8);
  const before = await geometry(page);
  await scroller.evaluate((element) => (element.scrollTop += 48));
  await expect
    .poll(async () => Math.round((await geometry(page)).anchor.top))
    .toBe(Math.round(before.anchor.top - 48));
  await expect
    .poll(async () => {
      const result = await geometry(page);
      return Math.round(result.floating.top - result.anchor.bottom);
    })
    .toBe(8);
  await expect(page.locator('[data-stage]')).toHaveScreenshot(
    'overlay-nested-scroll.png',
    { animations: 'disabled', maxDiffPixelRatio },
  );
});

test('aligns with a zoomed anchor inside a transformed ancestor', async ({
  page,
}) => {
  await page.setViewportSize({ width: 760, height: 520 });
  await mount(
    page,
    `<main data-stage data-fixture data-placement="right-start">
      <div data-transform-shell>
        <button data-anchor style="left: 118px; top: 82px">Zoomed anchor</button>
      </div>
      <section data-floating><strong>Transformed content</strong>Aligned in viewport coordinates.</section>
    </main>`,
  );
  await expect
    .poll(async () => {
      const result = await geometry(page);
      return Math.round(result.floating.left - result.anchor.right);
    })
    .toBe(8);
  const result = await geometry(page);
  expect(Math.abs(result.floating.top - result.anchor.top)).toBeLessThan(1);
  await expect(page.locator('[data-stage]')).toHaveScreenshot(
    'overlay-transform-zoom.png',
    { animations: 'disabled', maxDiffPixelRatio },
  );
});

test('stays reachable in a short mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 420 });
  await mount(
    page,
    `<main data-stage data-fixture data-placement="bottom">
      <button data-anchor style="left: 142px; bottom: 18px">Mobile anchor</button>
      <section data-floating style="width: 260px; min-height: 150px"><strong>Mobile content</strong>A larger surface remains inside every viewport edge.</section>
    </main>`,
  );
  const result = await geometry(page);
  expect(result.placement).toBe('top');
  expect(result.floating.left).toBeGreaterThanOrEqual(8);
  expect(result.floating.right).toBeLessThanOrEqual(382);
  expect(result.floating.top).toBeGreaterThanOrEqual(8);
  expect(result.floating.bottom).toBeLessThanOrEqual(412);
  await expect(page.locator('[data-stage]')).toHaveScreenshot(
    'overlay-mobile-viewport.png',
    { animations: 'disabled', maxDiffPixelRatio },
  );
});

test('repositions after live anchor and content resizing', async ({ page }) => {
  await page.setViewportSize({ width: 700, height: 480 });
  await mount(
    page,
    `<main data-stage data-fixture data-placement="bottom-end">
      <button data-anchor style="left: 360px; top: 160px">Resizable anchor</button>
      <section data-floating><strong>Resizable content</strong>Initial dimensions.</section>
    </main>`,
  );
  const initial = await geometry(page);
  await page.evaluate(() => {
    const anchor = document.querySelector<HTMLElement>('[data-anchor]')!;
    const floating = document.querySelector<HTMLElement>('[data-floating]')!;
    anchor.style.width = '210px';
    floating.style.width = '280px';
    floating.style.minHeight = '126px';
    floating.lastChild!.textContent =
      'Updated after both observed elements resized.';
  });
  await expect
    .poll(async () => Math.round((await geometry(page)).floating.left))
    .not.toBe(Math.round(initial.floating.left));
  const resized = await geometry(page);
  expect(Math.round(resized.floating.right)).toBe(
    Math.round(resized.anchor.right),
  );
  expect(Math.round(resized.floating.top - resized.anchor.bottom)).toBe(8);
  await expect(page.locator('[data-stage]')).toHaveScreenshot(
    'overlay-live-resize.png',
    { animations: 'disabled', maxDiffPixelRatio },
  );
});
