# Production Terminal UI

Guild includes a full-featured TUI for developers who prefer the terminal.

## Interface Features

**@Agent Messaging**

Direct messages to specific agents:

```
@backend implement the user authentication API
@frontend create the login form component
@tests write integration tests for auth flow
```

Messages route to the right agent. Responses stream back in context.

**Real-Time Streaming**

- See responses as they generate
- Token-by-token streaming
- Multiple agent responses visible
- Progress indication during generation

**Markdown Rendering**

- Code blocks with syntax highlighting
- Tables, lists, emphasis
- Links and references
- Rendered inline in terminal

**Vim Mode**

- Full vim keybindings
- Modal editing
- Familiar navigation
- Works like you expect

## Session Management

**Save and Restore**

```
/save my-session
/load my-session
```

Pick up where you left off. Context preserved.

**Export History**

```
/export markdown
/export json
```

Export conversation for documentation or analysis.

**Session Recovery**

- Auto-save on exit
- Recovery from crashes
- Persistent state
- No lost work

## Production Features

**Multi-Agent View**

See multiple agent contexts:
- Active agent highlighted
- Switch between agents
- Parallel conversations
- Team overview

**Cost Dashboard**

Real-time cost tracking:
- Per-agent costs
- Per-model breakdown
- Session totals
- Budget alerts

**Keyboard Shortcuts**

Everything accessible from keyboard:
- Agent switching
- Session management
- View controls
- Quick commands

## Architecture

**Built with Charm**

Guild's TUI uses Charm libraries:
- BubbleTea for architecture
- Lipgloss for styling
- Glamour for markdown
- Production-tested components

**Cross-Platform**

Works on:
- macOS
- Linux
- Windows (via WSL)
- Remote SSH sessions

**Terminal Detection**

Adapts to terminal capabilities:
- True color when supported
- 256 color fallback
- Basic color fallback
- Feature detection

## Why TUI?

**Developer Workflow**

Developers live in terminals:
- tmux sessions
- SSH access
- CI environments
- Server administration

Guild fits that workflow.

**Resource Efficiency**

Lighter than alternatives:
- No browser overhead
- No Electron memory
- Works over slow connections
- Runs on minimal systems

**Script Integration**

Combine with other tools:
- Pipe output
- Script interactions
- Integrate with workflows
- Automation-friendly

## The Result

A terminal interface for agent orchestration that feels native to developer workflows.

Not a web UI ported to terminal. A TUI built for developers.
