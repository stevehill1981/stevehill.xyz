# Finish dependency and site modernisation

Steve approved the proposed sequence on 15 October 2026: replace tsup in both libraries, verify package interfaces and publish Node 24 releases, align the local/site runtime, then finish available browser/accessibility/performance validation. This authorises tsdown as the replacement build dependency and the previously agreed Node >=24 release boundary.

## Tasks and verification

1. In isolated upstream checkouts, re-consult local rules/decisions. Capture current package exports and APIs before changing build tools. Known failure modes: tsup injects deprecated baseUrl and blocks TypeScript 6; Shiki dynamic imports must remain external; consumers need ESM, CommonJS and matching declarations. Preserve these interfaces and existing unit/browser/peer-floor checks.
2. Replace tsup scripts/config with explicit tsdown configuration, migrate to TypeScript 6 where supported, remove obsolete esbuild overrides only if audit stays clean. Pack and install real tarballs into isolated consumers; exercise ESM/CJS rendering and compile consumers. Record exact build files and results in each repository's docs/plans.
3. Merge via protected PRs after CI. Prepare core 2.0.0 and remark 0.5.0 breaking releases (Node 24 floor); verify tag availability and release notes first. Publish core through existing release workflow, then update remark to released core, verify and publish remark. Read npm artifacts/provenance and tests; update the site to the published versions only once available.
4. Verify latest Node 24 patch from official metadata. Install using existing mise, declare the site's runtime in mise.toml and package.json; keep CI on Node 24. Build/test/audit site with that runtime and verify deployment.
5. Re-consult audit and available web-perf/browser tools. Test permitted engines, keyboard/search/client navigation, zoom/forced-colour and reduced-motion where supported; collect real performance measurements where possible. Do not claim screen-reader speech or field metrics without evidence. Fix concrete scoped defects, record remaining environmental limits in the audit.
6. Commit/push verified work; preserve task commits remotely before cleaning all temporary checkouts, consumers, tarballs, caches and processes.

## Validation finding

PageSpeed identified one non-descriptive link in the Spectrum development-environment article: “here” linked to Pasmo. Replace that anchor with “Pasmo website”, retain its destination and historical advice, then verify the generated anchor after the normal build. No other article edits are in scope.

## Verified result

- Core PR #100 merged as 706bcb5 after Node 24/26, lint, browser and peer-floor checks. Release v2.0.0 publish run 38746878651 succeeded; npm metadata exposes Node >=24 and a SLSA provenance attestation.
- Remark PR #61 merged as f978b21 after Node 24/26, lint and seven Chromium tests. Release v0.5.0 publish run 38748230961 succeeded; npm metadata exposes Node >=24, core ^2.0.0 and provenance. The four installed published JS/declaration files match the locally checked build byte for byte.
- Both upstream builds use tsdown 0.23.1 and TypeScript 6.0.3. TypeScript 7 remains outside typescript-eslint’s supported range; Node types stay aligned to the Node 24 floor. Runtime source and existing assertions were preserved.
- Site selects official Node 24.22.0 through mise; the global selection for other projects is unchanged. It consumes published remark 0.5.0 / core 2.0.0, with one deduplicated Shiki 4.5.0 tree. Clean npm ci, all 18 tests and the 123-page build passed. Audit is zero and npm outdated reports no direct updates.
- All 32 rendered code blocks across 34 blog routes match the preceding build. A deliberately changed block was detected by the comparison control. The generated Pasmo link is descriptive and retains its destination.
- Actual PageSpeed measurements and the limited user-observed VoiceOver smoke check are recorded in the personal-site audit. Steve restored VoiceOver himself after the tool’s shortcut failed. Full manual accessibility coverage remains open; #79 is not closed.

Deployment-log verification found withastro/action selecting preinstalled Node 24.21.0 for the major-only input. Pin deploy.yml to 24.22.0 to match mise and verify the next CI log reports that exact patch. The initial Pages build passed all 18 tests and indexed 123 pages, but did not prove runtime alignment.
