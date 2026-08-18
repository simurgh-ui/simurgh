import { expect, test } from '@playwright/test';

test('icon catalog examples expose one clear accessible owner', async ({
  page,
}) => {
  await page.goto('/icons/overview/');
  const examples = page.locator('[data-icon-accessibility-examples]');
  const decorative = examples.locator('[data-icon-example="decorative"]');
  const informative = examples.locator('[data-icon-example="informative"]');
  const control = examples.locator('[data-icon-example="icon-only-control"]');

  await expect(
    decorative.getByText('Download report', { exact: true }),
  ).toBeVisible();
  await expect(decorative.locator('svg')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await expect(decorative.locator('svg')).toHaveAttribute('focusable', 'false');
  await expect(decorative.getByRole('img')).toHaveCount(0);

  await expect(
    informative.getByRole('img', { name: 'Verified account' }),
  ).toBeVisible();
  await expect(informative.locator('svg')).not.toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await expect(informative.locator('svg')).toHaveAttribute(
    'focusable',
    'false',
  );

  const button = control.getByRole('button', { name: 'Close preview' });
  await expect(button).toHaveAccessibleName('Close preview');
  await expect(button.locator('svg')).toHaveAttribute('aria-hidden', 'true');
  await expect(button.locator('svg')).toHaveAttribute('focusable', 'false');
  await expect(control.getByRole('img')).toHaveCount(0);
  await button.focus();
  await expect(button).toBeFocused();
  await expect(button.locator('svg')).not.toBeFocused();
});

test('icon catalog supports concept search, categories, empty states, and copy feedback', async ({
  browserName,
  context,
  page,
}) => {
  if (browserName === 'chromium') {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  }

  await page.goto('/icons/overview/');
  const search = page.getByRole('searchbox', { name: 'Search icons' });
  const status = page.locator('[data-icon-status]');
  await expect(status).toHaveText('474 icons');

  await search.fill('delete');
  await expect(status).toHaveText('1 icon');
  await expect(
    page.getByRole('button', { name: 'Copy trash icon name' }),
  ).toBeVisible();

  await search.fill('concept-that-does-not-exist');
  await expect(page.getByText('No matching icons')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toBeFocused();
  await expect(status).toHaveText('474 icons');

  await page.getByLabel('Category').selectOption('communication');
  await expect(
    page.getByRole('button', { name: 'Copy message icon name' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Copy home icon name' }),
  ).toBeHidden();

  await page.getByLabel('Copy format').selectOption('react');
  await page.getByRole('button', { name: 'Copy message icon name' }).click();
  await expect(status).toHaveText('Copied message react import');
});
