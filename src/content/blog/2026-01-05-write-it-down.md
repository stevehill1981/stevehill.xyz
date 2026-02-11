---
title: "Write It Down or Watch History Repeat"
pubDate: 2026-01-05
excerpt: "I've spent years rescuing systems with no documentation. Weeks reverse-engineering logic someone could have explained in ten minutes. The cost of not writing things down is paid over and over."
tags:
  - documentation
  - engineering-leadership
  - lessons-learned
  - write-it-down
---

When I returned to a company I'd worked at years earlier, I discovered I'd become a legend.

Not for anything good. For the comments I'd left in the codebase.

"This is obviously terrible." "Why would anyone write it this way?" "This entire function is wrong." Snarky, superior comments scattered throughout the code, written when I was young and thought I knew everything.

The newer developers were excited to meet me. They quoted my comments back to me. They thought I was some kind of hero who "told it like it is."

I was mortified. In the years since I'd left, I'd learned enough to realise I'd been wrong about almost everything. The code I'd criticised often had good reasons behind it — reasons I'd never bothered to understand. The comments I'd left weren't documentation. They were arrogance.

They taught me nothing useful. They helped nobody. They just made people feel bad about code they hadn't written and couldn't easily change.

That was when I started thinking seriously about what documentation actually means.

<!--more-->

## The Rescue Work

I spent two years at a company specialising in PHP rescue projects. We took business-critical applications abandoned by their original developers and made them maintainable again.

Far too many of these projects had no documentation at all.

No explanation of what the system did. No record of why decisions were made. No runbooks for deployment. No onboarding guides. Nothing. Just code, often written by developers who'd moved on years ago, sometimes in programming styles that were outdated before the developers had even finished writing them.

The pattern was always the same:

Nobody knew why the system did what it did. The business rules were encoded in code that nobody understood. Changes were terrifying because nobody knew what might break. Simple questions — "why does this process run at 3am?" — could take days to answer.

I spent weeks reverse-engineering logic that someone could have explained in ten minutes. If they'd written it down. If they were still around.

The cost of not writing things down isn't paid once. It's paid over and over, by everyone who comes after.

The rescue projects showed me what's lost when nobody documents. But it was a mountain of support tickets that showed me what happens when you start.

## The Support Ticket Mountain

At one company, I inherited more than a thousand open support tickets. Some were over a year old. The system was creaking. Everyone was stressed. The ops team was developing health problems from the constant fire-fighting.

When I dug into the backlog, I found patterns. The same issues appearing again and again. The same questions asked repeatedly. The same problems "fixed" multiple times because nobody had documented the root cause or the solution.

We established a third-line support function. Part of the job was resolving tickets. But the more important part was documenting what we learned.

When we found a root cause, we wrote it down. When we fixed something non-obvious, we documented why. When we answered a question for the third time, we created a knowledge base article so nobody would have to ask a fourth time.

Within three months, new ticket creation had dropped by eighty percent. Not because the system improved — it was the same code. But because we stopped making the same discoveries repeatedly. The knowledge accumulated instead of evaporating.

That eighty percent drop came from documenting five specific kinds of knowledge.

## What Actually Needs Writing

Not everything needs documenting. The goal isn't comprehensive coverage — it's capturing knowledge that would otherwise be lost.

**Decision records.** When you make a significant choice — a technology selection, an architectural pattern, a trade-off — write down what you chose, what alternatives you considered, and why you decided as you did. In a year, this saves someone from relitigating the same decision.

**The "why" behind non-obvious code.** If you write something that looks wrong, or handles an edge case nobody would expect, leave a comment. Not explaining what the code does — explain why it does it.

**Onboarding knowledge.** What does a new team member need to know to be effective? Not the obvious things. The gotchas. The tribal knowledge that everyone assumes everyone else knows.

**Incident post-mortems.** When something breaks, write down what happened, why it happened, and what you did to prevent it happening again. Without this, you'll have the same incident again.

**System context.** What does this system do? Who uses it? What are the invariants it maintains? A few paragraphs of context can save hours of archaeology.

These categories are a starting point. The real test is whether the documentation survives contact with time.

## The Nine-Year Test

I've been working with one client for nine years now. Their application handles access control and security hardware — complex domain, real-world messiness, hundreds of customer sites. When I started, it was a complex application that needed TLC. The codebase had accumulated years of functionality without corresponding documentation.

We made a deliberate decision: nobody should need to be there from the beginning to understand this system.

Every significant decision started getting documented. Every non-obvious piece of logic got explained. Every deployment procedure got written down. We built sustainable, well-documented systems with comprehensive automation — deliberately avoiding creating dependency on any single person.

Nine years later, that system can be maintained by any competent engineer. They don't need years of context to make changes safely. The documentation captures what would otherwise live only in people's heads.

That's the goal. A system that doesn't depend on institutional memory. A codebase that explains itself to anyone who needs to understand it.

Documentation doesn't have to be formal to work. Sometimes the most effective knowledge transfer doesn't look like documentation at all.

## Teaching as Documentation

At my current employer, I helped restart monthly "Shop Talks" — sessions where engineers present on topics that interest them. Rails improvements. Elixir experiments. AI tools. Personal projects.

These aren't formal documentation. But they're knowledge transfer. Each talk captures something someone learned and shares it with the team. The knowledge exists in more than one head. When that person moves on, the knowledge doesn't disappear entirely.

Code reviews are documentation too. When you explain why something should change, you're recording knowledge. Pair programming is documentation happening in real-time. Blog posts — internal or external — force you to articulate what you know.

The format matters less than the act. Knowledge that only exists in someone's head is one departure away from being lost forever.

Which brings me back to those snarky comments.

## What Bad Documentation Teaches

The wrong kind of documentation is worse than none at all. Comments that say "this is bad" without explaining why, or what to do instead, just make people feel bad. Documentation that's out of date actively misleads. Explanations that assume too much knowledge leave people more confused than before.

Good documentation respects the reader. It assumes they're intelligent but uninformed. It explains the context, not just the conclusion. It says "here's why we did this" rather than "this is obviously the right choice."

The developers who came after me deserved better than snark. They deserved explanations. They deserved context. They deserved the knowledge that would have helped them understand and improve the code, not just feel bad about it.

## Starting Today

If your team doesn't write things down, you won't fix it overnight. But you can start:

Write one decision record this week. Pick a recent choice. Write down what you decided and why. Show the team.

Add one explanatory comment. Find code that confused you. Figure out why it works that way. Explain it for the next person.

Document one incident. Next time something breaks, write a brief post-mortem. Five minutes of writing saves hours of repetition.

Create one onboarding note. What do you wish someone had told you when you joined? Write it down.

These are small acts. But they compound. A team that writes things down accumulates knowledge instead of losing it. Over years, this makes the difference between a codebase that's comprehensible and one that's an archaeological dig.

I've seen the alternative. New engineers take months to become productive instead of weeks. The same mistakes repeat. Technical decisions get relitigated because nobody remembers why they were made. The engineers who understand become bottlenecks, then leave, and the knowledge goes with them.

Write it down. Your future colleagues will thank you. Your future self will thank you. And you'll stop watching history repeat itself.

I learned that the hard way. Now I write things down.
