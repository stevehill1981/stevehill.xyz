---
title: "Rachel - Strategic Card Game"
description: "A Phoenix LiveView implementation of a beloved family card game with AI opponents, real-time multiplayer, and beautiful animations"
tags:
  - elixir
  - phoenix
  - liveview
  - game-development
  - real-time
github: "https://github.com/stevehill1981/rachel"
demo: "https://rachel.stevehill.xyz"
featured: true
technologies:
  - elixir
  - phoenix
  - liveview
---

Rachel is a fast-paced, strategic card game implemented in Phoenix LiveView, based on a 30-year-old family tradition. It combines the nostalgia of pub games with modern web technology to create an engaging multiplayer experience.

*Currently in development - live demo coming soon at rachel.stevehill.xyz via Fly.io deployment.*

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
- **GenServer-based game engine** ensuring reliable state management
- **Comprehensive rule validation** preventing cheating and handling edge cases
- **Responsive design** with touch-friendly mobile interface
- **AI system** with strategic decision-making and difficulty levels

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
- **Glowing effects** for special cards
- **Smooth animations** for card plays and transitions
- **AI thinking indicators** with animated dots
- **Direction flow animations** showing play order changes
- **Winner celebration** with confetti effects

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

## 🎲 Why Build Rachel?

This project showcases how Elixir and Phoenix LiveView excel at real-time, stateful applications. It demonstrates:

- **Complex business logic** implementation with comprehensive testing
- **Real-time multiplayer** without the complexity of traditional WebSocket management
- **AI system design** with strategic decision-making
- **Graceful failure handling** in distributed systems
- **Modern web UX** with traditional gaming nostalgia

Rachel proves that Elixir isn't just for messaging systems and APIs - it's perfect for building engaging, interactive applications that need to handle complex state and real-time updates reliably.

The game captures 30 years of family tradition in a modern, accessible format while serving as a technical showcase of Phoenix LiveView's capabilities for building sophisticated real-time applications.