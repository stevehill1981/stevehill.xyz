# Keep search accessible while the background is inert

Root cause: SearchModal is rendered inside SiteHeader. Opening search sets the header inert, which also disables its descendant dialog. Confirmed on the live site: the open dialog disappears from the accessibility tree.

1. Extract the existing button and its styles into `src/components/SearchTrigger.astro`; use it in `src/components/SiteHeader.astro`.
2. Render `src/components/SearchModal.astro` directly in `src/layouts/BaseLayout.astro`, outside the header. Preserve the existing dialog behavior and appearance.
3. Initialize search once per Astro page load and remove document keyboard handlers before a page swap. Verification exposed duplicate Pagefind controls from the old double initialization.
4. Run `npm run build` and inspect the built DOM. In the production preview, verify that search remains accessible with the background inert, accepts a query, traps keyboard focus, closes and restores focus, and works after page navigation. Check desktop and mobile.
5. Commit and push the bounded fix after verification.

## Verification

- `npm run build` passed: 123 generated pages and 123 Pagefind-indexed pages. Existing Markdown configuration deprecation remains.
- Chrome production preview: open dialog appears in the accessibility tree; header/main/footer are inert while dialog has no inert ancestor.
- One input on first load and after About navigation. Query `microservices` returns 28 results.
- Shift+Tab from close wraps to the last result control; Tab wraps back to close. Escape restores focus to Search and clears background inert attributes.
- At 390 × 844, search opens from the mobile menu, remains accessible, fits within the viewport (351px dialog), and closes with no inert elements left.
- Impeccable detector reported existing typography and decorative styling warnings outside this bug's scope.
- Initial preview origin retained stale assets after rebuilds; final verification used a fresh preview origin. Preview servers and browser tab were closed afterward.
