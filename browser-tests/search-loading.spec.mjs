import { test, expect } from '@playwright/test';

// Route-based fault injection must reach the network stack. Keep workers enabled
// in journeys.spec.mjs; Playwright cannot intercept worker-controlled requests.
test.use({ serviceWorkers: 'block' });

for (const asset of ['pagefind.js', 'pagefind-ui.js']) {
  test(`failed ${asset} offers recovery and reload restores real search`, async ({ page }, testInfo) => {
    const mobile = asset === 'pagefind-ui.js';
    if (mobile) await page.setViewportSize({ width: 390, height: 844 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let blocked = 0;
    const pattern = `**/pagefind/${asset}`;
    await page.route(pattern, route => { blocked++; return route.abort('failed'); });
    await page.goto('/');
    if (mobile) await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    if (mobile) await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    const trigger = page.getByRole('button', { name: 'Search', exact: true });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
    await expect.poll(() => blocked).toBeGreaterThan(0);
    // The old UI accepts a query before its later runtime import fails.
    const input = dialog.getByRole('textbox');
    if (await input.count()) await input.fill('Rachel');
    await expect(dialog.getByRole('alert')).toContainText('Search couldn’t load');
    await expect(page.locator('#search-overlay')).toHaveCSS('opacity', '1');
    await page.screenshot({ path: testInfo.outputPath('error-state.png') });
    await expect(input).toHaveCount(0);
    await expect(dialog.getByRole('link', { name: 'Browse writing' })).toHaveAttribute('href', '/blog');
    await dialog.getByRole('button', { name: 'Close search' }).press('Escape');
    await expect(trigger).toBeFocused();
    await expect(page.locator('[inert]')).toHaveCount(0);
    await trigger.click();
    await expect(dialog.getByRole('button', { name: 'Reload page' })).toBeVisible();
    await page.unroute(pattern);
    await Promise.all([
      page.waitForEvent('load'),
      dialog.getByRole('button', { name: 'Reload page' }).click(),
    ]);
    if (mobile) await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await trigger.click();
    await dialog.getByRole('textbox').fill('Rachel');
    await expect(dialog.locator('.pagefind-ui__result-link').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('a stalled runtime request times out to a closable recovery state', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  let pending;
  await page.route('**/pagefind/pagefind.js', route => { pending = route; });
  await page.goto('/');
  await page.clock.pauseAt(new Date('2026-01-01T00:01:00Z'));
  const trigger = page.getByRole('button', { name: 'Search', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.clock.runFor(200);
  await expect.poll(() => Boolean(pending)).toBe(true);
  await page.clock.runFor(15_000);
  const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
  await expect(dialog.getByRole('alert')).toContainText('Search couldn’t load');
  await dialog.getByRole('button', { name: 'Close search' }).press('Escape');
  await expect(trigger).toBeFocused();
  await pending.abort();
});

test('a load failing after close cannot steal focus or poison client navigation', async ({ page }) => {
  let pending;
  await page.route('**/pagefind/pagefind.js', route => {
    if (pending) return route.abort('failed');
    pending = route;
  });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Search', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
  await expect.poll(() => Boolean(pending)).toBe(true);
  await dialog.getByRole('button', { name: 'Close search' }).press('Escape');
  await pending.abort();
  await expect(trigger).toBeFocused();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible();
  await trigger.click();
  await expect(dialog.getByRole('alert')).toContainText('Search couldn’t load');
  await dialog.getByRole('link', { name: 'Browse writing' }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.locator('[inert]')).toHaveCount(0);
});
