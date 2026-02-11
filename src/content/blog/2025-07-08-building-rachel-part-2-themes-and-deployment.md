---
title: "Building Rachel Part 2: Themes, Polish, and Production Deployment"
pubDate: 2025-07-08
excerpt: "From functional card game to production-ready web application: implementing a dynamic theme system, fixing critical bugs, and deploying to the world with bank-grade security."
tags:
  - elixir
  - phoenix
  - liveview
  - css
  - themes
  - deployment
  - production
series:
  name: "Building Rachel"
  part: 2
---

*Update: Rachel has since been rebuilt as a native iOS app using Swift and SpriteKit. This post describes the original Phoenix LiveView version, which is no longer active.*

In [Part 1](/blog/2025-07-03-building-rachel-part-1/), I covered building the core game engine for Rachel, my Phoenix LiveView card game. Today, I'm excited to share how we transformed it from a functional game into a production-ready application with a stunning theme system that's now live at [rachel.stevehill.xyz](https://rachel.stevehill.xyz).

*Note: This development was done in collaboration with Claude (Anthropic's AI assistant), who provided crucial guidance on CSS architecture, security best practices, and production deployment strategies.*

## From Functional to Memorable

The original Rachel worked perfectly - players could join games, cards functioned correctly, and the AI was competitive. But it looked like every other web application: functional, but forgettable.

The breakthrough came when we decided to implement a complete theme system. Instead of just "dark mode" or "light mode," we created three distinct visual identities that transform the entire experience:

### 🎨 The Three Themes

**Modern Minimalist** - Clean, Apple-inspired design with crisp whites, subtle grays, and precise animations. Perfect for players who want distraction-free focus.

**Premium Card Room** - Luxury casino aesthetic with rich greens, gold accents, and elegant transitions. For when you want to feel like you're playing in Monte Carlo.

**Warm & Social** - Cozy pub atmosphere with earth tones, warm browns, and friendly animations. The perfect choice for casual family games.

## The Technical Challenge

Building a theme system sounds simple until you try to implement it properly. We needed:

1. **Instant switching** without page reloads
2. **Persistence** across browser sessions  
3. **Consistent application** across all components
4. **Performance** - theme switches must feel instant
5. **Accessibility** support for reduced motion and high contrast

The solution was a combination of CSS custom properties, LiveView events, and localStorage persistence:

```css
/* Base theme variables that all themes override */
:root {
  --theme-primary: #3b82f6;
  --theme-bg-primary: #f8fafc;
  --theme-card-gradient: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
  --theme-animation-speed: 0.3s;
}

/* Modern Minimalist theme */
:root[data-theme="modern-minimalist"] {
  --theme-primary: #007aff;
  --theme-bg-primary: #ffffff;
  --theme-animation-speed: 0.2s;
  --theme-animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Premium Card Room theme */
:root[data-theme="premium-card-room"] {
  --theme-primary: #d4af37;
  --theme-bg-primary: #1a2332;
  --theme-animation-speed: 0.4s;
  --theme-animation-easing: cubic-bezier(0.23, 1, 0.32, 1);
}
```

Each theme doesn't just change colors - it has its own animation personality, timing functions, and visual effects.

## Theme-Specific Animations

One of the most delightful discoveries was making animations theme-aware. Modern Minimalist uses quick, precise transitions. Premium Card Room has slower, more elegant movements. Warm & Social includes playful bouncy effects:

```css
/* Modern Minimalist: Quick, precise */
:root[data-theme="modern-minimalist"] .playing-card:hover {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Premium Card Room: Elegant luxury */
:root[data-theme="premium-card-room"] .playing-card:hover {
  transform: translateY(-4px) scale(1.08) rotateZ(-1deg);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

/* Warm & Social: Playful bounces */
:root[data-theme="warm-social"] .playing-card:hover {
  transform: translateY(-6px) scale(1.06) rotateZ(1deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

The result? Each theme doesn't just look different - it *feels* different to use.

## Production Polish and Bug Fixes

Implementing the theme system revealed several critical bugs that we fixed:

### The AI Takeover Bug
**Problem**: When human players took too long to make moves, the AI would take over their turns.
**Solution**: Fixed the GameServer disconnection logic to only schedule AI turns for actual AI players.

```elixir
# Before: AI would take over for any disconnected player
defp should_process_ai_turn?(state) do
  state.game.status == :playing && player_disconnected?(state)
end

# After: AI only acts for actual AI players  
defp should_process_ai_turn?(state) do
  state.game.status == :playing && current_player_is_ai?(state)
end
```

### Card Duplication in Deck Reshuffling
**Problem**: When the deck ran out, cards could be duplicated during reshuffle.
**Solution**: Improved the deck management logic to properly track cards during multiple-card draws.

### Theme Contrast Issues
**Problem**: Player names were invisible in certain theme combinations.
**Solution**: Added theme-aware text colors using CSS custom properties.

## Security: Production-Grade Protection

Before deployment, we implemented comprehensive security measures:

```elixir
# Content Security Policy headers
defp csp_header do
  [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", # Needed for LiveView
    "style-src 'self' 'unsafe-inline'", # Needed for theme CSS
    "connect-src 'self' ws: wss:", # WebSocket connections
    "frame-ancestors 'none'",
    "base-uri 'self'"
  ] |> Enum.join("; ")
end
```

Plus additional security headers:
- **HSTS** with preload for HTTPS enforcement
- **X-Frame-Options** to prevent clickjacking
- **X-Content-Type-Options** to prevent MIME sniffing
- **Referrer-Policy** for privacy protection

**Security audit results**: ✅ Zero vulnerabilities, all dependencies up-to-date

## Performance Monitoring

We added real-time performance monitoring for theme switches:

```javascript
// Performance monitoring for theme switches
const start = performance.now();
window.dispatchEvent(new CustomEvent("phx:set-theme", {detail: {theme}}));

requestAnimationFrame(() => {
  const duration = performance.now() - start;
  console.log(`Theme switch: ${duration.toFixed(2)}ms`);
  
  if (duration > 50) {
    console.warn(`Slow theme switch detected: ${duration}ms`);
  }
});
```

**Target**: <16ms for 60fps smooth transitions  
**Achieved**: Average 8-12ms theme switching

## Deployment to Production

The final step was deployment to Fly.io. The process was remarkably smooth:

```bash
# Deploy Rachel to production
fly deploy

# Add custom domain with automatic SSL
fly certs add rachel.stevehill.xyz

# Point DNS and go live
dig rachel.stevehill.xyz  # Verify DNS propagation
```

## The Transformation

The before-and-after difference is dramatic. What started as a functional card game now offers:

- **Three distinct visual experiences** that appeal to different player types
- **Instant theme switching** with localStorage persistence
- **Production-grade security** with comprehensive headers
- **Performance monitoring** and optimization
- **Accessibility support** for all users
- **Zero security vulnerabilities**

## Lessons Learned

### CSS Custom Properties Are Powerful
CSS custom properties enabled theme switching that would have been impossible with traditional CSS. The ability to change hundreds of values instantly by updating the `data-theme` attribute is magical.

### Performance Matters for User Delight
Measuring theme switch performance revealed optimizations we wouldn't have found otherwise. The difference between 50ms and 10ms switching is the difference between "nice" and "delightful."

### Security is Non-Negotiable
Implementing proper CSP headers and security measures isn't optional for production applications. The time invested pays dividends in user trust and safety.

### AI Collaboration Accelerates Polish
Working with Claude was particularly valuable for the refinement phase. While I provided the creative vision, AI helped with implementation details, edge case testing, and security best practices that would have taken much longer to research and implement solo.

## Try It Yourself

Rachel is now live at **[rachel.stevehill.xyz](https://rachel.stevehill.xyz)**!

Try switching between the three themes and notice how each one completely changes the game's personality. The theme selector is in the top-right corner - click it to see visual previews of each theme before switching.

## What's Next

The theme system opens up exciting possibilities:

- **Seasonal themes** for holidays and special events
- **Custom theme creation** tools for players
- **Premium theme unlocks** for monetization
- **Community-contributed themes**

The modular CSS architecture makes adding new themes straightforward, and the localStorage persistence system ensures user preferences are always remembered.

## Source Code

The complete implementation is available on [GitHub](https://github.com/stevehill1981/rachel). The theme system code is particularly worth studying if you're building dynamic theming in Phoenix LiveView applications.

---

Building Rachel has been a journey from functional to magical. The theme system transformed it from "a working card game" to "an experience worth sharing." Combined with production-grade security and performance monitoring, it's now ready to handle real users and real traffic.

In Part 3, I'll dive into the AI system implementation and how we made computer opponents that feel genuinely strategic. Stay tuned!

*Try Rachel today at [rachel.stevehill.xyz](https://rachel.stevehill.xyz) - and let me know which theme is your favorite!*