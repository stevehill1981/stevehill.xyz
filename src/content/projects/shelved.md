---
title: "Shelved - Media Collection Tracker"
description: "A privacy-focused Rails app for tracking books, movies, and TV shows. Shipped in a day with AI-assisted development, then shut down due to hosting costs."
tags:
  - rails
  - hotwire
  - mobile
  - privacy
  - tracking
featured: false
technologies:
  - rails
  - hotwire
  - postgresql
  - swift
  - kotlin
status: "Parked"
year: 2025
---

Shelved is a privacy-focused media collection tracker built with Rails 8 and Hotwire Native. It was designed for people who want to track what they own and where it lives — not what they've read or watched socially. It shipped in a day with AI-assisted development, ran on Fly.io for a while, and is now parked due to hosting costs.

## What It Did

Unlike Goodreads or LibraryThing, Shelved focused on physical collections:

- **Location tracking** — "Which bookshelf?", "Lent to whom?"
- **Barcode scanning** — Quick ISBN entry via mobile camera
- **Multi-format support** — Books, movies, TV shows with cross-references
- **API metadata** — Auto-populate from Google Books, TMDb, Open Library
- **Privacy-first** — No analytics, no social features, no tracking

## Technical Architecture

**Rails 8** with PostgreSQL, deployed to Fly.io. **Hotwire Native** provided iOS and Android apps without separate codebases — the mobile apps added camera access for barcode scanning and offline browsing. The data model was straightforward: books, shelves, loans, and cross-references between media types.

## Why It's Parked

Fly.io's hosting costs made it hard to justify for a personal tool. The app worked well — I used it daily for months — but running a Rails app with a PostgreSQL database for one household wasn't economically sustainable. The code is intact and could be revived with a cheaper hosting approach or a move to SQLite.

## What I Learned

Shelved became a [blog post about AI-assisted development](/blog/2025-11-30-shipping-shelved-in-a-day) — shipping a real Rails app in a day, and discovering that "AI makes it fast" really means "AI makes the typing fast." The decisions still take exactly as long as they need to.
