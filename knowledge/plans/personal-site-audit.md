# Personal-site audit for #79

Audit the shipped site at commit 863f18f before proposing a redesign under #78. Preserve the decision in `knowledge/log.md` to keep work-with-me out of the top navigation. This task records findings; it does not redesign pages or change factual claims.

1. Inspect existing implementation and live pages for three journeys: engineering/contact, Code198x/games, technical writing. Sources: `src/pages/`, `src/components/`, `src/layouts/BaseLayout.astro`, and `src/content/projects/`.
2. Exercise desktop and mobile layouts, keyboard/search/menu behavior and accessibility-tree semantics in Chrome. Record viewport, actions, source locations and explicit gaps for screen-reader speech, touch and other engines.
3. Collect repeated HTTP baselines and inspect metadata, generated routes, image sizes and network dependencies. Attempt available public lab measurements; do not present HTTP timings as Core Web Vitals.
4. Run Impeccable's detector once and verify relevant findings in context. Produce `knowledge/audits/2026-10-15-personal-site.md` with evidence, limitations, owners, three prioritized improvements and a proposed redesign direction.
5. Verify report links and claims, commit and push the audit. The prior search fix is the first shipped bounded improvement; remaining issue acceptance coverage stays explicit. Do not close #79 while required coverage is missing.
