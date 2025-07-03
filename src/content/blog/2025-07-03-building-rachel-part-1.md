---
title: "Building Rachel: A Phoenix LiveView Card Game - Part 1"
pubDate: 2025-07-03
excerpt: "How I turned a 30-year-old family card game into a modern web application using Phoenix LiveView, complete with AI opponents and real-time multiplayer."
tags:
  - elixir
  - phoenix
  - liveview
  - game-development
  - project-showcase
series:
  name: "Building Rachel"
  part: 1
---

For over 30 years, my friends and I have been playing a card game we call "Rachel." It's a fast-paced, strategic game with unique rules that create intense, unpredictable gameplay. Recently, I decided to bring this beloved tradition into the digital age using Phoenix LiveView.

*Note: This project was built in collaboration with Claude (Anthropic's AI assistant), who provided architectural guidance, code suggestions, and helped accelerate the development process significantly. The game concept and family tradition are mine, but the technical implementation benefited greatly from AI-assisted development.*

## The Game That Started It All

Rachel is played with a standard 52-card deck, but what makes it special are the strategic special card effects and stacking mechanics:

- **2s force pickups** that can be stacked for devastating penalties
- **7s skip turns** and can chain across multiple players  
- **Black Jacks deal 5-card penalties** - the game's nuclear option
- **Red Jacks counter Black Jacks** defensively
- **Queens reverse the direction** of play
- **Aces are wild** and let you nominate the next suit

The real excitement comes from the stacking rules. Play multiple 2s in a row, and the next player who can't counter picks up 2 cards per 2 played. It creates this incredible tension where a simple turn can escalate into someone picking up 8+ cards.

## Why Phoenix LiveView?

When I started thinking about digitalizing Rachel, I had a few key requirements:

1. **Real-time multiplayer** - The game loses its magic if you can't play with friends
2. **Complex state management** - Card stacking and special effects require precise rule enforcement  
3. **Responsive UI** - Cards need to feel tactile and immediate
4. **AI opponents** - Sometimes you want to play solo or need to fill empty seats

Phoenix LiveView turned out to be perfect for this. Here's why:

### Real-Time Without the Complexity
Traditional real-time multiplayer games require complex WebSocket management, client-side state synchronization, and careful handling of connection issues. LiveView abstracts all of this away while giving you real-time updates that feel instant.

### Server-Authoritative by Design
In LiveView, the server holds the authoritative game state. This makes preventing cheating trivial - the client literally cannot modify the game state directly. Players can't peek at other hands or manipulate the deck because all they can do is send events to the server.

### The Actor Model for Game Sessions
Elixir's GenServer pattern is perfect for game sessions. Each game runs in its own isolated process with its own state. If one game crashes, it doesn't affect others. Plus, OTP supervision means games can restart gracefully if needed.

## The Technical Architecture

Here's how I structured the application:

```elixir
# Game logic layer - completely independent of web concerns
Rachel.Games.Game          # Core game engine and rules
Rachel.Games.Card          # Card representation  
Rachel.Games.Deck          # Deck shuffling and dealing
Rachel.Games.AIPlayer      # AI decision-making logic

# Web layer - handles UI and user interactions
RachelWeb.GameLive         # LiveView process managing UI state
RachelWeb.GameComponents   # Reusable UI components
Rachel.Games.GameServer    # GenServer managing game state
```

The separation is crucial. The game logic has zero dependencies on Phoenix or the web layer. This makes it incredibly easy to test complex card interactions without spinning up a web server.

## Building the Game Engine

The heart of Rachel is the rule validation system. Here's a simplified version of how special card effects work:

```elixir
def apply_card_effects(game, cards, player_id) do
  case get_card_effect(cards) do
    :pickup_two ->
      count = length(cards) * 2  # Stack multiple 2s
      %{game | pickup_count: game.pickup_count + count}
      
    :skip_turn ->
      skip_count = length(cards)  # Stack multiple 7s
      skip_players(game, skip_count)
      
    :black_jack ->
      %{game | pickup_count: game.pickup_count + 5}
      
    :reverse_direction ->
      reverse_count = length(cards)
      apply_direction_changes(game, reverse_count)
      
    # ... other effects
  end
end
```

The key insight is that most special cards can be stacked, and the effects accumulate. Play three 2s, and the next player picks up 6 cards. Play two Queens, and they cancel each other out.

## Testing Complex Game Logic

One of the biggest challenges was testing all the edge cases. Card games have lots of them:

- What happens when you stack 2s, but someone counters with more 2s?
- How do direction changes interact with skip effects?
- What if the deck runs out during a penalty pickup?

I ended up with comprehensive test coverage that reads almost like game documentation:

```elixir
describe "card stacking edge cases" do
  test "multiple 2s accumulate pickup count correctly" do
    game = start_game(["Alice", "Bob", "Charlie"])
    
    # Alice plays a 2
    game = play_cards(game, "Alice", [two_of_hearts()])
    assert game.pickup_count == 2
    
    # Bob adds another 2  
    game = play_cards(game, "Bob", [two_of_spades()])
    assert game.pickup_count == 4
    
    # Charlie can't counter, picks up 4 cards
    game = apply_turn_end(game, "Charlie")
    charlie_hand = get_player_hand(game, "Charlie")
    assert length(charlie_hand) == 11  # Started with 7, picked up 4
  end
end
```

These tests were invaluable when implementing the LiveView layer. I could focus on the UI knowing the game logic was rock-solid.

## AI-Assisted Development in Practice

Working with Claude on this project was a fascinating experience in collaborative development. The AI helped with:

- **Architectural decisions** - Suggesting the clean separation between game logic and web layers
- **Elixir idioms** - Ensuring the code followed proper OTP patterns and conventions
- **Edge case identification** - Helping think through complex card interaction scenarios
- **Test coverage** - Suggesting comprehensive test cases for game logic
- **Performance considerations** - Optimizing for real-time multiplayer requirements

The human-AI collaboration worked particularly well because I brought the domain knowledge (30 years of playing Rachel) while Claude contributed software engineering best practices and Phoenix LiveView expertise. The result was cleaner, more robust code delivered much faster than traditional solo development.

This kind of AI-assisted development is becoming increasingly common, and I think it's important to be transparent about it. The creativity, vision, and domain expertise are still fundamentally human, but AI can significantly accelerate the technical implementation.

## Deployment with Fly.io

I'm planning to deploy Rachel to Fly.io, which is perfect for Phoenix LiveView applications. Fly.io offers:

- **WebSocket support** out of the box (essential for LiveView)
- **Global edge network** for low-latency real-time gameplay
- **Free custom domains** with automatic SSL certificates
- **Elixir-optimized infrastructure** built by people who understand BEAM

The deployment process is refreshingly simple:

```bash
# Deploy to Fly.io
fly deploy

# Add custom domain (free!)
fly certs add rachel.stevehill.xyz

# Point DNS: rachel.stevehill.xyz → app-name.fly.dev
```

Rachel will be available at [rachel.stevehill.xyz](https://rachel.stevehill.xyz) once deployment is complete.

## What's Next

In the next post, I'll dive into the LiveView implementation - how to handle real-time updates, manage player connections, and create smooth animations for card plays. I'll also cover the AI system and how I made computer opponents that actually feel like they're thinking strategically.

The complete source code is available on [GitHub](https://github.com/stevehill1981/rachel).

Building Rachel has been a joy - it combines the technical challenges I love (real-time systems, complex state management, AI) with something deeply personal (a game I've played for decades). Phoenix LiveView made it possible to focus on the game itself rather than fighting with infrastructure, and AI assistance helped turn months of work into weeks.

Stay tuned for Part 2, where we'll explore the real-time multiplayer implementation and see how LiveView makes complex UI interactions surprisingly simple.