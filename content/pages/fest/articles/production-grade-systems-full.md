# The fest CLI

Command-line tool for creating and managing festivals.

## Core Commands

### fest create

Create festival structure:

```bash
# Create a new festival
fest create festival --name "auth-system"

# Create a phase
fest create phase --name "IMPLEMENTATION" --type implementation

# Create a sequence
fest create sequence --name "build_login"

# Create a task
fest create task --name "implement_endpoint" --autonomy high
```

### fest status

View current progress:

```bash
fest status

STATUS
──────
Festival: auth-system
Progress: 62%
Phases: 3/5 complete
Sequences: 7/12 complete
Tasks: 18/29 complete

Current Phase: 002_IMPLEMENTATION
Current Sequence: 01_build_login
Current Task: 03_add_validation
```

### fest next

Get the next work item:

```bash
fest next

NEXT TASK
─────────
Task: 03_add_validation
Path: 002_IMPLEMENTATION/01_build_login/03_add_validation.md
Sequence: 01_build_login
Phase: 002_IMPLEMENTATION
Autonomy: high
```

### fest validate

Check festival structure:

```bash
fest validate

✓ Festival structure valid
✓ All phases have goals
✓ All sequences have goals
✓ All tasks have required fields
✓ Numbering is sequential
```

### fest progress

Track task completion:

```bash
# Mark task complete
fest progress --path 002/01/03_add_validation.md --complete

# View progress history
fest progress --history
```

### fest go

Navigate to locations:

```bash
# Go to a phase
fest go 002

# Go to a sequence
fest go 002/01

# Go to festival root
fest go
```

### fest understand

Learn the methodology:

```bash
# Get overview
fest understand

# Learn about phases
fest understand phases

# Learn about tasks
fest understand tasks
```

## Workflow Example

```bash
# 1. Create festival
fest create festival --name "new-feature"

# 2. Add phases
fest create phase --name "RESEARCH" --type research
fest create phase --name "IMPLEMENTATION" --type implementation

# 3. Add sequences to implementation
fest go 002
fest create sequence --name "build_core"
fest create sequence --name "add_tests"

# 4. Add tasks
fest go 002/01
fest create task --name "implement" --autonomy high
fest create task --name "test" --autonomy high
fest create task --name "review" --autonomy medium

# 5. Apply quality gates
fest gates apply 002/01

# 6. Start working
fest next
# ... do the work ...
fest progress --complete

fest next
# ... continue ...
```

## JSON Output

All commands support `--json` for automation:

```bash
fest status --json
```

```json
{
  "festival": "auth-system",
  "progress": 0.62,
  "phases": {"complete": 3, "total": 5},
  "sequences": {"complete": 7, "total": 12},
  "tasks": {"complete": 18, "total": 29}
}
```

Integrate with scripts, CI/CD, or other tools.

## Key Features

**Structure Creation**
- Festivals, phases, sequences, tasks
- Proper numbering automatic
- Goal documents generated
- Templates applied

**Progress Tracking**
- Task completion
- Percentage calculation
- History logging
- Status at any level

**Validation**
- Structure correctness
- Required fields present
- Numbering sequential
- Goals defined

**Navigation**
- Go to any location
- Find next task
- Context-aware paths
- Relative and absolute

## The Result

Festival Methodology from the command line.

Create structure. Track progress. Validate correctness. Navigate efficiently.

AI agents use fest to manage their work. So can you.
