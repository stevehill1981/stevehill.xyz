# Visual direction round

Purpose: show Steve real-content browser previews before choosing the site-wide visual system. Working browser sketches are the current session path; no permanent workflow preference is inferred from the request to see a preview.

Product mechanism: connect the reasoning in Steve's writing to working software he has made. Readers arrive from an article or project link; the first page should introduce the person, show real work and make further reading inviting.

Grounded directions, ordered by resonance:

1. Small-press journal: cream, ink and olive; literary serif with quiet sans utilities. A clearly edited project spread joins personal introduction and essays. Familiar editorial territory is its risk.
2. Album liner notes: bone, tobacco and muted blue; generous credits-like type beside project images. Lets the creator and artifacts share a page; risks looking like a music site.
3. Independent bookshop: warm white, dark green and lettering with a human rhythm. A spacious front window of selected work; risks promoting browsing over reading.
4. Gallery guide: warm white, charcoal and restrained cobalt; clear captions and precise typographic hierarchy. Projects lead as objects with context; risks excessive formality.
5. Community noticeboard: pale ground, clay red and tidy sans type. Direct, friendly entries grouped by purpose; risks making independent projects feel ephemeral.
6. Civic wayfinding: warm stone, deep blue and brass; distinct navigation with calm destination pages. Clear long-form orientation; risks institutional tone.
7. Open table: cream, dark brown and brick; friendly broad sans headings, a serif note and uncropped artifacts. Personal introduction and project spread feel conversational, while articles inherit a measured column. Risks excessive informality.

The direction seed `0c6a94b1` assigned candidate 7. Its original result was reproduced using `--from`; an attempted `--help` unexpectedly emitted an unrelated surface roll, which is not the direction round. The small-press direction is the single grounded alternative. The centre-rail reference challenger is competitive for technical-reader identification but more formal and less immediate for introducing the person. The other five challengers lose audience identification and product clarity: dense web, transforming cape, ocean dive, data field and cutting bench. Their useful disciplines (information proximity, structural adaptation, orientation, contrast and consistent navigation) inform the Open Table direction without borrowing their motifs.

Payload: `.impeccable/questions/direction-options.json`. Previews: `.impeccable/mocks/decision/`. These are static first-viewport sketches, not implementation or an approved final system. Product links lead to existing public destinations; screenshots are the retained real assets. No production routes or styling change in this round.

Question server: `http://127.0.0.1:54367/`, key `5cbdf308`. Keep it only while Steve is reviewing the directions; stop it after a choice or cancellation. This task-owned local server is deliberately retained for that review, rather than an orphan process.

Decision: Steve approved the Open Table version in conversation, with a correction that Code198x covers much more than assembly programming. The live Code198x homepage confirms BASIC/AMOS/Blitz BASIC, foundations, game maths/craft, hardware and computing history alongside assembly. Proposed copy and a durable description rule are awaiting his approval under AGENTS.md's drift-correction instruction; no narrower copy should be carried into implementation.

Verification: all four sketches contain the three real embedded images and remain under 200 source lines. Three principal directions were visually inspected in the browser. Mechanical review found undersized reference captions and skipped heading levels; these were corrected, along with reference utility typography and cropped screenshots in the small-press sketch. Cream-palette warnings remain deliberately visible for the proposed palettes, pending Steve's choice; no ignores were added. These previews are not a whole-site accessibility or responsive approval. The raw Open Table preview and chooser are left open for review. Saved screenshot: `.impeccable/mocks/decision/open-table-desktop.png`.

## Resolution

Steve approved the broader Code198x copy and `RULES.md` addition, followed by the full article adaptation. The whole-site Open Table implementation now replaces the incumbent styling. The direction chooser and preview servers were stopped after review; static previews remain as design history. Preview-only palette exceptions and an unchanged-authored-prose exception are recorded in `.impeccable/config.json`. Production source reported zero detector findings. See `.impeccable/review/verification.md` for the implementation evidence and remaining validation limits.
