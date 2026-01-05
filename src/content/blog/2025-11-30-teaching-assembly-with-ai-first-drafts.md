---
title: "Teaching Assembly Programming (With AI Writing the First Drafts)"
pubDate: 2025-11-30
excerpt: "I'm building an assembly programming education platform. AI generates the first drafts. Every lesson will be rewritten. The honesty is the point."
tags:
  - development
  - education
  - ai
  - retro-computing
  - software-engineering
  - project-showcase
---

I've been a software engineer for decades. I grew up programming a ZX Spectrum, then a Commodore Amiga. That turned into a career - thirty years of building software, from embedded systems to web applications.

But I never made a proper game. Not until very recently, when I built [Rachel](/projects/rachel), a web-based puzzle game. Somehow, despite all those years, I'd never shipped the thing I originally wanted to build when I was twelve years old.

Then I got a ZX Spectrum Next - a modern reimagining of the machine I learned to code on - and I wanted to actually learn it properly this time. Not just BASIC, but Z80 assembly. The real thing.

The learning resources I wanted didn't exist. There are reference manuals and scattered tutorials, but nothing that teaches through building complete games with modern tooling while respecting the authentic constraints. So I started building it myself.

## The Audacity of This

Let's address the obvious question: who am I to teach assembly programming for four different CPU architectures?

The honest answer: I'm not an expert. I'm a curator and a learner. I grew up with these machines and want to understand them properly. The resource I'm building is the one I wish existed when I got my Spectrum Next.

If that sounds like insufficient credentials to create an education platform, I understand. But I think the alternative - pretending to expertise I don't have - would be worse. So here's how it actually works.

## Why Vintage Computers?

Modern programming education starts with high-level abstractions:

```javascript
const users = await database.query('SELECT * FROM users');
```

This code hides everything. How memory allocation works. What "await" does at the CPU level. How database queries translate to I/O operations. You can build a career without understanding any of it.

Vintage computers force you to confront fundamentals because there are no abstractions to hide behind.

A Commodore 64 has 64KB of RAM and a 1MHz processor. A ZX Spectrum has 48KB. The NES has *two kilobytes*. When your entire working memory is 2KB, you cannot:

- Import a framework
- Use inefficient algorithms
- Waste memory on convenience
- Ignore optimisation

You learn to count cycles because your code must finish before the next frame. You manage memory manually because every allocation is deliberate. You understand hardware because you're programming chips, not abstractions.

These skills transfer. Embedded systems programming, game engine development, performance-critical code - the patterns that power modern systems were invented on machines with 64KB of RAM. Understanding them isn't nostalgia; it's education.

## Why Games?

Games are complete systems. Input handling, state management, rendering, audio, timing - all integrated into something that runs at 50 or 60 frames per second with no room for slop.

Each game in Code Like It's 198x teaches transferable patterns through concrete implementation. You're not learning abstract theory; you're building something that runs. A rhythm game that uses the SID chip. A platformer that scrolls smoothly. A shooter that manages dozens of sprites.

The structure varies by complexity - some games take 8 units, some take 16, some take 32. Each unit produces something runnable. You see progress, not just concepts.

## The AI Reality

Here's where I expect pushback.

First drafts of lesson content come from Claude. The explanations, the code samples, the pedagogical structure - AI-generated, then verified.

This is not a claim of expertise. It's an admission of process.

The criticism is valid: "Who are you to teach this if an AI is writing it?" My answer: I'm the quality controller. I'm the person who ensures every code sample compiles and runs. I'm the one who'll rewrite every lesson for accuracy and voice once the first pass is complete.

AI-generated content is starting material, not finished work. The validation infrastructure is the actual product.

## The Validation Infrastructure

Every code sample must compile. This isn't negotiable.

I've built Docker containers with authentic assemblers from the era:

- **ACME** for Commodore 64 (6510 processor)
- **sjasmplus** for ZX Spectrum (Z80 processor)
- **ca65** for Nintendo Entertainment System (6502 processor)
- **vasm** for Commodore Amiga (68000 processor)

If a code sample doesn't assemble, it doesn't ship. If it assembles but produces the wrong output, it doesn't ship. Every lesson goes through screenshot verification - the code runs in an emulator and must produce the expected result.

I've built a "skills" system - enforced workflows for lesson creation that mandate compilation, testing, and British English checks. These exist because AI-generated content can produce code that looks right but doesn't work. The infrastructure catches it.

This is the actual work. The AI generates drafts; the infrastructure validates them; I'll rewrite them for quality.

## What Exists Now

Code Like It's 198x is live at [code198x.stevehill.xyz](https://code198x.stevehill.xyz).

Current state:

- **One complete C64 game**: "SID Symphony" - 16 units building a rhythm game that makes the legendary SID chip sing
- **46 vault entries**: Historical reference material covering people (Jeff Minter, Matthew Smith), hardware (VIC-II, SID chip), techniques (sprite multiplexing, raster interrupts), and games
- **Platform pages** for Commodore 64, ZX Spectrum, Amiga, and NES - content in various stages of progress

More platforms are planned. Some might have a single game; others might have many. The coverage is driven by interest and feasibility, not a rigid roadmap.

## What's Next

The immediate work is more games across more platforms. The C64 curriculum has 16 games planned, progressing from simple to complex. The ZX Spectrum, Amiga, and NES have their own curricula in development.

But the bigger task is the rewrite pass. Every lesson that currently exists will be revisited for:

- **Accuracy**: Does the code actually do what the explanation claims?
- **Completeness**: Are there gaps in the explanation that would confuse a learner?
- **Voice**: Does it read like me, or like AI-generated text?

This is a multi-year project. I'm honest about the scope. Writing accurate, engaging technical education content for multiple CPU architectures is not fast work.

## The Point

I'm not an expert in 6502 assembly or Z80 opcodes or 68000 addressing modes. I'm someone who grew up with these machines and wants to understand them properly - thirty years later than I should have.

The resource I'm building is the one I wish existed. If it helps others learn, that's the goal. But I'm learning too, right alongside anyone who uses the site.

Building in public means showing the scaffolding, not just the facade. AI writes first drafts. Infrastructure validates them. I'll rewrite for quality. That's the process, honestly stated.

Thirty years of software engineering, and I'm finally making the games I never made as a kid. If the lessons help you do the same, that's the point.

---

*Code Like It's 198x is live at [code198x.stevehill.xyz](https://code198x.stevehill.xyz). The project is open source at [github.com/code198x](https://github.com/code198x).*
