# Festival Methodology

Goal-oriented project management designed for AI execution.

## What It Is

Festival Methodology structures complex software projects for autonomous AI execution. Instead of tracking tasks for human developers, it creates executable specifications that AI agents can complete independently.

## The Structure

**Festival**
The complete project. Contains phases, has overall success criteria.

**Phase**
A major milestone (Research, Planning, Implementation, Review). Contains sequences toward a specific objective.

**Sequence**
A unit of related work with a clear goal. Contains tasks that together achieve that goal.

**Task**
A single piece of executable work. Has requirements, steps, and deliverables concrete enough for AI execution.

## How It Works

```
festival/
├── FESTIVAL_GOAL.md           # Overall success criteria
├── 001_RESEARCH/
│   ├── PHASE_GOAL.md          # Phase objective
│   └── 01_explore_codebase/
│       ├── SEQUENCE_GOAL.md   # Sequence objective
│       └── 01_analyze.md      # Executable task
├── 002_IMPLEMENTATION/
│   └── 01_build_feature/
│       ├── 01_implement.md
│       ├── 02_test.md
│       └── 03_review.md
```

Each level has a goal document. Each task has executable specifications.

## Why It Works

**For AI Execution**

- Tasks are concrete enough to execute without clarification
- Autonomy levels tell AI when to proceed vs. ask
- Quality gates ensure completion before moving on
- Context preserved across sessions

**For Human Oversight**

- Progress visible at a glance
- Decisions captured in CONTEXT.md
- Humans guide goals, AI executes work
- Review points built into structure

## The Key Shift

Traditional PM: Estimate time, track tasks, humans execute.

Festival: Define steps, specify success, AI executes.

Time estimates are obsolete when AI works 30-100x faster. Define what needs to happen, not when.

## Real Results

- **Active festivals**: Multiple long-running projects
- **Autonomy rate**: ~90% autonomous execution
- **Time horizon**: AI works days, not minutes
- **Scale**: 100+ tasks across 10+ phases

Festival Methodology enables AI to work at scales that overwhelm traditional approaches.
