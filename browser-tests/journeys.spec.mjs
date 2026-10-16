import { test, expect } from '@playwright/test';

const article = '/blog/2025-11-13-building-shiki-highlight-api/';

test('update notice is styled in the viewport and can be dismissed with reduced motion', async ({ page }) => {
  // Simulate activation, then exercise the production handler and its real CSS.
  // This isolates notice rendering from service-worker installation timing.
  await page.addInitScript(() => {
    const registration = new EventTarget();
    const worker = new EventTarget();
    registration.installing = worker;
    registration.update = async () => {};
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { controller: {}, register: async () => registration },
    });
    window.activateUpdate = () => {
      registration.dispatchEvent(new Event('updatefound'));
      worker.state = 'activated';
      worker.dispatchEvent(new Event('statechange'));
    };
  });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForLoadState('load');
  await page.evaluate(() => window.activateUpdate());
  const notice = page.getByRole('status').filter({ hasText: 'Site updated' });
  await expect(notice).toBeVisible();
  const box = await notice.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
  expect(box.y + box.height).toBeLessThanOrEqual(800);
  expect(await notice.evaluate(element => getComputedStyle(element).position)).toBe('fixed');
  expect(await notice.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await expect(notice.getByRole('button', { name: 'Refresh' })).toBeVisible();
  await notice.getByRole('button', { name: 'Dismiss' }).click();
  await expect(notice).toHaveCount(0);
});

test('a first visit installs the service worker without announcing an update', async ({ page }) => {
  // On a first install, clients.claim() sets the controller before the worker
  // reports "activated", so the controller must be read before registering.
  await page.addInitScript(() => {
    const registration = new EventTarget();
    const worker = new EventTarget();
    registration.installing = worker;
    registration.update = async () => {};
    const serviceWorker = { controller: null };
    serviceWorker.register = async () => {
      window.activateFirstInstall = () => {
        registration.dispatchEvent(new Event('updatefound'));
        serviceWorker.controller = {};
        worker.state = 'activated';
        worker.dispatchEvent(new Event('statechange'));
      };
      return registration;
    };
    Object.defineProperty(navigator, 'serviceWorker', { value: serviceWorker });
  });
  await page.goto('/');
  await page.waitForFunction(() => typeof window.activateFirstInstall === 'function');
  await page.evaluate(() => window.activateFirstInstall());
  await expect(page.locator('.sw-update-toast')).toHaveCount(0);
  await expect(page.getByRole('status').filter({ hasText: 'Site updated' })).toHaveCount(0);
});

test('every listed date uses the same day-month-year style', async ({ page }) => {
  const pages = ['/', '/blog/', article, '/tags/architecture/', '/series/', '/now/'];
  const month = '(January|February|March|April|May|June|July|August|September|October|November|December)';
  for (const path of pages) {
    await page.goto(path);
    const dates = await page.locator('time, .series-post-date, .last-updated').allTextContents();
    expect(dates.length, `${path} lists dates`).toBeGreaterThan(0);
    for (const date of dates) {
      expect(date.trim().replace(/^Last updated:\s*/, ''), `${path} date`).toMatch(new RegExp(`^\\d{1,2} ${month} \\d{4}$`));
    }
  }
});

