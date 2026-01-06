---
title: "Six Years After Warning About Microservices"
pubDate: 2026-01-06
excerpt: "In 2020, I wrote a theoretical warning about microservices. Then I spent three years inside 120 of them. Here's what the theory didn't prepare me for."
tags:
  - microservices
  - architecture
  - engineering-leadership
  - lessons-learned
---

In 2020, I wrote about [why microservices aren't always the answer](/blog/2020-07-18-microservices). It was a theoretical piece - I'd seen the pattern enough times to know the warning signs, but I hadn't yet lived inside a system where everything I'd cautioned against had come true.

Then I joined a fintech company with around 120 microservices.

Three years later, I have a much deeper understanding of what that 2020 post was really about - and what it missed.

<!--more-->

## The Theoretical Promise

Microservices promise clean boundaries. Independent deployment. Teams that can work without stepping on each other's toes. The complexity of a large system broken into smaller, manageable pieces.

The theory is compelling. If your monolith is tangled and painful, surely breaking it into smaller pieces will make each piece simpler?

What the theory doesn't mention is where the complexity goes. It doesn't disappear. It relocates.

## Where the Complexity Went

**Dependency management.** One monolith means one set of dependencies to update, one test suite to run, one deployment to verify. 120 microservices means 120 separate dependency trees. Security patches don't get applied uniformly because nobody has time. Services end up running different versions of the same libraries because harmonising them would take weeks.

**Debugging.** In a monolith, you grep the logs, set a breakpoint, step through. In 120 microservices, you're correlating request IDs across dozens of logging systems, reconstructing a call graph in your head, hoping everyone implemented tracing consistently. A bug that would take an hour to find in a monolith can take days when it spans twelve services.

**Observability costs.** You can't debug what you can't see. So you pay an APM provider - tens of thousands per month - just to understand your own system. It's a tax that never appears in the "should we adopt microservices" spreadsheet, but it's enormous. And you can't not pay it, because the alternative is flying blind.

**YAML.** Helm charts. Kustomize overlays. CI/CD pipelines per service. Ingress configurations. Each abstraction layer exists because the previous layer was too complicated. But abstraction isn't simplification - it's just hiding complexity behind another door. Someone still has to understand how it all ties together.

The promise was that development would be easier. And maybe it was, for some definition of "development" that stops when you merge your PR. But someone has to run these services. Someone has to debug them at 3am. Someone has to keep 120 sets of dependencies current.

That someone was often me and the ops team.

## The Feedback Loop That Wasn't

The person who architected our microservices was the CTO. He'd designed the system, mandated the approach, and wasn't open to being challenged on it.

He never had to debug a production incident across twelve services. Never had to trace why customer data was slowly being corrupted. Never had to update dependencies across 120 repositories. Those were problems for the people who came after the architecture was set.

This is the broken feedback loop at the heart of many microservices adoptions. The decision-maker is insulated from the costs of the decision. By the time those costs become undeniable, it's an "execution problem, not an architecture problem."

The people who choose microservices are often not the people who have to operate them. Development and operations remain separate in practice, whatever the DevOps manifesto says. And when the architects don't feel the operational pain, the architecture doesn't evolve to reduce it.

## When Context Changes

Our microservices were designed for one context: a VC-funded startup serving small businesses, iterating quickly, deploying multiple times a day.

Then the company pivoted to enterprise banking clients.

Suddenly we were deploying to customer-owned Kubernetes clusters we couldn't access. Managed by offshore teams we couldn't directly communicate with. Subject to regulatory requirements that meant six months' notice for any production change.

The "deploy independently, multiple times a day" promise? Meaningless when your customer requires change windows, approval processes, and audit trails.

Every debugging cycle that would take minutes internally now took days of back-and-forth across time zones and organisational boundaries. One monolith in an isolated environment is one thing to support. 120 microservices is 120 potential failure points you can't see, can't access, and can't quickly fix.

The architecture was designed for a context that no longer existed. And changing it would have meant admitting the original decision was wrong.

## The Solution to Microservices

When the complexity became undeniable, the company's response was to build a "workflow engine" - a new abstraction layer that would coordinate all the services and finally make everything manageable.

Implemented, of course, as more microservices.

Nobody said "maybe we have too many services, let's consolidate." That would mean questioning decisions that couldn't be questioned. Instead, we built forward - adding layers to manage the complexity of the previous layers.

The workflow engine was still being built when I left. Not long after, the tech lead driving it quit. The company eventually shuttered when investors finally pulled their funding.

## What I Learned

Microservices can't fix an organisation that can't communicate.

They're often adopted by companies that already have coordination problems, under the theory that service boundaries will enforce clean interfaces. But if you can't have honest conversations about code, you can't have honest conversations about architecture either. The dysfunction just gets encoded into infrastructure.

The 2020 post warned about the technical risks. What I didn't fully understand then was that the technical problems are usually symptoms of organisational ones. An architecture designed by someone who can't be challenged. A system operated by people who weren't consulted. A feedback loop that never closes because the decision-makers don't feel the consequences.

Any useful software project is necessarily complex. That complexity has to live somewhere. Microservices move it from development to operations, from code to infrastructure, from debuggers to distributed traces. That's a trade-off some organisations should make - genuine scale, genuine team independence, genuine operational maturity.

But most organisations don't have those things. They have communication problems they're hoping architecture will solve. It won't.

Six years after writing that warning, I understand it better now. The technology was never really the point. The organisation was.

Choose boring technology. Fix your communication problems. And be very honest about why you're considering microservices - and who's going to be left holding the bag when the complexity arrives.
