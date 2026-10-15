# Redesign the personal site

Steve approved exploring a coherent whole-site redesign, warm and personal in tone, serving readers and fellow developers first. Begin with the homepage and a representative article for review before applying the direction throughout.

## 1. Agree the design

- Capture confirmed product truth in `PRODUCT.md` and resolve the visual-review workflow in `.impeccable/config.json` with Steve.
- Develop and present distinct visual concepts using the Impeccable replacement-world workflow. Record the chosen direction in `DESIGN.md`, `.impeccable/design.json` and route briefs before implementation.
- Scope the change to presentation; retain verified facts, published destinations, search, series navigation, RSS and service-worker fixes. Do not change dependencies without approval.

## 2. Build representative pages

Existing failure modes to check against the replacement: mobile article dates and contents following the full article; unconstrained prose width on wide screens; competing gradients, card stripes and hover effects; image dimensions missing in historical content. Preserve the repaired search dialog, series ordering, contrast and fresh-HTML client navigation, rather than reintroducing their earlier failures. Verification must check those outcomes, not just the new appearance.

- Apply the agreed shared tokens and typography in `src/layouts/BaseLayout.astro`, with shared navigation/footer changes in `src/components/SiteHeader.astro` and `src/components/SiteFooter.astro` as needed by the approved design.
- Rebuild `src/pages/index.astro` around introduction, selected projects with real images/statuses, and recent writing.
- Apply the article direction in `src/pages/blog/[slug].astro` and `src/components/TableOfContents.astro` where needed. Verify a long technical post, code blocks, dates, series links and a post without a series.
- Review representative rendered pages with Steve before rolling the direction across the site.

## 3. Extend the approved system

- Apply the shared design to About, Now, Principles, Work With Me, project index/detail, blog index, tags, archive, series, search, offline and 404 surfaces. Preserve the Work With Me navigation decision.
- Use small, verifiable commits. Keep intermediate review work on a task branch until ready for main; push task commits by default without deploying unfinished concepts.

## 4. Verify and finish

- Run `npm run build`, including existing tests; check generated routes, destinations and image artifacts.
- Inspect desktop/mobile rendering, contrast, focus, search and client navigation, article readability and reduced-motion behavior.
- Complete the Impeccable finish review and design documentation before calling the redesign complete. Retain explicit limitations where a suitable test environment is unavailable.
- Stop task processes, close temporary preview tabs and remove disposable files before handoff.

Current state: product audience and personality confirmed; visual-review workflow pending. No redesign implementation has begun.
