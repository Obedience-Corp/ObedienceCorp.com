# Structured Memory

## The Memory Problem

AI agents have context windows. Limited. Expensive. Ephemeral.

Traditional approaches:
- **RAG**: Retrieve relevant documents, inject into context
- **Summarization**: Compress history into shorter text
- **Vector search**: Find semantically similar content

These work for small-scale problems. They break at large scale.

## Why Traditional Memory Fails

### 1. Retrieval Precision
Vector search returns "similar" content, not "correct" content. False positives drown signal in noise.

### 2. Context Coherence
Injecting random documents creates incoherent context. The agent wastes tokens reconciling contradictions.

### 3. Update Consistency
Multiple agents reading and writing memory create race conditions. Information becomes inconsistent.

### 4. Query Performance
Searching large vector databases is slow. Latency kills user experience.

## Guild's Structured Approach

### Schema-First Memory
Memory isn't free-form text. It's **structured data**:

```go
type ProjectState struct {
    ID          string
    Status      ProjectStatus
    Tasks       []Task
    LastUpdated time.Time
    Owner       string
}
```

Benefits:
- Type-safe reads and writes
- Queryable by structured fields
- Validated on every update
- Versioned for rollback

### Transactional Updates
Memory modifications are atomic transactions:
- Read current state
- Modify in isolation
- Commit with validation
- Rollback on conflict

No race conditions. No inconsistent state.

### Hierarchical Organization
Memory is organized in a tree structure:
```
Project
├── Overview
├── Tasks
│   ├── Task 1
│   └── Task 2
├── Team
│   ├── Member 1
│   └── Member 2
└── Resources
```

Agents access only relevant subtrees. No context pollution.

### Cached Access
Frequently accessed memory is cached in-process:
- Sub-millisecond read latency
- Automatic cache invalidation
- Consistency guarantees
- Memory pressure management

## Memory Operations

### Read
```go
project, err := memory.Read[ProjectState](ctx, projectID)
```
Type-safe retrieval with validation.

### Write
```go
err := memory.Write(ctx, projectID, updatedProject)
```
Atomic updates with schema enforcement.

### Query
```go
tasks := memory.Query[Task](ctx,
    memory.Where("status", "in_progress"),
    memory.OrderBy("priority", "desc"),
)
```
Structured queries, not vector search.

### Watch
```go
memory.Watch(ctx, projectID, func(state ProjectState) {
    // React to state changes
})
```
Real-time notifications on memory updates.

## Multi-Agent Coordination

With structured memory, agents coordinate reliably:

### Read-Modify-Write
```go
tx := memory.BeginTx(ctx)
state := tx.Read(projectID)
state.Status = "completed"
tx.Commit()
```
Atomic transactions prevent conflicts.

### Optimistic Concurrency
```go
for {
    state := memory.Read(projectID)
    state.ModifyField()
    if memory.CompareAndSwap(projectID, state) {
        break  // Success
    }
    // Retry with fresh state
}
```
Concurrent updates without locks.

### Event Sourcing
All memory changes are events:
```go
memory.Append(Event{
    Type: "TaskCompleted",
    Data: completedTask,
    Timestamp: time.Now(),
})
```
Complete audit trail of all state changes.

## The Persistence Layer

Guild's memory is backed by SQLite:
- **Fast**: Local file access, no network latency
- **Reliable**: ACID transactions, crash recovery
- **Portable**: Single-file database, easy backups
- **Scalable**: Handles millions of records

For distributed deployments, PostgreSQL backend available.

## The Result

With structured memory:
- Agents see consistent state (no race conditions)
- Queries are precise (no vector similarity noise)
- Performance is fast (cached, indexed access)
- History is complete (event sourcing)
- Debugging is simple (query exact state at any time)

Memory becomes **infrastructure**, not a research problem.
