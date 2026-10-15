# Browser regression coverage and remaining audit checks

Steve approved the proposed follow-up on 15 October 2026. Keep the Open Table design and existing content. Re-consulted RULES.md and knowledge/log.md: describe Code198x broadly and keep Work With Me outside top navigation.

## Tasks

1. Remove the duplicated deployment Node pin in `.github/workflows/deploy.yml`: read `tools.node` from `mise.toml` with Python's built-in TOML parser and pass the output to withastro/action. Verify the workflow builds with the declared version; retain existing unit tests and Pages deployment.
2. Subject to explicit dependency approval, add `@playwright/test`, `playwright.config.mjs`, browser tests under `browser-tests/`, package scripts, ignore rules and a CI workflow. Test the built/indexed site using a bounded preview process. Keep Node's existing test discovery separate from browser tests. Exercise Chromium, Firefox and WebKit without changing the user's browser profiles or preferences.
3. Assert visitor outcomes: usable search/results with background inert, keyboard containment and focus restoration, search after Astro navigation, mobile disclosure/Escape/navigation reset, retained styling across navigation, and real code copied once per code block. Include a deliberate broken-behaviour control to prove the suite goes red, then restore and rerun the affected test.
4. Add bounded emulation coverage for reduced motion, forced colours and narrow reflow. Distinguish these from physical touch, Safari itself, actual browser zoom and screen-reader speech. Capture and inspect evidence. Fix only reproduced defects, with their cause recorded first.
5. Consolidate a current status summary above the historical audit and update GitHub #79/#78 with verified outcomes and concrete remaining work. Do not close incomplete acceptance or claim WCAG conformance. Native Safari/VoiceOver testing requires an isolated site window and visible/confirmed state; avoid repeating unreliable shortcut toggles.
6. Verify clean install, unit tests, full build, browser suites, dependency audit and CI. Commit/push self-contained changes, verify deployment and live output, stop task-owned preview processes and remove disposable caches/browser downloads/artifacts. Preserve useful evidence in knowledge/audits.

## Limits

Steve explicitly approved adding @playwright/test; installed stable 1.64.1. No UI behaviour change is assumed necessary until reproduced. Playwright's WebKit is engine coverage, not a native Safari or VoiceOver test. Headless emulation does not establish physical-device or assistive-technology support.

## Reproduced defect before the fix

The 390px About-link click fails in Chromium and WebKit: the homepage h1 intercepts pointer events. The failure screenshot shows the hero painted through the expanded menu. Both header and main have view-transition-name, which establish independent stacking contexts; the menu's z-index 100 remains inside the header's auto-level context, painted below main. Give the existing header a positioned z-index above main, keeping the modal's higher sibling layer. Preserve the screenshot and rerun real clicks; never force the test click.

Playwright 1.64.1 was explicitly approved. Initial harness problems are separate: agent-inferred Astro background servers require --ignore-lock foreground ownership; DOM role queries are not native accessibility snapshots; Copy's accessible name changes after the write. Firefox's initial profile error is an environment diagnosis, not a site finding.

## Search focus cause

After the menu fix, Chromium's seven journeys passed and WebKit passed six. WebKit failed only focus restoration: after a pointer click, its button is not the active element, so openSearch stores body and Escape cannot restore the trigger. Record the click handler's currentTarget as the return target; keyboard-shortcut opening still stores document.activeElement. The existing real WebKit Escape assertion is the regression. Local Firefox exits before visiting a page with `Could not find profile folder.` Canonical TMPDIR did not change that result; retain Firefox in Linux CI rather than changing site code or disabling its tests.

## Local verification

Clean install, all 18 existing tests and the 123-page production build pass. Eight journeys each pass in Chromium and WebKit (16 total), including reduced motion, forced colours and 320px reflow. Native Safari's Tab preferences are not inferred: the forced-colour check explicitly focuses the skip link after keyboard input to inspect its focus paint. Code-copy checks capture the actual writeText payload using a test double, preserving the OS clipboard. An intentionally inert built dialog caused exactly one selected test to fail (exit 1); restoring the build made that test pass (exit 0). No source was changed for the control. Results, control status and inspected before/after/forced-colour screenshots are in knowledge/audits/2026-10-15-browser-regressions/.

The deployment now reads tools.node from mise.toml with Python tomllib. The actual workflow parser emits 24.22.0 and fails when the Node declaration is missing; CI still must verify its runtime output and all three browser engines. Native Safari/VoiceOver is waiting for an isolated front window; full speech, actual zoom and physical-touch acceptance remains separate.

## CI and acceptance

Run 38752174552 passed all 24 browser tests in Linux, including all eight Firefox journeys. The actual log confirms Node 24.22.0 read from mise, all 18 existing tests and 123 indexed pages. Relevant lines are retained as ci-results.txt in the evidence folder. This resolves the Firefox engine-coverage gap despite the local macOS launch error.

Steve deprioritised the full VoiceOver check for this round. No native Safari/actual-zoom session or accessibility setting changes were performed. Those manual checks remain explicit limits, not release-blocking claims of defects. A 15-minute CI build timeout bounds future browser installation/test failures.

## Live mobile focus follow-up

The live 390px menu now accepts the About click and navigation resets it. One Pagefind module import failed on the first search attempt; CLI asset requests returned 200/application/javascript and reload recovered to 19 Rachel results. No underlying network/cache cause is established.

Live Escape after mobile search exposed another concrete focus conflict: both the menu and modal document-level Escape handlers run, hiding the trigger before search can restore it. Document clicks within the search overlay also close the underlying menu. Keep underlying navigation open while the modal handles those events: ignore clicks inside the search overlay in the menu's outside-click handler, and ignore menu Escape while the search overlay is active. First Escape then closes only search and restores Search focus; second Escape closes the menu and restores its toggle. Add assertions for both, including an actual input click.

The expanded mobile test failed before the event guards and passes afterward. All 16 Chromium/WebKit journeys pass again against the rebuilt site. No forced click or disabled assertion was used. The full Linux gate runs again on push.

## Deferred-focus race caught by CI

Run 38753658676 blocked deployment at 22/24: Firefox shortcut return focus reported `Expected: focused / Received: inactive`; WebKit background focus exclusion reported `Expected: 1 / Received: 0`. The latter test overclaimed inert semantics: browsers must exclude the background, but may blur the current element when an inert focus is attempted. Assert the background link cannot receive focus, then continue the actual input/keyboard journey.

The former reveals the unguarded 100ms focus callback: closing during the opening animation returns focus, but queued input focus can steal it back while visibility is still transitioning. Freeze the clock before opening, close before the deferred callback, advance through it and assert the original link retains focus. Reproduce before adding a closed-overlay guard. This is a separate asynchronous path, not a reason to retry failing tests.

Controlled-clock reproduction failed in both Chromium and WebKit before the guard. After guarding closed/disconnected overlays, all 16 local journeys pass, including the controlled case. The background exclusion test now asserts the actual invariant rather than a platform-specific focus side effect.
