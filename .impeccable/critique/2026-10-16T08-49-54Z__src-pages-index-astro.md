---
target: the live site after fixes
total_score: 23
max_score: 32
na_heuristics: 5,10
p0_count: 0
p1_count: 1
target_identity: "file:/Users/stevehill/Projects/SteveHillXYZ/src/pages/index.astro"
target_fingerprint: "sha256:dc50cc504739027eff7c62f2f62b8684658ecd0e243f5d8989dbf1c53e304452"
target_path: /Users/stevehill/Projects/SteveHillXYZ/src/pages/index.astro
timestamp: 2026-10-16T08-49-54Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser overlay). Live site after the 16 October critique fixes (9141016); four follow-ups fixed afterwards in 6172ebd.

## Design Health Score: 23/32 (72%, Good). 5 and 10 n/a (Read mode).
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No homepage nav marker |
| 2 | Match System / Real World | 3 | "Now", "IC", Phosphene's role need a beat |
| 3 | User Control and Freedom | 3 | Solid |
| 4 | Consistency and Standards | 2 | Guardrails post uses sentence-case headings; status vs description contradictions; duplicated Phosphene paragraph |
| 5 | Error Prevention | n/a | Read mode |
| 6 | Recognition Rather Than Recall | 3 | Unnamed stat icons (fixed in 6172ebd) |
| 7 | Flexibility and Efficiency | 3 | Good accelerators |
| 8 | Aesthetic and Minimalist Design | 3 | Dark letterbox beds; catalogue chips |
| 9 | Error Recovery | 3 | Empty search redundant copy (fixed in 6172ebd) |
| 10 | Help and Documentation | n/a | Personal reading site |

## Design Specificity
Mostly specific: homepage, statuses and article reading are authored; the Projects catalogue and About sidebar remain generic. Detector: 30 advisory findings (27 font-size outside DESIGN.md, 3 colours), no anti-patterns. Overlay: cream-palette everywhere (false positive), 10 line-length on /blog/ at 1440 (fixed in 6172ebd).

## Priority Issues
- [P1] Statuses contradict copy: Shelved "Paused" vs description "shut down"; Paused Chaotic Tanx leads with "Visit project website". /impeccable clarify
- [P2] Homepage project images read as dark letterboxed slabs at 202px. /impeccable layout
- [P2] Guardrails post headings and the rescue-projects title use sentence case, against the Title Case content style. /impeccable clarify
- [P2] Stat icons unnamed, zero forks shown (fixed in 6172ebd). /impeccable harden
- [P2] Homepage has no closing invitation or collaborator path. /impeccable onboard

## Persona Red Flags
- Jordan: "Now" unexplained; "I make things" (Home) vs "I fix things other people gave up on" (About) with no bridge; IC unexplained in title.
- Sam: unnamed stat icons (fixed); double tab stop per homepage project (image + title link).
- Casey: About sidebar links 21px (fixed); RSS feed wraps alone on mobile Writing nav.
- Prospective collaborator: Home never mentions experience or rescue work.

## Minor Observations
Status shown twice on Rachel; summaries repeat statuses; spaced hyphens in catalogue titles; Start here column empty; vestigial separators in blog nav; straight vs curly apostrophe in Code Like It's 198x.

## Questions to Consider
- What if one project image were allowed to be big?
- Which identity should a reader remember, maker or fixer?
- With a year-grouped Writing index, what is Archive for?
