# Improvements following the Tasteskill review

Implemented the four review priorities while keeping the approved Open Table
design. The additional page changes address specific navigation and layout
problems observed during the browser pass.

## Changes and evidence

- **Update notice:** its dynamic DOM now matches explicitly global component CSS.
  The browser regression checks the production handler, viewport placement at
  320px, reduced motion and dismissal. Update detection behaviour is unchanged.
- **Homepage:** project images sit beside their descriptions at 601–1000px. At
  768px, recent writing moves from y=2285 to y=1167; at 800px, from y=2349 to
  y=1193. The 800/801px difference is now about 12px. Desktop retains the original
  spread and phones retain stacked projects.
- **Projects:** Rachel, Code198x and Chaotic Tanx lead with real images, existing
  descriptions and Released/Live/Paused status. Direct App Store, site and source
  links accompany project detail links. The other nine published projects remain
  in the catalogue, with existing status metadata visible.
- **Project details:** availability and existing destinations are now beside the
  introduction, rather than leaving the reader to find a link in the body. Rachel
  uses the already confirmed App Store URL. No empty availability block is rendered
  for projects without that information.
- **Writing:** Start here recommends Boring Technology Wins, the rescue-work essay
  and The IC Choice using their existing excerpts. The full chronological index,
  all 33 essays, RSS, series, topics and archive remain available. A Latest writing
  shortcut lets returning readers skip the recommendations. The introductory text
  reuses wording already on About; new short subject labels are editorial drafts
  for Steve to adjust.
- **About:** the sidebar says Selected projects and uses the same selection and
  statuses as Home and Projects. The old “Recent Projects” sorted on `data.order`,
  which is absent from the content schema, and therefore did not establish recency.
- **Series and Topics:** page names and return links now match the site navigation.
  On phones, series part numbers move above their article, recovering the 88px
  previously reserved for a number column and gap. Topic labels show spaces while
  retaining their original slugs. Article breadcrumbs and return links use Writing.
- **Shared metadata:** removed the unsupported default claim of teaching assembly
  since 2006, and the assembly-only site summary. The replacement covers software,
  apps, games and programming through classic computers.

Principles, Now and Work With Me were inspected at desktop and mobile widths.
Their existing layouts were readable, so they received no speculative redesign.
Work With Me remains available from About, outside the primary navigation.

## Screenshots

- [Tablet homepage](2026-10-16-improvements/after-home-800.jpg)
- [Projects opening](2026-10-16-improvements/after-projects-1440-top.jpg)
- [Writing opening](2026-10-16-improvements/after-blog-1440-top.jpg)
- [Rachel on a phone](2026-10-16-improvements/after-projects-rachel-390-top.jpg)
- [Series before](2026-10-16-improvements/before-series-390.jpg) and
  [after](2026-10-16-improvements/after-series-390-top.jpg)
- [About sidebar](2026-10-16-improvements/after-about-1440.jpg)

Full screenshots and measurements are in
[the evidence directory](2026-10-16-improvements/). Project images are the existing
verified captures; no stock, generated or substitute imagery was introduced.

## Verification

- `npm run build`: passed; 18 unit tests, 123 generated pages and 123 indexed pages.
- Local Chrome regression suite: 16 passed, including search failure recovery,
  keyboard focus, client navigation, code copying, forced colours, reduced motion,
  320px reflow, notice rendering, tablet resizing and project/writing journeys.
  [Test results](2026-10-16-improvements/browser-tests.json).
- [Content checks](2026-10-16-improvements/content-checks.json): all 12 published
  project pages linked, all 33 published essays retained in the index, and no
  missing local anchor destinations across the 123 built pages. This verifies
  page/file targets, not every fragment ID or external server response.
- [Final browser measurements](2026-10-16-improvements/after.json): all sampled
  pages returned 200 with no horizontal document overflow or broken images. Home
  was measured at 320, 390, 768, 800, 801, 1000, 1001 and 1440px; other inspected
  pages at 390px and 1440px.
- The update-notice test demonstrated the old defect before the repair:
  `Expected: <= 800` / `Received: 2351.890625`.
- The tablet regression demonstrated the old discontinuity before the repair:
  `Expected: < 200` / `Received: 1399.375`.

The local browser suite uses installed Chrome because the browser versions required
by the current Playwright package are not cached locally. The repository's normal
CI suite remains configured for Chromium, Firefox and WebKit. No dependencies or
CI checks were disabled or changed.

## Tasteskill follow-up

The final homepage inspector still reports:

> RESULT: 3 FAIL, 4 WARN — not done.

These are the same house preferences documented in the review: dividers, fewer
than four pictures, low motion, cream, mixed-family welcome, font-size count and no
video. They are intentionally retained under the approved brief. No allowances or
suppressions were added. The inspected renders contain the actual repaired tablet
composition and styled notice. Raw
[inspector results](2026-10-16-improvements/tasteskill-home/report.json) and
[source lint](2026-10-16-improvements/lint.json) are preserved.

The signature idea, photographs and interaction quotas were not adopted: this is
an improvement to the approved personal reading site, not a new art direction.
The inspector's capped design score remains unsuitable as the release criterion.
