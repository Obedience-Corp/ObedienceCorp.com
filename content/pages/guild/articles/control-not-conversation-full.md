# Beyond Chat Interfaces

Chat interfaces treat AI as a conversation partner. Guild treats AI as a coordinated workforce.

## The Chat Limitation

**Single Agent Model**

- One conversation thread
- Context resets between sessions
- No memory of past decisions
- You remain the only coordinator

**Manual Everything**

- You route every task manually
- You remember what each tool does
- You handle all handoffs
- You maintain all context

**Linear Interaction**

- Prompt. Wait. Response. Repeat.
- One thing at a time
- Progress bottlenecked by interaction
- Scaling means more conversations

## What Orchestration Enables

**Multiple Specialized Agents**

Guild coordinates teams of agents:
- Backend Craftsman for server code
- Frontend Artisan for UI work
- Test Marshal for validation
- Docs Scribe for documentation

Each agent has its role. Guild manages coordination.

**@Agent Routing**

Direct work to specific agents:
```
@backend implement the API endpoint
@frontend build the form component
@tests write coverage for the new code
```

Messages route to the right agent. Context flows automatically.

**Persistent Memory Chains**

- Context accumulates across sessions
- Decisions inform future work
- Project knowledge builds over time
- No "starting from scratch" on day 2

**Real-Time Streaming**

- See agent responses as they generate
- Multiple agents working in parallel
- Progress visible across the team
- Not waiting for one completion to start another

## The Architecture

**Daemon Background Server**

Guild runs as a background service:
- gRPC server for agent communication
- Unix socket for local IPC
- Auto-lifecycle management
- Persistent across restarts

**6-Layer Prompt System**

Context builds through layers:
1. Platform - Safety guidelines
2. Guild - Project goals
3. Role - Agent definition
4. Domain - Project type
5. Session - User preferences
6. Turn - Current instruction

Each layer adds appropriate context without manual management.

**Tool Registry**

Agents access tools through a unified registry:
- LSP for code intelligence
- Multi-file atomic editing
- Web search and fetching
- Workspace isolation

Tools available to agents, coordinated by Guild.

## The Shift

**From:** Chat assistant that waits for prompts
**To:** Agent team that executes coordinated work

Configure your agents. Route work with @mentions. Let Guild handle coordination.

Not faster chat. Actual orchestration.
