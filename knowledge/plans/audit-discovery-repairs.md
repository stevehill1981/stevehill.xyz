# Repair the audit's bounded discovery and contrast defects

Follow the verified causes in F1–F3 of `knowledge/audits/2026-10-15-personal-site.md`. Leave factual project claims and redesign choices for approval.

1. F3: change `src/pages/about.astro` project links from missing fragments to the existing project detail routes. Build; verify all three generated links resolve to matching detail pages. Commit and push.
2. F1: preserve optional `series` metadata in `src/content.config.ts`. Build; verify Building Rachel has two ordered parts, reciprocal part navigation and ordinary non-series posts still render. Commit and push.
3. F2: change the homepage reading-time color in `src/pages/index.astro` to the existing readable tertiary text token. Build; calculate contrast against the actual card background and verify the generated rule. Commit and push.
4. Update audit resolution notes and retain remaining accessibility, content and design work explicitly. Remove disposable verification logs.
