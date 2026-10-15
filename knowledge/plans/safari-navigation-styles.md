# Preserve current styles during client navigation

Investigate the Safari audit observation: Home → About showed unstyled content; a reload restored styling. Do not infer a browser-specific cause from one observation.

1. Inspect `public/sw.js`, Astro ClientRouter's actual fetch requests, and generated HTML/asset references. Reproduce the relevant cache/request sequence in isolation, including normal navigation versus client fetches, current responses, offline fallback and failed responses.
2. Explain the demonstrated cause before editing. Limit the fix to the responsible request/cache behavior; preserve offline support and unrelated browser preferences.
3. Add a dependency-free regression test if it can enforce network freshness and fallback invariants, showing failure against the old worker. Build and test the result and inspect real navigation when available.
4. Update the audit evidence, commit and push the bounded fix. Stop owned preview processes and remove disposable files.

## Cause and verification

Astro 7.3.8 ClientRouter's `fetchHTML` does not add `Accept: text/html`. The worker used that header as its sole page classifier. A router fetch therefore took the asset cache-first branch and could return HTML from a previous release, referencing removed hashed CSS. A normal document reload took the network-first branch and recovered. This is not inherently Safari-specific.

- Added 11 dependency-free Node regression tests. Before the fix: 7 failed; the fresh-page assertion returned `removed.css` instead of `current.css`. After: all 11 pass, covering normal/client agreement, slash and HTML routes, offline fallback, failed-response cache preservation, asset caching and existing exclusions.
- In a fresh local Chrome origin, an authored diagnostic page seeded old `/about/` HTML in the actual service-worker cache. Old worker: `FAIL: client navigation returned old HTML referencing a removed stylesheet`. Patched worker: `PASS: client navigation returned current HTML and 2 stylesheet responses are CSS with status 200`.
- Real Home → About navigation with the patched worker retained the dark background and 20px social icon. This verifies the causal cache/request sequence; it does not establish all Safari keyboard behavior.
- Regression tests run through `npm test` and precede every `npm run build`, including CI's existing build action. No new dependencies.
- Temporary diagnostic page/browser tab and HTTP server were removed/stopped. Existing ignored build output is retained.
