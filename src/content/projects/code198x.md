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

An educational platform teaching assembly language programming through building complete retro games. Learn by doing—each game project teaches new skills while creating something you'll actually want to play.

## 🎯 The Problem with Modern Development Education

Modern programming education starts with high-level abstractions:

```javascript
const users = await database.query('SELECT * FROM users');
```

This code hides **everything**:
- How memory allocation works
- What "await" does at the CPU level
- How database queries translate to I/O operations
- Why `SELECT *` might be inefficient
- What happens when you run out of memory

You can build a career without understanding any of this. But when you need to optimize performance, debug weird behavior, or work on embedded systems, you're lost.

## 💡 The Solution: Learn Where Abstractions Don't Exist

Vintage computers force you to confront fundamentals because **there are no abstractions to hide behind**.

### The Constraints

**Commodore 64** (1982)
- CPU: 1MHz 6510
- RAM: 64KB (38KB available for programs)
- No operating system in the modern sense
- Every byte matters

**ZX Spectrum** (1982)
- CPU: 3.5MHz Z80
- RAM: 48KB
- No hardware sprites
- Want graphics? Draw them yourself, pixel by pixel

**Nintendo Entertainment System** (1983)
- CPU: 1.79MHz 6502
- RAM: 2KB (!!)
- ROM: 32KB typical cartridge
- Fixed 60Hz frame rate - miss it and your game stutters

**Commodore Amiga** (1985)
- CPU: 7.16MHz 68000
- RAM: 512KB
- Custom chips (Agnus, Denise, Paula) for graphics/sound
- Multitasking OS, but still bare metal programming

### What This Teaches

When you have **2KB of RAM** (NES), you can't:
- Import a framework
- Use inefficient algorithms
- Waste memory on convenience
- Ignore optimization

You learn to:
- **Count cycles** - your code must finish before the next frame
- **Manage memory manually** - every allocation is deliberate
- **Understand hardware** - you're programming chips, not abstractions
- **Optimize ruthlessly** - there's no headroom for waste

## 🎓 The Vision

A multi-phase learning platform where students progress through increasingly complex programming concepts:

### Curriculum Structure

**Phase 1: Foundations** (32 lessons per system)
- Memory addressing and registers
- Basic arithmetic and logic operations
- Loops, conditionals, and branching
- Drawing to the screen
- Reading input
- Making sound

**Phases 2-8: Advanced Topics** (planned)
- Sprite graphics and animation
- Scrolling and tile maps
- Interrupt handling
- Music and sound effects
- Game loop architecture
- Optimization techniques

### Learning Experience

- **Interactive lessons** with real code examples
- **Docker environments** with authentic assemblers
- **Emulator integration** for immediate feedback
- **Historical context** about each system's impact
- **Progressive difficulty** from "Hello World" to complete games

## 📊 Current Status

### Available Now

**Commodore 64** (MOS 6510)
- Game 1: Phase 2 available

**ZX Spectrum** (Zilog Z80)
- Game 1: Phase 1 available

**Nintendo Entertainment System** (Ricoh 2A03)
- Game 1: Phase 1 available

**Commodore Amiga** (MC68000)
- Game 1: Phase 1 available

### Technical Infrastructure

- **Docker-based toolchains** - One-command build and test, no setup friction
- **100% open source** - All code available on GitHub
- **Authentic assemblers** - CA65 (6502), PasmoNext (Z80), VASM (68000)

### Educational Content

Beyond the game tutorials, the site includes articles covering:
- The Rise of the Bedroom Coder
- Deep dives into hardware (VIC-II graphics, SID sound chip)
- Historical context for each platform

## 🔧 Technical Approach

### Why These Tools?

**Astro** for static site generation
- Fast builds, great for content-heavy sites
- Built-in content collections for lesson management
- Easy deployment to GitHub Pages

**Docker** for development environments
- Authentic assemblers from the actual era
- Consistent environment across machines
- No "works on my machine" problems

**Period-appropriate toolchains**:
```dockerfile
# C64 - using CA65 (6502 assembler)
FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y cc65

# ZX Spectrum - using PasmoNext (Z80 assembler)
FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y pasmo

# Amiga - using VASM (68000 assembler)
FROM debian:bullseye-slim
RUN wget http://sun.hasenbraten.de/vasm/release/vasm.tar.gz
```

**Emulators** for validation
- VICE (C64) - verify every code example actually runs
- Fuse (ZX Spectrum) - catch syntax errors
- Nestopia (NES) - ensure 60Hz timing
- FS-UAE (Amiga) - test OS integration

## 🎯 Why This Matters

### For Modern Developers

**Embedded systems programming** - These constraints mirror modern microcontrollers. If you can optimize for 2KB of RAM, you can optimize for anything.

**Performance optimization** - Understanding cycle counting and memory access patterns translates directly to modern CPU optimization.

**Problem-solving** - When you can't import a library to solve your problem, you develop creative solutions.

**Historical perspective** - The patterns that power modern systems (sprite engines, compression, state machines) were invented on these machines.

### Real-World Applications

- Game console development (Switch, PlayStation, Xbox)
- Embedded systems (IoT, robotics, automotive)
- Performance-critical code (game engines, video processing)
- Understanding compiler optimizations
- Low-level systems programming

The skills are timeless. The platforms are just **really good teachers** because they don't let you fake understanding.

## 🤖 The AI Collaboration

This project wouldn't exist without Claude. The scope is massive:

- 4 different CPU architectures (6502, Z80, 6510, 68000)
- 4 different systems with unique hardware quirks
- Hundreds of lessons to write
- Technical accuracy requirements
- Historical research

Claude helps with:
- **Content generation** - First drafts of lesson material
- **Code validation** - Catching assembly syntax errors
- **Historical research** - Gathering accurate technical specifications
- **Project momentum** - Maintaining progress on an overwhelming scope

But (and this is critical): **AI-generated content requires human verification**. Every code example needs to be assembled and tested. Every technical claim needs verification. AI accelerates the work but doesn't replace domain expertise.

## 🔗 Links

- [GitHub Organization](https://github.com/code198x) - Multiple repositories for each system
- Currently no live demo (too early in development)

---

**Reality Check**: This project might take years. Writing accurate, engaging technical education content is hard. Writing it for 4 different assembly languages is harder. But the end goal - helping modern developers understand how computers actually work - makes it worth the effort.

If you're interested in vintage computing, assembly programming, or just think this sounds cool, the repositories are public. Contributions welcome, but set your expectations accordingly about the current state.