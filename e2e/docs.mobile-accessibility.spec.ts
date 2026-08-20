import { expect, test, type Page } from '@playwright/test';
import axe from 'axe-core';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

async function preview(page: Page) {
  const figure = page.locator('figure.simurgh-preview');
  const island = figure.locator('astro-island');
  if (await island.count()) await expect(island).not.toHaveAttribute('ssr', '');
  return figure;
}

async function expectNoDocumentOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

test('mobile form exposes its label, required state, and invalid focus', async ({
  page,
}) => {
  await page.goto('/components/form/');
  const figure = await preview(page);
  const email = figure.getByRole('textbox', { name: 'Email' });
  await expect(email).toHaveAttribute('required', '');
  await figure.getByRole('button', { name: 'Continue' }).tap();
  await expect(email).toBeFocused();
  expect(await email.evaluate((element) => element.matches(':invalid'))).toBe(
    true,
  );
  await expectNoDocumentOverflow(page);
});

test('mobile dialog preserves name, description, containment, and trigger context', async ({
  page,
}) => {
  await page.goto('/components/dialog/');
  const figure = await preview(page);
  const trigger = figure.getByRole('button', { name: 'Edit profile' });
  await trigger.tap();
  const dialog = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(dialog).toContainText(
    'Update the details shown on your public profile.',
  );
  await expect
    .poll(() =>
      dialog.evaluate((element) => element.contains(document.activeElement)),
    )
    .toBe(true);
  await dialog.getByRole('button', { name: 'Cancel' }).tap();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('mobile native select and toast retain assistive semantics', async ({
  page,
}) => {
  await page.goto('/components/native-select/');
  const selectPreview = await preview(page);
  const select = selectPreview.getByRole('combobox');
  await expect(select).toHaveAccessibleName(/.+/u);
  await expect(select.locator('option')).not.toHaveCount(0);

  await page.goto('/components/toast/');
  const toastPreview = await preview(page);
  await toastPreview.getByRole('button', { name: 'Save changes' }).tap();
  await expect(page.getByRole('status')).toContainText('Changes saved');
});

test('mobile controls meet WCAG target size and reduced-motion expectations', async ({
  page,
}) => {
  await page.goto('/components/button/');
  const figure = await preview(page);
  const save = figure.getByRole('button', { name: 'Save changes' });
  const menu = page.getByRole('button', { name: 'Menu' });
  for (const control of [save, menu]) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(24);
    expect(box!.height).toBeGreaterThanOrEqual(24);
  }
  const motion = await save.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      animationDuration: style.animationDuration,
      transitionDuration: style.transitionDuration,
    };
  });
  expect(motion.animationDuration).toBe('0s');
  for (const duration of motion.transitionDuration.split(','))
    expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
  await expectNoDocumentOverflow(page);
});

test('mobile representative previews have no automated WCAG A or AA violations', async ({
  page,
}) => {
  for (const path of [
    '/components/form/',
    '/components/dialog/',
    '/components/native-select/',
    '/components/toast/',
  ]) {
    await page.goto(path);
    const figure = await preview(page);
    if (path.includes('dialog'))
      await figure.getByRole('button', { name: 'Edit profile' }).tap();
    await page.addScriptTag({ content: axe.source });
    const root = path.includes('dialog')
      ? '[role="dialog"]'
      : 'figure.simurgh-preview';
    const results = await page.evaluate(
      async (selector) =>
        (window as typeof window & { axe: typeof axe }).axe.run(
          document.querySelector(selector)!,
          {
            runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
          },
        ),
      root,
    );
    expect(results.violations, path).toEqual([]);
  }
});
