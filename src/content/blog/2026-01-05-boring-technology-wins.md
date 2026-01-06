---
title: "Boring Technology Wins"
pubDate: 2026-01-05
excerpt: "I've watched companies chase shiny technology for nearly two decades. The pattern is always the same: promises of elegance, delivered complexity, and teams that can't sustain it."
tags:
  - architecture
  - engineering-leadership
  - lessons-learned
---

The metering system had been running for years without major incident. It was PHP, which everyone agreed was embarrassing, but it worked. Data came in from electricity and gas meters across London, got processed, and the business ran.

Then the new CTO arrived. He was an ex-Googler, and he had opinions.

PHP was shit, he said. Google didn't use it. The system needed to be rewritten in Go microservices. He also felt Docker and Kubernetes were "too complicated," so we'd build our own deployment infrastructure on top of LXC instead.

The complication was the data format. Meter readings came in raw, needing to be shifted by a variable number of decimal places depending on configuration stored on the meters themselves. Each meter was different. The mapping was intricate, built up over years, and I knew it was fragile. I said so. Nobody listened.

And tests? Tests were bad, he said. The only way to truly know if software works is to test in production, like Google does.

Six months into the rewrite, the inevitable happened. The decimal point handling wasn't implemented correctly. Customer data was corrupted for months before anyone noticed. The readings that came in didn't match what got stored. Bills went out wrong. The reconciliation was a nightmare.

The PHP system, meanwhile, had been kept running as a fallback. That decision saved the company.

Eighteen months after I left, I heard from a former colleague. The CTO had been encouraged to find alternative employment. The data corruption had been going on for more than six months before anyone noticed.

<!--more-->

## The Pattern

I've been a professional software engineer since 2006. In that time, I've watched this pattern repeat across nearly every company I've worked with:

Someone senior decides the current technology is holding them back. They propose something newer, shinier, more fashionable. The team gets excited - new technology is fun. Everyone agrees the old system is embarrassing.

The rewrite begins. Initial progress is fast because they're building the easy parts first. Then they hit the edge cases. The weird business logic that accumulated over years. The integrations that nobody fully understands. The data migrations that turn out to be more complex than anyone anticipated.

Meanwhile, the old system keeps running. It has to - the business depends on it. Now the team is maintaining two systems instead of one, and the new one isn't ready.

Eventually, one of three things happens: the rewrite ships and causes problems (like the meter data corruption), the rewrite gets abandoned after burning through budget and goodwill, or the company runs out of money before either outcome.

I've seen all three.

## The Fintech Nightmare

After the climate tech startup, I joined a VC-funded fintech. They'd grown to about twenty-five engineers during a funding boom and built aggressively. By the time I arrived, they were managing around 120 microservices.

One hundred and twenty. For a team of twenty-five.

The architecture was impressive on paper: React frontends talking to GraphQL APIs talking to REST APIs, microservices written in four different languages, everything deployed to customer-owned Kubernetes clusters. Each enterprise banking client had six or more clusters, often managed at arm's length without direct access due to security requirements.

In practice, it was chaos.

The CTO would dump two-thousand-line commits into Git with "changes" as a commit message. Half the engineering team departed within a year. Those who remained spent most of their time fighting the infrastructure rather than building features.

By the time I left, the company had contracted to twelve engineers - but still had four tech leads, managing complexity that no longer matched the team size. Classic VC-funded pattern: Big Tech-style architecture that outlived the team sustaining it.

## The Serverless Surprise

The hospitality startup seemed different. Modern stack, sensible team size, clear product vision. They'd built a mobile ordering system during the pandemic and were pivoting to point-of-sale hardware.

The entire backend was serverless. Lambda functions everywhere, in theory allowing infinite scale to match customer demand.

Then the energy crisis hit. Customers - restaurants and bars - started going out of business. Revenue dropped. And we discovered that our AWS credits, which had been masking the true infrastructure costs, were nearly depleted.

Serverless scales beautifully. It also bills beautifully. Every API call, every function invocation, every gigabyte of data transfer. When you're growing fast with VC money, you don't notice. When the credits run out and the bills come due, you notice.

I was promoted to interim CTO when the previous CTO left during the financial crisis. In my first two weeks, I had to manage three redundancies and figure out how to cut costs fast.

