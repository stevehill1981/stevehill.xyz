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

I just shipped three projects that had stalled for years — in one case, over two decades. Not three related features. Three separate things, each with different tech stacks, different purposes, different audiences:

- **Code Like It's 198x** — An assembly programming education platform teaching game development on C64, ZX Spectrum, NES, and Amiga
- **Rachel** — An iOS card game based on 30 years of family tradition, with visions of a multiplatform future
- **Chaotic Tanx** — An artillery game for iOS in the Scorched Earth tradition

Each one has been started, shelved, restarted, and shelved again more times than I can count. What finally broke the cycle? Claude — specifically, Opus 4.5.

<!--more-->

## The Connecting Thread

These projects look unrelated, but they share DNA.

Rachel has a vision beyond just iOS: what if this one card game ran on every computing platform ever made? A Commodore 64 playing against an iPhone. Same rules, same 64-byte protocol, different eras.

That vision connects directly to Code Like It's 198x. If I'm going to implement Rachel on a ZX Spectrum, I need to actually learn Z80 assembly. The educational platform is partly selfish — I'm building the resource I wish existed.

Chaotic Tanx is the outlier, but it scratches the same itch: games, platforms, shipping things that run. And once I had SpriteKit experience from Rachel, a second iOS game seemed natural.

Three projects. One thread: making games run on things. But none of them would have shipped without a step change in AI capability.

## What Opus 4.5 Made Possible

I've used Claude since 3.5 Sonnet. Each version improved. But Opus 4.5 feels qualitatively different — not incrementally better, but a step change in what's possible.

It holds context better. In a long session implementing a complex feature, it remembers decisions made hours ago and catches inconsistencies between what I said I wanted and what the code actually does. It explains not just "here's the code" but "here's why this pattern works here and wouldn't work there." And it pushes back appropriately — "that approach will work, but here's a simpler option" is useful feedback that earlier versions rarely offered.

That difference showed up concretely across all three projects.

**Code Like It's 198x.** Writing accurate assembly lessons for four different CPU architectures isn't something I could do alone. I grew up with these machines, but I never learned them properly. Claude generates first drafts. I validate them — every code sample must compile, every explanation must be accurate. Docker containers with authentic assemblers are the quality gate. If it doesn't assemble, it doesn't ship. With Opus 4.5, the first drafts need less work. The pedagogical structure is better. The code samples are more idiomatic.

**Rachel.** The game logic was well-understood — 30 years of family play will do that — but translating it to a native iOS app with AI opponents, Game Center multiplayer, and local networking meant learning Swift, SpriteKit, and GameKit simultaneously. Claude didn't just generate code. It explained why certain patterns work in SpriteKit. When I hit bugs in local multiplayer session management, we debugged them together. The AI opponents are genuinely strategic, balancing aggressive play with defensive card retention — logic that emerged from conversation, describing what good play looks like and iterating on the implementation.

**Chaotic Tanx.** An artillery game sounds simple until you implement it. Destructible terrain means real-time texture manipulation. Physics-based ballistics, wind effects, trajectory prediction, crater generation — each feature has hidden complexity. The breakthrough was getting destructible terrain working smoothly at 60fps, which required careful coordination between bitmap manipulation, physics body regeneration, and coordinate system handling. TestFlight beta means real players testing it now.

The coding is faster. The decisions — scope, taste, what feels right — are still mine.

## What AI Still Can't Do

The limits remain real.

**Graphics and music are still terrible.** AI-generated art looks like AI-generated art. Claude has drawn my tanks for Chaotic Tanx. It shows. They're placeholder until I find an artist. This might change, but right now, AI ships code, not aesthetics.

**Edge cases surface in reality.** Game Center's local multiplayer behaves differently than the documentation suggests. Assembly opcodes have timing subtleties that only matter on real hardware. You find these by shipping, not by asking.

**Scope discipline is still human.** Rachel's multiverse vision includes 200+ platforms. Code Like It's 198x could cover every retro system ever made. AI will happily build whatever you ask — the discipline of "this is enough to ship" is entirely yours.

These limits matter. But they didn't prevent shipping. They shaped what shipped.

## Real Artists Ship

There's something I didn't expect: how it feels to finally ship these things.

Twenty years of trying to make an artillery game. A year of thinking about teaching assembly. Watching my friends drift into busy lives where we rarely see each other. These weren't just ideas — they were frustrations. Things I wanted to exist and couldn't make happen.

Now they exist. And all three are still growing. Code Like It's 198x currently covers four platforms, with dozens more planned. Rachel needs online multiplayer, and then the multiverse work begins — Rachel on a Commodore 64, talking to Rachel on an iPhone. Chaotic Tanx is gathering TestFlight feedback that will shape what comes next.

The projects aren't finished. They may never be "finished." But they're shipped — real things in the world that people can use. After years of false starts, that matters more than I expected.

Real artists ship. And finally, I have.

---

*[Code Like It's 198x](https://code198x.stevehill.xyz) teaches assembly programming through game development. [Rachel](https://rachel.stevehill.xyz) is a strategic card game for iOS. [Chaotic Tanx](https://chaotictanx.stevehill.xyz) is an artillery game in TestFlight beta.*
