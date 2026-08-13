import { expect, test, type Page } from '@playwright/test';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();

const frameworkSource = {
  vue: `
    import { createApp, h } from 'vue';
    import { Button } from './dist/components/button.js';
    createApp({ render: () => h(Button, { type: 'button' }, () => 'Save changes') }).mount('#app');
    window.adapterReady = true;
  `,
  angular: `
    import 'zone.js';
    import '@angular/compiler';
    import { Component } from '@angular/core';
    import { bootstrapApplication } from '@angular/platform-browser';
    import { ButtonComponent } from './dist/components/button.js';
    class AdapterPreview {}
    Component({
      standalone: true,
      imports: [ButtonComponent],
      selector: 'app-root',
      template: '<simurgh-button type="button">Save changes</simurgh-button>',
    })(AdapterPreview);
    bootstrapApplication(AdapterPreview)
      .then(() => { window.adapterReady = true; })
      .catch((error) => {
        document.body.dataset.adapterError = String(error?.stack || error);
        window.adapterReady = true;
      });
  `,
} as const;

const bundles = new Map<keyof typeof frameworkSource, Promise<string>>();

function bundle(framework: keyof typeof frameworkSource) {
  let pending = bundles.get(framework);
  if (!pending) {
    pending = build({
      absWorkingDir: resolve(root, 'packages', framework),
      bundle: true,
      format: 'iife',
      logLevel: 'silent',
      minify: true,
      platform: 'browser',
      stdin: {
        contents: frameworkSource[framework],
        loader: 'ts',
        resolveDir: resolve(root, 'packages', framework),
      },
      write: false,
    }).then((result) => result.outputFiles[0]!.text);
    bundles.set(framework, pending);
  }
  return pending;
}

async function mountAdapter(
  page: Page,
  framework: keyof typeof frameworkSource,
) {
  const [script, tokens, button] = await Promise.all([
    bundle(framework),
    readFile(resolve(root, 'packages/styles/tokens.css'), 'utf8'),
    readFile(resolve(root, 'packages/styles/components/button.css'), 'utf8'),
  ]);
  await page.setContent(`
    <style>
      ${tokens}
      ${button.replace("@import '../tokens.css';", '')}
      body { margin: 0; padding: 24px; background: hsl(var(--simurgh-background)); }
      .adapter-preview { display: grid; min-height: 160px; place-items: center; border: 1px solid hsl(var(--simurgh-border)); border-radius: var(--simurgh-radius); }
    </style>
    <main class="adapter-preview" aria-label="${framework} adapter preview">
      ${framework === 'angular' ? '<app-root></app-root>' : '<div id="app"></div>'}
    </main>
  `);
  await page.addScriptTag({ content: script });
  await page.waitForFunction(() =>
    Boolean(
      (window as typeof window & { adapterReady?: boolean }).adapterReady,
    ),
  );
  await expect(page.locator('body')).not.toHaveAttribute('data-adapter-error');
}

test.skip(
  ({ browserName }) => browserName !== 'chromium',
  'Visual baselines use the Chromium rendering engine.',
);

for (const framework of ['vue', 'angular'] as const) {
  test(`${framework} public Button visual baseline`, async ({ page }) => {
    await mountAdapter(page, framework);
    const preview = page.getByRole('main', {
      name: `${framework} adapter preview`,
    });
    const button = preview.getByRole('button', { name: 'Save changes' });
    await button.focus();
    await expect(button).toBeFocused();
    await expect(preview).toHaveScreenshot(`${framework}-button-focus.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    });
  });
}
