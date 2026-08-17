import { expect, test } from '@playwright/test';

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