The serverless architecture went first. We replaced Lambda functions with traditional background jobs running on standard servers. Monthly infrastructure costs dropped by more than five thousand pounds. As a bonus, API performance improved by over twenty percent - no more cold-start latency.

It wasn't enough to save the company. The energy crisis had broken too many of our customers, and no amount of technical improvement could fix that. But the serverless-to-boring transition bought us months of runway and proved the point: the "boring" solution was cheaper, faster, and more predictable.

## What Actually Works

I've been working with one client since 2016, helping them maintain their Rails applications. It's now been nine years. The platform was in critical condition when I started - two major Rails versions behind, running on legacy operating systems, manually provisioned servers.

We could have rewritten it. Many would have. Instead, we chose boring.

Rails 3 to 4 to 5 to 6 to 7 to 8. Ruby 2 to 3.4. PostgreSQL 11 to 17 in a single two-hour downtime window, after years of careful preparation. Capistrano to Ansible to Kubernetes - each migration deliberate, each improvement incremental.

When we did experiment - an Elixir service that made sense on paper - we were willing to pivot when it became unmaintainable. We rewrote it in Python, which was boring but worked.

Nine years later, the platform is modern, reliable, and maintainable. Not because we made dramatic changes, but because we made steady ones. The system can be maintained by any competent engineer - which is the hallmark of good architecture.

At my current employer, I walked into a similar situation. The Rails monolith was considered "legacy." There were plans for a TypeScript rewrite. The application was slated for replacement.

I'd done this before. I knew the monolith didn't need scrapping - it needed modernising.

Rails 5.2 to 8.0. Ruby 2.7 to 3.4. We cancelled the risky rewrite and gained a thirty percent performance improvement instead. The platform went from "legacy liability" to "strategic asset" without a single line of TypeScript.

The difference? They listened. They were willing to be challenged on their assumptions. And they didn't have anything to prove.

## Choosing Boring

Dan McKinley's essay [Choose Boring Technology](https://mcfunley.com/choose-boring-technology) should be required reading for every engineer. His central insight is that every technology choice comes with hidden costs, and new technology has the highest costs because you don't yet know what you don't know.

Boring doesn't mean old. It doesn't mean PHP specifically, or Java, or whatever you personally find unfashionable. Boring means well-understood failure modes. Stable APIs. Available talent. Problems that someone else has already solved.

Rails is boring. Django is boring. PostgreSQL is boring. Node.js is boring now, even if it wasn't a decade ago. Kubernetes is becoming boring, though it wasn't when people started adopting it.

New technology is exciting. It scratches an itch. There's genuine satisfaction in learning something new, in being at the cutting edge, in solving problems with elegant new tools.

But that satisfaction is personal. It's for you, the engineer. It's not necessarily for the business, or for the team that has to maintain what you build, or for the customers who just need the thing to work.

## The Questions I Ask

Before adopting something new, I ask:

What problem does this actually solve? Not what problem does it claim to solve. What specific problem, in this specific codebase, will this fix?

What's the total cost of ownership? The training cost. The debugging cost at 3am. The hiring cost when you need people who know this thing.

What happens when this becomes unfashionable? GraphQL was the future five years ago; now there's increasing recognition that it adds complexity most teams don't need. Will you still be able to hire for this stack in five years?

Is the team actually excited, or are they just bored? Sometimes the push for new technology is about solving real problems. Sometimes it's about engineers who want to learn something new. Those require different responses.

What would the boring solution look like? Add an index. Write a background job. Put a cache in front of it. Improve the SQL. Often the boring solution is faster to implement, easier to maintain, and solves the problem just as well.

## The Courage to Be Boring

There's no glory in boring technology. Nobody writes blog posts about "we stuck with PostgreSQL and it worked fine." Conference talks don't get accepted for "we considered microservices and decided against it."

But there's also no glory in explaining to the business that six months of meter data is corrupted. Or that infrastructure costs have tripled. Or that half your engineering team has quit because they're exhausted from fighting the complexity.

I've spent nearly two decades watching companies chase shiny technology. The pattern is always the same. The ones that succeed are the ones who resist the urge, who stay boring until they have no choice, who evaluate new technology with clear eyes rather than enthusiasm.

The PHP meter system still runs. The Go rewrite that was supposed to replace it corrupted data and got scrapped. The ex-Googler CTO moved on to inflict his opinions elsewhere.

Pick boring. Your future self will thank you.
