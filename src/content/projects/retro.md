---
title: "Retro"
description: "A real-time retrospective tool for agile teams built with Phoenix LiveView, featuring vote-based prioritization, moderation tools, and comprehensive email workflows."
technologies: ["Elixir", "Phoenix LiveView", "PostgreSQL", "Tailwind CSS", "Postmark"]
status: "Development"
priority: 2
year: 2025
---

# Retro

A full-stack retrospective tool designed specifically for small agile teams and facilitators. Built with Phoenix LiveView for real-time collaboration, it focuses on improving the quality and usability of team retrospectives through thoughtful design and powerful moderation features.

## Key Features

**Real-time Collaboration**
- Live updates using Phoenix LiveView - no JavaScript frameworks needed
- Support for multiple retrospective formats (Start/Stop/Continue, Mad/Sad/Glad, 4Ls)
- Vote-based prioritization with configurable quotas
- Real-time participant engagement

**Facilitator-First Design**
- Comprehensive moderation tools with full audit trails
- Card editing, merging, flagging, and hiding capabilities
- Retro lifecycle management (draft → preparing → active → closed → archived)
- Private team spaces with role-based access control

**Smart Email Workflows**
- Powered by Swoosh and Postmark for reliable delivery
- Registration, invitations, and summary emails
- Tracked delivery status with webhook integration
- Optional reminder and digest flows

**Export & Analytics**
- Export retrospectives in Markdown, PDF, and styled HTML
- Long-term trend tracking across multiple retros
- Moderation logs for transparency and potential undo functionality

## Technical Architecture

Built with a modern Elixir stack emphasizing real-time capabilities and maintainability:

- **Backend**: Elixir + Phoenix LiveView for real-time features
- **Authentication**: Phoenix's built-in `phx.gen.auth`
- **Database**: PostgreSQL with comprehensive schemas for users, retros, cards, votes, and moderation
- **Styling**: Tailwind CSS for responsive design
- **Email**: Swoosh + Postmark with webhook tracking
- **Deployment**: Designed for Fly.io hosting

## Business Model

The tool features a freemium model with thoughtful conversion strategies:

- **Free Tier**: Up to 3 users, 2 retros/month, basic features
- **Pro Tier**: $29/month for unlimited users and retros, full exports, trend digests
- **Consultant Tier**: $19/month for solo facilitators working with multiple organizations
- **Enterprise**: Custom pricing with SSO, branding, and SLAs

## Current Status

The project includes a comprehensive Product Requirements Document and is actively under development. The architecture emphasizes privacy-first design with no public listings or required integrations, making it ideal for sensitive team discussions.

The marketing site is integrated directly into the Phoenix application, providing a seamless experience from discovery to usage.

*This project demonstrates full-stack Elixir development with real-time features, complex business logic, and thoughtful user experience design.*