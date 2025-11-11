---
title: "PuTTY Themer"
description: "Tired of manually theming 20+ PuTTY sessions? This Ruby script reads your Windows Registry, applies Solarized Dark and Fira Mono to every saved session in one shot. Built in 2011 when repetitive tasks annoyed me enough to automate them."
technologies: ["Ruby", "Windows Registry", "PuTTY"]
status: "Complete"
github: "https://github.com/stevehill1981/putty_themer"
priority: 5
year: 2011
---

A Ruby script from 2011 that applies Solarized Dark theming to all PuTTY sessions at once by directly manipulating the Windows Registry. Because clicking through 20+ session configurations one-by-one is nobody's idea of fun.

## 🎯 The Problem

Using PuTTY on Windows for multiple SSH connections? You've probably saved sessions for:
- Production servers
- Staging environments
- Development boxes
- Database servers
- Jump boxes

Each session stores its own color scheme and font settings. Updating them manually means:
1. Double-click a session
2. Navigate to Colors
3. Adjust 16+ RGB values
4. Navigate to Appearance
5. Select font and size
6. Click Save
7. Repeat for every single session

With 20+ sessions, that's 140+ configuration clicks. Absolutely mind-numbing.

## ✨ The Solution

This script does it all in one command:

```bash
ruby putty_sessions.rb
```

Output:
```
Found 23 PuTTY sessions in registry
Applying Solarized Dark theme...
  ✓ production-web-01
  ✓ production-db-01
  ✓ staging-web-01
  ...
Done! All sessions themed.
```

Every session now has:
- **Solarized Dark** color scheme (easy on the eyes)
- **Fira Mono OT 12pt** font (excellent readability)
- **Consistent appearance** across all connections

## 🔧 How It Works

PuTTY stores everything in the Windows Registry under:
```
HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions
```

The script:

1. **Finds all sessions** by enumerating registry keys
2. **Opens each session** for modification
3. **Writes color values** for Solarized Dark (16 RGB values)
4. **Sets font configuration** (name, size, character set)
5. **Saves changes** atomically

Key code snippet:

```ruby
require 'win32/registry'

sessions_key = 'Software\SimonTatham\PuTTY\Sessions'

Win32::Registry::HKEY_CURRENT_USER.open(sessions_key) do |reg|
  reg.each_key do |session_name|
    # Open this specific session
    Win32::Registry::HKEY_CURRENT_USER.open("#{sessions_key}\\#{session_name}",
                                             Win32::Registry::KEY_WRITE) do |session|
      # Apply Solarized Dark colors
      session.write('Colour0', Win32::Registry::REG_SZ, '131,148,150')  # Foreground
      session.write('Colour2', Win32::Registry::REG_SZ, '0,43,54')      # Background
      # ... 14 more color values

      # Set Fira Mono font
      session.write('Font', Win32::Registry::REG_SZ, 'Fira Mono OT')
      session.write('FontHeight', Win32::Registry::REG_DWORD, 12)
    end
  end
end
```

## 🎨 Solarized Dark Theme

The [Solarized](https://ethanschoonover.com/solarized/) color scheme by Ethan Schoonover is designed for terminal use with:

- **Reduced brightness contrast** - less eye strain during long sessions
- **Carefully selected accent colors** - optimized for syntax highlighting
- **Tested color relationships** - works in light and dark variants

Specific values applied:
```
Background:  #002b36 (base03)
Foreground:  #839496 (base0)
Black:       #073642 (base02)
Red:         #dc322f
Green:       #859900
Yellow:      #b58900
Blue:        #268bd2
Magenta:     #d33682
Cyan:        #2aa198
White:       #eee8d5
```

## 💡 Why Build This?

In 2011, I was managing infrastructure for a web agency with dozens of client servers. Each required SSH access via PuTTY. The default color scheme (harsh white on black) was giving me headaches, but updating 30+ sessions manually was worse.

**Options considered:**
- Click through manually → too tedious
- Export/import sessions → PuTTY's export is session-by-session
- Third-party tools → didn't exist or weren't free

**Solution:**
Write a Ruby script. Total development time: ~2 hours. Time saved ever since: immeasurable.

## 🚀 Modern Alternatives

These days, better options exist:
- **Windows Terminal** with built-in SSH support
- **WSL** with native terminal emulators
- **Visual Studio Code** remote SSH
- **kitty**, **Alacritty**, **Wezterm** on Windows

But for teams still using PuTTY (especially in corporate environments where SSH client choices are limited), this script remains useful.

## 🔍 Technical Notes

**Platform**: Windows only (uses Win32::Registry)

**Requirements**:
- Ruby 1.9+ (tested up to Ruby 3.x)
- PuTTY installed
- Saved PuTTY sessions

**Safety**:
- Read-only registry scanning
- Only writes to PuTTY session keys
- Non-destructive (only updates colors/fonts)
- Original settings aren't backed up (manually export first if paranoid)

**Limitations**:
- Doesn't modify Default Settings (PuTTY's template session)
- Requires PuTTY sessions to already exist
- Font must be installed on the system

## 📦 Usage

Clone and run:
```bash
git clone https://github.com/stevehill1981/putty_themer.git
cd putty_themer
ruby putty_sessions.rb
```

The script detects non-Windows platforms and exits gracefully.

## 🛠️ Extension Ideas

The pattern could be extended to:
- **Custom themes** - pass theme name as argument
- **Font selection** - choose from available monospace fonts
- **Selective updating** - theme only specific sessions
- **Backup/restore** - export current settings before modification
- **GUI wrapper** - simple Windows form for non-technical users

## 📚 What This Demonstrates

**Registry manipulation** - Direct low-level Windows configuration

**Batch automation** - Solving n-problems in O(1) effort

**Developer tools** - Scratching your own itch productively

**Practical scripting** - Ruby for Windows system administration

## 📄 Links

- [GitHub Repository](https://github.com/stevehill1981/putty_themer)
- [Solarized Theme](https://ethanschoonover.com/solarized/)
- [Fira Mono Font](https://fonts.google.com/specimen/Fira+Mono) 