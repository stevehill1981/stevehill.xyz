# Repair the audit's bounded discovery and contrast defects

Follow the verified causes in F1–F3 of `knowledge/audits/2026-10-15-personal-site.md`. Leave factual project claims and redesign choices for approval.

1. F3: change `src/pages/about.astro` project links from missing fragments to the existing project detail routes. Build; verify all three generated links resolve to matching detail pages. Commit and push.
2. F1: preserve optional `series` metadata in `src/content.config.ts`. Build; verify Building Rachel has two ordered parts, reciprocal part navigation and ordinary non-series posts still render. Commit and push.
3. F2: change the homepage reading-time color in `src/pages/index.astro` to the existing readable tertiary text token. Build; calculate contrast against the actual card background and verify the generated rule. Commit and push.
4. Update audit resolution notes and retain remaining accessibility, content and design work explicitly. Remove disposable verification logs.

## Verification

Each repair passed `npm run build` (including the 11 service-worker tests) before committing.

- F3: all three built About links match existing detail routes and the old project fragments are absent.
- F1: both Building Rachel parts appear in order, each part links to the other, an ordinary non-series post has no series UI, and all 123 routes remain. The browser confirms the two-part series is visible.
- F2: generated CSS uses the tertiary text token. Browser-computed colors are RGB(156,163,175) on RGB(26,26,26), yielding 6.86:1 for 14px text. Impeccable reports existing decorative/font warnings outside these repairs.
- Task-owned browser tabs and the local HTTP server were closed. Existing ignored build output is retained; disposable logs are removed after verification.
