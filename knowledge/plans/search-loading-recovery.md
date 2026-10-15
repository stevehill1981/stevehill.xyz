# Fix search loading failure (#81)

15 October 2026. Steve requested fixing #81. Re-consulted RULES.md and knowledge/log.md: retain the existing design/content and navigation decisions. No dependencies or architectural changes are required.

## Cause and boundary

The original production request's transport failure is unknown. The shipped Pagefind UI 1.5.2 catches its dynamic pagefind.js import only to log it, leaves its API reference unset, and then waits for that reference while displaying “Searching…”. The site's synchronous try/catch only surrounds script insertion/constructor setup; it cannot catch that later async import. It also marks loading complete before the script succeeds and has no script error handler.

## Work and verification

1. Add browser failure injection in `browser-tests/search-loading.spec.mjs`. Abort the Pagefind module request to reproduce the original messages/spinner. Assert a visible recovery message, working close/Escape/focus, and recovery after reloading with delivery restored. Cover the UI bundle failing, slow loads timing out and navigation while loading. Run against the old build first; require red results.
2. In `src/components/SearchModal.astro`, await the runtime module import and the existing UI script before constructing PagefindUI. Show a small loading state, catch async errors and bound waiting; only mark ready after successful initialization. Keep a clear error with a Reload page button and writing link, because a full reload provides a fresh document/module state across browsers, without relying on their differing failed-import retry behaviour. Retain the existing UI and search index, with no speculative cache or service-worker changes. Prevent detached/aborted initializers from modifying a new page; keep close/reopen and focus behavior intact.
3. Verify blocked module/UI requests produce the recovery state, successful delivery plus reload returns real results, delayed loads do not steal focus after closure/navigation, and all existing journeys still pass. Inspect error/loading/success at desktop/mobile once; fix only concrete defects. Preserve evidence under `knowledge/audits/2026-10-15-search-recovery/`.
4. Run the 18 existing tests, 123-page production build and browser suite; commit/push normally and require all three engines in CI before deployment. Verify live output, update/close #81 with the precise application failure and remaining uncertainty about the original network request, update #79's follow-up link, and clean task browsers/caches/reports/processes.

## Reproduction and test isolation

Both blocked-asset tests failed against the old build. The runtime case reproduced the indefinite search failure; the UI-script case never produced a recovery control. Fault-injection tests block service workers only in this test file so Playwright routing can reliably inject failures (as documented by Playwright); the existing eight journeys per engine retain workers and worker unit tests remain unchanged. Tests explicitly count injected requests, so missing interception cannot pass. The navigation case now explicitly fails later module requests rather than accidentally stalling them; failed-import caching/retry differs by browser/session, so reload is a conservative recovery action, not a claim that all failed fetches are permanently cached.

## Local result

The 18 existing tests and 123-page production build pass. All 24 Chromium/WebKit cases pass (eight existing plus four new cases per engine); the two screenshot cases were then rerun after adding an opacity-state assertion and also pass. Desktop/mobile settled error screenshots were visually inspected; the initial mid-fade captures were replaced. Dependency audit reports zero vulnerabilities. No package or service-worker source changes were made. All three engines remain required in CI, with no retries.

The new application handler covers runtime-module/UI-script loading, a ten-second deadline, closure and Astro navigation during a pending load, and fresh-document recovery through the visible reload button. It does not claim to diagnose the original failed network request or handle every later index/WASM/shard transport error inside Pagefind.
