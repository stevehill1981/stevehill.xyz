---
title: "Process Theatre Kills Teams"
pubDate: 2026-01-05
excerpt: "Teams spend hours debating sprint length and story points while the actual work waits. Endless estimation rituals create disengaged engineers who'd rather be solving problems. Trust the team. Get out of their way."
tags:
  - process
  - engineering-leadership
  - agile
  - lessons-learned
---

The meeting had been going for forty minutes. We were debating whether a task was a 3 or a 5.

Not three days versus five days. Three points versus five points. Abstract units that supposedly weren't time, except everyone treated them as time, and the project manager was going to divide by the team's velocity to get a date anyway.

Forty minutes. For a task that would take a day to actually do.

I looked around the room. Half the team had glazed over. One engineer was clearly answering Slack messages under the table. The tech lead was staring at the ceiling. And the most senior person in the room - the one who actually knew how long it would take - had given up trying to explain twenty minutes ago.

This is process theatre. And it's killing your team.

<!--more-->

## What Process Theatre Looks Like

Process theatre is when the rituals of software development become more important than the software itself. It's when teams spend more energy proving they're following a process than actually delivering value.

You've seen it:

**The estimation debate.** Hours spent arguing about story points, Fibonacci sequences, t-shirt sizes. None of which matter, because the estimate is wrong anyway, and everyone knows it's wrong, but we have to have a number in the system.

**The sprint length argument.** Should we do one week or two? Two weeks or three? As if the length of the iteration is what's blocking delivery, rather than the work itself.

**The daily standup that isn't.** Fifteen-minute status reports to a manager who isn't even on the team. Everyone reciting what they did yesterday, what they're doing today, and blockers they already mentioned in Slack. Nobody actually listening.

**The retrospective where nothing changes.** The same issues raised every two weeks. The same action items written on sticky notes. The same problems persisting because nobody has the authority or the will to actually fix them.

**The refinement session that refines nothing.** Two hours of reading tickets aloud, asking clarifying questions that could have been asked asynchronously, and arguing about acceptance criteria that will change the moment development starts.

## The Cargo Cult

Most organisations doing "Agile" aren't agile. They're doing Cargo Cult Agile - copying the rituals without understanding the purpose.

The Agile Manifesto was a reaction against heavyweight processes like PRINCE2, where documentation and ceremony had become more important than working software. I've worked in PRINCE2 environments. The paperwork was extraordinary. Entire weeks could be spent producing documents that nobody would ever read.

Agile was supposed to fix this. Individuals and interactions over processes and tools. Working software over comprehensive documentation. Responding to change over following a plan.

Instead, we got Scrum. Which somehow became its own heavyweight process, complete with certified Scrum Masters, mandatory ceremonies, and an entire industry of consultants selling training courses.

The irony is painful. We escaped one set of rituals by adopting another. The meetings changed names, but there are just as many of them. The documentation moved from Word documents to Jira tickets, but there's just as much of it.

## The Real Cost

Process theatre doesn't just waste time. It actively damages teams.

**It drives out your best people.** Good engineers want to solve problems. They want to build things. When they spend more time in meetings than writing code, they leave. And they don't leave for companies with better processes - they leave for companies with fewer processes. Or they go freelance, where they control their own time.

**It creates learned helplessness.** When engineers realise that their estimates don't matter, that the plan will change anyway, that the retrospective won't fix anything - they stop trying. They show up, go through the motions, and save their energy for things they can actually influence.

**It optimises for the wrong things.** Velocity becomes a target rather than a measure. Story points get inflated so teams hit their numbers. Work gets broken into smaller tickets not because it's useful, but because more tickets completed looks better in the charts.

**It papers over real problems.** The process becomes a comfort blanket. If we're following the process, we must be doing things right. The standups are happening, the sprints are running, the board is moving. Never mind that customers aren't happy and the product isn't improving.

At one company, the CTO mandated five-line commit limits, because that's how his previous team at Google had done it. The idea was to encourage small, focused changes.

In practice, it made it impossible to see the direction of anyone's work. You couldn't understand a feature by reading the commits. You couldn't review a pull request without losing the thread. The process that was supposed to improve code quality made it worse, because nobody could see what was actually happening.

## What Actually Works

I've worked in many different environments over nearly two decades. The teams that shipped the best software had a few things in common:

**Trust.** Management trusted the team to do their job. They didn't need daily status updates. They didn't need estimates to three decimal places. They set a direction, provided context, and got out of the way.

**Autonomy.** The team decided how to work. If standups weren't useful, they stopped doing them. If two-week sprints didn't fit, they changed them. The process served the team, not the other way around.

**Outcomes over rituals.** Nobody cared whether you followed the process. They cared whether you shipped. The measure of success was working software in users' hands, not velocity charts and burndown graphs.

**Small teams.** The best teams I've worked on had five or six people. Communication happened naturally because everyone was in the same room. You didn't need ceremonies to force information sharing - it just happened.

**Continuous delivery.** When you can ship multiple times a day, sprints become meaningless. You don't need to estimate because you'll know if something is taking too long. You don't need refinement sessions because you're constantly learning from production.

Shape Up, Basecamp's approach, gets this right. Six-week cycles with real autonomy for the team. No daily standups, no story points, no estimation theatre. Just a clear appetite for how much time something is worth, and trust that the team will figure out the best way to deliver within that constraint.

## Breaking Free

If you're stuck in process theatre, you probably can't fix it overnight. But you can start:

**Question every meeting.** What decision does this meeting make? What would happen if we didn't have it? If the answer is "nothing would change," stop having it.

**Stop estimating in points.** If your estimates are just going to be converted to dates anyway, estimate in days. At least then you're being honest about what you're doing.

**Make retrospective actions real.** If the same issue comes up three retrospectives in a row, something is broken. Either fix it or stop pretending you're going to.

**Protect maker time.** Engineers need long, uninterrupted blocks to do deep work. Every meeting is a context switch. Every ceremony is an interruption. Be ruthless about protecting time for actual work.

**Measure outcomes, not activity.** Stop tracking velocity. Stop celebrating tickets closed. Start asking: did customers get value? Did the product improve? Is the team happy?

The best process is the one you don't notice. It's lightweight enough to disappear into the background, leaving space for the actual work. If your process is visible - if people talk about it, complain about it, spend significant time on it - it's probably too heavy.

Trust your team. Get out of their way. The software will follow.
