---
title: "Building Quizzie: A Real-Time Quiz App in Boring Technology"
pubDate: 2026-01-28
excerpt: "I needed a quiz app for corporate training. Three npm packages, vanilla JavaScript, and a polling fallback later, it works everywhere - including networks that block modern web features."
tags:
  - projects
  - boring-technology
  - javascript
---

I needed a quiz tool for corporate training sessions - something to show questions on a big screen while attendees voted on their phones. Like Kahoot, but without the subscription fees or the corporate procurement process.

I built the first version of Quizzie in about twenty-five minutes. It's been running in production for a few weeks now, and the most interesting part wasn't the real-time features - it was making them work on corporate networks that actively fight against modern web technology.

<!--more-->

## The Stack

The entire backend is one file: `server.js`, about 600 lines of Express. The frontend is vanilla HTML, CSS, and JavaScript - no React, no build step, no bundler. Dependencies? Three packages: `express`, `qrcode`, and `resend` (for emailing results).

That's it.

I could have reached for Next.js and Socket.io and a database. I briefly considered Elixir and Phoenix LiveView - it's genuinely excellent for real-time features, and I've enjoyed using it before. But I needed something that worked this week, something I could deploy and forget about. Express is boring. I know it inside out. Boring technology wins.

## How It Works

The presenter opens a URL with a secret key, sees a QR code, and starts the quiz. Attendees scan the QR code on their phones and get a voting interface. When the presenter closes voting, animated bar charts reveal the results. Explanations can be shown between questions. At the end, everyone sees their personal score.

For real-time updates, I used Server-Sent Events. SSE is beautifully simple: it's just HTTP that doesn't close. The browser opens a connection, the server sends events down it, and the browser automatically reconnects if it drops. No WebSocket handshakes, no Socket.io abstraction layer, no protocol upgrades.

State lives in memory, persisted to a JSON file on disk. That's sufficient for a quiz - if the server restarts, you lose the current session's votes, but that's an acceptable trade-off for simplicity.

## Corporate Networks Fight Everything

The first real test was at a corporate office. It didn't work. The page loaded, buttons did nothing, nothing updated.

At first I assumed it was a firewall blocking our Render domain. We added better error feedback - connection status messages, loading spinners on buttons, error messages when requests failed. That's when we discovered the real problem: regular API calls worked fine. Only the SSE endpoint was blocked.

Corporate firewalls and security tools (in this case, Microsoft Defender) often block SSE connections. To them, an HTTP connection that stays open for minutes looks suspicious - it's a pattern that malware uses for command-and-control communication. The fact that it's a legitimate web standard doesn't matter.

The irony is that the "secure" alternative creates more traffic, more server load, and more network chatter. But it looks normal to the security tools, so it works.

## The Polling Fallback

The fix was pragmatic: if SSE doesn't connect within five seconds, fall back to polling. The client hits `/api/state` every three seconds and diffs the response against the previous state.

It's less efficient. Updates have a few seconds of latency instead of being instant. Voters don't see the "Correct!" or "Not quite!" feedback when voting closes (the polling endpoint doesn't include correct answers for the audience). But it works through every corporate network we've tested.

The code tries SSE first. If two connection attempts fail, or if nothing connects within five seconds, it switches modes and shows "Using polling mode" in the status bar. Users don't need to do anything - it just works.

```javascript
// If SSE doesn't connect within 5 seconds, fall back to polling
const connectionTimeout = setTimeout(() => {
  if (!connected) {
    console.log('SSE connection timeout, falling back to polling');
    eventSource.close();
    switchToPolling();
  }
}, 5000);
```

This is the kind of code that doesn't feel clever. There's no elegant abstraction, no unified streaming interface that handles both cases transparently. It's just a timeout and an if statement. But it solved the actual problem: the training session couldn't run because the corporate laptop blocked modern web features.

## Render's Free Tier

I deployed to Render because it's free and handles Node apps without configuration. The trade-off: free tier services spin down after fifteen minutes of inactivity. When someone visits a sleeping app, they wait thirty to sixty seconds for the container to start.

The fix here was also simple: show "Connecting to server..." immediately, with a helpful message about cold starts. If the connection times out, show "Server is waking up..." and retry automatically. Users see what's happening instead of staring at a blank page.

Again, not elegant. But it addressed the actual user experience problem without requiring a paid tier.

## What I'd Do Differently

Probably nothing structural. The boring choices - vanilla JS, one server file, JSON on disk - mean I can understand the entire system at a glance. When a bug gets reported, I can usually find and fix it in minutes.

If I were building this for thousands of concurrent users, I'd need a real database and horizontal scaling. But I'm not. I'm building for a training room of twenty people with phones. The architecture matches the actual requirements.

## The Lesson

Every feature in Quizzie started with a real problem:

- "The buttons don't work" → add visible error feedback
- "It's stuck on 'connecting'" → detect and communicate cold starts
- "Nothing updates on corporate networks" → polling fallback
- "I can't reset mid-quiz" → add an always-visible reset link

None of these solutions are exciting. There's no clever engineering, no elegant abstractions, no technology choices that would impress anyone on Hacker News. Just if statements and timeouts and error messages.

That's the point. The goal was never to build impressive software. It was to run training sessions. And now it works - even on corporate laptops with aggressive security tools that block half the modern web.

Boring technology wins.
