---
title: "Why rescue projects fail even when you do everything right"
pubDate: 2025-11-10
excerpt: "I used to leave snarky comments in code criticizing my coworkers. Years later I came back and realized I'd been wrong. That's when I learned how to actually do rescue work."
tags:
  - rescue-projects
  - engineering-leadership
  - career
---

I used to leave snarky comments in code. Not the helpful kind either; more the superior, dismissive kind.

"This is obviously terrible," I'd write, as if I was some kind of genius. I was just turning 30, was newly minted as a Senior Software Engineer, and I thought I knew everything about everything.

Three years later, when I returned to that same company, the comments I'd so liberally sprinkled throughout the codebase had become legend amongst the newer developers. Somehow, I'd become the guy who "told it like it is." They were excited to work with me, and to see what I said next.

Personally, I was horrified. In those three years, I'd learned enough to realise: I'd been wrong about almost everything.

## Learning What I Didn't Know

I started my career in 2006, working for a small web agency; it was my first job out of university, and I was a complete novice in the field of professional web development. This was the sort of place where version control systems weren't a thing and deploying to production was something you did by FTPing files to the server; in 2006, that was still the most common way to do things.

Later, I joined an online ecommerce retailer, where for the first time I was working as part of a proper team, working in an "Agile" way (it was SCRUM, basically, but I didn't know much about that sort of thing back then).

At one point, we had three different versions of the application all running concurrently; the original version, the version a previous team had been building to fix the original… and the version our team built to replace both of those (sorry). I don't know if the third version was ever finished; by that time, the global economic slowdown had put paid to that job and I'd moved on.

By the time I'd landed the Senior Software Engineer role I mentioned earlier, I was convinced that I was better than most of my peers. I was self-taught, I'd read all the right books and all the right blogs; but I didn't yet know what I didn't know. I still had a lot to learn, but I wasn't ready to learn any of it.

## Learning What Actually Mattered

When I started my next role, the stakes were a lot higher; I was a Lead Developer now, I had to learn how to lead a team. But the projects were larger too, more important; I was working on ticketing systems for global arts and entertainment venues, where an on-sale event could cripple the infrastructure and cause outages if you hadn't scaled up ahead of time (a note: if the tickets go on sale at 9am, there's no point constantly refreshing the page from 8:55am – it doesn't make it happen any faster!)

Also, for the first time, I was working directly with clients; attending meetings, responding to their emails, helping to architect the system and soothe their nerves. Thankfully I had an excellent team around me to help me build my skills and challenge me to be better, but I'd be kidding myself – and you - if I didn't admit that mistakes were made. I learned humility. It was hard not to, surrounded by people that demonstrated every day that they were at least as smart and capable as I was, if not more so. Often more so, if I'm honest.

When I decided to move on, I interviewed for a number of roles, and I'll never forget the feedback from one of those; it's stayed with me ever since, and it was one of the most valuable lessons I had yet to learn: "as a technical lead, you don't have to be the smartest person in the room." I wasn't ready to hear that then either, but it resonated and I remembered it, which was a start.

## Learning To Recognise Unfixable

I took a Technical Director position at a small web agency. I believed in my ability to do things properly. In hindsight, the role was a complete mismatch to my skills and experience, but I'd let the title and salary blind me to that.

I was trying to finish up projects so I could start to focus on putting best practices in place, but I never stood a chance, not really. Less than two weeks after joining, I was told that the company was going out of business. They'd failed to win two major contracts which would have paid everyone's salary for the next two years.

The lack of best practices came back to bite; a junior developer was up until 3am trying to finish a site so that we'd at least get paid for that work, and he clicked the wrong button in the database tool and dropped the database. We had no backup system in place. Everything had to be recreated from scratch.

## Learning To Actually Rescue

Humbled by that experience, I bumped into an old colleague from a few years earlier, and when I described what had happened, they suggested I rejoin the team where I'd left all those snarky comments; they needed an experienced pair of hands and I needed to be able to pay my mortgage, so it was a no-brainer.

The adulation from my new colleagues because of those comments probably fed my ego a little bit, if I'm honest. I soon came to regret them, though. I realised that I'd been rude, arrogant, and worst of all, I'd been wrong. I'd finally learned humility. Now I had the opportunity to make up for my past mistakes, and how often do we get the opportunity to do that?

With the aid of our CTO and the Software Production Manager, I established a new third-line support team, taking on the most complex support tickets that required developer intervention, relieving pressure on the project teams who were under incredible pressure to deliver features to our clients.

We started seeing the benefits almost immediately; the project teams were no longer being distracted, we weren't breaching SLAs as often, and clients were getting prompt responses to their questions.

A focus on identifying and fixing root causes reduced the number of new tickets by half within the first three months. I was also mentoring the junior engineers, helping them write cleaner, more maintainable code, which had a side benefit of reducing the number of post-release issues I had to deal with in third-line support.

After the company was acquired, I joined a small team that specialised in rescuing business-critical PHP applications that had been abandoned by their previous developers, allowing the businesses to keep them going instead of paying for an expensive replacement. This taught me the importance of documentation (far too many of the projects we took on had none), but also that there were some patterns that could be applied when rescuing almost any project, irrespective of the language.

After the company started struggling financially, we arranged for me to join one of their previous clients directly; a climate tech startup managing tens of thousands of IoT devices across London.

The incoming CTO was an ex-Googler who decided that the stable, working PHP system needed to be rewritten as Go microservices – not because PHP couldn't handle the load, but because 'PHP is shit' and Google didn't use it.

He insisted that we move hosting providers and build our own deployment infrastructure on top of LXC, instead of using Docker or Kubernetes, because he felt they were too complicated.

He forced us to use Gerrit with mandatory 5-line commit limits, because that was how his SRE team at Google did it, making it impossible to see the direction of anyone's work until it was too late.

And tests? Tests were bad, he said. The only way to truly know if software works is to test in production, like Google does.

The environment was toxic under his leadership; one day there was a physical fight in the office between two of the other engineers. He also instituted a hard cap on the number of client support issues we were allowed to handle each month: two.

Sometime after I quit, I heard from one of my previous colleagues, who was asking for help with an issue. I inquired about how things had gone since I left; they'd discovered that customer data had been getting corrupted for more than six months, and the CTO had been encouraged to find alternative employment.

Sometimes, you can't fix an organisation because egos get in the way. So I moved on.

The fintech company had all the hallmarks of an amazing place to work; beautiful, well-located offices, a strong team, flush with cash from a successful Series A funding round, an amazing product with an excellent roadmap.

Under the surface however, all was not well; the customer pipeline wasn't nearly as healthy as we'd been led to believe, and the cost of the new hires (including myself) was shortening the runway, so salaries were frozen. That next year, more than half of the engineering team departed, leaving behind a complex legacy of interwoven microservices with non-existent documentation. React frontends in front of GraphQL APIs in front of REST APIs, microservices written in four different languages. The CTO dumping two-thousand line commits into Git with "changes" as a commit message.

Even becoming Tech Lead didn't fix the issues; there were massive salary disparities between the tech leads, based on how well they'd negotiated. You weren't allowed to criticise decisions made by the C-suite, because it suggested that you didn't have a "growth mindset".

The business pivoted towards enterprise clients and banks, away from the SMEs that had been their bread-and-butter to that point. They weren't prepared for the impact this meant; multi-year sales cycles, extensive and expensive customisations, complex regulatory environments, six-month advance notice required for releases… it all combined to make working there thoroughly unpleasant.

If your teams aren't speaking to each other, or are working at cross purposes, no rescue is ever going to succeed.

Three years later, I moved to a hospitality tech startup, building a modern point-of-sale system. We'd pivoted from mobile order-and-pay, introduced to take advantage of social distancing during the pandemic, to full POS hardware. Things were going great; the team was excellent, the product roadmap was great, and even the hard parts - like talking to receipt printers and card readers - were going smoothly.

Then the energy crisis hit, triggered by Russia's invasion of Ukraine. With the increased costs, many of our customers could no longer afford to stay in business. Even those that could were heavily impacted by the reduction in disposable income for their customers.

We cut back where we could, laid off people to extend our runway; the CTO departed, and I was promoted to Interim CTO in his place. And then we discovered that the massive credit balance we'd had with AWS (following an earlier SLA breach on their part) was nearly depleted.

Our entire system had been architected around serverless technologies, in theory allowing the system to scale infinitely to customer demand. Which was nice, in theory, but not so nice when what you really need is predictable running costs. Moving these back to standard background jobs saved $5K a month, but it wasn't enough to save the company.

Sometimes external factors doom you, even when you do everything right.

## What Actually Works

I've been working with one client since 2015, helping them to maintain their Rails apps. This has worked because they kept things simple from the start, stayed boring with their technology choices, and were willing to pivot when something didn't work, such as moving from an Elixir service to Python when the Elixir service became unmaintainable. Ten years later, we're still incrementally improving the systems because the foundations were solid and the business was healthy enough to fund the work properly.

My current employer is a healthy SaaS business with an excellent team. But they'd convinced themselves the Rails monolith was holding them back, and that they needed to kill it. I felt that this was premature, and that the cost of rewriting all the functionality into new technologies was underestimated. I'd also spent years doing Rails upgrades in my freelance role, so I knew the monolith didn't need scrapping – it needed modernising. We went from Rails 5.2 to Rails 8.0, and from Ruby 2.7 to Ruby 3.4, gaining 30% performance improvement along the way. The monolith became not just viable, but valuable again. The difference between this and the fintech company? They listened to my opinion and were willing to give me a chance to prove them wrong.

### The Pattern

Rescuing projects isn't about technical brilliance. It's about organisational health. My freelance company has a solid foundation and willingness to stay boring. My current company has a healthy business and a willingness to be challenged. The climate tech startup and the fintech couldn't be rescued because ego protected bad decisions. The point-of-sale startup couldn't be rescued because the economics were already broken by the time I arrived.

## Due Diligence

These days, before I take on a new project, or join a new company, I ask questions I didn't know to ask when I was younger:

Can I criticise technical decisions without political fallout? If the CTO's ego is protecting bad architecture, I can't fix it.

Is there organisational receptiveness to hard truths? If they're not willing to hear "your microservices are killing you," they're not ready to be rescued.

Are there hidden subsidies masking the real economics? AWS credits, investor money, founders working for equity – when these run out, can the business afford to run?

Is the runway long enough to execute the fix? Some rescues take 6-12 months. If you've only got 3 months of cash in the bank, it's already too late.

Is the culture functional or toxic? Physical fights in the office, salary disparities causing friction, teams not talking to each other – you can't rescue that.

And the hardest question: is the business model actually viable? Sometimes the technical problems are symptoms of a business that was never going to work.

I learned to do rescue work when I learned I'd been wrong. Companies learn to be rescued when they learn the same thing. The difference between organisations that can be saved and those that can't is humility – the willingness to admit you need help and take it.

I wish I'd learned that lesson earlier. But then again, you can't teach humility. You have to earn it by being wrong enough times that it finally sinks in.
