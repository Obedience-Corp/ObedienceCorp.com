# Built by Using It

Guild development is driven by building real systems with Guild.

## Dogfooding

**Festival Methodology**

The entire Festival Methodology was developed using Guild:
- Planning done by Guild agents
- Implementation coordinated through Guild
- Documentation written by Guild teams
- Testing validated by Guild workflows

**fest CLI**

The fest command-line tool:
- Planned in Guild festivals
- Implemented by Guild agents
- Tested through Guild sessions
- Documented by Guild teams

Building tools by using the tools they're built with.

## What This Validates

**Multi-Agent Coordination**

Not theoretical multi-agent workflows. Actual coordination:
- Multiple agents on the same project
- Hand-offs between specialized roles
- Context maintained across agents
- Quality preserved through process

**Session Persistence**

Long-running work across sessions:
- Work spanning days and weeks
- Context preserved between sessions
- Decisions inform future work
- No starting from scratch

**Provider Reliability**

Real usage across providers:
- Switching between providers
- Fallback handling
- Cost optimization in practice
- API edge cases encountered

**Tool Integration**

Tools used in real workflows:
- LSP for actual code navigation
- File editing for real changes
- Web fetch for real documentation
- Workspace isolation for safety

## Production Patterns

**What Works**

Patterns that emerged from real use:

- Clear agent specialization
- Explicit context handoffs
- Festival-based planning
- Session save points
- Cost monitoring

**What Changed**

Features refined through actual needs:

- Session recovery (needed after crashes)
- Cost tracking granularity (needed for budgeting)
- Agent context management (needed for long sessions)
- Error handling (needed for real API failures)

## Why This Matters

**Not Vaporware**

Features exist because they were necessary:
- Session management because sessions crash
- Cost tracking because costs matter
- Error recovery because APIs fail
- Context persistence because work spans days

**Battle-Tested**

Problems solved by encountering them:
- Rate limits handled because we hit them
- Timeouts managed because they happen
- State recovery because state corrupts
- Fallbacks implemented because providers fail

## The Proof

Guild's internal projects:
- festival-methodology (planning system)
- fest (CLI tool)
- guild-chat (Rust TUI client)
- guild-scaffold (project scaffolding)
- obediencecorp.com (this website)

All built or maintained using Guild.

## Current Status

**Reference Implementation**

guild-core is the reference implementation. Core features are being extracted into:
- festival-methodology (Go, standalone)
- guild-chat (Rust, TUI client)
- guild-scaffold (Go, templating)

**V3 Development**

Next-generation architecture in progress. Lessons from production use informing design.

## The Result

Infrastructure built by people who use it to build other things.

Not demo-ware. Production-tested through actual production use.