test('Code Like It’s 198x keeps one name across the site', async ({ page }) => {
  const name = /^Code Like It[’']s 198x$/;
  for (const path of ['/', '/now/', '/projects/code198x/']) {
    await page.goto(path);
    const labels = await page.locator('a[href^="https://www.code198x.com"]').allTextContents();
    expect(labels.length, `${path} links to Code198x`).toBeGreaterThan(0);
    for (const label of labels.filter(text => !/code198x\.com/.test(text))) expect(label.replace(/\s*→$/, '').replace(/^Visit\s+/, '').trim(), path).toMatch(name);
  }
  await expect(page.locator('body')).not.toContainText(/\bCode198x\b/);
});

test('interface labels use sentence case and the share row follows the prose', async ({ page }) => {
  await page.goto(article);
  await expect(page.getByRole('button', { name: 'Copy link' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related posts', exact: true })).toBeVisible();
  const label = page.locator('.share-label');
  await expect(label).toHaveText('Share');
  expect(await label.evaluate(element => getComputedStyle(element).textTransform)).toBe('none');
  const prose = await page.locator('.content').first().boundingBox();
  const share = await page.locator('.share-buttons').boundingBox();
  expect(Math.abs(share.x + share.width - (prose.x + prose.width))).toBeLessThanOrEqual(2);
  await page.goto('/projects/rachel/');
  await expect(page.getByRole('heading', { name: 'Project info', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: '← Back to projects' })).toBeVisible();
  for (const [path, name] of [['/about/', 'About me'], ['/work-with-me/', 'Work with me'], ['/principles/', 'My principles']]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
  }
});

async function openSearch(page) {
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toHaveCount(1);
  return dialog;
}

test('a one-pixel tablet resize does not bury recent writing', async ({ page }) => {
  const positions = [];
  for (const width of [801, 800]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const heading = page.getByRole('heading', { name: 'Recent writing', exact: true });
    const box = await heading.boundingBox();
    positions.push(box.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
  expect(Math.abs(positions[1] - positions[0])).toBeLessThan(200);
});

test('selected projects retain their status and destinations across pages', async ({ page }) => {
  await page.goto('/');
  const homeLinks = await page.locator('.selected-projects h3 a').evaluateAll(links => links.map(link => link.getAttribute('href')));
  expect(homeLinks.length).toBeGreaterThan(0);
  const homeStatuses = await page.locator('.selected-projects .project-status').allTextContents();
  await page.goto('/projects');
  expect(await page.locator('.featured-project h3 a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(homeLinks);
  expect(await page.locator('.featured-project .project-status').allTextContents()).toEqual(homeStatuses);
  const destinations = await page.locator('.featured-project').evaluateAll(projects => projects.map(project => ({
    detail: project.querySelector('h3 a').getAttribute('href'),
    destination: project.querySelector('.project-actions a').getAttribute('href'),
  })));
  for (const project of destinations) {
    await page.goto(project.detail);
    await expect(page.locator('.project-availability a')).toHaveAttribute('href', project.destination);
  }
  await page.goto('/about');
  expect(await page.locator('.sidebar-project-title a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(homeLinks);
  expect(await page.locator('.sidebar-project-card .project-status').allTextContents()).toEqual(homeStatuses);
});

test('writing recommendations reach real essays and keep the full index accessible', async ({ page }) => {
  await page.goto('/blog');
  const recommendations = await page.locator('.starting-points h3 a').evaluateAll(links => links.map(link => ({
    title: link.textContent, href: link.getAttribute('href'),
  })));
  expect(recommendations.length).toBeGreaterThan(0);
  for (const recommendation of recommendations) {
    await expect(page.locator(`.card-title a[href="${recommendation.href}"]`)).toHaveText(recommendation.title);
  }
  await page.getByRole('link', { name: 'Latest writing ↓' }).click();
  await expect(page.getByRole('heading', { name: 'Latest writing', exact: true })).toBeInViewport();
  for (const recommendation of recommendations) {
    await page.goto(recommendation.href);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(recommendation.title);
  }
});

test('search has real results, contains keyboard focus and restores its trigger', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Search', exact: true });
  const dialog = await openSearch(page);
  // Role locators are DOM queries, not the browser's accessibility tree.
  // Exercise inert's actual focus exclusion instead of inferring it from roles.
  const backgroundLink = page.getByRole('link', { name: 'Home', exact: true });
  await backgroundLink.focus();
  await expect(backgroundLink).not.toBeFocused();
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
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  await page.goto('/');
  await page.clock.pauseAt(new Date('2026-01-01T00:01:00Z'));
  const about = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true });
  await about.focus();
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toHaveCount(1);
  await page.keyboard.press('Escape');
  // Closing before deferred focus runs must keep focus outside the dialog.
  await page.clock.runFor(1000);
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
