import { expect, test } from '@playwright/test';

test('documentation navigation and component contract are available', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Simurgh UI' })).toBeVisible();
  await page.getByRole('link', { name: 'Components' }).first().click();
  await expect(page.getByRole('heading', { name: 'Component overview' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Dialog', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Toast', exact: true })).toBeVisible();
  await page.goto('/components/dialog/');
  await expect(page.getByRole('heading', { name: 'Dialog' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'React' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Vue' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Angular' })).toBeVisible();
});

test('RTL guidance and dark theme remain usable', async ({ page }) => {
  await page.goto('/guides/accessibility-rtl/');
  await expect(page.getByRole('heading', { name: 'Accessibility and RTL' })).toBeVisible();
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; document.documentElement.dataset.theme = 'dark'; });
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByText('Horizontal keyboard movement reverses in RTL.')).toBeVisible();
});
