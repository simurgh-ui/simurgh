import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const localChrome =
  process.platform === 'win32' && !process.env.CI
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : undefined;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'on-first-retry' },
  webServer: {
    command:
      'node apps/docs/node_modules/astro/astro.js preview --root apps/docs --host 127.0.0.1 --port 4321',
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions:
          localChrome && existsSync(localChrome)
            ? { executablePath: localChrome }
            : {},
      },
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
