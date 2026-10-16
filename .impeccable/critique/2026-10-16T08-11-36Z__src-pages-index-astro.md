---
target: the live site
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:/Users/stevehill/Projects/SteveHillXYZ/src/pages/index.astro"
target_fingerprint: "sha256:3da33229e78ed7baa3fac5294a77377f18fe021822dd18e731214c485dca1cd1"
target_path: /Users/stevehill/Projects/SteveHillXYZ/src/pages/index.astro
timestamp: 2026-10-16T08-11-36Z
slug: src-pages-index-astro
closed: true
---
Method: dual-agent (A: design review · B: detector + browser overlay), plus Tasteskill v2 cross-check. Live site at 597db64.

## Design Health Score: 27/40 (Acceptable)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | False "Site updated" toast on every first visit |
| 2 | Match System / Real World | 3 | "IC" unexplained |
| 3 | User Control and Freedom | 3 | Solid exits |
| 4 | Consistency and Standards | 2 | Mixed case, Code198x naming, status placement, three date formats |
| 5 | Error Prevention | 3 | Little to go wrong |
| 6 | Recognition Rather Than Recall | 3 | Icon-only search in mobile menu |
| 7 | Flexibility and Efficiency | 3 | Search, RSS, series, topics, archive, TOC |
| 8 | Aesthetic and Minimalist Design | 3 | Tag-chip noise on index cards |
| 9 | Error Recovery | 2 | Empty search gives no next step |
| 10 | Help and Documentation | 3 | Start here / Series / Topics as map |

## Design Specificity
Partly specific: home welcome, honest project framing and article pull-quote are authored; Writing/Projects indexes and project detail read as a recoloured theme. Detector: 46 design-system drift items (25 font-size, 18 colour, 2 radius, 1 font), no anti-patterns; 18 in unused src/components/CodeBlock.astro. Browser overlay: only cream-palette (false positive vs approved cream).

## Priority Issues
- [P1] False "Site updated" toast for first-time visitors. sw.js skipWaiting()+clients.claim() defeats controller guard at BaseLayout.astro:138. Covers content, false aria-live announcement. Fix: capture hadController before register(). /impeccable harden
- [P2] Writing index is a 36-card two-column wall with tags and flat h2 outline (blog/index.astro:71). Fix: single-column year-grouped list, no tags, h3 titles. /impeccable distill
- [P2] Status is weakest element on Projects rows (far right) and Rachel detail (sidebar near-empty). /impeccable layout
- [P2] Inconsistent case (About Me, Related Posts, Copy Link, Project Info, SHARE:), Code198x vs Code Like It's 198x, tag casing, 8 status words, en-US vs en-GB dates. /impeccable clarify
- [P3] Homepage writing row: 800px title-to-date jump, ~20px off-grid with project column 2, no closing beat. /impeccable polish

## Persona Red Flags
- Jordan: Refresh prompt on first visit; IC unexplained; Code198x looks like two things; dead-end empty search.
- Sam: false live announcement, toast buttons auto-remove at 10s; h1 textContent "Steve.I make" missing space (index.astro:14); 36 sibling h2s.
- Casey: toast covers first project; footer links 25px and "All writing" 22px tall; /projects/ 7162px on mobile.

## Minor Observations
Zero-star stats; generic Projects intro; letterboxed home screenshots; empty Start-here column; back-to-top over a rule at 390px; contrast passes (~6.1:1 muted, ~5.9:1 brick).

## Questions to Consider
- What would make the Writing and Projects indexes recognisably yours rather than a recoloured theme?
- Should Writing lead with the durable map and move the chronological wall behind Archive?
- Should the homepage end with an invitation rather than three titles?

## Tasteskill v2 cross-check
Overall 6.0 after caps (unchanged); inspector 3 FAIL 4 WARN; lint 17 FAIL 15 WARN. Morning findings 1-4 fixed; first-visit toast remains and now overlays content.
