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

Rachel is a strategic card game for iOS based on 30 years of family tradition. The twist? **The last player standing loses.** Empty your hand to survive — whoever's left holding cards at the end is out.

## How It Plays

Unlike typical shedding games, Rachel inverts the win condition. You're not racing to go out first — you're trying not to be last. This creates tense endgames where a commanding lead can collapse in moments.

Special cards drive the strategy:

- **2s** force pickups (stackable for devastating penalties)
- **7s** skip turns (chainable across multiple players)
- **Black Jacks** deal 5-card penalties — the game's nuclear option
- **Red Jacks** counter Black Jacks defensively
- **Queens** reverse direction of play
- **Aces** are wild — nominate the next suit

## Built With

**Swift** and **SpriteKit** for native iOS performance, with **GameKit** for Game Center integration and local multiplayer. The game logic is test-driven to ensure rule accuracy across every edge case — stacking interactions, direction changes during skips, deck reshuffles mid-penalty.

## Game Modes

- **Solo** — Play against AI opponents with adjustable difficulty
- **Local Multiplayer** — Challenge friends via Game Center or local networking
- **Online** — Play against anyone, anywhere (coming soon)

## The Bigger Vision

The iOS app is the starting point. The long-term goal is to implement Rachel on as many computing platforms as possible — from vintage computers (C64, ZX Spectrum, DOS) to modern systems — all connected through a universal binary protocol. A Commodore 64 playing against an iPhone using the same rules and the same network protocol.

It's ambitious and aspirational. The iOS app comes first. The multiverse comes when there's time.

## Current Status

- iOS app with full game rules and AI opponents
- Game Center and local networking multiplayer
- Comprehensive test suite validating game rules
- Online multiplayer in progress

---

*Rachel started as a Phoenix LiveView web app before being rebuilt as a native iOS app. The [original blog posts](/blog/2025-07-03-building-rachel-part-1) describe that earlier version.*
