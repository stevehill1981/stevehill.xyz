# Reconcile project availability

Review one project at a time with Steve; update only confirmed facts.

- Rachel: Steve confirmed on 15 October 2026 that the iOS app is publicly released, live and has paying customers. Update `src/content/projects/rachel.md` and `src/pages/now.astro` to Released with the App Store link published on Rachel's own website. No sales counts or new feature claims. Verify the generated homepage, project page and Now page before committing/pushing.
- Chaotic Tanx: Steve confirmed it is paused pending substantial refactoring, after performance and playability issues showed it was less ready than expected. Update the project status/summary, replace the beta invitation and feature roadmap with that explanation, remove the unverified 60fps claim, align Now, and add a dated note to the historical shipping post. Verify generated summaries and detail pages, then commit/push.
- Code198x/Phosphene and other project claims: confirm before changing.

Rachel verification: `npm run build` passed, including all 11 regression tests and 123 indexed pages. Generated Home, Now and Rachel detail pages show release availability; the Now On Hold section excludes Rachel and both release/detail paths contain the direct App Store destination.

Chaotic Tanx verification: production build passed, including all 11 regressions and 123 indexed pages. Generated Home, project listing/detail and Now state paused/refactoring; the project detail contains neither TestFlight invitation nor 60fps claim. The historical January post has a dated October update and retains its original account.
