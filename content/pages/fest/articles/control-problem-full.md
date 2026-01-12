# Three-Level Hierarchy

Festival Methodology uses a three-level structure to organize complex projects.

## The Levels

### Festival

The complete project. A festival represents a significant deliverable or initiative.

```
festival/
├── FESTIVAL_GOAL.md    # What success looks like
├── 001_PHASE/
├── 002_PHASE/
└── 003_PHASE/
```

**FESTIVAL_GOAL.md** defines:
- Overall objective
- Success criteria
- Key deliverables
- Constraints and boundaries

### Phase

A major milestone within the festival. Phases represent distinct stages of work.

```
001_RESEARCH/
├── PHASE_GOAL.md       # Phase objective
├── 01_sequence/
└── 02_sequence/
```

**Common Phase Types:**
- **Research** - Explore, analyze, gather information
- **Planning** - Define requirements, architecture
- **Implementation** - Build with quality gates
- **Review** - Validation, testing, UAT
- **Deployment** - Release, launch, handoff

**PHASE_GOAL.md** defines:
- Phase objective
- Expected outcomes
- Evaluation criteria

### Sequence

A unit of related work within a phase. Sequences group tasks toward a specific goal.

```
01_build_auth/
├── SEQUENCE_GOAL.md    # Sequence objective
├── 01_implement.md
├── 02_test.md
└── 03_review.md
```

**SEQUENCE_GOAL.md** defines:
- What this sequence achieves
- How success is measured
- Dependencies on other sequences

### Task

A single piece of executable work. Tasks are concrete enough for AI to complete.

```markdown
# Task: 01_implement_login

## Objective
Create the login endpoint with session management.

## Requirements
- [ ] Accept email/password
- [ ] Validate credentials
- [ ] Create session token
- [ ] Return user data

## Implementation Steps
1. Create auth service
2. Add login handler
3. Implement session storage
4. Write response formatter

## Deliverables
- `auth/service.go`
- `handlers/login.go`
- Unit tests passing
```

## Why Three Levels?

**Prevents Overwhelm**

A project might have 100+ tasks. Without hierarchy:
- Flat list is unmanageable
- Dependencies become tangled
- Progress is hard to track

With hierarchy:
- 5-7 phases, each clear
- 3-5 sequences per phase
- 5-10 tasks per sequence

Manageable at every level.

**Enables Focus**

AI works on one task at a time but understands:
- Which sequence it's completing
- Which phase that sequence serves
- What the festival achieves

Context without overwhelm.

**Supports Progress Tracking**

```
Festival: 62% complete
├── Phase 001: ✓ Complete
├── Phase 002: ✓ Complete
├── Phase 003: In Progress (75%)
│   └── Sequence 01: 3/4 tasks done
└── Phase 004: Pending
```

Progress visible at any granularity.

## Navigation

The fest CLI makes navigation easy:

```bash
# See current status
fest status

# Go to a phase
fest go 002

# See next task
fest next
```

AI agents can navigate the hierarchy to find work and understand context.

## The Result

Complex projects broken into:
- Manageable phases
- Focused sequences
- Executable tasks

Each level has clear goals. Progress is always measurable.
