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

test('form accessibility tree exposes required validation semantics', async ({
  page,
}) => {
  await page.goto('/components/form/');
  await waitForHydration(page);
  const email = page.getByRole('textbox', { name: 'Email' });
  await expect(email).toHaveAttribute('required', '');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(email).toBeFocused();
  expect(await email.evaluate((control) => control.checkValidity())).toBe(
    false,
  );
});

test('dialog accessibility tree names, describes, and restores focus', async ({
  page,
}) => {
  await page.goto('/components/dialog/');
  await waitForHydration(page);
  const trigger = page.getByRole('button', { name: 'Edit profile' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(dialog).toContainText(
    'Update the details shown on your public profile.',
  );
  await expect
    .poll(() =>
      dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    )
    .toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('forced colors preserve controls and keyboard focus', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/components/button/');
  const save = page.getByRole('button', { name: 'Save changes' });
  await save.focus();
  const focus = await save.evaluate((control) => {
    const style = getComputedStyle(control);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
  expect(focus.outlineStyle).not.toBe('none');
  expect(Number.parseFloat(focus.outlineWidth)).toBeGreaterThanOrEqual(2);
  await expect(page.getByRole('button', { name: /Saving/u })).toBeDisabled();
});

const auditPages = [
  { name: 'form', path: '/components/form/' },
  { name: 'dialog', path: '/components/dialog/', open: 'Edit profile' },
  { name: 'radio group', path: '/components/radio-group/' },
  { name: 'accordion', path: '/components/accordion/' },
  { name: 'carousel', path: '/components/carousel/' },
] as const;

for (const theme of ['light', 'dark'] as const) {
  for (const auditedPage of auditPages) {
    test(`${theme} ${auditedPage.name} page has no automated WCAG A/AA violations`, async ({
      page,
    }) => {
      await page.emulateMedia({
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      await page.goto(auditedPage.path);
      await page.locator('html').evaluate((root, selectedTheme) => {
        root.dataset.theme = selectedTheme;
      }, theme);
      await waitForHydration(page);
      if ('open' in auditedPage) {
        await page.getByRole('button', { name: auditedPage.open }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await dialog.evaluate(async (element) => {
          await Promise.all(
            element
              .getAnimations({ subtree: true })
              .map((animation) => animation.finished.catch(() => undefined)),
          );
        });
      }
      await page.addScriptTag({ content: axe.source });
      const auditSelector =
        'open' in auditedPage ? '[role="dialog"]' : 'figure.simurgh-preview';
      const results = await page.evaluate(
        async (selector) =>
          (window as typeof window & { axe: typeof axe }).axe.run(
            document.querySelector(selector)!,
            {
              runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
            },
          ),
        auditSelector,
      );
      expect(results.violations).toEqual([]);
    });
  }
}
