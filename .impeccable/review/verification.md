# Open Table implementation verification

15 October 2026. Approved homepage and full Guardrails reading preview implemented across the existing Astro templates. Browser checks used Chrome with emulated viewport widths; no physical-device testing is claimed.

## Build and preservation

- `npm run build` passed: all 11 service-worker regression tests, Astro static generation and Pagefind indexing of 123 pages.
- Compared generated output to the pre-redesign baseline: the same 123 route paths and page titles; all 33 rendered article bodies unchanged after stripping generated Astro scope attributes.
- Article date metadata precedes the article body. Work With Me remains linked from About and outside the top navigation.
- Fonts are local WOFF2 files with OFL licences: 62,960 bytes total. No remote Google Fonts stylesheet remains. No dependencies were added.
- Project images retain complete frames, intrinsic dimensions, captions and alternatives. The NES curriculum image retains pixelated rendering. Provenance scan of the three source project rasters found none missing.
- `git diff --check` passed. The production-source Impeccable detector reported zero findings. Existing narrow exceptions apply only to the approved static previews and unchanged authored punctuation.

## Browser outcomes

- Home, About, Guardrails article, writing index, project index, Rachel detail, Now, Principles, Work With Me, Series, Archive, Topics, architecture topic, 404 and Offline sampled at 1440px and 390px: document width matched viewport width.
- Home also checked at 320px, 820px and 1728px with no horizontal overflow.
- Mobile menu Escape closed the disclosure and restored focus to its toggle. Client navigation to About preserved the new typography/palette and reset the menu state.
- Mobile article contents opened above the prose and exposed the four actual Guardrails heading destinations. Clicking a destination updated the URL fragment.
- Search after client navigation exposed one input outside inert ancestry; Rachel returned 19 results. Boundary keyboard checks wrapped between Close and Load more; Escape closed the dialog.
- Series index → Part 1 retained the Part 2 destination. Four code blocks received exactly four toolbars and four copy buttons after client navigation; the copy action showed Copied.
- Computed palette contrast against cream: primary text 13.67:1, secondary text 7.70:1, tertiary metadata 6.13:1, brick links 5.95:1. White on brick is 6.50:1. These are token-pair checks, not a site-wide WCAG certification.

## Screenshot evidence

The PNGs in this folder show the final implementation. Home/article full-page desktop and mobile captures are the primary evidence. Supporting-page contact sheets summarize the route sample; individual captures remain available for inspection. `home-mobile-top.png` and `article-mobile-top.png` are unscaled first-844-pixel crops of the corresponding valid full-page 390px captures. Two malformed initial first-screen exports were replaced before the independent full review.

The independent full review found one tablet introduction issue. The fix stacks the intro at 1000px rather than 800px; the final build passed and all five homepage widths were recaptured. The reviewer scored that fix resolved with disposition `ship`. The original full assessment and the scoped verdict pass are both retained in `finish-review.md`.

## Limits and remaining audit work

No new Safari, Firefox, VoiceOver/NVDA speech, forced-colour, text-zoom, physical-touch or reduced-motion emulation pass was performed. Reduced-motion handling was inspected in code. No Core Web Vitals, Lighthouse or field-performance improvement is claimed. Historical article images lacking dimensions remain the separate F7 follow-up. GitHub issue #79 remains open for that work and broader validation.

## Production check

Redesign integrated into main at `54633f8`, preserving the concurrent README-only update. GitHub Pages run `38738944026` completed successfully. Live Home and Guardrails returned HTTP 200 with the new stylesheet, local font preload and expected content order. The Source Sans 3 response is valid WOFF2 (28,804 bytes). Live generated Rachel/Chaotic Tanx image bytes matched the local build. The browser’s native screenshot visibly rendered all three project images, Source Sans 3 and the cream palette. File exports omitted two loaded WebP images despite that correct native view, so malformed exported files were discarded; the valid local-build captures remain the durable screenshot evidence. No product change was needed.

Task-owned preview ports 54367, 57835 and 59393 are closed; temporary files were removed. Production `dist` remains the normal ignored build output, and the live homepage tab is retained as the user-facing result.
