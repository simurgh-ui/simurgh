import { expect, test, type Page } from '@playwright/test';

const preview = (page: Page) => page.locator('figure.simurgh-preview');
const hydratedPreview = async (page: Page) => {
  const figure = preview(page);
  await expect(figure.locator('astro-island')).not.toHaveAttribute('ssr', '');
  return figure;
};

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
  const figure = await hydratedPreview(page);
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

test('dialog preview: open overlay and initial focus', async ({ page }) => {
  await page.goto('/components/dialog/');
  const figure = await hydratedPreview(page);
  await figure.getByRole('button', { name: 'Edit profile' }).click();
  const dialog = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveScreenshot('dialog-open-focus.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});

test('radio group preview: dark RTL selected state', async ({ page }) => {
  await page.goto('/components/radio-group/');
  await page.locator('html').evaluate((root) => {
    root.dataset.theme = 'dark';
    root.dir = 'rtl';
  });
  const figure = await hydratedPreview(page);
  const pro = figure.getByRole('radio', { name: 'Pro' });
  await pro.check();
  await pro.focus();
  await expect(figure).toHaveScreenshot('radio-group-dark-rtl-focus.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});
