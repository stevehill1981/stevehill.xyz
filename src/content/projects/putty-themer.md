---
title: "PuTTY Themer"
description: "A Ruby script that applies Solarized Dark theme and Fira Mono font to all PuTTY sessions via Windows Registry automation."
technologies: ["Ruby", "Windows Registry", "PuTTY"]
status: "Complete"
repository: "https://github.com/stevehill1981/putty_themer"
priority: 5
year: 2015
---

# PuTTY Themer

A practical Ruby utility that solves a common annoyance for developers using PuTTY on Windows: manually theming multiple saved sessions.

## The Problem

If you use PuTTY for SSH connections on Windows, you've probably experienced the tedium of manually applying color schemes and font settings to each saved session. With multiple servers and environments, this becomes a repetitive and error-prone task.

## The Solution

This Ruby script automates the entire process by:
- Reading all saved PuTTY sessions from the Windows Registry
- Applying a consistent Solarized Dark color scheme to every session
- Setting the modern Fira Mono OT font for better readability
- Updating all sessions in one operation

## Technical Implementation

The script uses Ruby's `win32/registry` library to:
1. **Session Discovery**: Scans `HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions`
2. **Registry Manipulation**: Updates color and font registry values for each session
3. **Batch Processing**: Applies changes to all sessions simultaneously

## Color Scheme

Implements the popular **Solarized Dark** theme with carefully chosen colors:
- Background: Deep blue-green (#002b36)
- Foreground: Light gray (#839496) 
- Accent colors: Solarized palette (red, green, yellow, blue, magenta, cyan)
- Font: Fira Mono OT at 12pt for excellent readability

## Usage

Simple one-command execution:
```bash
ruby putty_sessions.rb
```

The script automatically:
- Detects the Windows environment (exits gracefully on other platforms)
- Finds all PuTTY sessions
- Applies the theme to every session
- Provides feedback on the operation

## Why This Matters

While simple, this tool demonstrates:
- **Registry Programming**: Direct Windows Registry manipulation from Ruby
- **Batch Automation**: Solving repetitive manual tasks programmatically  
- **Developer Experience**: Improving daily workflows with small utilities
- **Cross-System Consistency**: Ensuring uniform appearance across all connections

Perfect for developers managing multiple servers who want consistent, professional-looking terminal sessions without manual configuration. 