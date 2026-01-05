---
title: "Building a ROM Collection Manager: Where Domain Knowledge Meets Multi-Threaded Rust"
pubDate: 2025-11-30
excerpt: "The technical challenges were solvable. The harder part was understanding how collectors actually work - the DAT ecosystem, verification workflows, and organisational patterns that had to shape every architectural decision."
tags:
  - development
  - rust
  - tauri
  - software-engineering
  - project-showcase
  - retro-gaming
---

Serious ROM collectors have a problem that casual users never encounter.

It's not finding ROMs - that's a separate concern entirely. It's *managing* them. Thousands of files across hundreds of archives. Multiple competing standards for what constitutes a "correct" dump. Verification workflows that determine whether your copy of Super Mario Bros. is the exact same bits that shipped on the original cartridge, or some modified version that's been floating around since 1998.

The tools exist. ClrMamePro has been the standard for decades. RomVault is powerful and actively maintained. But they're Windows-centric, often Java-based, with interfaces designed before mobile phones had touchscreens. On macOS, the options are worse.

I've been collecting ROMs for decades. I decided to build the tool I actually wanted.

## The DAT Ecosystem

Before writing any code, I had to understand how this world actually works.

The core concept is the DAT file - an XML catalogue that defines what a "correct" collection looks like. Each entry specifies a ROM's name, size, and cryptographic hashes (CRC32, SHA1, MD5). If your file's hashes match, you have a verified good dump. If not, you have... something else.

Three major standards dominate, each with different philosophies:

**TOSEC** (The Old School Emulation Center) focuses on scene preservation. If it was ever released, TOSEC wants to catalogue it - every region variant, every revision, every demo disc. Their naming convention is strict and information-dense: `Game Title (Year)(Publisher)(Region)(Flags)[Codes]`. The filename *is* the metadata.

**No-Intro** takes a minimalist approach. They want exactly one verified dump of each game - the cleanest, most accurate representation of what shipped. No scene releases, no hacks, no trainer versions. Just the canonical ROM.

**MAME** handles arcade games, which brings its own complexity: parent and clone relationships, shared ROMs between games, merged and split and non-merged set formats. That's a rabbit hole I'm deferring to a future version.

Here's the complication: DAT files themselves have versions. TOSEC 2024-01-01 might list different files than TOSEC 2023-06-15. Collectors often need to verify against *specific* historical versions, not just the latest. Building a tool that understands this versioning isn't optional - it's fundamental to how the community operates.

## Archive Complexity

ROMs don't just sit as loose files. They live in archives - ZIP files, 7z files, sometimes nested inside other archives.

The simple case: one ROM per archive. Scan the archive, hash the contents, done.

The complex case: disc-based systems. A PlayStation game might be a CUE sheet plus multiple BIN files, all in one archive. A multi-disc game doubles or triples that. The archive isn't just a container; it's a meaningful organisational unit.

Then there's TorrentZip - a community standard for creating deterministic archives. Same input files, same TorrentZip output, byte-for-byte identical every time. This enables hash verification of the archive itself, not just the contents. Collectors use this to confirm their archives match canonical distributions.

Understanding these patterns - how collectors actually organise and verify their collections - had to inform every architectural decision.

## Why Rust and Tauri

With the domain understood, I needed to choose a stack. The options:

**Electron** would mean JavaScript everywhere, which I know well. But Electron apps are heavy, and file-intensive operations benefit from lower-level control. Scanning thousands of files across network storage isn't a good fit for Node.js.

**Native Swift** would give me the best macOS experience, but locks out future cross-platform potential. Serious ROM collectors use Windows, Linux, macOS - often all three.

**A web app** can't do local file system operations properly. This is inherently a desktop application problem.

**Java** is what existing tools use. It works, but in 2024, I wanted something more modern.

**Rust with Tauri** offered an interesting compromise: a Rust backend for performance-critical operations (scanning, hashing, archive handling), with a Svelte frontend for rapid UI iteration. Tauri produces small binaries, has proper file system access, and the same codebase can eventually target Windows and Linux.

The honest confession: I'm not a Rust expert. Claude Code is doing the heavy lifting on implementation. But Rust's strengths - memory safety, fearless concurrency, excellent tooling - still apply even when an AI is writing most of the code. And I'm using this codebase to actually learn the language properly. Claude got it working; now I need to understand *why* it works.

## Multi-Threaded Scanning

The core technical challenge: scanning thousands of files, many in archives, often over network storage.

Sequential scanning is too slow. Opening an archive, reading contents, calculating hashes, moving to the next - it works but takes forever when you have tens of thousands of files spread across a NAS.

The solution is parallelism at multiple levels:

**Rayon** handles CPU-bound work. Hash calculation (CRC32, MD5, SHA1) parallelises naturally - throw files at worker threads, collect results. Rayon makes this almost trivial in Rust.

**Tokio** handles async I/O. File operations, especially over network storage, spend most of their time waiting. Async lets us issue many reads concurrently instead of blocking on each one.

**Archive streaming** avoids extracting to disk. The sevenz-rust and zip crates can read archive contents into memory, hash them, and move on without ever writing temporary files. This matters enormously for large collections - extracting 100GB of archives just to verify them would be painfully slow and storage-hungry.

The result: 130+ files per second over network storage, 100+ files per second for archived content. Real-time progress reporting keeps the Svelte UI updated via Tauri events.

## Where It's At Now

Two milestones complete:

**Milestone 1** delivered a CLI proof of concept with ZIP support. Basic scanning, hash calculation, format detection from file extensions.

**Milestone 2** added multi-threaded scanning and 7z archive support. This is where the performance gains came - what was minutes became seconds.

**Milestone 3** is in progress: batch DAT import and the `organize` command. The scanner can find and hash files; now it needs to verify them against DAT catalogues and move them into the correct directory structure.

The Svelte UI exists and shows real-time scan progress. The SQLite database persists ROM metadata between sessions. Eleven tests pass. It's a real, working tool - just not yet the complete tool I'm building toward.

## What's Next

The immediate roadmap:

- **DAT parsing** for TOSEC, No-Intro, and eventually MAME formats
- **Verification workflows** - scan against DAT, report matches and mismatches
- **Audit mode** - what's in my collection, what's missing, what's unverified
- **TorrentZip support** - both reading and creating deterministic archives
- **BOM handling** - some DAT files have byte-order marks that trip up parsers

Longer term, I want emulator integration (launch a verified ROM directly), save state management, and proper macOS integration (Quick Look previews, Spotlight indexing).

And personally: actually learning Rust. Reading the code Claude generates, understanding the ownership model, writing tests myself, eventually contributing code directly rather than just directing. The codebase is a learning vehicle as much as a product.

## The Point

The best tools are built by people who understand the problem.

The technical challenges in Romshelf - parallel scanning, archive handling, hash verification - are solvable by anyone with sufficient engineering ability. What's harder to acquire is the domain knowledge: why DAT versioning matters, what TorrentZip is for, how TOSEC naming conventions encode metadata, why collectors care about the difference between No-Intro and TOSEC philosophies.

I've been collecting ROMs for decades. The design decisions in Romshelf aren't coming from tutorials or Stack Overflow answers. They're coming from years of manually organising files, fighting with ClrMamePro's interface, wishing something better existed for my Mac.

Now I'm building it. The tool I always wanted - and learning Rust along the way.

---

*Romshelf is in active development. The codebase is at [github.com/romshelf](https://github.com/romshelf).*
