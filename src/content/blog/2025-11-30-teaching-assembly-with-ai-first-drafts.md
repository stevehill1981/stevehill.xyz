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

The assembly programming resources I wanted didn't exist. Reference manuals and scattered tutorials, sure — but nothing that teaches through building complete games with modern tooling while respecting the authentic constraints of the hardware.

So I'm building it. [Code Like It's 198x](https://code198x.stevehill.xyz) teaches assembly programming on the Commodore 64, ZX Spectrum, NES, and Amiga. AI generates the first drafts. Authentic assemblers from the era validate every code sample. I'll rewrite every lesson for accuracy and voice. That's the process, honestly stated.

Let me address the obvious question first, and then explain why this is worth doing.

<!--more-->

## The Audacity of This

Who am I to teach assembly programming for four different CPU architectures?

I'm not an expert in 6502 opcodes or Z80 addressing modes. I'm a software engineer who grew up with these machines — ZX Spectrum, then Amiga — and spent thirty years building software without ever learning them properly. The resource I'm building is the one I wish existed when I got a ZX Spectrum Next and wanted to understand it for real.

AI writes first drafts. I validate and rewrite. The credentials aren't expertise in assembly — they're decades of engineering experience, honest process, and infrastructure that catches mistakes before they ship.

## Why Vintage Computers?

Modern programming education starts with high-level abstractions:

```javascript
const users = await database.query('SELECT * FROM users');
```

This hides everything. Memory allocation, I/O operations, what "await" does at the CPU level. You can build a career without understanding any of it.

Vintage computers strip away the hiding places. A Commodore 64 has 64KB of RAM and a 1MHz processor. The NES has *two kilobytes*. At that scale, you can't import a framework, waste memory on convenience, or ignore optimisation. You learn to count cycles because your code must finish before the next frame.

These skills transfer directly. Embedded systems, game engines, performance-critical code — the patterns that power modern systems were invented on machines with 64KB of RAM. Understanding them isn't nostalgia; it's education.

That transfer works best when the teaching is concrete, which is why every lesson builds a game.

## Why Games?

Games are complete systems. Input handling, state management, rendering, audio, timing — all integrated into something that runs at 50 or 60 frames per second with no room for slop.

Each game in Code Like It's 198x teaches transferable patterns through concrete implementation. A rhythm game that uses the C64's SID chip. A platformer with smooth scrolling. A shooter managing dozens of sprites. The structure varies by complexity — some games take 8 units, some take 32 — but each unit produces something runnable.

Games also solve a motivation problem. Abstract exercises teach concepts; games teach concepts *and* produce something you want to show people. Progress is visible, not just theoretical.

Making this work across four architectures with AI-generated drafts requires infrastructure that matters more than the drafts themselves.

## The Validation Infrastructure

Every code sample must compile. This isn't negotiable.

Docker containers run authentic assemblers from the era — the same tools, or direct descendants, that developers used on the original hardware. If a code sample doesn't assemble, it doesn't ship. If it assembles but produces the wrong output, it doesn't ship. Every lesson goes through screenshot verification: the code runs in an emulator and must produce the expected result.

Enforced workflows mandate compilation, testing, and British English checks at every stage. These exist because AI-generated content produces code that looks plausible but doesn't work. The infrastructure catches what human review might miss.

This is where the real work lives. AI generates drafts; infrastructure validates them; I rewrite for quality. The validation layer is the product — not the first drafts.

## Where It Stands

Code Like It's 198x is live. The first C64 assembly game — "Starfield," a single-screen space shooter — has 16 published units teaching hardware sprites, joystick input, and SID sound effects. Fifteen more assembly games are planned for the C64 alone, progressing from platformers and maze games through scrolling shooters to a capstone with demo-scene techniques.

Each platform also has a BASIC track — eight simpler games that teach the interpreted language before learners move to assembly. The Amiga's equivalent uses AMOS, a BASIC dialect built for game development.

The vault has grown to over 1,200 entries covering the people, hardware, techniques, companies, and games that defined the era. Sixty-seven platforms are documented, from the Commodore PET to the Sega Dreamcast, though active curricula currently cover four: C64, ZX Spectrum, Amiga, and NES — with plans for eleven more.

The immediate work is completing Starfield's remaining phases and starting the next C64 game. But the bigger task remains the rewrite pass: revisiting every AI-generated lesson for accuracy, completeness, and voice. A multi-year project — I'm honest about the scope.

## The Point

Building in public means showing the scaffolding, not just the facade. I'm not pretending AI-generated first drafts are finished work, and I'm not pretending to expertise I don't have.

What I have is thirty years of software engineering, machines I grew up with and want to understand properly, and a process that's transparent about its limitations. If the lessons help you learn alongside me, that's the point.

---

*Code Like It's 198x is live at [code198x.stevehill.xyz](https://code198x.stevehill.xyz). The project is open source at [github.com/code198x](https://github.com/code198x).*
