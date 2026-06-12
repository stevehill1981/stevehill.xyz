---
title: "Guardrails, Not Fewer Problems"
pubDate: 2026-06-12
draft: true
excerpt: "When someone proposed replacing the Kubernetes platform I'd built with something simpler, I didn't argue in meetings. I wrote 60 pages. The argument that won wasn't about features — it was about what happens when things go wrong."
tags:
  - architecture
  - boring-technology
  - infrastructure
  - lessons-learned
---

The proposal sounded reasonable. The client's platform ran on managed Kubernetes — a dozen-plus services, multi-tenant, integrated with physical hardware. Kubernetes has a reputation: complicated, YAML-heavy, the thing you adopt because Google did. A simpler deployment tool — Kamal, maybe, or a managed app platform — would mean less to understand, less to maintain, fewer moving parts. And there had been errors recently. Surely a simpler platform would mean fewer of them?

Here's the awkward part: the Kubernetes platform was my idea. I'd written the original proposal five years earlier and built most of what followed. If anyone was going to defend it reflexively, it was me — which is exactly why I couldn't afford to.

## Evidence over ego

So I did what I always do when a technical direction is at stake: I wrote it down. Risk matrices, trade-offs, alternatives considered. Sixty pages, in the end — not because the argument needed padding, but because the argument needed *evidence*, and evidence takes space.

The first thing the evidence had to settle was whether there was actually a reliability problem. I pulled the ingress-layer metrics — every HTTP request entering the cluster, the most honest measure there is, because it captures every failure regardless of whose fault it was. Across tens of millions of requests, availability exceeded every major cloud provider's published SLA. On steady-state days, the platform routinely served millions of requests with zero errors.

And the errors that had triggered the debate? I root-caused every incident. All of them were application bugs — a query that exploded combinatorially on large accounts, that sort of thing. Not one was caused by the infrastructure people wanted to replace.

This is the first trap in any "replace the platform" conversation: the platform is *visible*, so it collects the blame. Migrating would have consumed months of engineering time to fix errors that weren't infrastructure errors.

## What "simpler" actually buys you

The deeper problem with the proposal wasn't the cost of migrating. It was that the simpler tool would have reintroduced the exact problems the platform was adopted to solve.

Before Kubernetes, this client had fifty-plus servers across four OS versions. Deployments ran over SSH with no health checks and no automatic rollback. Configuration had been edited live on servers, undocumented, until no two machines could be assumed identical. Disaster recovery was "reprovision everything by hand and hope" — estimated in days.

Kamal is a good tool. For a single application on a handful of servers, it's an excellent tool, and I'd recommend it without hesitation. But it deploys over SSH, manages runtimes per-server, and leaves OS patching, log aggregation, and disaster recovery as exercises for the operator. For this platform, adopting it wouldn't have been simplification — it would have been a guided tour back to 2020.

Here's a concrete example of what the comparison spreadsheets never capture. Two of the client's applications share a database and run background workers that interact with each other. Kubernetes coordinates their deployments: if one fails its health checks, the rollout stops. With two independent deploy commands and no coordination, you can ship mismatched versions and poison the shared job queue — a deadlock that takes days to diagnose and would never, ever show up in a "let's test both for a couple of days" comparison. The failure modes that matter emerge under production conditions over months, not in a trial over days.

## Guardrails

Which gets to the actual argument, the one sentence the whole sixty pages existed to support:

> We are not choosing between a platform that has problems and one that doesn't. We are choosing between a platform with guardrails and one without them.

Every platform has problems. The comparison that matters is not "which has fewer features I don't understand" but "what happens at 2am when something breaks." Health checks that stop a bad rollout before it takes traffic. Autoscaling that absorbs the load spike you didn't predict. Coordinated deployments that make the poisoned-queue scenario structurally impossible. You don't notice guardrails when things go well — which is precisely why, after three stable years, they start to look like overhead.

This is the part of "boring technology wins" that I'd undersold before: boring isn't the platform with no problems. Boring is the platform whose problems you've already met, instrumented, and built guardrails around. Three years of production configuration is three years of institutional knowledge encoded in config — every odd-looking setting a scar from an incident someone actually debugged. A migration doesn't just cost the rebuild; it resets that knowledge to zero, right when it's paying off.

## How it ended

The migration was dropped. The application bugs got fixed — as application bugs, where they lived. And the paper's cost analysis found more monthly savings in decommissioning unused resources than the migration could ever have delivered, without touching the platform.

The last recommendation in the document was the one I'd offer any team in this position: the fires are out, the platform is stable, stop debating the infrastructure and ship product. The best infrastructure decision is often the one you stop relitigating.
