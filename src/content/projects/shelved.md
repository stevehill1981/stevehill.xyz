---
title: "Shelved - Media Collection Tracker"
description: "A privacy-focused Rails app with Hotwire Native mobile apps for tracking books, movies, and TV shows with physical location awareness"
draft: true
tags:
  - rails
  - hotwire
  - mobile
  - privacy
  - tracking
github: "https://github.com/stevehill1981/Shelved"
featured: false
technologies:
  - rails
  - hotwire
  - postgresql
  - swift
  - kotlin
status: "In Development"
year: 2025
---

Shelved is a privacy-focused media collection tracker built with Rails 8 and Hotwire Native, designed for people who value their reading and viewing history staying private while maintaining a comprehensive catalog of their physical media.

## 🎯 Core Philosophy

### Privacy-First Design
- **Local-first data** - Your collection stays on your devices
- **No social features** - No public profiles or sharing pressure
- **No analytics** - Zero tracking of your reading/viewing habits
- **Self-hosted option** - Run on your own server for complete control

### Physical Media Focus
Unlike digital-only services, Shelved embraces the reality of physical collections:
- **Location tracking** - "Which bookshelf?", "Lent to whom?"
- **Barcode scanning** - Quick ISBN/UPC entry via mobile camera
- **Cross-format awareness** - Track book-to-film adaptations
- **Condition notes** - First editions, signed copies, special features

## 📚 Key Features

### Multi-Format Support
- **Books** - ISBN lookup, series tracking, edition details
- **Movies** - Physical media formats (DVD, Blu-ray, 4K)
- **TV Shows** - Season/episode tracking, box set management
- **Cross-references** - Link adaptations and related media

### Smart Data Entry
- **Barcode scanning** - Native mobile bridge for camera access
- **API metadata** - Auto-populate from Google Books, TMDb, Open Library
- **Manual override** - Full control over all data fields
- **Bulk import** - CSV support for existing catalogs

### Organization Tools
- **Custom shelving** - Define your actual physical locations
- **Loan tracking** - Remember who borrowed what
- **Wishlist management** - Track items you want to acquire
- **Smart filtering** - By location, format, genre, status

## 🛠️ Technical Architecture

### Rails 8 Foundation
```ruby
# Clean Rails architecture
class Book < ApplicationRecord
  has_one_attached :cover
  belongs_to :shelf, optional: true
  has_many :cross_references
  
  scope :on_loan, -> { where.not(loaned_to: nil) }
  scope :unread, -> { where(read: false) }
end
```

### Hotwire Native Integration
- **Seamless mobile apps** - iOS and Android without separate codebases
- **Native features** - Camera access for barcode scanning
- **Push notifications** - Loan reminders (local only)
- **Offline support** - Browse collection without connection

### API Integration Strategy
```ruby
# Graceful fallback pattern
class MetadataFetcher
  def fetch(isbn)
    google_books_fetch(isbn) ||
    open_library_fetch(isbn) ||
    manual_entry_prompt
  end
end
```

## 📱 Platform Approach

### Web PLUS Mobile
- **Desktop-first design** - Full functionality in the browser
- **Mobile enhancement** - Native apps add convenience features
- **Progressive enhancement** - Works everywhere, better with apps
- **Sync when needed** - Optional server sync for multi-device use

### Native Bridge Features
- **Barcode scanning** - Quick entry via device camera
- **Photo capture** - Document special editions or damage
- **Location services** - "Books at office" vs "Books at home"
- **Offline mode** - Full read access without connection

## 🔐 Privacy Features

### Data Ownership
- **Export everything** - Your data in standard formats (CSV, JSON)
- **No vendor lock-in** - Simple PostgreSQL database
- **Backup friendly** - Standard Rails structure for easy backups
- **Delete means delete** - No soft deletes or data retention

### No Surveillance Capitalism
- **No recommendations** - You decide what to read/watch
- **No social pressure** - No public reading goals or competitions
- **No data mining** - Your interests stay private
- **No ads ever** - Not even "relevant" ones

## 🚀 Development Status

### Currently Working
- Rails 8 application skeleton
- Basic CRUD for books, movies, TV shows
- PostgreSQL database schema
- Tailwind CSS styling framework

### Next Up
- API integration for metadata fetching
- Hotwire Native iOS app
- Barcode scanning bridge
- Physical location management

### Future Features
- Hotwire Native Android app
- Advanced filtering and search
- Export/import functionality
- Self-hosting documentation

## 🎯 Use Cases

### Personal Library Management
- Track hundreds of books across multiple locations
- Know instantly what you've lent out
- Find that specific edition you remember buying

### Movie Collection Curation
- Catalog special editions and box sets
- Track format upgrades (DVD → Blu-ray → 4K)
- Note special features and commentaries

### Cross-Media Connections
- Link book series to their TV adaptations
- Track which movies you've read the books for
- Build reading lists from watched content

## 🔮 Long-Term Vision

### Sustainable Personal Tool
- **No VC funding needed** - Simple enough to maintain solo
- **No growth metrics** - Success is happy users, not user count
- **No feature creep** - Does one thing exceptionally well
- **Community-friendly** - Open source with self-hosting guides

### Potential Expansions
- **Music collections** - Vinyl, CDs, cassettes
- **Games** - Board games, video games (complement to Bitshelf)
- **Comics** - Issue tracking, variant covers
- **Federation** - Optional sharing between friends' instances

## 🛡️ Why Shelved Matters

In an era of streaming services and social media book clubs, Shelved offers something different:
- **Your data stays yours** - No corporate intermediary
- **Physical media respect** - Not everything is digital
- **Quiet enjoyment** - Read and watch without performative pressure
- **Long-term thinking** - Your collection outlasts any startup

Shelved proves that modern web technology (Rails 8, Hotwire, native mobile) can build privacy-respecting tools that enhance rather than exploit our cultural consumption.