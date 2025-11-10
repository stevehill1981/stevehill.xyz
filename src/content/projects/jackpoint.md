---
title: "Jackpoint - Premium Virtual Tabletop"
description: "A Phoenix LiveView VTT platform for Shadowrun 6th Edition with full rules automation, investigation mechanics, and global campaign support"
draft: true
tags:
  - elixir
  - phoenix
  - liveview
  - gaming
  - rpg
  - real-time
github: "https://github.com/stevehill1981/Jackpoint"
featured: false
technologies:
  - elixir
  - phoenix
  - liveview
  - postgresql
  - postgis
status: "Planning"
year: 2025
---

Jackpoint is an ambitious virtual tabletop platform concept for Shadowrun 6th Edition, designed to make investigation as rewarding as combat through innovative mechanics and full rules automation.

> **🚧 Development Status**: This project is currently in the early planning and design phase. All features described below are aspirational goals that represent the complete vision for the platform. Actual implementation will begin with a much simpler MVP and evolve based on user feedback and technical feasibility.

## 🎯 Core Vision

### Investigation-First Design
- **Investigation Points (IP)** - Reward successful legwork with mechanical benefits
- **Prep-to-Advantage System** - Convert research into combat advantages
  - 2 IP = +1 Edge for the entire run
  - 3 IP = Knowledge of guard patterns and rotations
  - 5 IP = Ability to disable primary security system
  - 8 IP = Surprise round against primary targets
- **Intel Categories** - Blueprints, Personnel, Security, Matrix intel

### Full SR6 Automation (Planned)
- **Complete rules engine** - Edge system, AR/DR calculations, wild dice
- **Character creation** - Priority, Karma, and Sum-to-10 methods
- **Advancement tracking** - Karma expenditure, training time, initiation/submersion
- **Combat automation** - Initiative passes, damage calculation, status effects

## 🌍 Global Campaign System (Aspirational)

### Worldwide Setting Support
- **Real-world integration** - Not Seattle-focused, supports global campaigns
- **Regional mechanics** - Local laws, gangs, corporations, languages
- **Dynamic weather** - Environmental effects on gameplay (fog, rain, heat)
- **Location database** - 50+ pre-built sprawls across six continents

### Living World Features
- **News feed generation** - Stories based on shadowrun outcomes
- **Reputation tracking** - Street cred, notoriety, faction standings
- **Heat system** - Law enforcement and corporate attention mechanics
- **Contact network** - Visual relationship web with influence mapping

## 🎮 Advanced GM Tools (Future Goals)

### Multi-Campaign Management
- **6-8 concurrent users** - Optimized for small group play
- **Multiple campaign support** - Separate worlds and storylines
- **GM screen separation** - Private information and messaging
- **Scene transition tools** - Smooth narrative flow management

### Enhanced Interaction
- **Private messaging system** - Whisper mechanics and conditional information
- **Perception layers** - Different information per character
- **NPC generator** - Quick creation with personality traits
- **Dynamic content** - Reactive world based on player actions

## 🛠️ Technical Architecture (Proposed)

### Phoenix LiveView Foundation
```elixir
# Planned contexts for game management
Game          # Sessions, real-time state, dice rolling
Characters    # Sheets, advancement, inventory  
Rules         # SR6 engine, mechanics implementation
World         # Locations, weather, regional data
Campaign      # GM tools, NPCs, story management
```

### Real-Time Infrastructure Goals
- **Phoenix Channels** - Sub-200ms response times for dice rolls
- **PubSub messaging** - Efficient multi-user state synchronization
- **LiveView updates** - Seamless UI updates without JavaScript complexity
- **PostgreSQL + PostGIS** - Geospatial data for global map integration

## 💰 Premium Business Model (Conceptual)

### Potential Subscription Tiers
- **Free Tier** - Limited campaign size and features
- **GM Tier ($15/mo)** - Full campaign tools for one active campaign
- **Pro Tier ($30/mo)** - Multiple campaigns and advanced features
- **Enterprise ($100/mo)** - White-label and custom integrations

### Value Proposition
- **Complete automation** - No manual rule lookups or calculations
- **Investigation system** - Unique mechanics not found elsewhere
- **Global world data** - Pre-built content worth hundreds of hours
- **Premium support** - Direct access to development team

## 🚀 Development Roadmap

### Phase 1: MVP (First Target)
- Basic dice rolling with SR6 mechanics
- Simple character sheet storage
- Real-time updates for 2-4 players
- Basic GM/player separation

### Phase 2: Core Features
- Investigation Points system
- Combat automation basics
- Character creation wizard
- Session persistence

### Phase 3: Enhanced Experience
- Full rules automation
- Advanced GM tools
- Multiple campaign support
- Regional setting data

### Phase 4: Premium Features
- Living world mechanics
- AI-assisted GM tools
- Advanced visualization
- Multi-system support

## 🎯 Why Build Jackpoint?

This project aims to solve real problems in Shadowrun gameplay:
- **Investigation often feels unrewarding** compared to combat
- **Rules complexity** slows down gameplay
- **Global campaigns** lack proper support tools
- **GM preparation** takes too much time

By starting with clear goals and building incrementally, Jackpoint could become the premium VTT that Shadowrun deserves.

## 📡 Why "Jackpoint"?

In Shadowrun lore, Jackpoint is the exclusive virtual meeting place where elite shadowrunners share intel, plan operations, and trade information. This name perfectly captures the platform's focus on investigation and preparation, while immediately signaling authenticity to the Shadowrun community.

## 🚧 Current Reality

As of 2025, Jackpoint exists primarily as:
- A detailed design document (CLAUDE.md)
- Technical architecture planning
- Feature prioritization roadmap
- This aspirational project description

The journey from concept to reality begins with building a simple dice roller and growing from there. Every megacorp started in someone's garage, right chummer?