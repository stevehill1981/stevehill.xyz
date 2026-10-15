import { test, expect } from '@playwright/test';

const article = '/blog/2025-11-13-building-shiki-highlight-api/';

async function openSearch(page) {
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toHaveCount(1);
  return dialog;
}

test('search has real results, contains keyboard focus and restores its trigger', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Search', exact: true });
  const dialog = await openSearch(page);
  // Role locators are DOM queries, not the browser's accessibility tree.
  // Exercise inert's actual focus exclusion instead of inferring it from roles.
  await page.getByRole('link', { name: 'Home', exact: true }).focus();
  await expect(dialog.locator(':focus')).toHaveCount(1);
  expect(await dialog.evaluate(element => element.closest('[inert]'))).toBeNull();
  await dialog.getByRole('textbox').fill('microservices');
  await expect(dialog.locator('.pagefind-ui__result-link').first()).toBeVisible();
  const close = dialog.getByRole('button', { name: 'Close search' });
  await close.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.locator(':focus')).toHaveCount(1);
  await expect(close).not.toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('[inert]')).toHaveCount(0);
});

test('client navigation retains styling and search works repeatedly', async ({ page }) => {
  await page.goto('/');
  const before = await page.evaluate(() => ({
    origin: performance.timeOrigin,
    font: getComputedStyle(document.body).fontFamily,
    background: getComputedStyle(document.body).backgroundColor,
  }));
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect.poll(() => page.evaluate(() => ({
    origin: performance.timeOrigin,
    font: getComputedStyle(document.body).fontFamily,
    background: getComputedStyle(document.body).backgroundColor,
  }))).toEqual(before);
  for (const query of ['Rachel', 'Code198x']) {
    const dialog = await openSearch(page);
    await dialog.getByRole('textbox').fill(query);
    await expect(dialog.locator('.pagefind-ui__result-link').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  }
});

test('mobile navigation closes with Escape and resets after following a link', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.screenshot({ path: testInfo.outputPath('mobile-menu.png') });
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'page');
  const dialog = await openSearch(page);
  await dialog.getByRole('textbox').click();
  await dialog.getByRole('textbox').fill('Rachel');
  await expect(dialog.locator('.pagefind-ui__result-link').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('code controls survive client navigation and copy the actual code once', async ({ page, context }) => {
  // Capture the real clipboard write payload without touching the user's clipboard.
  // Native clipboard permission/OS integration remains a separate manual check.
  await context.addInitScript(() => {
    window.copiedCode = [];
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: async text => { window.copiedCode.push(text); } },
    });
  });
  await page.goto('/');
  const dialog = await openSearch(page);
  await dialog.getByRole('textbox').fill('Building Shiki Highlight API');
  await dialog.locator(`.pagefind-ui__result-link[href$="${article}"]`).click();
  await expect(page).toHaveURL(new RegExp(`${article}$`));
  const blocks = page.locator('pre.shiki, pre.astro-code');
  const count = await blocks.count();
  expect(count).toBeGreaterThan(0);
  await expect(page.locator('.code-copy-button')).toHaveCount(count);
  await expect(page.locator('.code-toolbar')).toHaveCount(count);
  const expectedCode = await blocks.first().locator('code').textContent();
  const copy = page.locator('.code-copy-button').first();
  await copy.click();
  await expect(copy).toHaveText('Copied!');
  expect(await page.evaluate(() => window.copiedCode)).toEqual([expectedCode]);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  const again = await openSearch(page);
  await again.getByRole('textbox').fill('Building Shiki Highlight API');
  await again.locator(`.pagefind-ui__result-link[href$="${article}"]`).click();
  await expect(page.locator('.code-copy-button')).toHaveCount(count);
  await expect(page.locator('.code-toolbar')).toHaveCount(count);
});

test('reduced motion preserves navigation, search and instant back-to-top', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(article);
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.locator('footer').scrollIntoViewIfNeeded();
  const top = page.getByRole('button', { name: 'Back to top' });
  await expect(top).toBeVisible();
  await top.click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const dialog = await openSearch(page);
  expect(await page.locator('#search-overlay').evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('home and article reflow at 320px with usable navigation and search', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ['/', article]) {
    await page.goto(route);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    const dialog = await openSearch(page);
    await dialog.getByRole('textbox').fill('Rachel');
    await expect(dialog.locator('.pagefind-ui__result-link').first()).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
    await page.keyboard.press('Escape');
  }
});

test('keyboard shortcut returns focus to the previously active link', async ({ page }) => {
  await page.goto('/');
  const about = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true });
  await about.focus();
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(about).toBeFocused();
});

test('forced colours retain visible focus and an operable search dialog', async ({ page }, testInfo) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/');
  expect(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)).toBe(true);
  await page.keyboard.press('Tab');
  // WebKit on macOS follows Safari's default form-controls-only Tab policy.
  // Explicit focus after keyboard input tests the focus paint in this mode;
  // it does not establish native Safari's full keyboard navigation setting.
  await page.getByRole('link', { name: 'Skip to main content' }).focus();
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  const focus = await page.locator(':focus').evaluate(element => {
    const style = getComputedStyle(element);
    return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
  });
  expect(focus.width).toBeGreaterThan(0);
  expect(focus.style).not.toBe('none');
  const dialog = await openSearch(page);
  await dialog.getByRole('textbox').fill('Rachel');
  await expect(dialog.locator('.pagefind-ui__result-link').first()).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('forced-colours.png') });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});
