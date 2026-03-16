Obey's session management is built on a pluggable adapter system. Each provider implements the same interface: start, send message, stream activity, stop.

This means switching providers is a configuration change, not a rewrite. Running multiple providers simultaneously is native — Claude Code on one project, Codex on another, both managed by the same daemon.

Sessions support grouping (coordinate multiple agents) and chaining (sequential execution pipelines). Parent-child spawning enables hierarchical agent orchestration.

All sessions are persisted, so daemon restarts don't lose state. Activity streams can be consumed by any client — CLI, TUI, web dashboard, or mobile app.

**One daemon. Many agents. Any provider. Full lifecycle control.**
