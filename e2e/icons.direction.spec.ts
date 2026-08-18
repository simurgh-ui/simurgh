import { expect, test } from '@playwright/test';
import { renderIconSvg } from '../packages/icons/src/icons.generated.js';

test('directional icons infer RTL while explicit and physical directions win', async ({
  page,
}) => {
  const automatic = renderIconSvg('arrow-right', { class: 'automatic' });
  const explicitLtr = renderIconSvg('arrow-right', {
    class: 'explicit-ltr',
    direction: 'ltr',
  });
  const explicitRtl = renderIconSvg('arrow-right', {
    class: 'explicit-rtl',
    direction: 'rtl',
  });
  const physical = renderIconSvg('arrow-right', {
    class: 'physical',
    mirrorInRtl: false,
  });
  const neutral = renderIconSvg('home', { class: 'neutral' });
  await page.setContent(
    `<main dir="rtl">${automatic}${explicitLtr}${physical}${neutral}</main><main dir="ltr">${explicitRtl}</main>`,
  );

  const horizontalScale = (selector: string) =>
    page
      .locator(`${selector} > .simurgh-icon-directional`)
      .evaluate((node) => Math.sign((node as SVGGElement).getCTM()?.a ?? 0));

  await expect.poll(() => horizontalScale('.automatic')).toBe(-1);
  await expect.poll(() => horizontalScale('.explicit-ltr')).toBe(1);
  await expect.poll(() => horizontalScale('.explicit-rtl')).toBe(-1);
  await expect.poll(() => horizontalScale('.physical')).toBe(1);
  await expect.poll(() => horizontalScale('.neutral')).toBe(1);

  await page
    .locator('main')
    .first()
    .evaluate((node) => node.setAttribute('dir', 'ltr'));
  await expect.poll(() => horizontalScale('.automatic')).toBe(1);
});
