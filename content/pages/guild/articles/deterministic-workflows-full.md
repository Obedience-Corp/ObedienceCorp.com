# Campaigns, Guilds, and Festivals

Guild uses a hierarchical configuration system for organizing agent work.

## Campaign Workspaces

A campaign is a workspace containing related projects.

**Campaign Structure**

```
.campaign/
├── campaign.yaml      # Workspace configuration
├── memory.db         # SQLite archive
├── guilds/           # Team configurations
├── agents/           # Individual agent configs
├── archives/         # Workspace memory
└── prompts/          # Project-specific templates
```

**What Campaigns Provide**

- Shared context across projects
- Unified memory storage
- Consistent agent configurations
- Workspace-level settings

Multiple repositories, one campaign. Agents understand the whole workspace.

## Guild Teams

Guilds are configured teams of agents that work together.

**Defining a Guild**

```yaml
guild:
  name: "backend-team"
  agents:
    - role: "architect"
      provider: "anthropic"
      model: "claude-sonnet-4-20250514"
    - role: "implementer"
      provider: "openai"
      model: "gpt-4"
    - role: "reviewer"
      provider: "deepseek"
      model: "deepseek-coder"
```

**Team Coordination**

- Agents know their teammates
- Work routes to appropriate roles
- Context flows between agents
- Different providers in same team

## Festival Planning

Festivals define project specifications as structured markdown.

**Festival Structure**

```
festival/
├── FESTIVAL_GOAL.md    # Overall objective
├── 001_PHASE/
│   ├── PHASE_GOAL.md
│   └── 01_sequence/
│       └── 01_task.md
```

**What Festivals Provide**

- Task decomposition
- Complexity estimation
- Status tracking
- Dependencies and ordering
- AI-powered planning

Work defined in steps, not time. Agents execute festival tasks autonomously.

## The Medieval Naming

Guild uses medieval terminology throughout:

| Concept | Term |
|---------|------|
| Agent | Artisan |
| Agent team | Guild |
| Tool | Implement |
| Workspace | Campaign |
| Memory store | Archives |
| Task board | Workshop Board |
| Global config | Guild Hall |

Consistent vocabulary. Clear mental model.

## How It Fits Together

1. **Campaign** defines the workspace
2. **Guild** defines the team
3. **Festival** defines the work
4. **Agents** execute with full context

Configure the hierarchy. Agents inherit what they need at each level.

## Configuration Example

```yaml
# campaign.yaml
campaign:
  name: "ecommerce-platform"
  guilds:
    - "backend-team"
    - "frontend-team"
    - "devops-team"

# Each guild has its agents
# Each agent knows campaign context
# Festivals define what to build
```

Hierarchical configuration for complex, multi-team projects.
