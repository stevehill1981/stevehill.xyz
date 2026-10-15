# Reconcile project availability

Review one project at a time with Steve; update only confirmed facts.

- Rachel: Steve confirmed on 15 October 2026 that the iOS app is publicly released, live and has paying customers. Update `src/content/projects/rachel.md` and `src/pages/now.astro` to Released with the App Store link published on Rachel's own website. No sales counts or new feature claims. Verify the generated homepage, project page and Now page before committing/pushing.
- Chaotic Tanx: ask for current status next; leave it in the existing On Hold section until confirmed. Replace its dangling “same” wording after removing Rachel.
- Code198x/Phosphene and other project claims: confirm before changing.

Rachel verification: `npm run build` passed, including all 11 regression tests and 123 indexed pages. Generated Home, Now and Rachel detail pages show release availability; the Now On Hold section excludes Rachel and both release/detail paths contain the direct App Store destination.
