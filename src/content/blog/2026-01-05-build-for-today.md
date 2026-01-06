---
title: "Build for Today, Design for Tomorrow"
pubDate: 2026-01-05
excerpt: "Most failed systems I've rescued weren't too rigid - they were too flexible. Built for futures that never arrived. I've spent years untangling the results."
tags:
  - architecture
  - engineering-leadership
  - lessons-learned
  - build-for-today
---

The integration layer was built on MySQL stored procedures.

Not one or two stored procedures for performance-critical operations. Dozens of them, chained together, forming the entire middleware that connected the customer-facing application to the back-office systems. The product's sales pitch was that anyone could build integrations - just write some stored procedures! Junior developers who didn't know what they didn't know were creating production database code.

The problem was the infinite loops. Something in the stored procedure chain would occasionally trigger a recursive call that never terminated. The database would lock up. The whole production environment would go down. Customers couldn't access the system.

The ops team were developing stress-related eczema from the constant outages. Every time a customer integration went live, we held our breath. Would this be the one that brought down production again?

Nobody wanted to touch the stored procedures. Debugging them was nearly impossible. Testing them properly wasn't really feasible. They'd been written by developers who'd since learned better, or moved on, or both - each one adding their own logic to solve an immediate problem without understanding the broader implications.

<!--more-->

## The Flexibility Trap

I spent two years at a company specialising in PHP rescue projects. We took business-critical applications abandoned by their original developers and made them maintainable again. The pattern was always the same.

The systems that failed weren't too rigid. They were too flexible.

Engineers had built for futures that never arrived. Plugin architectures for plugins that never got written. Configuration systems that could handle any requirement, if you could just figure out which of the two hundred options to set. Abstraction layers wrapping abstraction layers, each added by someone solving a problem they anticipated but never encountered.

Most failed systems I've rescued weren't suffering from short-sighted engineering. They were suffering from long-sighted engineering - architects so focused on what the system might need to do someday that they made it unable to do what it needed to do today.

At one company, I inherited React frontends talking to GraphQL APIs talking to REST APIs, with microservices written in four different languages. Each layer had been added to solve a hypothetical problem. The frontend might need different data shapes someday, so GraphQL. The backend might need to scale independently someday, so microservices. Different teams might have different language preferences someday, so polyglot architecture.

Someday never came. What came instead was a system so complex that half the engineering team quit within a year, and those who remained couldn't ship features because every change required understanding five different layers of abstraction.

## Why We Do This

It feels professional. It feels like engineering, rather than just hacking something together.

We've all inherited codebases where nothing was abstracted, where business logic was scattered everywhere, where making a change meant editing dozens of files. We swore we'd never build something like that.

So we overcorrect. We add abstractions before we need them. We design for flexibility before we understand the constraints. We solve tomorrow's problems before we've finished solving today's.

There's also fear. What if the requirements change? What if we need to swap databases? What if we need to support a new channel? The abstractions feel like insurance against an uncertain future.

But they're expensive insurance. Every abstraction is code that must be maintained, understood, debugged. Every layer of indirection is another place where bugs can hide. Every "flexible" system is harder to change than a simple one, because you have to understand the flexibility before you can work within it.

At the climate tech startup, the incoming CTO felt that Docker and Kubernetes were "too complicated." So we built our own deployment infrastructure on top of LXC. Custom tooling for a custom container system, because someday we might need features that Docker couldn't provide.

We never needed those features. What we needed was a deployment system that worked, that other engineers could understand, that had documentation and community support. Instead we had bespoke infrastructure that only the CTO understood, and when he left, nobody could maintain it.

## What The Rescue Work Taught Me

Rescuing abandoned systems teaches you to recognise the patterns. The codebase with seventeen different ways to send an email - not because seventeen were needed, but because each developer added their own abstraction layer "for flexibility." The integration built on stored procedures - not because databases are the right place for business logic, but because someone wanted to democratise integration development without considering the consequences.

The systems that aged well were almost always simpler than they needed to be.

