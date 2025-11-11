---
title: "Rachel - Strategic Card Game"
description: "A 30-year-old family card game rebuilt with Phoenix LiveView. Features strategic AI opponents, real-time multiplayer for 4-8 players, and three distinct visual themes. Proves Elixir isn't just for messaging systems - it's perfect for complex, stateful games."
tags:
  - elixir
  - phoenix
  - liveview
  - game-development
  - real-time
demo: "https://rachel.stevehill.xyz"
featured: true
technologies:
  - elixir
  - phoenix
  - liveview
---

Rachel is a fast-paced, strategic card game implemented in Phoenix LiveView, based on a 30-year-old family tradition. It combines the nostalgia of pub games with modern web technology to create an engaging multiplayer experience.

**✨ Now live at [rachel.stevehill.xyz](https://rachel.stevehill.xyz) with a complete theme system!**

The latest version features three distinct visual themes that completely transform the game's appearance - from clean Apple-inspired minimalism to luxury casino aesthetics. Users can switch themes instantly and their preferences persist across sessions.

## 🎮 What Makes Rachel Special

Unlike typical card games, Rachel features a unique combination of strategic special card effects and stacking mechanics that create intense, unpredictable gameplay:

- **Strategic special cards** - 2s force pickups, 7s skip turns, Black Jacks deal massive penalties
- **Stacking mechanics** - Build devastating combinations by playing multiple cards of the same rank
- **Smart AI opponents** - Intelligent decision-making that adapts to different difficulty levels
- **Real-time multiplayer** - Seamless LiveView updates for 4-8 players
- **Beautiful animations** - Smooth card transitions and visual feedback

## 🃏 Key Game Features

### Special Card Effects
- **2s**: Next player picks up 2 cards (stackable for massive penalties)
- **7s**: Skip the next player's turn (chainable across multiple players)
- **Black Jacks**: Force pickup of 5 cards (the game's nuclear option)
- **Red Jacks**: Counter Black Jacks defensively
- **Queens**: Reverse the direction of play
- **Aces**: Wild cards that let you nominate the next suit

### Technical Highlights
- **Phoenix LiveView** for real-time updates without JavaScript complexity
- **Dynamic theme system** with 3 distinct visual identities and instant switching
- **GenServer-based game engine** ensuring reliable state management
- **Comprehensive rule validation** preventing cheating and handling edge cases
- **Responsive design** with touch-friendly mobile interface
- **AI system** with strategic decision-making and difficulty levels
- **Production security** with CSP headers and comprehensive vulnerability protection

## 🚀 Technical Implementation

### Architecture
```elixir
# Game state managed by isolated GenServers
Rachel.Games.GameServer    # Authoritative game logic
RachelWeb.GameLive        # LiveView UI with real-time updates
Rachel.Games.AIPlayer     # Strategic AI decision engine
```

### Key Technical Challenges Solved
- **Complex stacking rules** - Multiple cards of the same rank with accumulating effects
- **Turn management** - Direction changes, skips, and player elimination
- **Real-time synchronization** - PubSub ensures all players see updates within 500ms
- **AI strategy** - Balances aggressive play with defensive card retention
- **Connection handling** - Graceful disconnection/reconnection with AI backfill

### Performance & Scalability
- **Sub-200ms response times** for card plays and game actions
- **Memory efficient** - Each game session uses <10MB memory
- **Concurrent games** - Supports 50+ simultaneous games
- **Fault tolerance** - Individual game failures don't affect other sessions

## 🎯 Development Philosophy

Rachel demonstrates several important software engineering principles:

### Test-Driven Game Logic
```elixir
describe "card stacking" do
  test "multiple 2s accumulate pickup penalty correctly" do
    game = Game.new(["Alice", "Bob", "Charlie"])
    |> Game.play_cards("Alice", [%Card{rank: "2", suit: "hearts"}])
    |> Game.play_cards("Bob", [%Card{rank: "2", suit: "spades"}])
    
    # Charlie must pick up 4 cards (2 × 2)
    assert Game.get_pickup_count(game) == 4
  end
end
```

### Separation of Concerns
- **Game logic** is completely independent of the web layer
- **AI decision-making** is modular and testable
- **LiveView** handles only UI state and user interactions
- **GenServer** manages game state with OTP supervision

### Real-Time Architecture
The game leverages Phoenix's strengths for real-time applications:
- PubSub for efficient broadcasting
- LiveView for seamless updates
- Presence for connection tracking
- Registry for game session discovery

## 🎨 User Experience Design

### Visual Polish
- **Three distinct themes** - Modern Minimalist, Premium Card Room, and Warm & Social
- **Instant theme switching** with localStorage persistence and smooth transitions
- **Theme-specific animations** with different timing functions and visual effects
- **Glowing effects** for special cards with theme-appropriate colors
- **Smooth animations** for card plays and transitions
- **AI thinking indicators** with animated dots
- **Direction flow animations** showing play order changes
- **Winner celebration** with theme-aware confetti effects

### Accessibility
- **Keyboard navigation** support
- **Screen reader friendly** card descriptions
- **Touch-optimized** interface for mobile devices
- **Clear visual feedback** for game state changes

## 📈 Future Enhancements

The modular architecture supports exciting future features:

- **Tournament mode** with bracket-style competition
- **Achievement system** tracking "Most Evil" plays and defensive heroics
- **Statistics engine** with leaderboards and player profiles
- **Multiple game variants** including "Ultimate Rachel" with expanded rules
- **Mobile app** using the JSON API foundation

## 🛠️ Technologies Used

- **Elixir 1.18+** - Concurrent, fault-tolerant backend
- **Phoenix 1.8** - Modern web framework with LiveView
- **PostgreSQL** - Reliable data persistence
- **Tailwind CSS + daisyUI** - Beautiful, responsive UI components
- **OTP GenServers** - Rock-solid game state management
- **ExUnit** - Comprehensive test coverage (80%+ on game logic)

## 🌌 The Rachel Multiverse

The Phoenix LiveView implementation you see above? That's just the **beginning**.

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
- Phoenix LiveView web implementation (you're looking at it)
- Comprehensive test suite validating game rules
- AI system with strategic decision-making
- Theme system with visual polish

**🚧 In Progress:**
- Finalizing RUBP protocol specification
- Setting up unified repository structure
- Building protocol server infrastructure

**📋 Planned:**
- First vintage platform implementations (DOS, C64, ZX Spectrum)
- Protocol server with matchmaking
- Community contribution framework
- Museum partnerships for vintage hardware testing

**⏰ Timeline:**
- Started: December 2024
- Estimated completion: Heat death of universe
- Current status: Lost our minds, found our purpose

### The Manifesto

From the [PROJECT_MANIFESTO.md](https://github.com/stevehill1981/Rachel):

> *"They said it couldn't be done.*
> *They said it shouldn't be done.*
> *They were probably right.*
> *We're doing it anyway.*
>
> *From 1 MHz to quantum qubits.*
> *From punch cards to neural implants.*
> *From sanity to madness.*
> *From madness to legend."*

See the full platform target list, technical specifications, and documentation at the [Rachel GitHub organization](https://github.com/stevehill1981/Rachel).

---

## 🎲 Why Build Rachel?

The **Phoenix LiveView version** showcases how Elixir excels at real-time, stateful applications:

- **Complex business logic** implementation with comprehensive testing
- **Real-time multiplayer** without the complexity of traditional WebSocket management
- **AI system design** with strategic decision-making
- **Graceful failure handling** in distributed systems
- **Modern web UX** with traditional gaming nostalgia

The **Rachel Multiverse** demonstrates something different:

- **Historical preservation** - Making computing history interactive and accessible
- **Cross-platform expertise** - Assembly on multiple architectures (6502, Z80, 68K, x86)
- **Protocol design** - Building communication systems that work on everything
- **Technical ambition** - Solving problems most developers wouldn't attempt
- **Educational mission** - Teaching through implementation across 50 years of computing

Rachel proves that you can capture 30 years of family tradition in a modern, accessible format **and** use it as a vehicle for preserving computing history, teaching low-level programming, and connecting every platform ever created through one universal game.

It's technical showcase meets historical preservation meets creative insanity. And it's working.