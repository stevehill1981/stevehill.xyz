# Clear dependency security alerts

Baseline: GitHub has 29 open Dependabot alerts. npm audit reports 17 vulnerable packages (1 critical, 14 high, 1 moderate, 1 low); counts differ because GitHub tracks advisories/locations, while npm groups packages and includes newer advisories.

1. Inspect `package.json`, `package-lock.json`, `astro.config.mjs`, and `.github/workflows/deploy.yml`; confirm the dependency paths and current stable patches.
2. Capture current generated routes, article text, code examples, image attributes, RSS and sitemap as a before/after reference. Apply compatible security patches in `package-lock.json`; verify `npm audit` and `npm run build`.
3. Subject to approval: update Astro and Sharp in `package.json`, add `@astrojs/markdown-remark`, and preserve the existing remark/rehype processor and whitespace handling in `astro.config.mjs`. Remove unused `gh-pages` and the manual deploy script; update deployment instructions in `README.md` and stack details in `knowledge/site.md`.
4. Verify a clean install, full audit and production build. Compare generated routes/content, code highlighting, lazy images, feed and sitemap against baseline; smoke-test browser navigation and search. Do not dismiss alerts or suppress audit findings.
5. Commit and push verified changes; inspect CI and GitHub alert reconciliation. Stop task-owned preview processes and remove disposable files.

## Outcome and verification

Approved: Astro 7.3.8, Sharp 0.35.5, explicit `@astrojs/markdown-remark`, and removal of unused `gh-pages` plus its manual deploy command. Astro's migration guide documents the explicit unified processor and `compressHTML: true` to preserve Astro 6 whitespace handling: https://docs.astro.build/en/guides/upgrade-to/v7/.

- Compatible fixes first reduced npm findings from 17 packages to 8; the approved upgrades/removal cleared the remainder. No forced audit fixes or overrides.
- `npm ci` succeeded from the committed lockfile contents; `npm audit` reports 0 vulnerabilities across all severities.
- Production build succeeded with 123 routes and 123 Pagefind-indexed pages; the old Markdown configuration deprecation is gone.
- Compared all 123 routes, main text, code examples, image attributes and highlight element counts, plus RSS and sitemap. Eight initial text differences were generated CSS Highlight identifiers; normalizing only their build-order-dependent numeric IDs gave zero differences. Code text and image attributes needed no normalization.
- Chrome production preview: search returns 28 results for `microservices`, has one input and no inert ancestor; navigation to About and reopening search still gives one input. The assembly tutorial contains 10 code blocks with 10 highlight styles and four lazy/async images. No browser console errors were reported.
- Temporary preview and comparison files are disposable; build output stays in the existing ignored `dist/` directory.
