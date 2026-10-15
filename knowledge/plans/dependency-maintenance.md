# Refresh site dependencies and GitHub Actions

15 October 2026. Scope: current stable Actions and npm dependencies, plus upstream review of Steve's own highlighting packages. No new dependencies or application/API breaking changes without approval.

## Baseline

- Clean main at a716a39. All 18 tests and 123-page build pass from the preceding image fix.
- npm audit: zero known vulnerabilities. Outdated direct packages: sitemap 3.7.3→3.7.4, simple-icons 16.23.0→16.35.0, remark-shiki-highlight-api 0.3.6→0.4.1.
- Deployment uses checkout v4, withastro/action v4 and deploy-pages v4. Stable releases verified through GitHub API: checkout 7.0.1, withastro/action 6.1.3, deploy-pages 5.0.1. Review manifests and release notes for supported inputs/runtimes before editing.
- User also requested attention to self-authored dependencies: remark-shiki-highlight-api and its shiki-highlight-api dependency. Inspect upstream manifests, releases and available local checkouts before deciding whether additional upstream changes are required.

## Work and checks

1. Update .github/workflows/deploy.yml using current compatible action releases; retain normal main-push Pages deployment. Add GitHub Actions to the existing weekly Dependabot configuration so action versions stay maintained.
2. Refresh package.json minimums and lockfile for stable direct updates and compatible transitive updates. Check the highlighting stack and generated code output, including cached-content behavior.
3. Run clean installation, 18 tests, full production build, npm outdated and npm audit; inspect generated routes, image dimensions and code highlighting.
4. Keep upstream-package work independently scoped/committed with its own rules and tests; no unrelated cleanup. Record findings and any actual blockers.
5. Commit and push verified site work, read CI annotations and live output, and remove task cache/temp files before finishing.

npm's default cache is outside the permitted writable roots and returned EPERM. Use the task-owned /private/tmp/stevehill-dependency-cache instead; do not change ownership or permissions on the user's cache.

## Site result

Updated checkout to 7.0.1, withastro/action to 6.1.3 and deploy-pages to 5.0.1. Verified official action manifests/release notes: existing inputs and output remain supported; the action chain uses current Node runtimes. Checkout's new fork-PR restrictions do not affect this push-to-main workflow. Added weekly GitHub Actions Dependabot updates beside the existing npm schedule.

Updated sitemap to 3.7.4, simple-icons to 16.35.0 and remark-shiki-highlight-api to 0.4.1, including compatible transitive refreshes. Site now resolves shiki-highlight-api 1.3.0 and a single deduplicated Shiki 4.5.0 tree rather than Shiki 3 alongside 4. Official plugin release notes report Shiki 4 compatibility without plugin code changes. Clean npm ci and production build pass all 18 tests with 123 indexed pages; code listing text is unchanged across all 34 blog routes including the index. npm outdated reports no outdated direct dependencies; npm audit reports zero vulnerabilities.

Upstream package maintenance continues independently: initial installed trees report 2 high advisories in core and 16 advisories in the remark package. Preserve declared Node support while assessing updates.
