---
title: "Chaotic Tanx"
description: "An iOS artillery game with destructible terrain and physics-based ballistics. Paused pending refactoring to address performance and playability."
tags:
  - swift
  - spritekit
  - ios
  - game-development
  - physics
demo: "https://chaotictanx.stevehill.xyz"
featured: true
technologies:
  - swift
  - spritekit
  - ios
status: "Paused"
year: 2025
---

Chaotic Tanx is an artillery game for iOS in the tradition of Scorched Earth and Worms. Built with SpriteKit, it features destructible terrain, realistic ballistics with wind effects, and turn-based multiplayer via Game Center.

## Current Status

Development is paused. I thought the game was closer to ready than it was, but performance and playability issues made me reconsider. It needs substantial refactoring before I can move it forward.

## Core Gameplay

**Destructible terrain** is the centrepiece — every explosion carves permanent craters into the landscape, changing the battlefield as you play. The terrain system uses real-time bitmap manipulation with physics bodies that regenerate after each impact, keeping collision shapes in step with the terrain.

Combat uses intuitive drag-to-aim controls with a visual arc preview. Different weapons suit different situations: the basic cannon for precision shots, the Sunburst Launcher for area denial (it splits into 3–5 projectiles at trajectory peak). Wind effects and realistic ballistics mean you're solving physics problems under pressure.

Screen shake, particle explosions, and muzzle flash effects sell the impacts.

## Game Modes

- **Single player** — AI opponents that adapt their strategies
- **Local multiplayer** — Turn-based via Game Center
- **Touch-optimised** — iPad-first, landscape orientation

## Built With

**Swift** and **SpriteKit**, targeting iPad (2022) and newer. The terrain destruction system was the hardest technical challenge — modifying textures in real time with CGContext while keeping physics bodies synchronised and maintaining frame rate.

## What's Next

Refactoring to address performance and playability comes before further features.

---

[Project website](https://chaotictanx.stevehill.xyz)
