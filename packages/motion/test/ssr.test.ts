import { describe, expect, it } from 'vitest';

describe('SSR', () => {
  it('imports every entry point without accessing browser globals', async () => {
    await expect(import('../src/index.js')).resolves.toBeTruthy();
    await expect(import('../src/react.js')).resolves.toBeTruthy();
    await expect(import('../src/vue.js')).resolves.toBeTruthy();
    await expect(import('../src/angular.js')).resolves.toBeTruthy();
  }, 20_000);
});
