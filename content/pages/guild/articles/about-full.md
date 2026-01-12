# Guild

AI agent orchestration framework for developers building production agent systems.

## What Guild Does

Guild coordinates multiple specialized AI agents working together on complex software projects. Not a chat interface. Not a single agent. A framework for building agent teams.

## Core Architecture

**Agents as Artisans**

Each agent has:
- Distinct role (Guild Master, Backend Craftsman, Frontend Artisan)
- Specialized capabilities and backstory
- Access to specific tools
- Persistent memory chains
- Individual cost tracking

**Daemon Architecture**

- Background gRPC server
- Unix socket IPC
- Auto-lifecycle management
- Cross-platform support

**6-Layer Prompt System**

1. Platform Layer - Safety guidelines
2. Guild Layer - Project goals
3. Role Layer - Agent definitions
4. Domain Layer - Project type
5. Session Layer - User preferences
6. Turn Layer - Current instruction

## Key Capabilities

**Multi-Agent Orchestration**

Coordinate agents with different specializations. Backend agent writes code. Test agent validates. Docs agent documents. Guild manages the workflow.

**Provider Agnostic**

OpenAI, Anthropic, DeepSeek, Ollama, DeepInfra. Mix providers and models in the same workflow. Your backend agent runs GPT-4, your test agent runs Claude.

**Persistent Reasoning**

Guild extracts and stores agent thinking. See how decisions were made. Build on past reasoning. Don't lose context between sessions.

**Production TUI**

~2000 lines of terminal UI. @agent messaging. Real-time streaming. Markdown rendering. Vim mode. Session export. Built for developers in the terminal.

**Tool Integration**

- LSP for code intelligence
- Multi-file atomic editing
- Web search and content fetching
- Workspace isolation for safety

## How It's Different

| Guild | Others |
|-------|--------|
| Mix-and-match providers per agent | Single provider |
| Persistent memory chains | Session-only context |
| Reasoning extraction & storage | Lost after response |
| Real-time cost tracking | Estimated only |
| Production TUI | Basic chat or web |

## The Result

Infrastructure for building teams of AI agents that actually work together.

Configure agents. Coordinate workflows. Scale beyond single-agent limits.
