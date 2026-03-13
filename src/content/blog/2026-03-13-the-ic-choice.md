---
title: "The IC Choice"
pubDate: 2026-03-13
draft: true
excerpt: "After twenty years, people assume you either moved into management or failed to. There's a third option: you chose not to, because that's not where you have the most impact."
tags:
  - engineering-leadership
  - lessons-learned
  - career
---

At the hospitality startup, the CTO left during the financial crisis. Revenue was collapsing. The engineering team needed someone to hold things together. I was the most senior engineer, so the title landed on me: Interim CTO.

I managed three redundancies in my first two weeks. I sat in discussions with the founders explaining infrastructure costs to people who didn't know what a Lambda function was. I made decisions about headcount and budget and strategy.

I was good enough at it. The company still failed — the energy crisis killed too many of our customers — but the engineering side held together. Looking back, if I'd been a better leader, I'd have cut staff costs first and foremost. That was the bigger lever. Instead, I focused on the infrastructure because that's where I was comfortable. I kept the lights on and gave the business extra months of runway, but I could have bought more time if I'd thought like a CEO instead of an engineer.

When it was over, I went back to writing code. Not because the CTO experience was bad. Because it confirmed what I already suspected: management is a different job, and being good at engineering doesn't make you good at it. I could do it. I didn't want to build a career on it.

<!--more-->

## The Assumption

Early in my career, I assumed management was the destination. That's what the industry tells you. Senior engineer, lead engineer, engineering manager, director, VP, CTO. A ladder, with code at the bottom and authority at the top. If you're still writing code after ten years, something went wrong.

I believed that for a while. I spent years thinking the goal was to climb — that my job was to get good enough at engineering to earn the right to stop doing it. It took time to realise that the thing I actually wanted wasn't higher up the ladder. It was already where I was standing.

## What I Actually Wanted

I never wanted a title. I wanted autonomy.

Specifically: enough seniority that I have real influence over what gets built and how it gets built. The authority to spend time on tests without someone telling me it's a luxury. The standing to push back when a technical direction is wrong — and to be heard when I do.

That's it. That's the entire ambition. Not glamorous, but specific.

At my current employer, I have this. When I arrived, the Rails application had been written off. Parts of the system had already been migrated to TypeScript. The monolith was a dead end — scheduled for termination, not investment. I'd seen this before. I knew the application didn't need replacing. It needed modernising.

I made the case. We upgraded Rails from 5.2 to 8.0, Ruby from 2.7 to 3.4, and got a thirty percent performance improvement. The application went from "legacy liability" to the core of the platform. That outcome happened because I had enough autonomy to challenge the direction — and enough credibility, built from years of doing exactly this kind of work, to be taken seriously.

I didn't need a management title for any of that. I needed experience, good judgement, and an organisation willing to listen.

## The Impact Question

There's a common argument that managers have more impact because they multiply the output of a team. A good manager makes ten engineers more effective. A good IC only makes themselves more effective.

I don't think that's true. When I joined my current employer, most of the engineering team had been working in TypeScript. The Rails application was the thing nobody wanted to touch. After the upgrade proved the monolith had a future, those same engineers needed to work in it — and they needed someone to show them how.

That became my job. Not formally, not with a mentorship programme or a training budget. Just code reviews, pairing sessions, and explaining why Rails does things the way it does. It helps that I'm surrounded by smart people — these were strong engineers who already knew how to build software. They just needed someone to bridge the gap between what they knew and how Rails expected them to work. I wasn't the only one doing this — other senior engineers on the team were pulling in the same direction. But that's the point: senior ICs working together can shift an entire team's capability without a single management decision being made.

A manager could have allocated time for training. They couldn't have taught the material. That required someone who understood both the codebase and the craft well enough to transfer knowledge in the middle of real work, not in a classroom.

The difference between a senior IC and a manager isn't the amount of impact. It's the type. A manager's impact is organisational: hiring, process, prioritisation, team health. An IC's impact is technical: architecture, quality, knowledge transfer, craft. Both matter. They require completely different skills.

## The Honest Downside

The money is worse.

Most companies pay managers more than ICs at equivalent seniority. The industry has a salary ceiling for people who write code, and it's lower than the ceiling for people who manage people who write code. I'm well paid at my current employer, but I know that in other companies, my skills wouldn't carry the same salary bracket. The market values management experience more than technical depth, even when the technical work is harder to replace.

I've accepted that trade-off. Financial stability matters to me — I'm not pretending otherwise — and I've structured my career to maintain it. Freelance work alongside the day job. Choosing employers who genuinely value senior ICs, not just companies that say they do in job adverts.

But I won't pretend it's not a factor. Every "why I stayed IC" post I've read either ignores the money entirely or comes from someone at a FAANG company where the IC track pays enough to make the question irrelevant. For the rest of us, in normal companies with normal budgets, the pay gap between senior IC and engineering manager is real and persistent.

I stay anyway, because autonomy over my craft matters more to me than closing that gap. Your priorities might be different. That's fine.

## The Environments Where This Works

Not every company supports senior ICs properly. Some organisations treat everyone below manager as interchangeable. If your input on architecture is overruled by someone who stopped writing code five years ago, you don't have autonomy — you have a job title.

I've been on the wrong end of this. At a climate tech startup, I was effectively forced into rewriting a working Symfony PHP application into Go microservices because the CTO — an ex-Googler — thought PHP was a toy language. He also resisted automated testing, insisting that the only way to know if software works is to test in production, like Google does. I knew the rewrite was a mistake. I said so. Nobody listened. The Go rewrite went ahead, [corrupted six months of customer data](/blog/2026-01-05-boring-technology-wins), and the CTO eventually left. The PHP system, which had been kept running as a fallback, is probably still serving the business.

That's what it looks like when senior engineers don't have autonomy. The experience existed. The judgement existed. The authority to act on it didn't.

At my current employer, the opposite happened. I challenged the direction, made my case, and the team listened. Same engineer, same instinct, different outcome — because the organisation valued technical experience enough to let it influence decisions.

The difference isn't the engineer. It's the environment. If you want the IC path to work, you need a company where senior technical judgement carries real weight. Where testing isn't a luxury and documentation isn't optional. Where taking time to get the architecture right isn't dismissed as gold-plating. Without that, no amount of seniority gives you the autonomy to do good work.

## Why I'm Writing This

Most career advice for senior engineers assumes the destination is management. The books, the blog posts, the conference talks — they frame the question as "when should you move into management?" rather than "should you?"

For some people, management is the right call. They're good at it, they enjoy it, and they have more impact there than they would writing code. I respect that. I've worked with excellent engineering managers who made my job easier and my work better.

But for others — and I suspect there are more of us than the career advice suggests — the right call is to stay technical. To keep your hands in the code so that your judgement stays sharp from daily use, not from memories of how things worked when you last shipped something.

If that's you, the path exists. It's narrower than the management track, it pays less in most companies, and you'll spend your career explaining that you chose this rather than failed at something else. But the work is good, the autonomy is real, and after twenty years, I'd make the same choice again.
