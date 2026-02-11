---
title: "Process Theatre Kills Teams"
pubDate: 2026-01-05
excerpt: "I've worked in PRINCE2 environments where weeks were spent on documents nobody read. I've worked in 'Agile' shops that were just as ceremonial. The best teams I've been on had almost no process at all."
tags:
  - process
  - engineering-leadership
  - agile
  - lessons-learned
  - process-theatre
---

The meeting had been going for forty minutes. We were debating whether a task was a 3 or a 5.

Not three days versus five days. Three points versus five points. Abstract units that supposedly weren't time, except everyone treated them as time, and the project manager was going to divide by the team's velocity to get a date anyway.

Forty minutes. For a task that would take a day to actually do.

I looked around the room. Half the team had glazed over. One engineer was clearly answering Slack messages under the table. The tech lead was staring at the ceiling. And the most senior person in the room - the one who actually knew how long it would take - had given up trying to explain twenty minutes ago.

This was early in my career. I thought this was normal. I thought this was how professional software development worked.

It took me years to realise: this is process theatre. And it's killing teams everywhere.

<!--more-->

## Learning What "Agile" Meant

My first development job was at a web agency with no process at all — FTP and hope. When I moved to an ecommerce company, I encountered Scrum for the first time. Sprints, standups, retrospectives, story points, a Scrum Master. After the chaos of the agency, it felt revolutionary.

It took longer to notice the dysfunction.

The standups that ran thirty minutes because everyone gave detailed status reports to the product manager instead of actually coordinating. The sprint planning sessions that consumed entire afternoons. The retrospectives where we identified the same problems repeatedly and never fixed any of them.

We were doing all the ceremonies. We were hitting our velocity targets. We were following the process perfectly.

We also shipped three concurrent versions of the application because nobody could agree on which one to finish, and eventually the global financial crisis put the company out of business before we resolved it.

That experience felt isolated at the time. It took working in more companies to see it as a pattern — and to recognise where the pattern came from.

## The Cargo Cult

The Agile Manifesto was a reaction against heavyweight processes like PRINCE2, the UK government's project management framework. I've worked in PRINCE2 environments. The paperwork was extraordinary. Entire weeks could be spent producing documents that nobody would ever read. Gantt charts. Risk registers. Change requests in triplicate.

Agile was supposed to fix this. Individuals and interactions over processes and tools. Working software over comprehensive documentation. Responding to change over following a plan.

Instead, we got Scrum. Which somehow became its own heavyweight process, complete with certified Scrum Masters, mandatory ceremonies, and an entire industry of consultants selling training courses.

The irony is painful. We escaped one set of rituals by adopting another. The meetings changed names, but there are just as many of them. The documentation moved from Word documents to Jira tickets, but there's just as much of it.

And then there's the cargo culting. Taking practices from companies that operate at completely different scales and applying them blindly.

At a climate tech startup, the incoming CTO mandated we use Gerrit, Google's code review tool, with five-line commit limits. That's how his SRE team at Google had done it, he explained. Small, focused changes. Easy to review.

In practice, it made it impossible to see the direction of anyone's work. You couldn't understand a feature by reading the commits — there were too many, each one meaningless in isolation. You couldn't review a pull request without losing the thread. The process that was supposed to improve code quality made everything worse, because nobody could see what was actually happening.

He'd taken a practice that made sense for a specific context — massive-scale infrastructure with thousands of engineers — and applied it to a startup of twelve people. Classic cargo cult: copying the rituals without understanding why they existed.

Cargo culting is embarrassing, but the real damage comes when process theatre scales up.

## The Real Cost

At a VC-funded fintech, I watched process theatre nearly destroy a company.

When I joined, there were about twenty-five engineers, organised into squads with clear areas of responsibility. A new VP of Engineering came in and restructured. Then restructured again. Each restructure came with new processes, new ceremonies, new ways of working.

By the time I left, the company had contracted to twelve engineers. But the org chart hadn't shrunk to match. There were still four tech leads, each with their own team processes, managing complexity that no longer matched the team size.

