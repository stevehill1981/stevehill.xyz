---
title: "Rachel"
description: "A strategic card game with a twist: the last player standing loses. Play solo against AI, locally via Game Center, or online (coming soon). Based on 30 years of family tradition."
tags:
  - swift
  - ios
  - game-development
  - gamekit
demo: "https://rachel.stevehill.xyz"
featured: true
technologies:
  - Swift
  - SpriteKit
  - GameKit
status: "Active"
year: 2024
---

Rachel is a strategic card game for iOS based on 30 years of family tradition. The twist? **The last player standing loses.** Empty your hand to survive—whoever's left holding cards at the end is out.

## 🎮 What Makes Rachel Special

Unlike typical shedding games, Rachel inverts the win condition. You're not racing to go out first—you're trying not to be last. This creates tense endgames where a commanding lead can collapse in moments.

- **Inverted victory** - Last player with cards loses
- **Strategic special cards** - 2s force pickups, 7s skip turns, Black Jacks attack, Queens reverse, Aces change suit
- **Stacking mechanics** - Chain multiple cards for devastating combinations
- **Smart AI opponents** - Multiple difficulty levels with adaptive strategy
- **Local multiplayer** - Game Center and local networking support

## 🃏 Special Cards

- **2s**: Next player picks up 2 cards (stackable for massive penalties)
- **7s**: Skip the next player's turn (chainable across multiple players)
- **Black Jacks**: Force pickup of 5 cards (the game's nuclear option)
- **Red Jacks**: Counter Black Jacks defensively
- **Queens**: Reverse the direction of play
- **Aces**: Wild cards that let you nominate the next suit

## 🎮 Game Modes

- **Solo** - Play against AI opponents with adjustable difficulty
- **Local Multiplayer** - Challenge friends via Game Center or local networking
- **Online** - Play against anyone, anywhere (coming soon)

## 🛠️ Built With

- **Swift** and **SpriteKit** for native iOS performance
- **GameKit** for Game Center integration and local multiplayer
- Test-driven game logic ensuring rule accuracy

## 🌌 The Rachel Multiverse

The iOS app is just the **beginning**.

### The Vision: One Game, Every Platform

Rachel is being developed as a **universal multiverse card game** - the same strategic gameplay implemented on every computing platform imaginable, all connected through a universal binary protocol.

**Planned platform count: 200+**

From vintage computers:
- Commodore 64 (1982) - 6502 assembly, VIC-II graphics
- ZX Spectrum (1982) - Z80 assembly, 48KB RAM
- MS-DOS (1981) - x86 assembly, VGA graphics
- Apple II (1977) - 6502 assembly, 1MHz processor

To modern systems:
- iOS/Android native apps
- Desktop applications (Windows/Mac/Linux)
- Terminal versions (ncurses)
- Smart TV implementations
- Even calculators, embedded systems, and smart appliances

**The truly absurd**: If it computes, it can play Rachel. We're talking mainframes, game consoles, handheld devices, PDAs, routers, oscilloscopes, and yes - even smart fridges.

### The Universal Protocol

At the heart of the multiverse is the **Rachel Universal Binary Protocol (RUBP)** - a 64-byte fixed message format designed to work everywhere:

```
Bytes 0-3:   Magic Header "RACH" [0x52 0x41 0x43 0x48]
Byte  4:     Protocol Version [0x01]
Byte  5:     Message Type (HELLO, PLAY_CARD, GAME_STATE, etc.)
Bytes 6-7:   Sequence Number
Bytes 8-9:   Player ID
Bytes 10-11: Game ID
Bytes 12-15: Timestamp
Bytes 16-63: Payload (48 bytes, message-specific)
```

**Design principles:**
- **Minimal size** - Fits in <1KB buffers (works on systems with severely limited memory)
- **Fixed layout** - No parsing complexity, works on 8-bit systems
- **Transport agnostic** - TCP/IP, serial connections, modems (300 baud to 5G)
- **Big-endian** - Universal byte order for maximum compatibility

### Cross-Platform Play

This isn't about nostalgia. It's about creating **impossible matchups**:

- A **Commodore 64** (1982, 1MHz CPU, 64KB RAM) battles an **iPhone 15** (2023, 3.46GHz CPU, 8GB RAM)
- A **ZX Spectrum** connected via RS-232 modem plays against a **Tesla's infotainment system**
- A **TI-83 calculator** competes with **modern gaming consoles**

Same game. Same rules. Different eras. Universal protocol.

### The Development Philosophy

**"If it computes, it plays Rachel."**

Each platform implementation:
- **Respects historical constraints** - C64 version uses authentic 6502 assembly and VIC-II sprites
- **Follows canonical rules** - GAME_RULES.md is sacred, no platform gets creative with rules
- **Works offline** - Every platform has full AI opponents for single-player
- **Connects online** - TCP-capable platforms join the multiverse server

**Why do this?**
- Preserve computing history through playable software
- Teach assembly programming across multiple architectures
- Create the most comprehensive cross-platform project ever attempted
- Unite every programming community through one shared game
- Because someone should, and nobody else is crazy enough

### Current Status

**✅ Complete:**
- iOS app with full game rules and AI opponents
- Game Center and local networking multiplayer
- Comprehensive test suite validating game rules

**🚧 In Progress:**
- Online multiplayer
- RUBP protocol specification
- Protocol server infrastructure

**📋 Planned:**
- First vintage platform implementations (DOS, C64, ZX Spectrum)
- Protocol server with matchmaking
- Community contribution framework

---

## 🎲 Why Build Rachel?

Rachel captures 30 years of family tradition in a format that can outlive us all.

The **iOS app** delivers the core experience—a polished, accessible game you can play right now.

The **Rachel Multiverse** is something bigger:

- **Historical preservation** - Making computing history interactive and accessible
- **Cross-platform expertise** - Assembly on multiple architectures (6502, Z80, 68K, x86)
- **Protocol design** - A 64-byte format that works on everything from a C64 to an iPhone
- **Technical ambition** - Solving problems most developers wouldn't attempt

A Commodore 64 playing against a modern smartphone. Same game. Same rules. Different eras. That's the goal.