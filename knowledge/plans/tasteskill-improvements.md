# Apply the Tasteskill review

Steve approved implementing the review recommendations on 16 October 2026 and
asked for related improvements to the other pages. Keep Open Table's palette,
type, quiet rules, restrained motion and homepage section order. Preserve URLs,
published claims, search, RSS, series and offline behaviour. No new dependencies.

## 1. Update-notice repair

- `src/layouts/BaseLayout.astro`: fix the confirmed scope mismatch between the
  dynamically created notice and its stylesheet. Leave update detection alone.
- `browser-tests/journeys.spec.mjs`: exercise the existing notice through a
  simulated service-worker activation, checking viewport placement, dismissal
  and reduced motion. Demonstrate failure against the existing build first.
- Verify production build and the relevant browser test; commit the repair.

## 2. Homepage tablet proportions

- `src/pages/index.astro`: at intermediate widths, stack compact image/text rows
  rather than full-width 3:2 images. Preserve contain sizing and narrow-phone
  presentation. Keep desktop's three-project spread.
- Check screenshots at 320, 390, 768, 800, 801, 1000 and 1440px. Compare the
  writing section's position across the breakpoint and verify no overflow.
- Build and run relevant browser journeys; commit the responsive improvement.

## 3. Project and writing discovery

- `src/pages/projects/index.astro`: lead with the real selected project images,
  statuses and verified destinations; retain all other entries in the catalogue.
- `src/pages/blog/index.astro`: align the heading with Writing and add a compact
  selection of existing essays before the complete chronological index. Use real
  excerpts and existing metadata rather than inventing claims or testimonials.
- `src/pages/about.astro`: replace the misleading recent-project selection
  (sorting on an absent `order` field) with the established selected projects.
- `src/pages/projects/[slug].astro`: make existing availability and destinations
  visible near the project introduction, including the confirmed Rachel App Store
  link. Preserve each project's existing destination and content.
- Check Archive, Series, Topics, Principles, Now and Work With Me in the browser;
  apply only demonstrated readability/navigation repairs consistent with this
  scope. Keep professional contact under About rather than adding a top-nav item.
- Update `DESIGN.md` and record verification/screenshots under
  `knowledge/audits/2026-10-16-improvements/`. Build, run regression journeys and
  verify content, project coverage, destinations and article links in the built
  output. Commit and push completed changes; verify CI and the live result.

## Finish

Keep changes in small verified commits. Remove temporary scripts/configs and stop
task-owned preview processes. Report any unverified browser/platform limits.
