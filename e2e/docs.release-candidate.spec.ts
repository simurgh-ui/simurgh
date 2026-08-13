import { expect, test, type Page } from '@playwright/test';
import axe from 'axe-core';

const waitForHydration = async (page: Page) => {
  const island = page.locator('figure.simurgh-preview astro-island');
  if (await island.count()) await expect(island).not.toHaveAttribute('ssr', '');
};

test('200% reflow equivalent has no horizontal document overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 720 });
  await page.goto('/components/form/');
  await waitForHydration(page);
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  const figure = page.locator('figure.simurgh-preview');
  await figure.scrollIntoViewIfNeeded();
  await expect(figure).toBeInViewport();
});

test('short viewport keeps dialog actions reachable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 420 });
  await page.goto('/components/dialog/');
  await waitForHydration(page);
  await page.getByRole('button', { name: 'Edit profile' }).click();
  const dialog = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Save changes' }),
  ).toBeInViewport();
});

test('forced RTL and reduced motion preserve focus appearance', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.goto('/components/radio-group/');
  await page.locator('html').evaluate((root) => {
    root.dataset.theme = 'dark';
    root.dir = 'rtl';
  });
  await waitForHydration(page);
  const radio = page.getByRole('radio', { name: 'Pro' });
  await radio.focus();
  const presentation = await radio.evaluate((control) => {
    const style = getComputedStyle(control);
    return {
      animationDuration: style.animationDuration,
    documentDirection: document.documentElement.dir,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
  expect(presentation.documentDirection).toBe('rtl');
  expect(presentation.animationDuration).toBe('0s');
  expect(presentation.outlineStyle).not.toBe('none');
  expect(Number.parseFloat(presentation.outlineWidth)).toBeGreaterThanOrEqual(
    2,
  );
});

for (const theme of ['light', 'dark'] as const) {
  test(`${theme} component page has no automated WCAG A/AA violations`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/components/form/');
    await page.locator('html').evaluate((root, selectedTheme) => {
      root.dataset.theme = selectedTheme;
    }, theme);
    await waitForHydration(page);
    await page.addScriptTag({ content: axe.source });
    const results = await page.evaluate(async () =>
      (window as typeof window & { axe: typeof axe }).axe.run(document, {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      }),
    );
    expect(results.violations).toEqual([]);
  });
}
