---
title: "Code Like It's 198x"
description: "Learn assembly programming by building complete retro games on C64, ZX Spectrum, NES, and Amiga. Docker-based toolchains eliminate setup friction, so you can focus on understanding how computers actually work."
featured: true
technologies: ["Astro", "Docker", "Assembly", "Emulation"]
status: "Active"
demo: "https://code198x.stevehill.xyz"
github: "https://github.com/code198x"
priority: 3
year: 2024
---

An educational platform teaching assembly language programming through building complete retro games. Learn by doing — each game project teaches new skills while creating something you'll actually want to play.

## The Problem

Modern programming education starts with high-level abstractions. You can build a career without understanding how memory allocation works, what "await" does at the CPU level, or why your algorithm is slow. When you need to optimise performance, debug hardware, or work on embedded systems, that gap catches up with you.

Vintage computers force you to confront fundamentals because there are no abstractions to hide behind.

## The Constraints That Teach

**Commodore 64** (1982) — 1MHz CPU, 64KB RAM, no operating system in the modern sense. Every byte matters.

**ZX Spectrum** (1982) — 3.5MHz Z80, 48KB RAM, no hardware sprites. Want graphics? Draw them yourself, pixel by pixel.

**Nintendo Entertainment System** (1983) — 1.79MHz 6502, 2KB RAM. Fixed 60Hz frame rate — miss it and your game stutters.

**Commodore Amiga** (1985) — 7.16MHz 68000, 512KB RAM. Custom chips for graphics and sound, but still bare metal programming.

When you have 2KB of RAM, you can't import a framework, use inefficient algorithms, or ignore optimisation. You learn to count cycles, manage memory manually, understand hardware directly, and optimise ruthlessly.

## Curriculum Structure

Students progress through increasingly complex projects on each system:

**Phase 1: Foundations** (32 lessons per system) — Memory addressing, registers, arithmetic, loops, drawing to the screen, reading input, making sound.

**Phases 2–8** (planned) — Sprite graphics, scrolling, interrupt handling, music, game loop architecture, optimisation techniques.

Each lesson runs in a **Docker environment** with authentic assemblers (CA65, PasmoNext, VASM) and emulators for immediate feedback. No setup friction — one command to build and test.

## Current Status

Four systems have Phase 1 content available (C64, ZX Spectrum, NES, Amiga). The site also includes articles on the history of bedroom coding and deep dives into hardware like the VIC-II and SID chip.

This project might take years. Writing accurate, engaging technical education content is hard. Writing it for four different assembly languages is harder. But the goal — helping modern developers understand how computers actually work — makes it worth the effort.
