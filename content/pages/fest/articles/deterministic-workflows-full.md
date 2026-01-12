# Autonomy Levels

Every task in Festival Methodology has an autonomy level that guides AI execution.

## The Three Levels

### High Autonomy

AI completes the task independently.

```markdown
> **Autonomy Level**: high

## Objective
Write unit tests for the user service.
```

**Characteristics:**
- Clear, unambiguous requirements
- No open design decisions
- Standard patterns apply
- Success criteria is objective

**AI Behavior:**
- Executes without asking questions
- Makes standard implementation choices
- Completes and moves to next task
- Reports results

### Medium Autonomy

AI may need clarification on edge cases.

```markdown
> **Autonomy Level**: medium

## Objective
Implement error handling strategy for API endpoints.
```

**Characteristics:**
- Some judgment calls required
- Edge cases may need discussion
- Multiple valid approaches exist
- Requirements are mostly clear

**AI Behavior:**
- Proceeds with reasonable defaults
- Notes decisions for review
- Asks about ambiguous cases
- Completes with documented assumptions

### Low Autonomy

Human collaboration expected.

```markdown
> **Autonomy Level**: low

## Objective
Design the user permission system architecture.
```

**Characteristics:**
- Significant design decisions
- Business logic interpretation needed
- Multiple stakeholders affected
- Long-term implications

**AI Behavior:**
- Proposes options instead of deciding
- Requests human input at decision points
- Documents trade-offs clearly
- Waits for approval before proceeding

## Why Autonomy Levels Matter

**For AI Agents**

Without autonomy levels:
- AI doesn't know when to ask
- Over-asks (annoying, slow)
- Under-asks (makes wrong decisions)
- Inconsistent behavior

With autonomy levels:
- Clear expectations per task
- Appropriate independence
- Right level of human involvement
- Predictable execution

**For Humans**

Without autonomy levels:
- Constant interruptions
- Or silent wrong decisions
- No control over involvement
- Surprise at outcomes

With autonomy levels:
- Know which tasks need attention
- Trust AI on high-autonomy work
- Focus on important decisions
- Predictable oversight burden

## Setting Autonomy Levels

**High Autonomy Tasks:**
- Unit tests
- Code formatting
- Documentation generation
- Mechanical refactoring
- Standard CRUD operations

**Medium Autonomy Tasks:**
- Feature implementation
- Bug fixes
- API design
- Performance optimization
- Integration work

**Low Autonomy Tasks:**
- Architecture decisions
- Security design
- Breaking changes
- User-facing copy
- Business logic interpretation

## In Practice

```
fest status

Phase 002_IMPLEMENTATION
├── Sequence 01: auth_service
│   ├── 01_create_service (high) ✓
│   ├── 02_add_endpoints (high) ✓
│   ├── 03_error_handling (medium) - in progress
│   └── 04_permission_design (low) - pending review
```

High autonomy tasks complete fast. Low autonomy tasks wait for human input.

## The Result

AI knows how to behave. Humans know what to expect.

Autonomy without uncertainty. Control without micromanagement.