The standups continued. The sprint ceremonies continued. The estimation sessions continued. All for a team that was now small enough to just talk to each other. But nobody questioned the process. It was just how things were done.

Meanwhile, the actual work — maintaining 120 microservices across customer-owned Kubernetes clusters — was drowning in the overhead. Engineers spent more time in meetings about the work than doing the work.

Process theatre doesn't just waste time. It actively damages teams.

It drives out your best people. Good engineers want to solve problems. When they spend more time in meetings than writing code, they leave. They don't leave for companies with better processes — they leave for companies with fewer processes.

It creates learned helplessness. When engineers realise their estimates don't matter, that the plan will change anyway, that the retrospective won't fix anything — they stop trying. They show up, go through the motions, and save their energy for things they can actually influence.

It optimises for the wrong things. Velocity becomes a target rather than a measure. Story points get inflated. Work gets broken into smaller tickets not because it's useful, but because more tickets completed looks better in the charts.

If process theatre is the disease, what does health look like?

## What Actually Works

The best teams I've worked on had almost no process at all.

At my current employer, we restarted monthly "Shop Talks" where engineers present on topics that interest them — Rails improvements, Elixir experiments, AI tools, personal projects. No tickets. No story points. Just engineers sharing knowledge because they want to.

With a freelance client I've worked with for nine years, we've never had formal sprints or standups. I work roughly twenty hours a week, autonomously, on whatever needs doing. We have a shared understanding of priorities. When something's blocked or needs discussion, we talk. When it doesn't, we don't.

Nine years. Rails 3 to 8. PostgreSQL 11 to 17. No Scrum Master. No velocity tracking. No estimation theatre. Just steady, incremental improvement by people who trust each other.

The patterns are consistent:

**Trust.** Management trusts the team to do their job. They don't need daily status updates. They set a direction, provide context, and get out of the way.

**Autonomy.** The team decides how to work. If standups aren't useful, they stop doing them. If two-week sprints don't fit, they change them. The process serves the team, not the other way around.

**Outcomes over rituals.** Nobody cares whether you followed the process. They care whether you shipped. The measure of success is working software in users' hands, not velocity charts.

**Small teams.** Five or six people who communicate naturally because they're actually working together. No ceremonies needed to force information sharing.

Shape Up — Basecamp's alternative to Scrum — gets this right. Six-week cycles with real autonomy. No daily standups, no story points, no estimation theatre. Just a clear appetite for how much time something is worth, and trust that the team will figure it out.

## Breaking Free

If you're stuck in process theatre, you probably can't fix it overnight. But you can start:

Question every meeting. What decision does this meeting make? What would happen if we didn't have it? If the answer is "nothing would change," stop having it.

Stop estimating in points. If your estimates are just going to be converted to dates anyway, estimate in days. At least then you're being honest.

Make retrospective actions real. If the same issue comes up three times, something is broken. Either fix it or stop pretending you're going to.

Protect maker time. Engineers need long, uninterrupted blocks for deep work. Every meeting is a context switch. Every ceremony is an interruption.

Measure outcomes, not activity. Stop tracking velocity. Stop celebrating tickets closed. Start asking: did customers get value? Did the product improve? Is the team happy?

## The Work Is What Matters

The best process is the one you don't notice. It's lightweight enough to disappear into the background, leaving space for the actual work.

I've spent nearly two decades watching teams drown in process. The estimation debates. The ceremony overhead. The org chart reshuffles. The cargo-culted practices from companies operating at completely different scales.

The teams that shipped the best software were the ones that stopped worrying about process and started worrying about outcomes. They trusted each other. They communicated when it mattered. They got out of each other's way.

The ex-Googler CTO at the climate tech startup imposed five-line commit limits and Gerrit workflows. Eighteen months later, customer data was corrupted and he was gone. The process didn't save anyone.

Trust your team. Get out of their way. The software will follow.
