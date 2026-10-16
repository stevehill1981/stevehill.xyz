# Fix the 16 October Impeccable critique findings

16 October 2026. Steve asked to fix every point in the Impeccable critique (`.impeccable/critique/2026-10-16T08-11-36Z__src-pages-index-astro.md`, 27/40). He chose:

- **Code198x name:** "Code Like It's 198x", matching the Code198x site's own title and `og:site_name`.
- **Status vocabulary:** six words: Released (apps), Live (sites), Published (libraries and scripts), In progress, Paused and Retired.
- **Writing index:** a single-column list grouped by year.

Re-consulted RULES.md, PRODUCT.md, DESIGN.md and the Open Table surface brief. The palette, type, homepage order, the "I make things." welcome and the Start here layout are approved and stay as they are. Published blog posts keep their own wording; renaming applies to site pages and chrome only. No new dependencies.

## Steps

Each step is one commit that passes `npm test`, `npm run build` and `npm run test:browser`. Each new browser assertion must fail against the code it fixes before the fix goes in.

1. **First-visit notice.** Cause: `public/sw.js` calls `skipWaiting()` and `clients.claim()`, so by the time the first worker reaches `activated`, `navigator.serviceWorker.controller` is already set, and the guard in `src/layouts/BaseLayout.astro` passes on a first install. Fix: record whether a controller existed before `register()` and show the notice only then. Test: in `browser-tests/journeys.spec.mjs`, a first install with no prior controller shows no notice. The existing update test keeps showing it.
2. **Homepage heading: no change needed.** The critique read the h1's `textContent` ("Steve.I make"). The accessible name already reads "Hello, I'm Steve. I make things." because the second line's `<span>` is `display: block`, which inserts a space. A test for the space passed against the unchanged build, so it couldn't catch anything and was dropped.
3. **Dates.** Use `en-GB` in series, archive, tags, the related posts on articles, and Now. Test: related-post, tag-page and series dates match the day-month-year format.
4. **Code Like It's 198x.** Use the full name in the homepage intro, footer, Now, the project image alt text and the "Visit" label. Record the naming rule in RULES.md. Test: the footer and homepage links read "Code Like It's 198x".
5. **Sentence case and labels.** Change "About Me", "Related Posts", "Copy Link", "Project Info", "Back to Projects" and "RSS Feed" to sentence case. Change the share label "Share:" from uppercase to sentence case, and align the share row with the prose measure. Also change the other interface labels a scan of the built site found ("You're Offline", "Try Again", "Go Home", "Page Not Found", "Browse Blog", which becomes "Browse writing", "My Principles", "Work With Me" and its section headings, and the Now section headings). Headings inside blog posts and project write-ups, including Rachel's, stay as they are: all 30+ posts and project pages use Title Case consistently, so that's the content style, not drift. Changing Rachel's alone would create a new inconsistency. That's Steve's call if he wants content headings changed too. Change the Start here subject "Staying technical" to "Staying an individual contributor", which explains "IC". Test: an accessible-name check on these labels.
6. **Statuses and technology names.** Map frontmatter to the statuses. Shelved's write-up says its "code is intact and could be revived", so it is Paused rather than Retired, which leaves five words with "Retired" unused. Enforce them with a `z.enum` in `src/content.config.ts`, which every current entry satisfies after mapping, so it can't silently drift again. Write technology tags as proper nouns (Ruby, Rails, TypeScript, PostgreSQL). Blog tags stay as they are because they're URLs. Test: the build fails on an unknown status. Check this by building once with a deliberately invalid value, then revert.
7. **Search with no results.** Set Pagefind's `zero_results` translation to name a next step, and add Topics and Archive links to the dialog. Test: a search for nonsense shows the links.
8. **Writing index.** Make `src/pages/blog/index.astro` a single-column list grouped by year, with no tag chips. Year headings are `h3`; post titles are list items with links. Keep `#latest-writing`, the series label, dates and excerpts. Update the journey test to the new markup.
9. **Project status placement.** Put the status next to the title on /projects/ rows and catalogue cards, and keep it with the title in the About sidebar. Hide GitHub stats when stars and forks are both zero. On project detail pages, make the destination link a primary button and add Status to the sidebar. The availability line stays in the main column so it isn't pushed below the content on mobile. Test: the existing selected-projects journey, plus a check that no zero-star stats render.
10. **Homepage writing row and tap targets.** Put each date and reading time on one line after its title. Align the writing column with the second project column. Footer links and "All writing →" must be at least 24px tall. Test: measured heights and column alignment at 1440.
11. **Dead code.** Delete the unused `src/components/CodeBlock.astro`. Check: nothing imports it, and the build passes.

The back-to-top button "sitting on a rule" at 390px happens because a fixed button overlays whatever scrolls under it. Step 10's visual check decides whether a change is needed.

## Finish

- Inspect at 1440 and 390 once and fix only concrete defects.
- Rerun the Impeccable detector and critique.
- Push, then verify the live site after CI deploys.
- Close the critique snapshot only if every priority issue is cleared.
- Stop task-owned servers and browsers.
