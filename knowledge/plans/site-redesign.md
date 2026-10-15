# Redesign the personal site

Steve approved exploring a coherent whole-site redesign, warm and personal in tone, serving readers and fellow developers first. Begin with the homepage and a representative article for review before applying the direction throughout.

## 1. Agree the design

- Capture confirmed product truth in `PRODUCT.md` and resolve the visual-review workflow in `.impeccable/config.json` with Steve.
- Develop and present distinct visual concepts using the Impeccable replacement-world workflow. Record the chosen direction in route briefs before implementation, then document the built system in `DESIGN.md` and `.impeccable/design.json` at finish.
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

Current state: product audience, personality and Open Table direction confirmed. Browser sketches were used for the direction review; no standing workflow default was inferred. Steve approved the Code198x copy correction and durable rule, now recorded in `RULES.md`. No production redesign implementation has begun.

Reading preview: `.impeccable/mocks/decision/article.html` uses the existing full Guardrails article, with visible original date, a constrained reading measure, desktop contents rail and expandable mobile contents above the prose. Desktop and 390px rendering were inspected; mobile width and scroll width both measured 390px and the contents expanded to expose all four real heading destinations. This is a representative design preview awaiting Steve's review, not the production article template. Review server: `http://127.0.0.1:57835/`, process session `47601`, serving `.impeccable/mocks/decision/`. Retained for review; stop after the article direction is approved or cancelled. The previous direction chooser server was stopped after the conversational approval. Palette warnings are narrowly ignored for the approved Open Table preview and its reading adaptation; existing production gradient headings remain unchanged until implementation.

Preview verification: the entire original rendered article body is preserved verbatim, all contents links resolve to real headings, and the date precedes the prose. The article punctuation advisory is narrowly ignored because it concerns unchanged authored content. No published prose was rewritten to satisfy a detector. The direction contract is recorded in `.impeccable/surfaces/src-pages-index-astro.md` for the later production implementation; `DESIGN.md` remains a finish deliverable.

Approved `RULES.md` addition:

> Describe Code198x broadly; it includes programming foundations, languages beyond assembly, game craft and computing history. Never reduce it to an assembly-only course. This is a content rule, not a restriction on articles about assembly.
