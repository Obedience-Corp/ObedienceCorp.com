# Provider Agnostic Architecture

Guild works with any LLM provider. Mix and match within the same workflow.

## Supported Providers

**Commercial APIs**

- OpenAI (GPT-4, GPT-4o, O3)
- Anthropic (Claude 4, 200K context)
- DeepSeek (cost-effective reasoning)
- DeepInfra (Llama, Mistral, Qwen)
- Ora (DeepSeek models)

**Local Models**

- Ollama (any Ollama-supported model)
- Self-hosted inference

**Developer Tools**

- Claude Code CLI (with MCP support)

## Why Provider Agnostic Matters

**Cost Optimization**

Different tasks need different models:

```yaml
agents:
  - role: "architect"
    provider: "anthropic"
    model: "claude-sonnet-4-20250514"  # Complex reasoning

  - role: "implementer"
    provider: "deepseek"
    model: "deepseek-coder"     # Cost-effective coding

  - role: "reviewer"
    provider: "openai"
    model: "gpt-4o"             # Fast validation
```

Route expensive tasks to capable models. Route simple tasks to cheaper ones.

**Capability Matching**

Models have different strengths:

- Claude excels at nuanced reasoning
- GPT-4 excels at broad knowledge
- DeepSeek excels at code generation
- Local models for privacy-sensitive work

Mix providers to leverage each strength.

**No Vendor Lock-In**

The provider landscape shifts:
- Pricing changes
- New providers emerge
- Models deprecated
- Terms of service evolve

Guild decouples your workflows from any single provider.

## Multi-Provider Workflows

**Team-Level Configuration**

```yaml
guild:
  name: "full-stack-team"
  agents:
    - role: "backend"
      provider: "anthropic"
    - role: "frontend"
      provider: "openai"
    - role: "testing"
      provider: "deepseek"
    - role: "docs"
      provider: "ollama"
```

Four agents. Four providers. One coordinated team.

**Dynamic Routing**

- Route based on task complexity
- Fallback to alternatives on failure
- Load balance across providers
- Optimize cost dynamically

## Unified Interface

Regardless of provider:
- Same agent configuration
- Same tool access
- Same memory system
- Same session management

Provider is just a config option. Behavior stays consistent.

## Cost Tracking Per Provider

Guild tracks costs across providers:

```
Session Summary:
  anthropic/claude-4:    $0.42 (12 requests)
  openai/gpt-4:          $0.28 (8 requests)
  deepseek/coder:        $0.03 (15 requests)
  Total:                 $0.73
```

Know exactly what each provider costs. Optimize with data.

## Migration Path

Switch providers without rewriting:

1. Change provider in config
2. Test with new provider
3. Roll out to team
4. No code changes

Your workflows survive provider changes.

## The Result

Use the best model for each task. Pay appropriately for each. Switch freely as the landscape evolves.

Provider agnostic by design. Lock-in by choice, not necessity.
