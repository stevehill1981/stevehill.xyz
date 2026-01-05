---
title: "Write It Down or Watch History Repeat"
pubDate: 2026-01-05
excerpt: "Engineers hate writing documentation. Without it, teams make the same mistakes repeatedly. Knowledge expires when people move on. Writing is how we stop wasting time."
tags:
  - documentation
  - engineering-leadership
  - lessons-learned
---

"Why does this code do that?"

I've asked this question hundreds of times over my career. Sometimes I get an answer. More often, I get a shrug. "I don't know, it was like that when I got here."

The person who knew is gone. They left the company, or moved teams, or just forgot. The knowledge that would have taken thirty seconds to write down now takes three hours to rediscover. And next year, someone else will ask the same question and spend the same three hours.

This is the cost of not writing things down. Paid over and over, by everyone who comes after.

<!--more-->

## Why We Don't Write

Engineers hate documentation. I include myself in this - it took me years to understand why it matters.

We tell ourselves stories:

**"The code is self-documenting."** Sometimes it is. Often it isn't. The code tells you *what* happens, not *why*. It doesn't explain the business rules that drove the design, the constraints that shaped the implementation, the bugs that were considered and rejected.

**"It'll be out of date immediately."** This is true for the wrong kind of documentation. API references and function signatures go stale. But the *reasons* behind decisions don't change, and those are what you actually need.

**"Nobody reads documentation anyway."** Because most documentation is useless. It's either too detailed to be findable or too vague to be helpful. Good documentation gets read, because it solves real problems.

**"I'll remember."** No, you won't. I've written code I don't recognise six months later. I've made decisions I can't explain. Memory is unreliable. Written records aren't.

## What Actually Needs Writing

Not everything needs documenting. The goal isn't comprehensive coverage - it's capturing the knowledge that would otherwise be lost.

**Decision records.** When you make a significant choice - a technology selection, an architectural pattern, a trade-off - write down what you chose, what alternatives you considered, and why you decided as you did. In a year, this saves someone from relitigating the same decision.

**The "why" behind non-obvious code.** If you write something that looks wrong, or handles an edge case nobody would expect, leave a comment. Not explaining what the code does - explain why it does it. "This handles the case where the vendor API returns duplicate records with different timestamps."

**Onboarding knowledge.** What does a new team member need to know to be effective? Not the obvious things - where the code lives, how to run the tests. The non-obvious things. The gotchas. The tribal knowledge that everyone assumes everyone else knows.

**Incident post-mortems.** When something breaks, write down what happened, why it happened, and what you did to prevent it happening again. Without this, you'll have the same incident again. I've seen teams have the same outage three times because nobody documented the first two.

**System context.** What does this system do? Who uses it? What other systems does it integrate with? What are the invariants it maintains? A few paragraphs of context can save hours of archaeology.

## Where to Put It

Documentation that nobody can find is useless. Equally useless is documentation scattered across wikis, Notion pages, Google Docs, and README files.

My rule: keep it as close to the code as possible.

**ADRs (Architecture Decision Records)** in the repo. One markdown file per significant decision. They live with the code, get reviewed with the code, and can be found by anyone with access to the repo.

**README files** at the root of each significant directory. What's in this folder? How does it fit into the larger system? What should someone know before modifying it?

**Code comments** for the non-obvious. Not "increment the counter" but "we increment twice because the vendor API requires 1-indexed pagination but we use 0-indexed internally."

**Runbooks** for operational knowledge. How do you deploy? How do you roll back? What do you check when the alerts fire? These can live in a wiki if they need to be accessible without code access, but a link from the repo helps.

The common thread: the documentation should be discoverable. When someone has a question, they shouldn't have to know that the answer exists in a three-year-old Confluence page titled "Notes from Sprint 47 Planning."

## The Half-Life of Knowledge

Knowledge decays. Every time someone leaves the company, some of it walks out the door. Every time someone moves teams, some of it becomes inaccessible. Every time someone forgets, some of it just disappears.

I've specialised in rescuing legacy applications - systems abandoned by their original developers, often without documentation. The pattern is always the same:

Nobody knows why the system does what it does. The business rules are encoded in code that nobody understands. Changes are terrifying because nobody knows what might break. Simple questions take days to answer.

The cost is enormous. I've spent weeks reverse-engineering logic that someone could have explained in ten minutes, if they'd written it down, if they were still around.

Every document you write is a gift to your future self and everyone who comes after. It's the institutional memory that survives departures and reorgs and forgetting.

## Teaching as Documentation

The best documentation often doesn't look like documentation.

**Code reviews** are a form of documentation. When you explain why something should change, you're recording knowledge.

**Pair programming** is documentation that happens in real-time. Two people understanding together means the knowledge exists in two minds instead of one.

**Presentations and tech talks** capture knowledge in a form that's accessible to more people. Record them if you can.

**Blog posts** - internal or external - force you to articulate knowledge clearly. The act of writing surfaces gaps in your own understanding.

The format matters less than the act. Knowledge that only exists in someone's head is one departure away from being lost forever.

## Starting Small

If your team doesn't write things down, you won't fix it overnight. Start small:

**Write one ADR this week.** Pick a recent decision. Write down what you chose and why. Show the team. Make it easy for them to write their own.

**Add one explanatory comment.** Find code that confused you. Figure out why it works that way. Write a comment explaining it.

**Document one incident.** Next time something breaks, write a brief post-mortem. What happened? Why? What did you change? Five minutes of writing saves hours of repetition.

**Create one onboarding note.** What do you wish someone had told you when you joined? Write it down for the next person.

These are small acts. But they compound. A team that writes things down accumulates knowledge instead of losing it. Over years, this makes the difference between a codebase that's comprehensible and one that's an archaeological dig.

## The Alternative

I've seen what happens when teams don't write things down.

New engineers take months to become productive instead of weeks. The same mistakes get made again and again. Technical decisions get relitigated because nobody remembers why they were made. Entire systems become untouchable because nobody understands them well enough to change them safely.

The engineers who understand are constantly interrupted by questions. They become bottlenecks, single points of failure for knowledge. When they leave - and they always leave eventually - the knowledge goes with them.

This is a choice. Not a conscious one, usually, but a choice nonetheless. Every time you don't write something down, you're choosing to let that knowledge decay.

Write it down. Your future colleagues will thank you. Your future self will thank you. And you'll stop watching history repeat.
