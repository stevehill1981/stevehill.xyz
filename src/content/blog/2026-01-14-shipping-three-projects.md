---
title: "Shipping Three Projects (and What Opus 4.5 Made Possible)"
pubDate: 2026-01-14
excerpt: "An assembly education platform, an iOS card game, and an artillery game I've been trying to build since the early 2000s. Claude finally got them over the line."
tags:
  - development
  - ai
  - game-development
  - retro-computing
  - software-engineering
  - project-showcase
---

I just shipped three projects. Not three related features. Three separate things, each with different tech stacks, different purposes, different audiences.

- **Code Like It's 198x** — An assembly programming education platform teaching game development on C64, ZX Spectrum, NES, and Amiga
- **Rachel** — An iOS card game based on 30 years of family tradition, with visions of a multiplatform future
- **Chaotic Tanx** — An artillery game for iOS in the Scorched Earth tradition

None of these are new ideas.

Chaotic Tanx has been bouncing around since the early 2000s. I've probably tried to make that game a dozen times across two decades. Different engines, different platforms, never finished.

Code Like It's 198x crystallised about a year ago, but the underlying itch—wanting to *properly* learn the machines I grew up with—goes back further.

Rachel's been a family game for 30 years, but the need to build it digitally came later. As my friends and I "grew up," we stopped seeing each other as often. Game nights became rare. An online version meant we could still play together, even when life made in-person sessions difficult.

Each project has stalled and restarted more times than I can count. Different tech stacks, different approaches, different levels of ambition. Each time I'd get partway, hit a wall, and shelve it.

What changed? Claude. Specifically, Opus 4.5—and I don't think I could have finally shipped any of them without it.

## The Connecting Thread

These projects look unrelated, but they share DNA.

Rachel has a vision beyond just iOS: what if this one card game ran on every computing platform ever made? A Commodore 64 playing against an iPhone. Same rules, same 64-byte protocol, different eras.

That vision connects directly to Code Like It's 198x. If I'm going to implement Rachel on a ZX Spectrum, I need to actually learn Z80 assembly. The educational platform is partly selfish—I'm building the resource I wish existed.

Chaotic Tanx is the outlier, but it scratches the same itch: games, platforms, shipping things that run. And once I had SpriteKit experience from Rachel, a second iOS game seemed natural.

Three projects. One thread: making games run on things.

## What Opus 4.5 Made Possible

I've written before about AI-assisted development. The short version: it changes *what* takes time, not *whether* things take time. Scope, taste, and integration—those stay human work.

But Opus 4.5 is different. Not incrementally better. Qualitatively different.

### Code Like It's 198x

Writing accurate assembly programming lessons for four different CPU architectures is not something I could do alone. I grew up with these machines, but I never learned them *properly*. The 6502 and Z80 have different philosophies. The 68000 is another beast entirely.

Claude generates first drafts. I validate them—every code sample must compile, every explanation must be accurate. The Docker containers with authentic assemblers (CA65, PasmoNext, VASM) are the quality gate. If it doesn't assemble, it doesn't ship.

But here's what changed with Opus 4.5: the first drafts need less work. The pedagogical structure is better. The code samples are more idiomatic. I'm still rewriting everything, but I'm starting from a higher baseline.

The site is live with Game 1 content across all four platforms. That wouldn't exist without AI-generated drafts to work from.

### Rachel

Rachel has had multiple lives. It was a Phoenix LiveView web app at one point—that version worked, but didn't feel like the right home for the game. The current iOS implementation required learning Swift, SpriteKit, and GameKit—three technologies I hadn't used seriously before. The game logic was well-understood (30 years of family play will do that), but translating it to a native iOS app with AI opponents, Game Center multiplayer, and local networking was new territory.

Claude didn't just generate code. It explained *why* certain patterns work in SpriteKit. It helped me understand GameKit's architecture. When I hit weird bugs in local multiplayer session management, we debugged them together.

The AI opponents are genuinely strategic. They balance aggressive play with defensive card retention. That logic emerged from conversation—describing what good play looks like, iterating on the implementation, testing against human intuition.

### Chaotic Tanx

An artillery game sounds simple until you implement it. Destructible terrain means real-time texture manipulation. Physics-based ballistics means understanding SpriteKit's physics engine deeply. Wind effects, trajectory prediction, crater generation—each feature has hidden complexity.

