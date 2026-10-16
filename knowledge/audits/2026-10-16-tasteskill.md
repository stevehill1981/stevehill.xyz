# Tasteskill review, 16 October 2026

The approved Open Table direction is worth keeping. The homepage has a strong
welcome, real work and clear availability labels. The article layout is comfortable
on desktop and mobile. The best next changes are a small rendering repair, better
tablet proportions and stronger project discovery. A visual redesign is not justified
by this review.

This is Codex applying Tasteskill v2, not an independent reviewer or user study.
No application code or copy was changed. Recommendations remain proposals.

## Scope and evidence

Reviewed the live site at https://stevehill.xyz against RULES.md, PRODUCT.md,
DESIGN.md, the knowledge log and the approved Open Table brief. No decisions
directory exists. Local source at review start: `3de7868`.

Tasteskill inspected the homepage at 1440×900, 768×1024 and 390×844. Additional
Chrome screenshots cover Home, Projects, Writing, About and
`/blog/2026-06-12-guardrails` at 1440px and 390px, plus the homepage at 320px.
Follow-up measurements cover the 800/801px breakpoint. Screenshots and JSON are in
[the evidence directory](2026-10-16-tasteskill/).

All sampled page requests returned HTTP 200. The initial screenshot pass found no
document-level horizontal overflow at those sampled sizes, and no broken images on
Home, Projects, Writing or About. Desktop search returned results for `boring`;
the mobile menu opened and Escape closed it. These are limited observations, not
a full accessibility, performance, offline or cross-browser audit.

## Ranked findings

### 1. Repair the unstyled update notification

**Observed defect; fix before visual improvements.** A fresh browser session
naturally produced “Site updated”, “Refresh” and a dismiss button as unstyled
controls below the footer. This was observed in the inspector screenshots and
reproduced separately without inserting test DOM.

[Mobile screenshot](2026-10-16-tasteskill/toast.png) ·
[DOM and computed-style evidence](2026-10-16-tasteskill/toast.json)

The live node has `class="sw-update-toast"` but no Astro scope attribute. The
delivered selector is `.sw-update-toast[data-astro-cid-z4jru4n3]`. Consequently,
computed position is `static` and display is `block`, rather than the intended
fixed flex layout. `src/layouts/BaseLayout.astro` creates the elements dynamically
and defines their styles in a scoped `<style>` block.

Proposed repair: give this dynamically created component explicitly global,
narrowly targeted styles. Verify the real service-worker event, position, button
styling, dismissal and reduced motion. Separately assess whether a fresh install
should announce an update; that behaviour needs its own reproduction and intent
check. The confirmed finding here is the CSS mismatch.

### 2. Reduce the tablet project's disproportionate height

**Observed composition problem.** At 801px, three projects sit beside one another
and recent writing starts at approximately y=950. At 800px they become full-width
images and recent writing starts at y=2349. At 768px it starts at y=2285. These
measurements were taken from the top of the page in the same 844px-high viewport.
At 390px the writing section starts at y=1640.

[800px screenshot](2026-10-16-tasteskill/home-800-fold.png) ·
[801px screenshot](2026-10-16-tasteskill/home-801-fold.png) ·
[Full tablet scroll sequence](2026-10-16-tasteskill/home/tablet-page-01.jpg) ·
[Measurements](2026-10-16-tasteskill/checks.json)

The cause is visible in `src/pages/index.astro`: the three-column grid stacks at
800px and the fixed 202px image height stops applying. The shared 3:2 image box
then grows with the available width. It makes the tablet page more cumbersome
than the narrower phone page, despite the extra room.

Proposed direction: at intermediate widths, use a compact image-and-text row for
each project, preserving the full screenshot with contain sizing. Keep the agreed
introduction → selected projects → recent writing order. Preview this separately
at 768px and 800px before implementation; merely retaining three narrow columns
would make titles and descriptions cramped.

### 3. Carry the homepage's project curation into All projects

**Information hierarchy opportunity.** The homepage shows working software,
screenshots and explicit Released/Live/Paused labels. All projects becomes an
alphabetical, text-only catalogue. Paused Chaotic Tanx comes first; released Rachel
is sixth. Technology tags receive more consistent visual treatment than availability.
Code198x offers a visible GitHub action, while its live destination requires another
step through the detail page.

[Desktop catalogue](2026-10-16-tasteskill/projects-1440.png) ·
[Mobile catalogue](2026-10-16-tasteskill/projects-390.png)

This follows directly from title sorting and the fields rendered by
`src/pages/projects/index.astro`; it is not evidence of a broken destination.

