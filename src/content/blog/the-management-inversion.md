---
title: "The Management Inversion"
date: 2026-08-19
image: /og/the-management-inversion.png
author: Lance Rogers
summary: "Production got cheap. The bottleneck moved: holding fragments together until the work is actually done."
draft: false
---

Two years ago the hard part of my work was producing things. Writing the code, drafting the design, building the release. Today production is the easy part. I can have a capable agent session running in any repo I own within seconds, and the output is real: working code, passing tests, shipped releases.

So why are my days fuller than they were?

Because the work didn't shrink. It moved. Every unit of output an agent produces still has to be understood, checked, connected to the outputs around it, and steered toward whatever it was supposed to serve. The person who used to do the work now does something harder: hold the whole picture together while a growing volume of partial work streams past. Review, redirect, run again. Review, redirect, run again.

I call this the management inversion. The bottleneck of knowledge work used to be production. Production is now cheap, and the bottleneck has moved up a level, to the organizational function: deciding what the fragments mean, what happens next, and when something is actually done. Today that function lives almost entirely in the human.

![Nine months of work as a campaign timeline: repositories and plans hanging off workspaces instead of living in someone's head](./assets/camp-timeline.gif)

## This is not a complaint about agents

Let me be precise, because this is where most takes go wrong in one of two directions.

The first wrong direction says AI doesn't do real work, it just predicts what work would look like. That was a fair description in 2022. It is false now. Modern agent harnesses call tools, write and run code, search the web, manipulate files, and hit real APIs. I have watched them do multi-hour stretches of genuinely competent engineering. Anyone building a pitch on "AI can't actually do the work" is hiding the real gap behind a comfortable one.

The second wrong direction says the friction is temporary, and better prompts or bigger context windows will smooth it out. I don't believe that either, and I've spent enough time engineering both to have an opinion. The friction isn't in the model. It's structural.

Here is the actual shape of it. An agent runs a stretch of work and stops. It produces intermediate artifacts and waits for review. It hands control back at every genuine uncertainty. None of those individual behaviors is wrong. What's missing is the thing that would let work continue coherently past each of those points: the judgment call, the next step, the definition of done. The user supplies all of that, by hand, one interaction at a time.

The user is the connective tissue. That is the inversion, stated structurally.

## The company analogy

A well-run company does not operate by the CEO talking to every person about every task. It operates because the structure around competent people lets them succeed in their roles without constant oversight. The executive supplies intent and strategy, sets the constraints that matter, audits when they choose to. The organization runs.

Now look at how we operate AI agents. We have hired brilliant individual contributors, thousands of them if we want, and given them no organization at all. No standing structure that routes work, no shared definition of done, no escalation policy that distinguishes a routine decision from one that genuinely needs the founder. So the founder sits in every meeting. Every single one.

Nobody would run a company this way. We run our AI this way because the organizational layer doesn't exist yet as infrastructure. Each of us rebuilds a crude version of it every day, out of our own attention.

I run my operation inside a bounded version of that layer. Structured work, verified completion, a trail I can point at. It holds for a planned body of work. It does not hold for arbitrary intent. I would rather say that than quietly redefine "done" downward.

```mermaid
flowchart LR
  B[Founder bottleneck] --- O[Org layer]
```

## Why this is the thing to work on

The management inversion is not a temporary awkwardness of early tooling. Production keeps getting cheaper. Every improvement in model capability increases the volume of output streaming past the human, which means the organizational function grows in exact proportion to the thing that was supposed to save us time.

Whoever supplies that function determines whether AI compounds into outcomes or into backlog. Right now, you supply it. Out of your own attention, interaction by interaction, for every agent you run.

That's the layer worth building.
