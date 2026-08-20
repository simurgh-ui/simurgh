// @vitest-environment jsdom
import '@angular/compiler';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  bootstrapApplication,
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import { describe, expect, it, vi } from 'vitest';
import { OverlaySsrHostComponent } from './overlay-ssr-host.js';
import { overlaySsrMarkup } from './overlay-ssr-markup.js';

describe('Angular positioned overlay hydration', () => {
  it('hydrates every deterministic initial overlay without recovery errors', async () => {
    const parsed = new DOMParser().parseFromString(
      overlaySsrMarkup,
      'text/html',
    );
    document.head.innerHTML = parsed.head.innerHTML;
    document.body.innerHTML = parsed.body.innerHTML;
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      const applicationPromise = bootstrapApplication(OverlaySsrHostComponent, {
        providers: [
          provideZonelessChangeDetection(),
          provideClientHydration(withNoHttpTransferCache()),
        ],
      });
      document.dispatchEvent(new Event('DOMContentLoaded'));
      const application = await applicationPromise;
      expect(error).not.toHaveBeenCalled();
      expect(
        document.querySelector('simurgh-overlay-ssr-host main'),
      ).not.toBeNull();
      expect(
        document
          .querySelector('[aria-controls]')
          ?.getAttribute('aria-controls'),
      ).toMatch(/\S/);
      const lazyOverlay = await import('../src/components/dialog.js');
      expect(lazyOverlay.DialogComponent).toBeTypeOf('function');
      application.destroy();
    } finally {
      error.mockRestore();
    }
  });
});
