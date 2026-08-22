import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(here, 'capture');
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  recordVideo: { dir: output, size: { width: 1280, height: 720 } },
  reducedMotion: 'no-preference',
});
const page = await context.newPage();
await page.goto(pathToFileURL(path.join(here, 'showcase.html')).href);
await page.waitForTimeout(21600);
const video = page.video();
await context.close();
await video.saveAs(path.join(here, 'simurgh-ui-motion-showcase.webm'));
await browser.close();
