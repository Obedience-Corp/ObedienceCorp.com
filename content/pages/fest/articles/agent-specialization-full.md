# Context Preservation

Festival Methodology maintains context across sessions through structured documentation.

## The Problem

AI conversations lose context:
- Session ends, context gone
- Tomorrow starts from scratch
- Decisions forgotten
- Lessons lost
- Progress unclear

Multi-day projects become impossible.

## The Solution

### CONTEXT.md

Every festival has a CONTEXT.md file:

```markdown
# Context

## Key Decisions

### 2024-01-15: Auth Strategy
**Decision:** JWT with refresh tokens
**Rationale:** Stateless, scalable, standard practice
**Alternatives Rejected:** Sessions (state management), API keys (less secure)

### 2024-01-14: Database Choice
**Decision:** PostgreSQL
**Rationale:** Strong typing, JSON support, team familiarity
**Trade-offs:** More setup than SQLite

## Session Notes

### Session: 2024-01-15 14:30
**Completed:**
- Auth service implementation
- Login/logout endpoints
- Token refresh flow

**In Progress:**
- Permission system (blocked on decision)

**Next:**
- Resolve permission model question
- Implement role-based access

### Session: 2024-01-14 09:00
**Completed:**
- Database schema design
- Migration setup
- User model

## Open Questions

- [ ] Permission model: RBAC vs ABAC?
- [ ] Token expiry: 15min or 1hr?

## Lessons Learned

- JWT validation should happen in middleware, not handlers
- Use database transactions for multi-step operations
```

## What Gets Captured

**Decisions**
- What was decided
- Why it was decided
- What alternatives were considered
- Trade-offs accepted

**Progress**
- What was completed this session
- What's in progress
- What's blocked and why
- What comes next

**Questions**
- Open questions for human input
- Unresolved ambiguities
- Decisions pending approval

**Lessons**
- What worked well
- What to avoid
- Patterns discovered
- Gotchas encountered

## How It's Used

**Session Start**

AI reads CONTEXT.md to understand:
- Where we are in the project
- What decisions have been made
- What's currently in progress
- What questions need answers

**During Work**

AI updates CONTEXT.md when:
- Making significant decisions
- Completing major work
- Encountering blockers
- Learning something important

**Session End**

AI writes handoff notes:
- What was accomplished
- What's in progress
- What's next
- Any blockers

## Multi-Day Continuity

Day 1: Implement auth service
```
Session notes: Auth service complete. Login works.
Blocked on permission model decision.
```

Day 2: Continue with context
```
Reading CONTEXT.md...
- Auth service done ✓
- Blocked on permission model
- Need to resolve RBAC vs ABAC question

Asking human for decision...
```

Work continues seamlessly. No context lost.

## The fest CLI

```bash
# View current context
fest context

# Add a decision
fest context add-decision "Auth Strategy" "JWT with refresh"

# Add session notes
fest context session-end
```

## Why It Matters

**Without Context Preservation**
- Every session starts over
- Decisions repeated
- Mistakes repeated
- Progress slow

**With Context Preservation**
- Sessions build on each other
- Decisions inform future work
- Lessons compound
- Progress accelerates

## The Result

AI can work on projects spanning days or weeks.

Context accumulates. Decisions inform. Lessons compound.

Long-running autonomous work becomes possible.