I've been working with one client for nine years now. Their Rails application handles access control and security hardware across hundreds of customer sites - complex domain, real-world messiness, serious reliability requirements.

The system is simple. Not simplistic - it handles the complexity it needs to handle. But it doesn't have unnecessary machinery. No plugin architecture. No abstract factory patterns. No configuration system that can do anything. Just code that does what it needs to do, organised clearly enough that any competent engineer can understand it.

That's the explicit goal: a system that doesn't depend on any single person. When I started working with them, the previous developer had left and taken significant knowledge with them. We built the replacement to never have that problem again.

Nine years later, we've taken that system from Rails 3 to Rails 8, from Ruby 2 to Ruby 3.4, from PostgreSQL 11 to 17. Each upgrade was straightforward because the architecture was simple. There were no intricate abstraction layers that broke when dependencies changed. No custom frameworks that needed reimplementing. Just boring, standard Rails patterns that the upgrade guides knew how to handle.

## The Irreversibility Test

Not all future-proofing is wrong. Some decisions genuinely deserve careful thought.

Database schema design. Migrating data is painful. The cost of being wrong is high.

Public API contracts. Once clients depend on your API, changing it breaks things. This deserves deliberate design.

Core domain models. The fundamental concepts in your system shape everything built on top. Get these wrong and you'll fight the abstraction forever.

These are irreversible decisions, or at least expensive-to-reverse ones. Spend time on them. Get them reviewed. Build them carefully.

But most decisions aren't like this. Which library to use for HTTP calls - wrapped in a thin adapter, this can be changed in an afternoon. How to structure internal modules - refactoring is routine. Whether to use classes or functions - this is style, not architecture.

For reversible decisions, the fastest path is to build something simple and see what happens. You'll learn more from running code than from design documents. The abstraction you think you need based on one use case is almost always wrong. Wait until you have three concrete examples before you extract a pattern.

## YAGNI Is Your Friend

"You Aren't Gonna Need It" sounds dismissive. It's actually one of the most valuable principles in software engineering.

That plugin system? You aren't gonna need it. Build the one thing you need, and if you ever need a second thing, then design for extensibility - with the benefit of knowing what extensibility actually means for your domain.

That configuration option? You aren't gonna need it. Hardcode the value. If it ever needs to change, that's a five-minute edit.

That abstraction layer? You aren't gonna need it. Call the database directly. If you ever need to swap databases (you won't), you'll refactor then.

The time you save by not building unnecessary flexibility can be spent on the things that matter: making the system work correctly, making it fast enough, making it maintainable by the team who'll inherit it.

At my current employer, the Rails monolith people wanted to replace was actually well-designed. It was simple. New features could be added without understanding the entire system. The problem wasn't the architecture - it was that years of work had been done, and people were tired of looking at the same code.

We didn't rewrite it. We upgraded it, modernised it, cleaned up the rough edges. Rails 5.2 to 8.0. The simplicity was a feature, not a bug.

## The Right Amount of Design

I'm not advocating for no design. Some problems need thinking through. Complex domains benefit from modelling. Distributed systems require careful thought about failure modes.

But the design should be proportional to the problem.

Is this decision reversible? If yes, make a choice and move on.

Do I have three concrete examples? If you're designing an abstraction based on one use case, you're guessing. Wait until you see the real pattern.

What's the simplest thing that could work? Start there. Add complexity when the simple thing proves insufficient.

Am I solving a real problem or a hypothetical one? If you can't point to a user, a requirement, a bug - you're probably over-engineering.

The stored procedure middleware wasn't built by bad engineers. It was built to solve a real problem - letting non-developers create integrations. But the flexibility it enabled came with costs nobody anticipated: infinite loops in production, databases locking up, an ops team with stress-related health problems.

The React-GraphQL-REST stack wasn't built by incompetent architects. It was built by competent people preparing for scale that never arrived and organisational complexity that never materialised.

Build for the problem in front of you. Keep your options open for problems you can't yet see. But don't solve those problems until they arrive - and most of them never will.

Tomorrow's can wait.
