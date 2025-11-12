# Developer Experience

## The DX Problem

AI frameworks often force developers to choose:
- **Easy but limited** (low-code, no-code tools)
- **Powerful but complex** (research frameworks requiring PhDs)

Guild rejects this dichotomy. Professional developers need **power and clarity**.

## Design Principles

### 1. Code-First
Guild is a framework, not a GUI tool. You define agents, workflows, and controls in code.

Benefits:
- Version control for all configurations
- Code review for all changes
- Automated testing of agent behavior
- Integration with existing CI/CD

### 2. Convention Over Configuration
Common patterns work out of the box. No boilerplate required.

Example:
```go
agent := guild.NewAgent("analyzer",
    guild.WithModel("gpt-4"),
    guild.WithMaxTokens(1000),
)
```

Advanced configuration available when needed, invisible when not.

### 3. Explicit Over Magic
No hidden behavior. No "the framework decides for you."

If an agent will retry on failure, that's in your code:
```go
guild.WithRetry(guild.ExponentialBackoff{
    MaxAttempts: 3,
    InitialDelay: time.Second,
})
```

You define the behavior. Guild executes it.

### 4. Fail Fast
Errors should be loud and early. Guild validates:
- Configuration at build time
- Inputs at runtime
- Outputs before use

No silent failures. No "it worked in dev but failed in production."

## Developer Workflow

### 1. Define Agents
```go
researcher := guild.NewAgent("researcher")
writer := guild.NewAgent("writer")
editor := guild.NewAgent("editor")
```

### 2. Compose Workflows
```go
workflow := guild.NewWorkflow("article").
    Step(researcher, "gather information").
    Step(writer, "draft article").
    Step(editor, "polish content").
    Build()
```

### 3. Add Controls
```go
workflow.WithValidation(schemas.ArticleSchema).
    WithTimeout(5 * time.Minute).
    WithCostLimit(dollars(1.00))
```

### 4. Execute & Monitor
```go
result, err := workflow.Execute(ctx, input)
if err != nil {
    // Handle with full error context
}
```

## Debugging Experience

### Local Development
Run entire multi-agent workflows locally:
- Use local models (Ollama, LM Studio)
- Mock external services
- Deterministic execution for testing
- Instant feedback loops

### Error Messages
When something fails, you get:
- **What failed**: Specific agent and operation
- **Why it failed**: Root cause, not just symptoms
- **What to fix**: Actionable suggestions
- **Context**: Full stack trace and state

### Observability
Built-in dashboard shows:
- Agent execution timeline
- Resource usage per agent
- Cost per operation
- Failed validations
- Retry attempts

## Testing Support

### Unit Testing Agents
```go
func TestAnalyzerAgent(t *testing.T) {
    agent := setupTestAgent()
    result := agent.Execute(testInput)
    assert.Equal(t, expected, result)
}
```

### Integration Testing Workflows
```go
func TestArticleWorkflow(t *testing.T) {
    workflow := buildWorkflow()
    result := workflow.Execute(ctx, input)
    assertValidArticle(t, result)
}
```

### Chaos Testing
Guild includes tools for testing failure scenarios:
- Inject agent failures
- Simulate timeouts
- Trigger circuit breakers
- Test recovery paths

## Documentation

### Type Safety
Guild is written in Go. Your IDE provides:
- Autocomplete for all APIs
- Type checking at compile time
- Inline documentation
- Refactoring support

### Examples
Real-world example projects showing:
- Common patterns
- Best practices
- Anti-patterns to avoid
- Production configurations

### Runbooks
Step-by-step guides for:
- Initial setup
- Agent configuration
- Workflow design
- Deployment
- Operations

## The Result

Guild respects developers. You're not clicking through GUIs. You're writing code.

**Professional tools for professional developers.**
