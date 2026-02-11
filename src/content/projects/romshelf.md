---
title: "Romshelf - ROM Collection Manager"
description: "A modern macOS ROM organiser with TOSEC/MAME support, archive handling, and emulator integration for retrogaming collections"
tags:
  - rust
  - tauri
  - svelte
  - typescript
  - gaming
  - desktop-app
github: "https://github.com/romshelf"
featured: false
technologies:
  - rust
  - tauri
  - svelte
  - typescript
  - sqlite
status: "In Development"
year: 2025
---

Romshelf is a ROM organiser for macOS, built with Rust and Tauri. It scans collections, verifies files against DAT catalogues (TOSEC, No-Intro, MAME), and handles archives without extraction — designed for collectors who care about accurate dumps and organised libraries.

## Core Features

- **Parallel scanning** of ROM directories with real-time progress
- **Archive support** — ZIP and 7z reading without extraction to disk
- **Hash verification** — CRC32, SHA1, MD5 against DAT files
- **100+ formats** — Cartridge, disc, and computer system detection
- **DAT file support** — XML parsing for TOSEC, MAME, No-Intro catalogues
- **Duplicate detection** and set completion tracking

## Technical Approach

The Rust backend handles the performance-critical work: **Rayon** for parallel hash calculation across CPU cores, **Tokio** for async file I/O (essential over network storage), and archive streaming that reads contents in memory without writing temporary files. The result is 130+ files per second over NAS storage.

The **Svelte 5** frontend receives real-time progress updates via Tauri events. **SQLite** persists ROM metadata between sessions.

## Current Status

Scanning, hashing, and format detection are working. Archive support (ZIP/7z) and DAT file parsing are in progress. Next up: the `organize` command that verifies files against DAT catalogues and moves them into the correct directory structure, then emulator integration.

The [blog post about building Romshelf](/blog/2025-11-30-building-romshelf-rom-collection-manager) covers the domain knowledge — why DAT versioning matters, what TorrentZip is for, and how TOSEC naming conventions work.
