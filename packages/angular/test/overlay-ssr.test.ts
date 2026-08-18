// @vitest-environment node
import '@angular/compiler';
import 'zone.js/node';
import {
  bootstrapApplication,
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import {
  provideServerRendering,
  renderApplication,
} from '@angular/platform-server';
import { describe, expect, it } from 'vitest';
import { OverlaySsrHostComponent } from './overlay-ssr-host.js';
import { overlaySsrMarkup } from './overlay-ssr-markup.js';

async function render() {
  return renderApplication(
    (context) =>
      bootstrapApplication(
        OverlaySsrHostComponent,
        {
          providers: [
            provideServerRendering(),
            provideClientHydration(withNoHttpTransferCache()),
          ],
        },
        context,
      ),
    {
      document:
        '<!doctype html><html><body><simurgh-overlay-ssr-host></simurgh-overlay-ssr-host></body></html>',
      url: '/',
    },
  );
}

describe('Angular positioned overlay SSR', () => {
  it('imports and renders every initial overlay deterministically without browser globals', async () => {
    expect(globalThis).not.toHaveProperty('window');
    expect(globalThis).not.toHaveProperty('document');
    const markup = await render();
    expect(markup).toBe(overlaySsrMarkup);
    expect(markup).toBe(await render());
  });
});