The breakthrough moment was getting destructible terrain working smoothly at 60fps. CGContext bitmap manipulation, dynamic physics body regeneration from alpha channel data, proper coordinate system handling between world space and texture space. Claude helped me understand the architecture, then helped implement it piece by piece.

TestFlight beta means real players testing it now. That wouldn't have happened this month without AI assistance.

## The Opus 4.5 Difference

I've used Claude since 3.5 Sonnet. Each version improved. But Opus 4.5 feels like a step change.

It holds context better. In a long session implementing a complex feature, it remembers decisions made hours ago. It catches inconsistencies between what I said I wanted and what the code actually does.

It explains better. Not just "here's the code" but "here's why this pattern works here and wouldn't work there." The teaching quality improved, which matters when you're learning new stacks.

It pushes back appropriately. "That approach will work, but here's a simpler option" is useful feedback. Earlier versions were more likely to just implement whatever you asked, even when the ask was suboptimal.

The result: three projects that had stalled repeatedly finally crossed the finish line. Each one substantial. Each one actually used (by me, and hopefully by others).

## What AI Still Can't Do

Lest this sound like pure cheerleading: the limits remain.

**Taste is still human.** What should Rachel's card animations feel like? How should Code Like It's 198x structure its curriculum? When is Chaotic Tanx's terrain destruction *satisfying*? These are judgment calls that AI can't make.

**Scope is still human.** Each of these projects could be infinitely bigger. Rachel's multiverse vision includes 200+ platforms. Code Like It's 198x could cover every retro system ever made. AI will happily build whatever you ask—the discipline of "this is enough to ship" is entirely yours.

**Graphics and music are still terrible.** AI-generated art looks like AI-generated art. AI-generated music sounds like AI-generated music. Claude *has* drawn my tanks for Chaotic Tanx. It shows. They're placeholder until I find an artist or learn to draw. This might change, but right now? AI ships code, not aesthetics.

**Edge cases surface in reality.** Game Center's local multiplayer behaves differently than the documentation suggests. Assembly opcodes have timing subtleties that only matter when you run on real hardware. Safari's camera API has quirks that Chrome doesn't. You find these by shipping, not by asking.

The coding is faster. The decisions are still mine.

## What's Next

All three projects are live but not finished. And all three have platform ambitions.

**Code Like It's 198x** currently covers four platforms. I want to add dozens more—every interesting machine I can get my hands on. The C64 curriculum has 16 games planned. ZX Spectrum, Amiga, and NES have their own roadmaps. And as I add platforms to Code Like It's 198x, I learn the skills to implement Rachel on them too.

**Rachel** needs online multiplayer—the final game mode for iOS. And then the multiverse work begins: Rachel on a Commodore 64, talking to Rachel on an iPhone through a 64-byte binary protocol. Every platform I add to Code Like It's 198x becomes a potential Rachel target.

**Chaotic Tanx** needs more weapons, more terrain types, tournament modes. The TestFlight beta is gathering feedback that will shape what comes next. And eventually: other platforms. Android, Mac, maybe consoles. Not demakes—the full modern experience, wherever people want to play.

Three projects that spent years—in Chaotic Tanx's case, over two decades—in reboot cycles, finally shipped. Three projects continuing. And an AI that broke the cycle—not by replacing judgment, but by making the execution fast enough that momentum could build instead of stalling.

## Real Artists Ship

There's something I didn't expect: how it *feels* to finally ship these things.

Twenty years of trying to make an artillery game. A year of thinking about teaching assembly. Watching my friends drift into busy lives where we rarely see each other anymore. These weren't just ideas—they were frustrations. Things I wanted to exist and couldn't make happen.

Now they exist. Chaotic Tanx is on TestFlight, waiting for players. The Code Like It's 198x curriculum is live, ready for anyone who wants to learn alongside me. Rachel means I'll be able to play cards with friends who live hours away.

The projects aren't finished. They may never be "finished." But they're *shipped*—real things in the world that people can use. After years of false starts, that matters more than I expected.

Real artists ship. And finally, I have.

---

*[Code Like It's 198x](https://code198x.stevehill.xyz) teaches assembly programming through game development. [Rachel](https://rachel.stevehill.xyz) is a strategic card game for iOS. [Chaotic Tanx](https://chaotictanx.stevehill.xyz) is an artillery game in TestFlight beta.*