Proposed direction: lead with a small current/released selection using the images
and statuses already available, then retain a quieter complete catalogue. Give
available projects an obvious destination. Do not invent screenshots for libraries
or imply that paused software is released. Preserve every published project URL.

### 4. Give new readers an entry point into the writing

**Editorial opportunity, not a readability defect.** The writing index is a long
chronological sequence of similarly weighted entries. Its opening, “Thoughts on
software engineering, technology, and more”, says less than the actual writing.
Tags, series, archive and RSS already exist; the missing piece is a recommendation
about where a new reader should begin.

[Desktop index opening](2026-10-16-tasteskill/writing-1440-top.png) ·
[Mobile index opening](2026-10-16-tasteskill/writing-390-top.png)

Proposed direction: a compact selection of two or three existing essays, each with
a short reason to read it, followed by the chronological index. Keep the RSS and
archive paths. Align the visible “Blog” heading with the navigation's “Writing”
label when revisiting this page. New text should be drafted for Steve to edit.

## What should stay

- The warm palette, personal serif welcome, quiet rules and restrained motion are
  approved brand choices. They support this site's reading purpose.
- Real project captures and honest status labels make the homepage specific. The
  three-image selection supplies more useful proof than an arbitrary fourth image.
- The sampled article has readable dark text, clear hierarchy and useful contents.
  Mobile contents collapse above the prose. No decorative photography is needed.
- About supplies the personal detail the short homepage introduction leaves out.
  Its rescue-work examples are stronger than a generic services section. Work With
  Me should remain linked from About, outside the main navigation.

“I make things” is broad, but it is immediately supported by specific projects.
Sharpening it is optional and lower priority than the findings above. At 320px the
greeting wraps to three lines without clipping; that is not a usability defect
merely because Tasteskill demands two.

## Tasteskill results and their limits

The source lint reports 16 FAIL and 15 WARN across 32 files. Raw results are in
[lint.json](2026-10-16-tasteskill/lint.json). Source matches include overlay shadows
and outline styles, so these counts are not counts of visible defects. Its em-dash
warning aggregates source files rather than evaluating one rendered page.

The homepage inspector exited 1 and reported exactly:

> RESULT: 3 FAIL, 4 WARN — not done.

Failures: `hairline`, `few-pictures`, `still-page`. Warnings:
`mixed-font-headline`, `palette-cream`, `size-count`, `no-footage`.
[Full measurements](2026-10-16-tasteskill/home/report.json).

The approved brief explicitly uses rules, cream and a mixed-family welcome.
An image quota, video requirement and eight-moving-element minimum are unsuitable
acceptance criteria for this personal writing site. The ten measured font sizes
are worth considering when making future typography changes, but the viewed
homepage does not show a confusing hierarchy. No rules were waived in the raw run.

The following score applies the skill's own rubric literally to the homepage.
It is a subjective art-direction score, not a usability measurement or a whole-site
grade. The cap makes it especially poor for deciding whether to redesign this site.

```text
ROUND 1
Seen in one second: the large personal welcome.
Idea (one sentence): a personal welcome connects real software to its maker's thinking.
Live thing: search and project navigation; no signature interactive art-direction device.
Layout words by section: hero=split / projects=three-column spread / writing=index / footer=links
Scores: design 6.5 · usability 7 · creativity 6 · content 8 → overall 6.0 after cap
Caps applied: inspector FAIL caps overall at 6.0; fewer than four photographs/footage
  caps design at 6.5; no primary first-screen action button caps usability at 7;
  the transferable welcome concept caps creativity at 6.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Oversized stacked tablet project images bury writing: home/tablet-page-01.jpg.
   Preview compact image-and-text project rows at intermediate widths.
2. Update controls appear unstyled beneath the footer: toast.png.
   Correct the dynamic component's stylesheet scope.
3. The opening statement is transferable to many makers: home/desktop-fold.jpg.
   Consider a more specific introduction only after the higher-priority work.
```

No direction was drawn, no assets were added to the site, and no fix-and-rescore
round was run: the authorized task was a review. The broader findings above judge
the actual purpose and approved design rather than treating the capped score as
an instruction to replace them.

## Verification notes

The inspector's nonzero result and lint findings were preserved. Chrome could not
launch in the filesystem sandbox; the successful review used installed Chrome
outside it. Playwright's bundled browser was unavailable, so no browser download
or dependency change was made. One exploratory interaction script initially used
the wrong ARIA role and failed with `locator.fill: Timeout 30000ms exceeded.`
Using the site's actual textbox role completed the search check successfully.

No application tests or build were run for this documentation-only change. The
captured live outcomes establish the review evidence; they do not establish a
general claim that every interaction works.
