---
title: "Romshelf - ROM Collection Manager"
description: "A modern macOS ROM organizer with TOSEC/MAME support, archive handling, and emulator integration for retrogaming collections"
tags:
  - rust
  - tauri
  - svelte
  - typescript
  - gaming
  - desktop-app
github: "https://github.com/stevehill1981/Romshelf"
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

Romshelf is a modern ROM organizer and frontend for retrogaming collections on macOS, built with Rust and Tauri. It supports TOSEC, MAME, and other ROM sets with comprehensive archive support and seamless emulator integration.

## 🎮 Core Features

### ROM Management
- **Parallel scanning** of ROM directories with real-time progress
- **Archive support** - ZIP, 7-Zip, RAR reading without extraction
- **100+ formats** - Comprehensive cartridge, disc, and computer system support
- **Hash verification** - CRC32, SHA1, MD5 against DAT files
- **Duplicate detection** and set completion tracking

### Organization & Verification
- **TOSEC categories** - Auto-sort by Games, Demos, Applications
- **DAT file support** - XML parsing for TOSEC, MAME, No-Intro
- **Multiple DAT management** with cross-DAT deduplication
- **Missing ROM identification** and verification status
- **Parent/clone relationships** for MAME sets

### Emulator Integration
- **Per-system configuration** with command-line templates
- **Quick launch** directly from the UI
- **Save state management** and ROM organization
- **Cross-platform potential** with Tauri architecture

## 🛠️ Technical Implementation

### Rust Backend Architecture
```rust
// High-performance parallel scanning
pub struct RomScanner {
    pool: ThreadPool,
    progress: Arc<Mutex<ScanProgress>>,
}

// Format detection engine
pub struct FormatDetector {
    extensions: HashMap<String, SystemInfo>,
    signatures: Vec<FileSignature>,
}
```

### Key Technical Challenges Solved
- **Memory-efficient scanning** - Stream large archives without loading to memory
- **Parallel hash calculation** - Multi-threaded CRC32/MD5/SHA1 verification
- **Cross-platform file operations** - Tauri's secure file system access
- **Real-time progress updates** - Svelte reactive UI with backend communication

### Performance Highlights
- **Parallel processing** with Rayon for CPU-bound tasks
- **Async I/O** with Tokio for file operations
- **Memory-mapped files** for large DAT file parsing
- **Cached hash calculations** in SQLite database

## 🎯 Privacy-First Design

Romshelf is built with privacy as a core principle:

- **No analytics** - Zero telemetry or usage tracking
- **Local-only storage** - Everything stored on your Mac
- **Offline-first** - Internet only for optional metadata
- **No ROM sources** - Never links to download sites
- **Legal focus** - Highlights homebrew and public domain collections

## 📊 Current Status

### ✅ Completed Features
- Parallel ROM directory scanning with progress tracking
- Hash calculation (CRC32, MD5, SHA1) for verification
- System detection from 100+ file format extensions
- Clean Svelte 5 UI with real-time scan updates
- Tauri integration with secure file system access

### 🚧 In Progress
- Archive support (ZIP/7Z scanning without extraction)
- SQLite database integration for ROM persistence
- DAT file parsing (TOSEC, MAME, No-Intro XML)

### 📋 Planned Features
- Cross-DAT deduplication system
- ROM organization and file moving
- Emulator integration and launching
- TorrentZip format support

## 🔮 Future Vision

### Advanced Privacy Features
- **Local play statistics** and personal recommendations
- **Backup verification tools** for collection integrity
- **Save state backup management** (local only)
- **ROM hack/translation patching** capabilities

### macOS Integration
- **Quick Look plugin** for Finder ROM preview
- **Alfred/Raycast** launcher integration
- **Scripting API** for workflow automation
- **Custom DAT creation** tools

## 🛡️ Legal & Ethical Focus

Romshelf specifically promotes legal retrogaming by:
- Emphasizing homebrew and public domain collections
- Supporting personal backup verification workflows
- Never providing or linking to copyrighted ROM sources
- Focusing on collection organization rather than acquisition

## 🚀 Technologies Used

- **Rust 2024** - High-performance, memory-safe backend
- **Tauri 2.x** - Secure desktop app framework
- **Svelte 5** - Modern reactive frontend with runes
- **TypeScript** - Type-safe frontend development
- **SQLite** - Local database for ROM metadata
- **Tokio & Rayon** - Async I/O and parallel processing

Romshelf represents the intersection of modern software engineering with retrogaming preservation, providing collectors with a powerful, privacy-focused tool for managing their legitimate ROM libraries while respecting intellectual property rights.