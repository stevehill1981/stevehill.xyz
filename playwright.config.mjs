import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './browser-tests',
  forbidOnly: true,
  retries: 0,
  workers: 2,
  timeout: 30_000,
  globalTimeout: 5 * 60_000,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4329',
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: ['chromium', 'firefox', 'webkit'].map(browserName => ({
    name: browserName,
    use: { browserName },
  })),
  webServer: {
    // Astro auto-backgrounds under coding agents; Playwright must own the
    // foreground process so it can stop it after the run.
    command: 'npm run preview -- --host 127.0.0.1 --port 4329 --ignore-lock',
    url: 'http://127.0.0.1:4329',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
