Security isn't optional when agents have filesystem access. Obey enforces it at the runtime level.

**Sandbox boundaries**: Every agent session operates within a campaign-scoped boundary. Symlink-aware path validation prevents escape. File deny lists protect sensitive paths.

**Allowlisted execution**: Only approved commands (fest, camp, just, git) can be run through the execution sandbox. Subcommand manifests from CLI tools provide fine-grained restrictions.

**Audit chain**: An immutable, cryptographically chained log records every security-relevant event — command executions, denied operations, boundary violations. The chain can be verified for tampering.

**Metering**: Per-campaign quotas for token usage, execution time, and concurrent sessions prevent runaway costs and resource exhaustion.

**Trust your agents to work. Verify everything they do.**
