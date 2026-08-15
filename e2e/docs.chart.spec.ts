import { expect, test } from '@playwright/test';

test.describe('chart documentation preview', () => {
  test.use({ reducedMotion: 'reduce' });

  test('renders responsive SVG and supports keyboard and legend interaction', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 760 });
    await page.goto('/components/chart/');

    await expect(page.locator('figure.simurgh-preview astro-island')).not.toHaveAttribute('ssr', '');

    const chart = page.locator('figure.simurgh-chart');
    await expect(chart).toBeVisible();
    await expect(chart).toHaveAttribute('data-renderer', 'svg');
    await expect(chart.getByText('Monthly activity', { exact: true })).toBeVisible();
    await expect(chart.locator('[data-part="series"]')).toHaveCount(1);

    const explorer = chart.getByRole('button', { name: 'Explore chart data' });
    await explorer.focus();
    await explorer.press('ArrowRight');
    await expect(chart.getByRole('tooltip')).toContainText('value: 48');

    const width = await chart.locator('[data-part="viewport"]').evaluate((element) =>
      element.getBoundingClientRect().width,
    );
    expect(width).toBeLessThanOrEqual(390);

    const legend = chart.locator('[data-part="legend"] button');
    await expect(legend).toHaveAttribute('aria-pressed', 'true');
    await legend.click();
    await expect(legend).toHaveAttribute('aria-pressed', 'false');
  });

  test('mirrors safely in dark RTL mode', async ({ page }) => {
    await page.goto('/components/chart/');
    await page.locator('html').evaluate((root) => {
      root.dataset.theme = 'dark';
      root.dir = 'rtl';
    });

    const chart = page.locator('figure.simurgh-chart');
    await expect(chart).toBeVisible();
    await expect(chart.locator('[data-part="plot"]')).toHaveAttribute('aria-hidden', 'true');
    await expect(chart.locator('[data-part="description"]')).toContainText('five months');
  });
});
