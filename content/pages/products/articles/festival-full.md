## Festival

Hierarchical planning for autonomous AI agent orchestration across multiple projects.

### The Hierarchy

**Campaign** — a workspace organizing multiple projects, plans, and context in one place.

**Festival** — a structured plan for a piece of work. A feature, a migration, a research effort, or any goal.

**Phase** — a major stage of work. Ingest context, plan the approach, implement, review.

**Sequence** — an ordered group of related tasks within a phase.

**Task** — an atomic unit of work that one agent completes in one session.

### The Loop

```
fest next → agent executes → fest commit → fest next → repeat
```

One command. Always knows what to do next. From project creation to task execution to completion tracking.

### Why Festival?

**vs GSD (46K GitHub stars):** Festival manages work structure across projects. GSD manages context windows within a single repo.

**vs 8090 Software Factory ($200/seat/month):** Festival is open, CLI-native, and designed for autonomous agents. No vendor lock-in. No per-seat pricing.

### Install

```
brew install Obedience-Corp/tap/festival
eval "$(fest shell-init zsh)"
fest next
```

[Full documentation →](https://docs.fest.build)
