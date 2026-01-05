---
title: "Build for Today, Design for Tomorrow"
pubDate: 2026-01-05
excerpt: "Most failed systems I've rescued weren't too rigid - they were too flexible. Abstract frameworks for use cases that never materialised. Solve the problem in front of you."
tags:
  - architecture
  - engineering-leadership
  - lessons-learned
---

The codebase had seventeen different ways to send an email.

There was the original `Mailer` class. Then someone added `EmailService` for "better abstraction." Then `NotificationGateway` for when they thought they might add SMS. Then `MessageDispatcher` for the plugin architecture that never got built. Then `CommunicationHub` for the microservices migration that never happened.

Each layer wrapped the one before it. Each added configuration options for hypothetical requirements. Each made it harder to answer the simple question: "Why didn't this customer get their receipt?"

The system wasn't rigid. It was the opposite - so flexible it had become incomprehensible. Built for a future that never arrived.

<!--more-->

## The Flexibility Trap

Most failed systems I've rescued weren't too rigid. They were too flexible.

Engineers are trained to think ahead. We're taught about extensibility, about open-closed principles, about designing for change. This is good advice, in moderation. But it's easily corrupted into something harmful: building for imaginary requirements.

I've seen it repeatedly:

**The plugin architecture nobody uses.** Hours spent designing a system where functionality can be swapped at runtime, with interfaces and factories and dependency injection. Then one plugin gets written, and it never changes.

**The configuration-driven everything.** Instead of writing code that does what's needed, engineers build systems that can do anything - if you just set the right flags. The configuration becomes more complex than code would have been, and nobody remembers what half the options do.

**The abstraction layers.** A simple database query becomes a repository that implements an interface that's injected by a factory that's configured by a builder. Six files to do what one function could have done.

**The microservices that never split.** A monolith designed as if it might become distributed at any moment, with message queues between components that run in the same process, serialising and deserialising data that never leaves the machine.

## Why We Do This

It feels professional. It feels like engineering, rather than just hacking something together. We've all inherited codebases where nothing was abstracted, where business logic was scattered everywhere, where making a change meant editing dozens of files. We swore we'd never build something like that.

So we overcorrect. We add abstractions before we need them. We design for flexibility before we understand the constraints. We solve tomorrow's problems before we've finished solving today's.

There's also fear. What if the requirements change? What if we need to swap databases? What if we need to support a new channel? The abstractions feel like insurance - protection against an uncertain future.

But they're expensive insurance. Every abstraction is code that must be maintained, understood, debugged. Every layer of indirection is another place where bugs can hide. Every "flexible" system is harder to change than a simple one, because you have to understand the flexibility before you can work within it.

## The Irreversibility Test

Not all future-proofing is wrong. The question is: what's the cost of being wrong?

Some decisions are genuinely hard to reverse:
- **Database schema design.** Migrating data is painful. Think carefully about your data model.
- **Public API contracts.** Once clients depend on your API, changing it breaks things. Design APIs deliberately.
- **Core domain models.** The fundamental concepts in your system shape everything built on top. Get these wrong and you'll be fighting the abstraction forever.

These deserve careful thought. Spend time on them. Get them reviewed. They're the foundation.

But most decisions aren't like this:
- **Which library to use for HTTP calls.** Wrapped in a thin adapter, this can be changed in an afternoon.
- **How to structure internal modules.** Refactoring is routine. Move things around when you understand the domain better.
- **Whether to use classes or functions.** This is a style choice, not architecture. It can evolve.

For reversible decisions, the fastest path is to build something simple and see what happens. You'll learn more from running code than from design documents.

## YAGNI Is Your Friend

"You Aren't Gonna Need It" sounds dismissive, but it's one of the most valuable principles in software engineering.

That plugin system? You aren't gonna need it. Build the one thing you need, and if you ever need a second thing, *then* design for extensibility - with the benefit of knowing what extensibility actually means for your domain.

That configuration option? You aren't gonna need it. Hardcode the value. If it ever needs to change, that's a five-minute edit.

That abstraction layer? You aren't gonna need it. Call the database directly. If you ever need to swap databases (you won't), you'll refactor then.

The time you save by not building unnecessary flexibility can be spent on the things that matter: making the system work correctly, making it fast enough, making it maintainable by the team who'll inherit it.

## What Actually Works

The best codebases I've worked in shared a common trait: they were simple. Not simplistic - they handled complex domains and real-world messiness. But they didn't have unnecessary machinery.

**Thin vertical slices.** Features built end-to-end, with just enough abstraction to be clear. You could trace a request from the UI to the database without getting lost in layers.

**Duplication over the wrong abstraction.** When two pieces of code looked similar, they stayed duplicated until a real pattern emerged. Three concrete examples before an abstraction.

**Boring patterns, consistently applied.** Not clever, not novel. The same structure repeated throughout the codebase. New team members could understand one part and understand them all.

**Code that says what it does.** Not what it might do, or could be configured to do. Functions with names like `sendReceiptEmail`, not `dispatch(new EmailMessage(EmailType.RECEIPT, config))`.

At my current employer, the Rails monolith people wanted to replace was actually well-designed. It was simple. New features could be added without understanding the entire system. The problem wasn't the architecture - it was that years of work had been done, and people were tired of looking at the same code.

We didn't rewrite it. We upgraded it, modernised it, cleaned up the rough edges. The simplicity was a feature, not a bug.

## The Right Amount of Design

I'm not advocating for no design. Some problems genuinely need thinking through before you write code. Complex domains benefit from modelling. Distributed systems require careful thought about failure modes.

But the design should be proportional to the problem. Ask yourself:

**Is this decision reversible?** If yes, make a choice and move on. You can change it later.

**Do I have three concrete examples?** If you're designing an abstraction based on one use case, you're guessing. Wait until you have enough examples to see the real pattern.

**What's the simplest thing that could work?** Start there. Add complexity only when the simple thing proves insufficient.

**Am I solving a real problem or a hypothetical one?** If you can't point to a user, a requirement, a bug - you're probably over-engineering.

Build for the problem in front of you. Keep your options open for the problems you can't yet see. But don't solve those problems until they arrive - and many of them never will.

The seventeen email wrappers weren't built by bad engineers. They were built by engineers trying to do the right thing, preparing for futures that never happened. Each abstraction made sense at the time. Together, they made the system unmaintainable.

Solve today's problem. Tomorrow's can wait.
