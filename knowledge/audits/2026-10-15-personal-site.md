# Personal-site audit — 15 October 2026

The site has useful engineering stories and technical writing, but visitors encounter broken discovery paths, inconsistent project status and a homepage that gives decoration and chronology more prominence than the work. Repair those defects first, then use an editorial portfolio direction for the redesign. A framework rewrite is unnecessary.

Audit of source and shipped output at `863f18f`, for [#79](https://github.com/stevehill1981/stevehill.xyz/issues/79) under [#78](https://github.com/stevehill1981/stevehill.xyz/issues/78). This report proposes work; it does not approve a visual direction or change site content.

## Implementation integrity

**Needs improvement.** There is a consistent dark palette, spacing system and recognizable personal identity. However, the series feature loses its input data, About links to nonexistent project anchors, and project availability conflicts across pages. These are verified implementation/content problems. The detector's aesthetic warnings alone are not accessibility failures.

The existing decision to keep Work With Me out of the top navigation remains binding (`knowledge/log.md`, 12 June 2026). Its link from About works. Improve the route to evidence without turning the site into a sales funnel.

## Coverage and limits

- Inspected source, the 123-page Astro 7.3.8 build, metadata and live HTTP responses. The production build and security audit passed in the preceding security update; no application code changed in this audit.
- Chrome: inspected the homepage at 1728 × 867 and 390 × 844, and homepage reflow at 320 × 800 and 768 × 1024. Inspected the assembly article at desktop and 390px, the engineering/contact route, a game case study, search and mobile navigation. These are emulated viewports, not physical-device or touch tests.
- Exercised Home → About → Work With Me; inspected the live contact link without sending email. Inspected project links and case-study actions. Read article content, code, table-of-contents structure and related-post navigation.
- Confirmed search's dialog/focus/inert behavior and Escape on mobile. The preceding search fix also verified keyboard wrapping and navigation reuse. An accessibility tree is not a screen-reader speech test.
- Safari desktop follow-up was authorized and performed after the user isolated the site from unrelated tabs; results and two diagnostic observations are recorded below. Firefox, VoiceOver/NVDA speech, forced colors, 200% text enlargement, physical touch and reduced-motion emulation remain unverified. Reduced-motion CSS was inspected only.
- No performance trace/Lighthouse MCP tool or installed Lighthouse executable was available. The public PageSpeed API returned HTTP 429. LCP, INP, CLS, FCP, TBT and a Lighthouse score are **not measured**. No field analytics, Search Console or CrUX dataset was available; journey priority is inferred from the agreed brief, not traffic.
- Impeccable technical audit and bounded visual inspection were used. This is not the separate formal dual-assessment `critique` workflow. No redesign or general polishing was performed.

## Safari follow-up

Native macOS Safari inspection used only the isolated personal-site window after explicit user approval. No browser preferences, extensions or website data were changed. The test used accessibility snapshots and screenshots; CSS viewport dimensions, Safari version, rendering timings and screen-reader speech were not measured.

| Check | Observed outcome |
|---|---|
| Home search | Dialog and close control exposed in the accessibility tree. After the search library loaded there was one input; `microservices` returned 28 results. Background page content disappeared from the accessibility tree while search was open. |
| Close control | Clicking Close search restored page content. The native focused element was reported as the document, so focus restoration to the trigger was not established in Safari. |
| Engineering/contact | Home → About navigation completed. A direct load of Work With Me exposed its headings, engagement content and the `mailto:steve@stevehill.xyz` link. No message was sent. |
| Reading | Direct load of the assembly article exposed its heading hierarchy, image alternatives, ten Copy controls, date and related posts. The contents link to “Your first code” updated the URL fragment and visibly scrolled to the section with readable code. Copy-to-clipboard was not exercised. |

Two observations need a focused diagnostic before a broad Safari pass can be claimed:

1. **Navigation styling:** after Home → About, a screenshot showed unstyled HTML with oversized social SVGs. Reloading About restored the expected dark layout. This was one observed transition and one recovery; no network trace, cache inspection or repeatable mechanism was established. Reproduce in a fresh context and with a returning service-worker cache before attributing it to Safari, Astro transitions, asset loading or caching. Add this reproduction to the implementation follow-up queue ahead of visual redesign.
2. **Keyboard containment:** Shift+Tab from the search input moved focus to Safari's address field. Safari's keyboard-navigation settings were not inspected or changed, and the boundary controls may be skipped under those settings. An alternate Option+Shift+Tab check was rejected by automatic approval review because the shortcut could move focus beyond the audited page. No bypass was attempted. Test under documented Safari keyboard settings before calling modal containment correct across browsers. This extends F8's remaining validation rather than establishing a new cause or a site-wide failure.

The final project-case-study check was not completed: the Safari window showed an unrelated site when inspected. Automation stopped immediately; no further content was examined and the window was left open to avoid disrupting other activity. The task-created site tab may still exist and can be closed manually once no longer needed. Safari mobile/device behavior remains outside this desktop follow-up.

### Navigation-cache diagnosis and bounded fix

A subsequent isolated reproduction established a cache/request cause matching the unstyled-navigation/reload observation. Astro ClientRouter fetches HTML without a navigation Accept header. The old worker classified only `Accept: text/html` requests as pages, so client navigation could return cached HTML from a previous release with removed hashed stylesheet references. Reloads used the network-first branch and recovered. This mechanism is browser-independent; the original Safari session was not network-traced.

`public/sw.js` now recognizes navigation requests and same-origin fetches of the site's extensionless, trailing-slash and `.html` page URLs, using network-first with the existing offline fallback. Assets retain cache-first behavior. Eleven tests in `test/service-worker.test.mjs` failed appropriately against the old worker (7 failures) and pass against the fix. They run as part of the normal production build.

A real-worker diagnostic on a fresh local Chrome origin seeded previous-release HTML. The old worker returned that stale HTML; the patched worker returned current HTML and both referenced local stylesheet requests returned HTTP 200 with CSS content types. Normal Home → About navigation retained the dark layout and 20px icon sizing. See `knowledge/plans/safari-navigation-styles.md` for the reproduction and limits. Safari's keyboard observations remain unresolved.

## Provisional audit health

Scores are engineering judgment over this sample, not a WCAG conformance statement or a performance benchmark.

| Dimension | Score / 4 | Evidence |
|---|---:|---|
| Accessibility | 2 | Search isolation works; reading-time text fails normal-text contrast; further assistive-technology coverage is missing. |
| Performance | 2 | Small compressed documents and static delivery; image space is not reserved; rendering metrics unavailable. |
| Theming | 3 | Shared dark-theme tokens with repeated hard-coded decorative gradients. A light theme is not a requirement. |
| Responsive design | 3 | Sampled reflow works; project discovery and article navigation degrade on narrow screens. |
| Implementation integrity | 2 | Broken project anchors, discarded series data and conflicting project claims. |
| Total | **12 / 20** | Significant work needed; functional foundation is usable. |

Eight findings: **0 P0, 2 P1, 6 P2, 0 P3**. P1 means a major functional/accessibility defect; P2 means a bounded usability, content or implementation gap with a workaround. Unmeasured risks are distinguished below.

## The three visitor journeys

| Journey | What works | Friction and outcome |
|---|---|---|
| Engineering and contact | About explains the work and employment context; Work With Me contains concrete engagement stories, boundaries and an email address. | Home offers a random tagline rather than a stable introduction. About's three Recent Projects links lead to missing fragments. The Work With Me prose spans 1152px at 18px text on desktop. Contact is reachable through About; no additional top-nav sales link is needed. |
| Code198x and creative work | Code198x has a persistent navigation link and a case study. Featured games are linked from Home. | The first featured project starts approximately 2129px down the 390px homepage, after seven posts. Chaotic Tanx's case study contains no image. No Phosphene reference occurs in `src/` or `public/`. Project availability needs reconciliation before adding claims or calls to action. |
| Technical writing | Blog, archive, tags, RSS, related posts, code blocks and search exist. The sampled article exposes useful headings and image alternatives. | Series discovery is empty despite two authored parts. On mobile, the article's date and table of contents follow the entire article; a 2017 tutorial initially reads without its historical context/date. Reading-time metadata has low contrast. |

## Findings and concrete follow-ups

### F1 · P1 · Restore series discovery

- **Evidence:** Live `/series/` and the shipped build display “No series available yet.” Both `src/content/blog/2025-07-03-building-rachel-part-1.md` and `2025-07-08-building-rachel-part-2-themes-and-deployment.md` declare `series.name: Building Rachel` and parts 1/2. `src/content.config.ts:6` omits `series`; its object schema strips unknown fields. `src/utils/series.js` requires `post.data.series`, so the index and in-post navigation receive none.
- **Impact/category:** Readers cannot discover or follow the authored two-part series through the series feature. Implementation integrity / writing journey.
- **Follow-up:** Preserve optional series metadata in the collection schema. Validate both parts together, their order, and previous/next navigation, with ordinary non-series posts still rendering. Avoid making metadata required for historical posts.
- **Owner:** Codex implementation; Steve reviews the resulting presentation. Suggested workflow: `$impeccable harden`.

### F2 · P1 · Increase reading-time contrast

- **Evidence:** Homepage `.reading-time` at `src/pages/index.astro:717` uses `--color-text-muted`. Live computed foreground is `rgb(107,114,128)` at 14px against the card's opaque `rgb(26,26,26)` background: **3.60:1**, below the 4.5:1 normal-text requirement in [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Impact/category:** Small metadata is unnecessarily hard to read. Accessibility / theming.
- **Follow-up:** Use an appropriate readable text token and verify actual card backgrounds and states, including other uses of the muted token. Do not treat decorative-gradient detector warnings as proof of contrast failure.
- **Owner:** Codex. Suggested workflow: `$impeccable harden`.

### F3 · P2 · Link About's projects to their real pages

- **Evidence:** `src/pages/about.astro:77` builds `/projects#${project.id}`. The generated `/projects/` page contains none of the three targets: `chaotic-tanx`, `code198x`, `netnodes-freelance`. A scan of absolute internal fragment links across the generated HTML found exactly these three missing targets. Live About exposes the same links. The individual `/projects/<id>/` routes exist.
- **Impact/category:** Clicking a named project does not open its case study or jump to the promised item. Engineering/creative discovery / implementation integrity.
- **Follow-up:** Link to the actual project route. Acceptance: each of the three About links opens the matching detail page, with a working return path. This is the smallest next implementation change.
- **Owner:** Codex. Suggested workflow: `$impeccable harden`.

### F4 · P2 · Reconcile availability and add verifiable project evidence

- **Evidence:** `src/pages/now.astro` is dated 13 March 2026 and puts Rachel and Chaotic Tanx on hold pending an Apple Developer subscription. `src/content/projects/chaotic-tanx.md` says it is currently available through TestFlight. Its “Join the TestFlight beta” action leads to its marketing homepage; that page returned 200 but contained no TestFlight link in the inspected HTML. Rachel's current marketing page contains an App Store link, while the personal site's Now page still says its iOS port is pending. The Chaotic Tanx case study has zero images. No Phosphene link was found in the audited source.
- **Impact/category:** Visitors cannot confidently tell what is released, available to try, paused, or part of the studio. Content integrity / creative journey.
- **Follow-up:** Steve confirms current release state and intended Phosphene destination. Then update summaries, Now and calls to action together, and add real screenshots or recordings with useful alternatives. Confirm the availability journey end to end; an HTTP 200 alone proves no download or beta access. Do not infer App Store release status solely from a marketing link.
- **Evidence limits:** Code198x returned 200 through its configured www URL in the initial reachability check; a later direct request to the redirected apex returned 403. Do not label it a broken link from those mixed results. Its curriculum scope, the “60fps” game claim, and engagement metrics such as “thirty percent” performance improvement were not independently validated against builds, releases or private evidence.
- **Owner:** Steve for facts/assets; Codex for agreed edits. Suggested workflow: `$impeccable clarify`.

### F5 · P2 · Give each journey a deliberate homepage route

- **Evidence:** At 1728px, the hero occupies about 358px of height and presents a large surname plus one randomly chosen tagline. At 390px, seven recent posts precede projects; the first project begins about 2129px from the document top. No screenshot or tangible artifact appears in the inspected homepage/case-study pair.
- **Impact/category:** The mobile order serves chronology first and makes the site's creative work and engineering evidence take effort to find. This is a brief-based design judgment, not a measured conversion loss.
- **Follow-up:** Keep the personal identity, add a stable introduction, put a small curated selection of engineering/creative work near the beginning, and retain an obvious writing route. Agree a design before implementation; do not simply add more cards.
- **Owner:** Steve chooses direction; Codex prepares and implements the approved design. Suggested workflow: `$impeccable shape`.

### F6 · P2 · Improve article orientation and prose measure

- **Evidence:** The sampled assembly tutorial is dated May 2017, but its visible date and “On this page” navigation live in `.post-sidebar` after `.post-main` in `src/pages/blog/[slug].astro`. At 390px the sidebar follows the article. On desktop, Work With Me paragraphs measure 1152px wide at 18px; sampled article content measures 784px at 18px.
- **Impact/category:** Mobile readers encounter old tool recommendations before seeing their date and reach navigation after the content it should help navigate. Wide standalone prose is harder to track. Responsive design / reading journey.
- **Follow-up:** Show the date near the title, offer an early collapsible contents list on mobile, and set a deliberate prose measure. Keep code blocks independently scrollable and retain related posts after the article. Treat old posts as historical documents; add a contextual note when needed rather than silently rewriting their history.
- **Owner:** Codex layout; Steve approves editorial changes. Suggested workflow: `$impeccable typeset`, then `$impeccable adapt`.

### F7 · P2 · Reserve image space in articles

- **Evidence:** All four images in the sampled assembly article have `loading="lazy"` and `decoding="async"`, but no width/height attributes. `src/plugins/rehype-lazy-images.mjs` adds the first two attributes only. Alternatives are present, including “black screen” and “cyan screen.”
- **Impact/category:** Late image loading can move following content. This is a layout-shift risk, **not measured CLS**. Performance / reading stability.
- **Follow-up:** Supply intrinsic dimensions or a correct aspect ratio from real assets while retaining responsive sizing. Verify with a cold-load trace before claiming a CLS improvement.
- **Owner:** Codex. Suggested workflow: `$impeccable optimize`.

### F8 · P2 · Expose navigation state and complete accessibility coverage

- **Evidence:** `src/components/SiteHeader.astro` styles active links but does not emit `aria-current`. Its mobile toggle has `aria-expanded` but no `aria-controls` relationship. Search's repaired dialog has an accessible name and remains outside inert content; Escape restored Search focus and removed all background inert attributes in the sampled mobile run. The menu button measured 40 × 43.5px, below a 44px comfort target but above 24px; this measurement alone is not an AA target-size violation. Inline prose links are also not automatically target-size failures.
- **Impact/category:** Assistive-technology users lose a useful current-page cue; untested speech/motion/zoom behavior prevents a broader accessibility claim.
- **Follow-up:** Add current-page semantics and a meaningful menu relationship, then test keyboard operation, screen-reader announcements, zoom, forced colors and reduced motion across supported engines. Do not prescribe a full navigation focus trap for a simple disclosure menu without a design reason.
- **Owner:** Codex semantics; Steve/manual tester for assistive-technology validation. Suggested workflow: `$impeccable harden`.

## Performance and discovery baseline

[Raw measurements](2026-10-15-http-evidence.json) contain every sample and request outcome. Three fresh urllib connections per URL from this machine, without network/CPU throttling, requested gzip. “Headers time” includes connection setup and response latency. It is not browser TTFB, render time, a field percentile or a Core Web Vital. URL slash redirects may be included.

| Route | Headers median | Observed range | Gzip document body | Decoded HTML |
|---|---:|---:|---:|---:|
| Home | 355.0ms | 178.7–502.8ms | 9,779 bytes | 35,891 bytes |
| Work With Me | 635.6ms | 560.8–680.0ms | 6,462 bytes | 19,449 bytes |
| Assembly article | 842.4ms | 280.6–911.5ms | 15,738 bytes | 73,817 bytes |

All nine samples returned 200 and `Cache-Control: max-age=600`. Document payloads are small; this evidence does not justify a generic “performance overhaul.”

| Rendering metric | Value / rating |
|---|---|
| LCP | Not measured; no rating |
| INP | Not measured; no rating |
| CLS | Not measured; no rating |
| Lighthouse performance score | Unavailable; public API HTTP 429 |

Use actual rendering/field measurements for those metrics; their distinction is described in [Web Vitals](https://web.dev/articles/vitals).

The layout requests Inter, Lato and Montserrat through Google Fonts, with preconnects. No font-transfer or render-delay measurement was available, so no font savings are claimed. Inspect actual usage and a trace before removing or self-hosting anything. Service-worker asset caching uses a fixed cache name with cache-first/background refresh; an earlier local rebuild showed stale assets. That is a follow-up diagnostic risk, not evidence of a broken production release.

Metadata basics are present: descriptions, canonical URLs, Open Graph, Article JSON-LD, RSS and sitemap. Canonicals use the non-www origin while live requests redirect to www; align these in a future metadata pass after confirming the intended canonical host. No ranking penalty is claimed. Social sharing defaults to SVG; real social-card previews still need checking before calling them correct. There is no measured reason here to add analytics; use existing search/traffic evidence if available, or agree a privacy-conscious measurement need first.

## Detector findings and visual direction

[Raw Impeccable detector output](2026-10-15-impeccable-evidence.json): 37 warnings — 16 font flags, 16 gradient-text flags and 5 side-accent flags. Verified examples include repeated gradient headings, colored card stripes and the three-font request. A detector warning that groups Montserrat with “overused fonts” is a heuristic naming judgment, not a functional defect. Colorful accents can be intentional; the problem is the hierarchy and lack of actual project artifacts, not color itself.

Recommended direction: **an editorial portfolio**. A clear introduction, selected work with real artifacts and candid outcomes, then strong writing discovery. Use a restrained palette with one accent, a clear type hierarchy, readable prose measure and purposeful motion. Let project screenshots carry their own colors. Keep the site recognizably personal and link out to Code198x and Phosphene rather than adopting either brand wholesale.

Alternative: **a project gallery**, with large artifacts and compact writing links. This would suit a stronger emphasis on games/visual work, but gives engineering writing less prominence. The editorial direction fits all three agreed journeys better. These are proposals, not an approved new design system; PRODUCT.md/DESIGN.md and design choices should be agreed in the redesign phase.

## Repair status after the audit

- F5/F6 repaired in the approved Open Table redesign: stable introduction, real selected projects before three recent posts, article dates before prose, early native mobile contents and constrained prose measure throughout. Shared styling now covers all existing page templates. All 123 routes and 33 article bodies are preserved. Evidence: `.impeccable/review/verification.md` and the independent finish review.
- F8 partially repaired: top navigation emits `aria-current`, the disclosure has `aria-controls`, and Escape restores the mobile toggle. Search/client navigation and narrow-width reflow were checked in Chrome. Cross-engine, screen-reader speech, zoom and forced-colour validation remain outstanding; the redesign does not close #79 or establish WCAG conformance.
- F4 detail-page evidence extended: Rachel, Code198x and Chaotic Tanx now reuse the same real, dimensioned images as Home, with appropriate captions and alternatives.

- F4/F5, homepage artifacts added: selected projects now show existing public product images from their own sites: Rachel on iPad, Dash from Code198x's NES curriculum, and a Chaotic Tanx development build. Captions distinguish curriculum/development images; statuses are unchanged. Astro emits local responsive/lazy images with dimensions and alternatives; full frames are preserved and the NES PNG uses pixelated rendering. Production build and 11 regressions pass; desktop/mobile rendering and generated image files were checked. Detail-page image coverage remains a separate follow-up.
- F5, homepage hierarchy repaired: Steve approved introduction → selected projects → recent writing, reflecting infrequent posting. Home now introduces Phosphene/Code198x, leads with Rachel, Code198x and Chaotic Tanx and their confirmed statuses, then shows three posts. DOM and visual section order agree. At 390px the first project begins around 686px rather than the original 2129px; 390/820/1728px checks found no horizontal overflow. Build and all 11 regressions passed, and generated destinations/statuses were checked. Real product screenshots remain a follow-up.
- F4, Phosphene destination added: Steve confirmed https://phosphene.uk. About and Projects now link the brand name there; generated anchors and the production build (11 regressions) passed verification. Automated destination access returned `HTTP Error 403: Forbidden`, so its live rendering remains unverified.
- F4, Phosphene identity clarified: Steve confirmed Phosphene is his publishing brand for independent projects, with him publicly identifiable as creator; Phosphene Studios is no longer the preferred name. About and Projects now explain that relationship and current App Store releases under his own name. Both generated pages and the production build (11 regressions) were verified. A Phosphene destination remains unconfirmed, so no external link was added.
- F4, Code198x reconciled: Steve confirmed the site is live and operational at www.code198x.com and the wider 198x family is under active development. The project status is now Live; its detail page and Now state those facts. Generated destinations and copy were verified, and the production build passed with all 11 regressions.
- F4, Chaotic Tanx reconciled: Steve confirmed development is paused pending substantial refactoring because of performance and playability issues. Home/project summaries and Now now say paused; the project page removes the current TestFlight invitation and 60fps claim. The January shipping post retains its historical text with a dated status update. Generated pages and the full build, including 11 regressions, were verified.
- F4 partially reconciled: Steve confirmed Rachel is publicly released, live and has paying customers. Rachel now appears under Released on Now; its project summary/status and current-status section state App Store availability. The direct store destination matches Rachel's own website. No sales figures or additional feature claims were published. Other project statuses still need confirmation.

- F2 repaired: homepage reading-time text now uses the existing tertiary text token. Browser-computed foreground `rgb(156,163,175)` against `rgb(26,26,26)` gives 6.86:1 at 14px, up from 3.60:1. The full build and all 11 regressions pass.
- F1 repaired: the optional series object is preserved by the blog schema. Built output contains both Building Rachel parts in order, reciprocal part navigation, and no series UI on an ordinary non-series post. All 123 routes still build and the 11 regression tests pass.
- F3 repaired: About's three project links now lead to the existing detail routes. The production build and all 11 service-worker regressions pass; all three generated links resolve and no `/projects#...` links remain on About.
- The navigation-cache fix is recorded above; the remaining findings retain their original evidence until repaired.

## Three high-leverage improvements

1. **Repair existing journeys:** restore series, replace About project links, and fix metadata contrast. Start with F3 as a small independently reviewable change, then F1 and F2. Verify the visitor outcome, not just a green build.
2. **Make project evidence current:** reconcile release claims and Now, confirm the studio destination, then add a few real screenshots and reliable try/read actions. Facts and assets come before fresh promotional copy.
3. **Redesign hierarchy and reading:** agree the editorial direction, put selected work within reach on mobile, and improve article dates, contents and prose measure. Run `$impeccable polish` only after functional, content and accessibility repairs.

The search fix in [8097925](https://github.com/stevehill1981/stevehill.xyz/commit/8097925) is the already-shipped bounded improvement: before, opening search made its ancestor header inert and removed the dialog from the accessibility tree; afterward, it has one usable input, real results, focus wrapping/restoration and working navigation reuse. The preceding security update also cleared dependency alerts. No further site changes were shipped by this audit.

## Maintenance standard and remaining acceptance

Proposed editorial standard: publish when there is useful work to explain, with no arbitrary blog cadence. Update project availability when a release/status changes; check the small project/Now inventory quarterly. Show checked dates for live project claims. Keep historical posts dated and add explicit update notes where old advice could confuse readers. Keep numerical claims only when supporting evidence can be retained and explained, with confidential examples anonymized.

This audit provides findings, repeatable HTTP evidence, three journeys, owners, issue-ready follow-ups and a small next action. Keep #79 open: major-browser/screen-reader validation and rendering baselines remain incomplete. Safari desktop coverage is now recorded, with navigation styling and keyboard observations requiring follow-up; the other missing coverage needs a suitable test environment. F1–F8 can become linked GitHub follow-ups when issue creation is requested.
