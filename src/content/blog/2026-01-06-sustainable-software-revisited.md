---
title: "Sustainable Software, Revisited"
pubDate: 2026-01-06
excerpt: "In 2023, I wrote about sustainable software development. I focused on engineering practices. I should have focused on whether the business underneath could survive."
tags:
  - sustainability
  - software-engineering
  - engineering-leadership
  - lessons-learned
  - sustainable-software
---

In 2023, I wrote about [sustainable software](/blog/2023-10-12-sustainable-software). I talked about tests, dependencies, monitoring, pace. Good engineering practices that help teams maintain software over time.

I wasn't wrong. But I wasn't complete either.

Since then, I've watched a company fail despite having good engineering practices, a healthy team culture, and a product people genuinely wanted. They used Shape Up, Basecamp's lightweight alternative to Scrum. They had no estimation theatre. They did many things right.

None of it mattered, because the business underneath wasn't sustainable.

<!--more-->

## The Hidden Subsidies

The company ran on serverless infrastructure. In theory, this was efficient - pay for what you use, scale automatically, no servers to manage. In practice, "what you use" can be enormous when nobody's optimising.

But nobody noticed, because AWS credits were covering the bill.

The credits came from an earlier SLA breach. They'd been sitting there, quietly absorbing the true cost of the infrastructure. No dashboard. No monthly review. No one asking "what would this cost without the credits?"

When the credits ran out, the costs became visible. By then, the burn rate was baked into the architecture.

AWS credits are one form of hidden subsidy. There are others:

**VC runway.** Money that lets you operate as if revenue doesn't matter. Until you need to raise again, or the market turns, or the investors lose patience.

**Founders working for equity.** Labour that doesn't show up in the P&L. Until the founders burn out, or need to pay their mortgages, or the equity turns out to be worthless.

**Engineers accepting below-market salaries.** Because they believe in the mission, or want the experience, or the equity. Until they realise the market will pay them more, and they leave.

Each of these makes a business look more viable than it is. The true costs are hidden. The margins appear healthier than they are.

The sustainable question isn't "what does this cost right now?" It's "what would this cost if we had to pay full price for everything?"

If the answer makes the business unviable, you don't have a sustainable business. You have a subsidised one. And subsidies end.

## Success Masks Everything

The company I mentioned had been successful during COVID. Mobile order-and-pay surged as restaurants adapted to social distancing. They rode that wave, grew fast, won customers.

Growth feels like validation. When everything's going up, nobody questions the fundamentals. The AWS bill doesn't matter when the credits are covering it. The unit economics don't matter when you're adding customers faster than you're losing money. The competitive dynamics don't matter when everyone's busy.

Then the wave recedes. Social distancing ends. An energy crisis hits hospitality and breaks your customers. The credits run out. And you discover what was underneath all along.

The problems were always there. Success just made them invisible.

## What Sustainability Actually Requires

The 2023 post talked about sustainable engineering practices. Those matter. But they're not sufficient. You can have the cleanest codebase and the healthiest team and still be six months from shutting down.

Real sustainability requires more:

**A business model that works.** Are customers paying, at prices that cover your true costs? Not your subsidised costs - your true costs.

**Product-market fit.** Are customers enthusiastic about your product? Are you winning new customers, or just holding onto existing ones? Is it clear what problem you're solving?

**A defensible market position.** Are you competing from strength? Or heading towards a conflict you might not win - against former partners, against better-funded competitors, against platforms you depend on?

**Team sustainability.** Can your people maintain this pace? Are you burning through engineers, or building something they want to stay and nurture?

**Technical sustainability.** Can the code evolve without heroics? Are dependencies current? Is the architecture suited to where the business is going?

Miss any one of these and you're building on sand. Good process — even great process — only covers the last two.

## Process Can't Save You

So many engineering blogs focus on methodology. "We switched to Shape Up and everything improved." "Scrum transformed our delivery." "Kanban saved our team."

The company that failed had Shape Up. They had lightweight processes, no estimation theatre, real autonomy for the teams. The process was fine. The methodology was fine.

Process can't save you from unit economics that don't work. It can't save you from hidden costs nobody's watching. It can't save you from a market position that's about to become contested. It can't save you from external shocks that break your customers.

You can do everything "right" from an engineering and process standpoint and still fail because the foundations aren't there. Which raises the question: how do you know if the foundations are there?

## The Questions I Ask Now

After watching this play out, I think differently about sustainability. The engineering practices still matter. But they're not where I start anymore.

**What are the hidden subsidies?** Credits, runway, below-market salaries, founders working for free. What would this business look like if all of those disappeared tomorrow?

**Is the success real?** Are we growing because we're solving a real problem, or because we're riding a wave that will recede? What happens when the wave ends?

**What would break us?** External shocks we can't control. Competitors entering our space. Platforms we depend on changing their terms. If we can see it coming, are we preparing for it?

**Can this business pay for itself?** Not eventually, not after the next funding round, not when we hit scale. Now. Or at least, can we see a clear path to that point?

The sustainable companies I've worked with have clear answers to these questions. They know what they'd cost at full price. They know why customers choose them. They're not dependent on subsidies that will eventually disappear.

The ones that failed often had great engineering, great culture, great products. They just didn't have a business that could survive.

## What I Got Wrong

The 2023 post wasn't wrong. Tests matter. Dependencies matter. Pace matters. A team that's burning out can't sustain anything.

But I was writing about sustaining the software without asking whether the business could sustain itself. I was focused on the code when I should have been focused on whether anyone would be around to maintain it.

Sustainable software requires sustainable businesses. The engineering is necessary but not sufficient.

If you're going to build something that lasts, make sure it's built on something that can last. Check the credits balance. Question the growth. Know what you'd cost at full price.

Because subsidies end. Waves recede. And what's left is what was always there.
