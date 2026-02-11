---
title: "Sustainable Software"
pubDate: 2023-10-12
excerpt: "Sustainable software development isn't just about clean code or green energy. It's about people, pace, and pragmatic decisions that last."
tags:
  - sustainability
  - software-engineering
  - process
  - tooling
  - sustainable-software
---

*Update: In 2026, I wrote a follow-up to this post: [Sustainable Software, Revisited](/blog/2026-01-06-sustainable-software-revisited). I realised I'd focused on engineering practices when I should have focused on whether the business underneath could survive.*

I've been thinking about sustainable software development for over a decade. Not sustainability in the environmental sense — sustainability in the human sense. Can your team maintain this pace? Can the code evolve without heroics? Will the decisions you're making today still look reasonable in two years?

Whilst there are times when, as a team, you need to pull out all of the stops in order to deliver a key feature in a very tight timescale, this definitely should not be the norm. Not unless you want to see a high rate of attrition amongst your engineers and a significant accumulation of technical debt.

<!--more-->

Sustainable software engineering is about making the right decisions for the long term health of your product and of your team. There's no single prescribed way to achieve it — your team is different to mine, your constraints are different, your technology stack may not be something you can change.

But some principles hold regardless of context.

## Choose Boring Technology

I firmly believe you'll enjoy more success if you avoid bleeding edge technology as much as is
humanly possible. I've read [Dan McKinley's "Choose Boring Technology" essay](https://mcfunley.com/choose-boring-technology)
(and if you haven't, make sure you set aside the time to do so). Adopting the latest and greatest is *fun*, of course,
and it definitely scratches an itch, but it increases the risk of your
product getting wildly out of control and becoming unmaintainable. Choose stable tools that provide
proven solutions, wherever you can.

Boring technology is one foundation. A healthy team is the other.

## Protect Your Team

Try not to throw too many roadblocks in front of your team; you don't want them to become frustrated. You want them to
be focused on delivering the best product they're capable of. Talk to your engineers. Identify their frustrations, then
put a plan in place to mitigate them as best you can.

A frustrated team can't sustain anything. Neither can an unstable product.

## Build on Solid Ground

Make sure your product is stable; you'll struggle to maintain a steady pace if you've built on sand. That means writing
tests. It means having appropriate monitoring in place, and it means that the ever-growing backlog of bugs *must* be
addressed regularly. Every time you prioritise new feature work over a bug ticket, you're increasing the amount of technical
debt in your product, and it *will* catch up with you in the long run, unless your company runs out of money first.

Keep your dependencies up-to-date too. If there's been a security vulnerability in one of the libraries you're using, the
last thing you need is to first have to upgrade a whole bunch of other libraries in order to be able to get to a secure
version again. I've been there, it's not fun.

These are engineering practices. They're necessary, but as I'd later learn, they're not sufficient. The business underneath has to be sustainable too — and that's a harder problem than any of these.
