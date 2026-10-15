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

## Completed upstream work

- Core: [PR #99](https://github.com/shiki-highlights/shiki-highlight-api/pull/99), merged as c654a3d. [Main CI](https://github.com/shiki-highlights/shiki-highlight-api/actions/runs/38743119829) passed; PR CI also passed. Node 24 job logs confirm 154 unit tests and four browser tests. Node 26, lint and the Shiki 1.9.0 peer-floor job also passed. npm audit: zero, down from two high advisories.
- Remark plugin: [PR #60](https://github.com/shiki-highlights/remark-shiki-highlight-api/pull/60), merged as 40de5bb. [Main CI](https://github.com/shiki-highlights/remark-shiki-highlight-api/actions/runs/38743120516) passed; PR CI also passed. Node 24 logs confirm 54 unit tests and seven browser tests. Node 26 and lint also passed. npm audit: zero, down from 16 advisories. Removed unused deprecated mdast development package and added the core package's established esbuild security override for tsup.
- Steve approved Node 24 as the minimum for both packages. Engines, CI matrices, README and Unreleased changelogs now record that breaking support change. Existing tests were retained; no runtime source or assertions changed. No npm releases were published. The site consumes the latest already-published versions (remark 0.4.1 and core 1.3.0).
- Retained TypeScript 5.9.3 after the attempted 6.0.3 declaration build failed: `error TS5101: Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0.` tsup injects that option itself. TypeScript 7 additionally exceeds typescript-eslint's supported <6.1 peer range. No compiler diagnostics were suppressed. Node types intentionally follow the Node 24 support floor rather than Node 26. These are the only remaining outdated direct packages in the upstream checks.

## Protection and deployment verification

Direct upstream main pushes were rejected because protected branches required checks. Work proceeded through the two PRs; merge commits were disallowed, so both used the supported squash merge. Both protection rules still enforce strict status checks, deletion/non-fast-forward protection and no bypass actors. Replaced obsolete Node 20/22 required contexts with Node 24/26 and lint; core additionally requires its existing peer-floor job. Read back both complete rule payloads to confirm the intended change only. Both PR commits remain in verified GitHub pull refs after automatic branch deletion.

[Site Pages deployment](https://github.com/stevehill1981/stevehill.xyz/actions/runs/38741847144) passed for 30857fc. The build annotations contain only the scheduled ubuntu-latest image migration notice; the Node 20 action warning is gone. Live Home retained the approved typography/introduction, and all four Spectrum images retained their dimensions. The site audit remains zero; no outdated direct site dependencies remain.

## Cleanup

Verified each task commit against its retained GitHub PR head ref and the merged main tree before cleanup. Removed the core linked worktree, temporary remark clone, audit scratch directories, dependency caches, generated task build directories and logs. The clean original core checkout was fast-forwarded to c654a3d; its pre-existing dependency cache was preserved. No task-owned background processes remain.
