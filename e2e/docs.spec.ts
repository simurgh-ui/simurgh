import { expect, test } from '@playwright/test';

test('documentation navigation and component contract are available', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Simurgh UI' })).toBeVisible();
  await page.getByRole('link', { name: 'Components' }).first().click();
  await expect(
    page.getByRole('heading', { name: 'Component overview' }),
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Dialog', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Toast', exact: true }),
  ).toBeVisible();
});

test('framework tabs switch with pointer and keyboard', async ({ page }) => {
  await page.goto('/components/button/');
  const react = page.getByRole('tab', { name: 'React' });
  const vue = page.getByRole('tab', { name: 'Vue' });
  const angular = page.getByRole('tab', { name: 'Angular' });

  await expect(react).toHaveAttribute('aria-selected', 'true');
  await vue.click();
  await expect(vue).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Vue' })).toContainText(
    ':loading="saving"',
  );

  await vue.press('ArrowRight');
  await expect(angular).toBeFocused();
  await expect(angular).toHaveAttribute('aria-selected', 'true');
  await angular.press('Home');
  await expect(react).toBeFocused();
  await expect(react).toHaveAttribute('aria-selected', 'true');
});

test('active code samples expose a working copy control', async ({ page }) => {
  await page.goto('/components/button/');
  const panel = page.getByRole('tabpanel', { name: 'React' });
  const copy = panel.getByTitle('Copy to clipboard');

  await expect(copy).toBeVisible();
  await expect(copy).toHaveAttribute(
    'data-code',
    /<Button variant="primary" loading=\{saving\}>Save changes<\/Button>/u,
  );
  await copy.click();
  await expect(panel.locator('[aria-live="polite"]')).toContainText('Copied!');
});

test('component previews expose a labelled, interactive demo', async ({
  page,
}) => {
  await page.goto('/components/button/');
  const preview = page.locator('figure.simurgh-preview');

  await expect(preview.getByText('Button', { exact: true })).toBeVisible();
  const save = preview.getByRole('button', { name: 'Save changes' });
  await expect(save).toBeEnabled();
  await save.focus();
  await expect(save).toBeFocused();
  await expect(preview.getByRole('button', { name: 'Saving…' })).toBeDisabled();
});

test('mobile navigation opens, closes with Escape, and restores focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/components/button/');
  const menu = page.getByRole('button', { name: 'Menu' });
  const menuController = page.locator('starlight-menu-button');

  await menu.click();
  await expect(menuController).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveAttribute(
    'data-mobile-menu-expanded',
    '',
  );
  await expect(page.locator('#starlight__sidebar')).toBeAttached();
  await menu.press('Escape');
  await expect(menuController).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('body')).not.toHaveAttribute(
    'data-mobile-menu-expanded',
    '',
  );
  await expect(menu).toBeFocused();
});

test('dark theme and RTL guidance remain usable', async ({ page }) => {
  await page.goto('/guides/accessibility-rtl/');
  await expect(
    page.getByRole('heading', { name: 'Accessibility and RTL' }),
  ).toBeVisible();
  await page
    .getByRole('banner')
    .getByLabel('Select theme')
    .selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.evaluate(() => {
    document.documentElement.dir = 'rtl';
  });
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(
    page.getByText('Horizontal keyboard movement reverses in RTL.'),
  ).toBeVisible();
});

test('keyboard readers can skip navigation and reach page content', async ({
  page,
}) => {
  await page.goto('/components/button/');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await skip.focus();
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Button', level: 1 }),
  ).toBeVisible();
  await expect(page).toHaveURL(/#_top$/u);
});
