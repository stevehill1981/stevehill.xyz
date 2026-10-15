# Quiet About sidebar accents

Steve approved addressing the flagged side-border accent in the design review.

- In `src/pages/about.astro`, replace the recent-post cards' decorative 4px gradient borders and per-card hover glows with the existing uniform border token and a shared hover/focus-within border treatment. Preserve copy, links, spacing, layout and the rest of the site's design.
- Run the production build and inspect the generated CSS. Inspect desktop/mobile rendering when browser access is available; record any access limitation. Run the Impeccable detector once on the changed file; retain unrelated gradient-heading findings for the broader design review without suppression.
- Commit and push the focused change; stop the task server and remove temporary logs.

Verification: production build passed with 11 tests and 123 indexed pages. Browser inspection of the built site at desktop and 390px confirmed uniform 1px borders and no border image on all three post cards; mobile document width was 390px with no horizontal overflow. Tab/Shift+Tab moved between post links and activated focus-within. The detector reports only the pre-existing gradient-text heading warning; side-tab is resolved, no suppressions added. The existing dev preview showed old styling, so verification used an isolated production server instead.
