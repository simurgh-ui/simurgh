import { expect, test, type Page } from '@playwright/test';

async function waitForPreview(page: Page) {
  const island = page.locator('figure.simurgh-preview astro-island');
  if (await island.count()) await expect(island).not.toHaveAttribute('ssr', '');
  return page.locator('figure.simurgh-preview');
}

test('first-time reader can complete the published documentation journey', async ({
  page,
}) => {
  await page.goto('/guides/installation/');
  await expect(page.getByText('pnpm dlx @simurgh-ui/cli init')).toBeVisible();

  await page.goto('/guides/theming/');
  await expect(
    page.getByText('--simurgh-primary', { exact: true }).first(),
  ).toBeVisible();

  await page.goto('/components/form/');
  const formPreview = await waitForPreview(page);
  const email = formPreview.getByRole('textbox', { name: 'Email' });
  await email.fill('reader@example.com');
  await expect(email).toHaveValue('reader@example.com');

  await page.goto('/components/dialog/');
  const dialogPreview = await waitForPreview(page);
  await dialogPreview.getByRole('button', { name: 'Edit profile' }).click();
  await expect(
    page.getByRole('dialog', { name: 'Edit profile' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');

  await page.goto('/components/checkbox/');
  const checkboxPreview = await waitForPreview(page);
  const checkbox = checkboxPreview.getByRole('checkbox', {
    name: 'Receive product updates',
  });
  const initialState = await checkbox.getAttribute('aria-checked');
  await checkbox.click();
  await expect(checkbox).not.toHaveAttribute('aria-checked', initialState!);

  await page.goto('/guides/updates-and-migrations/');
  await expect(
    page.getByRole('heading', { name: 'Updates and migrations' }),
  ).toBeVisible();
  await expect(page.locator('main')).toContainText(/copied|source-owned/u);
});
