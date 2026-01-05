---
title: "Boring Technology Wins"
pubDate: 2025-01-05
excerpt: "GraphQL layers to paper over communication problems. Serverless costs hidden by AWS credits. Fashionable rewrites that corrupt production data. New tech promises elegance but delivers complexity most teams can't sustain."
tags:
  - architecture
  - engineering-leadership
  - lessons-learned
---

The metering system had been running for years without major incident. It was PHP, which everyone agreed was embarrassing, but it worked. Data came in from electricity and gas meters across London, got processed, and the business ran.

Then someone decided it needed to be rewritten in Go.

The complication was the data format. Meter readings came in raw, needing to be shifted by a variable number of decimal places depending on configuration stored on the meters themselves. Each meter was different. The mapping was intricate, built up over years, and I knew it was fragile. I said so. Nobody listened.

Six months into the rewrite, the inevitable happened. The decimal point handling wasn't implemented correctly. Customer data was corrupted for months before anyone noticed. The readings that came in didn't match what got stored. Bills went out wrong. The reconciliation was a nightmare.

The PHP system, meanwhile, had been kept running as a fallback. That decision saved the company.

<!--more-->

## What "Boring" Actually Means

Dan McKinley's essay [Choose Boring Technology](https://mcfunley.com/choose-boring-technology) should be required reading for every engineer. His central insight is that every technology choice comes with hidden costs, and new technology has the highest costs because you don't yet know what you don't know.

Boring doesn't mean old. It doesn't mean PHP specifically, or Java, or whatever you personally find unfashionable. Boring means:

- **Well-understood failure modes.** When something breaks, you know where to look. Stack Overflow has answers. Your team has seen the problem before.
- **Stable APIs and behaviour.** You're not chasing breaking changes every six months. Your dependencies don't suddenly require a complete rewrite of your integration.
- **Available talent.** You can hire people who already know the stack. They don't need months of ramp-up time on your bespoke technology choices.
- **Proven at scale.** Someone else has already hit the problems you're about to hit, and documented the solutions.

Rails is boring. Django is boring. PostgreSQL is boring. Node.js is boring now, even if it wasn't a decade ago. Kubernetes is *becoming* boring, though it wasn't when people started adopting it.

## The Seduction of Shiny

I get it. New technology is exciting. It scratches an itch that most of us feel. There's genuine satisfaction in learning something new, in being at the cutting edge, in solving problems with elegant new tools.

But that satisfaction is personal. It's for you, the engineer. It's not necessarily for the business, or for the team that has to maintain what you build, or for the customers who just need the thing to work.

I've seen this pattern repeatedly:

**"We need GraphQL."** The frontend team is frustrated that they can't get the exact data shapes they need from the REST API. Rather than improve communication between frontend and backend teams, or add a BFF layer, someone proposes GraphQL. Six months later, you have a REST API behind a GraphQL layer behind a React frontend, three different teams responsible for different parts of the stack, and nobody quite sure where any particular piece of logic lives.

**"We need microservices."** I've [written about this before](/blog/2020-07-18-microservices). Microservices solve organisational problems, not technical ones. I've seen them deployed most often when teams don't want to talk to each other. Instead of fixing communication, they add network boundaries.

**"We should rewrite in Rust/Go/Whatever."** Sometimes this is justified. Usually it isn't. The existing system works. Rewriting it in a new language doesn't fix the architectural problems; it just recreates them in a language your team doesn't know as well.

## The Real Costs

At that same climate tech startup, the incoming CTO insisted we move hosting providers and build our own deployment infrastructure on top of LXC, instead of using Docker or Kubernetes, because he felt they were "too complicated."

He forced us to use Gerrit with mandatory five-line commit limits, because that was how his SRE team at Google did it. This made it impossible to see the direction of anyone's work until it was too late.

Eighteen months after I left, I heard from a former colleague. The data corruption had finally been discovered - six months of customer meter readings, silently wrong. The CTO had been encouraged to find alternative employment.

At a fintech company, I inherited React frontends in front of GraphQL APIs in front of REST APIs, with microservices written in four different languages. The CTO would dump two-thousand-line commits into Git with "changes" as a commit message.

More than half the engineering team departed within a year. Those who remained spent most of their time fighting the infrastructure rather than building features.

At a hospitality startup, the entire system had been architected around serverless technologies - Lambda functions everywhere, in theory allowing infinite scale to match customer demand. Which was nice in theory, but not so nice when what you actually need is predictable running costs.

When the AWS credits ran out and the bills came due, we discovered that the monthly infrastructure costs exceeded what the business model could support. Moving to standard background jobs saved $5K a month, but it wasn't enough to save the company.

## What Actually Works

I've been working with one client since 2015, helping them maintain their Rails applications. This has worked because they kept things simple from the start. They stayed boring with their technology choices. When they did experiment - an Elixir service that made sense on paper - they were willing to pivot when it became unmaintainable, rewriting it in Python.

Ten years later, we're still incrementally improving the systems because the foundations were solid and the business was healthy enough to fund the work properly.

At my current employer, they'd convinced themselves that the Rails monolith was holding them back. They wanted to kill it, replace it with something more modern. I felt this was premature. I'd spent years doing Rails upgrades in my freelance work; I knew the monolith didn't need scrapping. It needed modernising.

We went from Rails 5.2 to Rails 8.0, from Ruby 2.7 to Ruby 3.4. We gained a 30% performance improvement. The monolith became not just viable, but valuable again.

The difference? They listened. They were willing to be challenged on their assumptions. And they didn't have anything to prove.

## How to Evaluate Technology Choices

Before adopting something new, I ask:

**What problem does this actually solve?** Not what problem does it claim to solve, or what problem does the documentation showcase. What specific problem, in your specific codebase, will this fix?

**What's the total cost of ownership?** Not just the implementation cost. The training cost. The debugging cost when things go wrong at 3am. The hiring cost when you need to find people who know this thing.

**What happens when this technology becomes unfashionable?** Because it will. GraphQL was the future five years ago; now there's increasing recognition that it adds complexity most teams don't need. Will you still be able to hire for this stack in five years? Will there still be security patches and bug fixes?

**Is the team actually excited, or are they just bored?** Sometimes the push for new technology is about solving real problems. Sometimes it's about engineers who are bored with the existing stack and want to learn something new. Those are different situations requiring different responses.

**What would the boring solution look like?** Before reaching for the new thing, seriously consider whether the old thing could work. Add an index. Write a background job. Put a cache in front of it. Improve the SQL. Often the boring solution is faster to implement, easier to maintain, and solves the problem just as well.

## The Courage to Be Boring

There's no glory in boring technology. Nobody writes blog posts about "we stuck with PostgreSQL and it worked fine." Conference talks don't get accepted for "we considered microservices and decided against it."

But there's also no glory in explaining to the business that six months of meter data is corrupted. Or that the infrastructure costs have tripled. Or that half your engineering team has quit because they're exhausted from fighting the complexity.

New technology promises elegance, but delivers complexity most teams can't sustain. The teams I've seen succeed are the ones who resist the urge to chase whatever's fashionable, who stay boring until they have no choice but to change, and who evaluate new technology with clear eyes rather than enthusiasm.

Pick boring. Your future self will thank you.
