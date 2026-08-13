import { expect, test, type Page } from '@playwright/test';

const preview = (page: Page) => page.locator('figure.simurgh-preview');

test.use({ colorScheme: 'light', reducedMotion: 'reduce' });
test.skip(
  ({ browserName }) => browserName !== 'chromium',
  'Visual baselines use the Chromium rendering engine.',
);

test('button preview: light, loading, disabled, and keyboard focus', async ({
  page,
}) => {
  await page.goto('/components/button/');
  const figure = preview(page);
  await figure.getByRole('button', { name: 'Save changes' }).focus();
  await expect(figure).toHaveScreenshot('button-light-focus.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});

test('button preview: dark theme and RTL', async ({ page }) => {
  await page.goto('/components/button/');
  await page.locator('html').evaluate((root) => {
    root.dataset.theme = 'dark';
    root.dir = 'rtl';
  });
  const figure = preview(page);
  await figure.getByRole('button', { name: 'Save changes' }).focus();
  await expect(figure).toHaveScreenshot('button-dark-rtl-focus.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});

test('form preview: narrow viewport and invalid control', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/components/form/');
  const figure = preview(page);
  const email = figure.getByRole('textbox', { name: 'Email' });
  await email.evaluate((control) =>
    control.setAttribute('aria-invalid', 'true'),
  );
  await email.focus();
  await expect(figure).toHaveScreenshot('form-narrow-invalid-focus.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});
