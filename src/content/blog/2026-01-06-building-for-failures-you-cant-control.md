---
title: "Building for the Failures You Can't Control"
pubDate: 2026-01-06
excerpt: "Early in my career, I built ticketing systems for arts venues. Our platform could be bulletproof - but if the client's backend fell over, the on-sale still failed. That taught me how to build resilience around dependencies I couldn't control."
tags:
  - architecture
  - resilience
  - lessons-learned
  - engineering-leadership
---

Early in my career, I led a team building ticketing systems for arts venues. When a major show went on sale, thousands of people would hit the system at exactly 9am, all trying to buy tickets simultaneously.

Our platform could handle it. We'd made sure of that. But we weren't the only system in the chain.

Our software integrated with a backend called Tessitura, which typically ran on the client's own infrastructure. We communicated with it via SOAP and XML-RPC. And when demand spiked, Tessitura would often fall over - not because of anything we did, but because the client's servers couldn't handle the load.

Our system could be bulletproof. If Tessitura failed, the on-sale still failed.

That's when I learned to build for failures I couldn't control.

<!--more-->

## The Dependency Problem

Every system depends on things outside its control. Payment providers. Third-party APIs. Client infrastructure. Legacy backends that can't be replaced.

You can't fix these systems. You can't guarantee they'll stay up. You can't predict when they'll fail or how badly.

But you can build buffers between your users and those failures.

For ticketing, that meant caching everything we could. If Tessitura had told us five minutes ago that a show had 200 seats available, we could serve that information without asking again. Stale data was better than no data when the backend was struggling.

It meant queues. When Tessitura couldn't keep up with the purchase requests, we'd hold customers in line rather than failing immediately. "You're in the queue" is frustrating, but it's better than "the system has crashed."

It meant waiting rooms. Before an on-sale even started, we'd hold users in a virtual lobby rather than letting them all hit the backend at once. Controlled admission to protect a fragile dependency.

The waiting room lesson came from painful experience. If tickets go on sale at 9am, you might think you need to be ready at 9am. You don't. You need to be ready at 8:30am, because thousands of people will arrive early and refresh the page over and over until the sale begins. The pre-onsale traffic can be as brutal as the onsale itself.

These patterns aren't sophisticated. Caching, queuing, rate limiting - they're standard tools. But they exist because some failures are inevitable, and your job is to absorb them gracefully rather than passing them through to users.

The buffers protected users from failures we couldn't prevent. But building them required learning hard lessons about our own foundations too.

## Learning What You Don't Know

The ticketing platform was built on Symfony 2.0 alpha.

This was a mistake. Alpha software is unstable by definition - APIs change, bugs lurk undiscovered, documentation is incomplete or wrong. But someone had made that choice before I arrived, and we lived with the consequences.

When you're building on shifting foundations, you learn the value of tests. Not because testing is virtuous, but because it's survival. When the framework underneath you changes, tests are how you find out what broke. Without them, you're discovering problems in production, during an on-sale, with thousands of people waiting.

There were other challenges that 2012 made harder: embedding our ticketing widget inside client websites via iframes meant fighting cross-origin restrictions that today's browsers handle trivially. Back then, it was a source of constant debugging.

Load testing became essential too. You can't wait until the actual on-sale to find out whether your system handles the traffic. We'd simulate thousands of concurrent users hammering the system, looking for bottlenecks, race conditions, memory leaks that only appeared under pressure.

Load testing also revealed where Tessitura would fail - which helped us understand what caching and queueing we needed, even though we couldn't fix the underlying problem.

These weren't lessons I learned from books. I learned them from systems falling over when they shouldn't have, from debugging production issues that tests would have caught, from on-sales that nearly failed because we didn't know what we didn't know.

Technical resilience was one challenge. The economics of unpredictable demand were another.

## The Economics of Unpredictability

We didn't have Kubernetes or auto-scaling - not the way it exists today. Before a major on-sale, we'd provision servers in AWS based on what the client told us about expected demand.

"How popular will this show be?"

Sometimes they knew. Sometimes they were guessing. Sometimes a celebrity would tweet about the show and all predictions became worthless.

We'd quote for a certain scale. If the client said "moderately popular," we'd provision for moderately popular and price accordingly. Then the show would go viral, we'd scramble to spin up more servers, and we'd eat the cost of infrastructure we hadn't billed for.

In the moment, there's no choice. You can't let the on-sale fail while you negotiate a contract amendment. You scale up, save the customer experience, and have the difficult conversation about overages later.

We built in contingency, but it was always a gamble. Price too high and you lose the work. Price too low and you absorb the cost when demand exceeds expectations. There's no formula for predicting which shows will be unexpectedly popular.

Unpredictable demand was a business problem. But the manual scaling it required created an operational one.

## The Human Error Tax

Manual scaling has another cost: humans make mistakes.

After an on-sale, someone had to remember to scale the servers back down. Usually this happened. Once, it didn't.

The AWS bill that month was £8,000.

The ops lead got a severe bollocking. But nothing systemic changed, because nothing could change. The tooling for automatic scale-down wasn't mature enough to trust. We were stuck with manual processes that required humans to remember things after stressful events.

"Be more careful" was the only available fix. Which isn't a fix at all - it's just pressure on a human to not make human mistakes.

This is the argument for automation that has nothing to do with elegance or best practices. It's pure economics. One forgotten downscale costs more than building the automation. But in 2012, the automation we needed wasn't quite there yet.

Today, you'd set a scaling policy and the infrastructure would handle it. Back then, someone had to run a script and remember.

The £8,000 bill was a one-off. The 3am phone calls were a constant.

## The 3am Cost

High-stakes systems have another price: someone has to be there when they fail.

Australian clients meant Australian time zones. When something went wrong at 9am Sydney time, it was 3am in the UK. My phone would ring, I'd wake up, stumble to my laptop, try to fix whatever had broken while half-asleep.

This doesn't just affect you. It affects everyone in your house. My wife was woken up by those calls too. "Occasional out-of-hours support" sounds manageable in a job description. At 3am, with your partner awake and frustrated, it feels different.

This is sustainability at the most personal level. A job that regularly disrupts your home life isn't sustainable, no matter how interesting the technical problems are. I learned a lot in that role, built strong client relationships, grew as a leader. But the on-call burden was part of why I eventually moved on.

## What Stayed With Me

The ticketing years taught me patterns I still use:

**Build buffers around fragile dependencies.** Caching, queues, circuit breakers, graceful degradation. You can't control external systems, but you can absorb their failures.

**Don't build on alpha software.** If the foundation is unstable, everything you build on it is unstable too. Boring, stable versions exist for a reason.

**Test before you have to.** Unit tests catch regressions before they reach production. Load tests reveal bottlenecks before real users find them. The alternative is learning these lessons during the moments that matter most.

**Price for unpredictability, or accept the risk.** Spike traffic is inherently hard to predict. Either build that uncertainty into your pricing, or accept that you'll sometimes eat costs you didn't budget for.

**Automate what humans will forget.** Manual processes that require someone to remember something after a stressful event will eventually fail. If the cost of that failure is significant, the automation is worth building - even if the tooling is immature.

**Count the human cost.** On-call isn't free. It's paid in sleep, in family relationships, in stress. Factor that into decisions about system design and team structure.

These days, the tooling is better. Auto-scaling is reliable. Observability is sophisticated. Kubernetes handles things that used to require human intervention.

But the principles haven't changed. You're always going to have dependencies you can't control. Users are always going to expect things to work. The gap between those two realities is where resilience engineering lives.

I learned that at 3am, watching a backend I couldn't touch fall over while thousands of people waited to buy tickets.
