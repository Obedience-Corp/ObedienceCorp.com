# The Agent Reliability Problem

AI agents are powerful but unreliable. Guild provides infrastructure to make them work.

## What Goes Wrong

**Context Loss**

- Sessions reset, work forgotten
- Previous decisions not available
- Agents repeat mistakes
- No institutional memory

**Hallucination**

- Confident but wrong outputs
- Made-up code references
- Invented APIs and features
- No verification loop

**Task Abandonment**

- Agents stop mid-execution
- Complex workflows break
- No recovery mechanism
- Manual intervention required

**Coordination Failure**

- Multiple agents conflict
- No shared context
- Duplicate or contradictory work
- You become the bottleneck

## How Guild Addresses This

**Persistent Memory**

Guild stores reasoning and context:
- SQLite-backed persistence
- Reasoning extracted from responses
- Context available across sessions
- Decisions inform future work

```
// Memory chain example
Session 1: "User prefers tabs over spaces"
Session 47: Agent remembers preference
```

**Cost Transparency**

Real-time tracking per agent:
- Token counts per request
- Cost per agent, per model
- Budget limits and alerts
- No surprise bills

**Reasoning Extraction**

Guild captures how agents think:
- Thinking blocks extracted
- Pattern analysis (backtracking, rapid reasoning)
- Inspect why decisions were made
- Debug agent behavior

**Session Management**

Robust session handling:
- Save and restore sessions
- Export conversation history
- Recovery from interruptions
- State persistence across failures

## The Tool System

Agents need capabilities. Guild provides them safely:

**LSP Integration**

- Code intelligence across languages
- Go-to-definition, references
- Semantic understanding
- Not just text manipulation

**Multi-File Editing**

- Atomic changes across files
- Coordinated modifications
- Rollback support
- Safe workspace isolation

**Web Access**

- Search and fetch content
- Retrieve documentation
- Stay current with information
- Controlled external access

## Quality Through Architecture

Guild's 6-layer prompt system provides consistent context:

1. **Platform** - Safety boundaries
2. **Guild** - Project-wide goals
3. **Role** - Agent specialization
4. **Domain** - Technical context
5. **Session** - User preferences
6. **Turn** - Immediate instruction

Each layer scoped appropriately. Agents get what they need.

## The Result

Infrastructure that makes agents:
- Reliable through persistent memory
- Transparent through cost tracking
- Debuggable through reasoning capture
- Capable through integrated tools

Not hoping agents work. Building systems that ensure they do.
