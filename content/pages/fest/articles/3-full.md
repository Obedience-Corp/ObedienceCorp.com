# Agent Guidance System

Fest CLI is an AI guidance system that teaches agents the methodology and guides them through execution.

## Results

- **94% token reduction** through just-in-time context loading
- **Planning time: 2 weeks → 30 minutes** for the same complexity
- In production since **May 2025**, refined daily
- Formalized and open-sourced **September 2025**

## Just-in-Time Learning

Agents don't need to read documentation upfront. Fest teaches them what they need, when they need it:

```bash
fest intro                    # Getting started
fest understand methodology   # Core principles
fest understand structure     # 3-level hierarchy
```

**Why this matters:**
- Preserves context window for actual work
- Agents learn incrementally
- No upfront context dump
- Self-documenting commands

## What To Do Next

`fest next` tells agents exactly what to work on:

```bash
fest next

Next task: 02_implement_validation
Phase: 001_FOUNDATION
Sequence: 02_input_handling
Path: festivals/active/my-project/001_FOUNDATION/02_input_handling/02_implement_validation.md
```

No guessing. No searching. The agent knows exactly where to go and what to do.

## Guided Execution

`fest execute` orchestrates task execution systematically:

```bash
fest execute

Executing festival: my-project
Phase: 001_FOUNDATION (3 sequences)
  Sequence 01: setup ✓
  Sequence 02: input_handling - in progress
    Task: 02_implement_validation
```

Agents work through the hierarchy methodically. When one task completes, fest points to the next.

## Context Preservation

Every task links back to its parent structure:

```
Festival → Phase → Sequence → Task
```

A new agent session can pick up exactly where the last one left off. No context is lost between sessions.

## The Result

Agents don't wander. They don't guess. They follow the guidance system.

**Guidance, not guesswork.**
