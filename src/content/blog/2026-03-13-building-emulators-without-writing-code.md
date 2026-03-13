---
title: "Building Four Emulators Without Writing a Line of Rust"
pubDate: 2026-03-13
draft: true
excerpt: "I needed emulators that could script input and capture screenshots on demand. Nothing on the market did that. So I built four of them with AI — in a language I don't know — guided by decades of knowing what correct looks like."
tags:
  - development
  - ai
  - retro-computing
  - rust
  - project-showcase
---

I don't know how to program in Rust.

I now maintain cycle-accurate emulators for the ZX Spectrum, Commodore 64, NES, and Commodore Amiga — all written in Rust. I've barely written a single line of code in any of them. Every one was built in collaboration with Claude, Anthropic's AI, with me providing the specifications, the domain knowledge, and the quality gate.

<!--more-->

## The Problem That Started It

I run [Code Like It's 198x](https://www.code198x.com), an education platform teaching assembly language through building games on vintage hardware. The curriculum needs screenshots. Lots of them — showing specific moments in program execution, specific screen states after specific inputs, captured reliably and repeatably.

Existing emulators couldn't do this. VICE, FUSE, Mesen — they're excellent for playing games and debugging code. But none of them offered what I needed: the ability to script a sequence of inputs and capture screenshots or video at predefined times, programmatically and repeatably. Every curriculum update would mean manually booting an emulator, typing inputs, waiting, taking a screenshot, and hoping I got the timing right. For hundreds of lessons across four platforms, that wasn't going to work.

So the choice was: build the tooling I needed, or accept a manual process that would slow everything down.

I chose to build.

## Why Rust, When I Don't Know Rust

Rust was the right tool for emulation. Cycle-accurate CPU simulation needs predictable performance with no garbage collection pauses. The type system catches entire categories of bugs at compile time. The ecosystem has good cross-platform support for graphics and audio.

I didn't need to know Rust to know that. I needed to know what the right tool looked like — and after twenty years of picking languages to fit problems, I knew Rust was the answer even if I couldn't write it myself.

Claude could write Rust. I could validate the output. That was enough.

## What I Actually Did

I didn't write code. I did everything else.

I read the original hardware documentation. Zilog Z80 manuals. MOS 6502 datasheets. Motorola 68000 programmer's reference. Extracts from hardware reference manuals, books on the custom silicon in each machine. I provided this to Claude as specifications, and I knew when the implementation was wrong because I'd spent decades using these machines. I knew what correct looked, sounded, and felt like.

For the Spectrum, C64, and NES, the original documentation was sufficient. These are relatively simple architectures — a CPU, some memory-mapped I/O, and custom graphics and sound chips with well-documented behaviour. I didn't examine any pre-existing emulator source code for these platforms. The datasheets and hardware references, combined with running known software and checking the results, were enough.

The Amiga was different.

## The Amiga Nearly Broke Us

The Commodore Amiga has custom silicon — Agnus, Denise, and Paula — that handles graphics, blitting, and audio through a shared bus with complex timing dependencies. The 68000 CPU is straightforward by comparison. The custom chips are where the difficulty lives.

I validated some of the Amiga emulation logic against WinUAE and FS-UAE, two established and well-regarded Amiga emulators. This is standard practice in the emulation community — the 68000 and the custom chipset are complex enough that working implementations are a legitimate reference alongside the original documentation. I'm transparent about this because the retro community rightly cares about provenance.

The hardest part was the Agnus/Denise blitter pipeline. Getting the Kickstart boot screens to render correctly — 100% pixel-accurate — consumed enormous amounts of time and tokens. The blitter's timing, the interaction between copper lists and display output, the order of operations when multiple chip components compete for bus access — all of it had to be right, or the screen would show artefacts that anyone who'd used a real Amiga would spot immediately.

This is where the AI's limitations became obvious. Claude would look at screenshots of the output and tell me it looked correct. It was lying — not maliciously, but because it genuinely couldn't see what was wrong. I could see it instantly. A scanline out of place. A colour that wasn't quite right. A timing glitch that made the boot animation stutter in a way that no real Amiga ever did.

I'd been staring at Amiga boot screens since the late 1980s. I knew what correct felt like at a level that no amount of training data could replicate. That gap — between what the AI could verify and what I could see — was the gap that made my involvement essential rather than optional.

## The MCP Integration

Every emulator supports scripted input and timed screenshot capture. That was the whole point. But during development, I added something that closed the loop entirely: MCP server integration.

MCP — Model Context Protocol — lets Claude interact directly with external tools. With MCP support in the emulators, Claude can load a ROM, execute a sequence of inputs, capture a screenshot at a specific frame, and inspect the result. The same AI that helps write the Code198x curriculum can now run the code on a virtual machine and verify the output.

That means content creation for Code198x can happen in a single workflow. Write an assembly lesson. Assemble the code. Boot it in the emulator. Capture the screenshots. Verify the output. All without leaving the conversation. The emulators aren't standalone tools — they're part of a pipeline.

## What This Says About AI-Assisted Development

I didn't write the code. That's the headline, and it's true. But it's also misleading if you stop there.

I provided the specifications that made the code possible. I read the hardware manuals that Claude couldn't fully interpret. I validated every output against my own knowledge of these machines — knowledge built from decades of using them, not from a training set. I caught errors that the AI couldn't see. I made architectural decisions about what to build and why. I chose the language, the approach, and the scope.

The AI was the most productive pair programmer I've ever worked with. It wrote Rust fluently, it iterated fast, and it handled the mechanical translation from specification to implementation with remarkable competence. But it couldn't have built these emulators alone, because it didn't know what correct looked like. I did.

The role I played wasn't programmer. It was architect, domain expert, and quality gate. That combination — deep domain knowledge, clear specifications, and the ability to validate output — is what makes AI-assisted development work for genuinely complex projects. Without it, you get software that's confidently wrong.

## Where It Stands

Four emulators. Four CPU architectures. Cycle-accurate execution, scriptable input, timed capture, MCP integration. Written in a language I don't know, by an AI I guided, validated against hardware I grew up with.

They're not finished — more games need testing, edge cases need catching, and the Amiga will probably keep finding new ways to surprise me. But they work. Code198x uses them. And they exist because I needed something that wasn't there and refused to accept a manual workaround.

All four will be released as open source. I'm considering shipping the CPU cores and shared infrastructure as separate crates, so other emulator authors can use them as foundations for their own projects rather than starting from scratch. I've built them on macOS, but they've been cross-platform from day one — Linux and Windows support is baked in, not bolted on. There's also a planned WASM build for embedding directly into web pages, though ROM licensing makes that slightly more complicated than just shipping a binary.

More systems are planned. A 6809 CPU core would unlock the TRS-80 CoCo and the Dragon 32 — machines that are underserved by existing emulators and underrepresented in retro programming education. The architecture is designed to make adding new platforms straightforward — the scriptable input, timed capture, and MCP integration are shared infrastructure, not per-emulator work. Each new system needs its CPU, its memory map, and its custom silicon. The tooling around it is already there.

I don't plan to stop at the 8-bit and 16-bit era. The intention is to keep going into the 32-bit generation and beyond, until the hardware complexity outgrows my ability to comprehend and validate it. That's the real limit: not what the AI can write, but what I can verify.

The code is Rust. The knowledge is human. The emulators are both.
