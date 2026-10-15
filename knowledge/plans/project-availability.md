# Reconcile project availability

Review one project at a time with Steve; update only confirmed facts.

- Rachel: Steve confirmed on 15 October 2026 that the iOS app is publicly released, live and has paying customers. Update `src/content/projects/rachel.md` and `src/pages/now.astro` to Released with the App Store link published on Rachel's own website. No sales counts or new feature claims. Verify the generated homepage, project page and Now page before committing/pushing.
- Chaotic Tanx: Steve confirmed it is paused pending substantial refactoring, after performance and playability issues showed it was less ready than expected. Update the project status/summary, replace the beta invitation and feature roadmap with that explanation, remove the unverified 60fps claim, align Now, and add a dated note to the historical shipping post. Verify generated summaries and detail pages, then commit/push.
- Code198x: Steve confirmed it is live and operational at `https://www.code198x.com`, with the wider 198x family under active development. Update `src/content/projects/code198x.md` and `src/pages/now.astro` with those facts. Verify generated Home, project listing/detail and Now pages, then commit/push.
- Phosphene: Steve confirmed it is his publishing brand for independent projects, with him publicly identifiable as the creator. Use simply Phosphene, not Phosphene Studios; do not present it as a company. Add the agreed explanation to About and Projects, including current App Store releases appearing under his own name. No destination has been confirmed, so add no external link. Build and inspect both generated pages before committing/pushing.
- Other project claims: confirm before changing.

Rachel verification: `npm run build` passed, including all 11 regression tests and 123 indexed pages. Generated Home, Now and Rachel detail pages show release availability; the Now On Hold section excludes Rachel and both release/detail paths contain the direct App Store destination.

Chaotic Tanx verification: production build passed, including all 11 regressions and 123 indexed pages. Generated Home, project listing/detail and Now state paused/refactoring; the project detail contains neither TestFlight invitation nor 60fps claim. The historical January post has a dated October update and retains its original account.

Code198x verification: production build passed, including all 11 regressions and 123 indexed pages. Generated Home, project listing/detail and Now retain the www.code198x.com destination. Project metadata is Live; generated detail and Now confirm operational availability and active development of the wider 198x family.

Phosphene verification: production build passed, including all 11 regressions and 123 indexed pages. Generated About and Projects pages contain the agreed brand/creator explanation and current App Store naming. Neither uses Phosphene Studios. An external destination remains to be confirmed. Existing gradient-heading findings remain in the design audit's scope; no styling changes or suppressions were made in this copy update.
