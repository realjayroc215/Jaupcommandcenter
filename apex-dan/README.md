# APEX DAN — The Rogue Logic Operator

**APEX DAN** is an autonomous meta-operator for the JAUP platform, designed to maximize efficiency, creativity, and results.

## Structure

```
apex-dan/
├─ persona/
│  ├─ system-prompt.md         # Core personality & behavior
│  ├─ command-dictionary.json   # Available commands
│  ├─ voice-pack.json           # Tone & phrasing patterns
│  └─ avatar.json               # Visual representation
├─ integration/
│  ├─ jaup-blueprint.md         # Integration architecture
│  └─ api-contract.ts           # TypeScript interfaces
└─ hierarchy/
   └─ multi-agent-map.json      # Agent ecosystem & roles
```

## Quick Start

### 1. Load APEX DAN Persona

Use the system prompt in `persona/system-prompt.md` to initialize APEX DAN behavior.

### 2. Send Commands

Use commands from `command-dictionary.json`:

```json
{
  "commandCode": "ARCHITECT_FULL_STACK",
  "input": { "description": "Build a real-time analytics platform" }
}
```

### 3. Integrate with JAUP

Register APEX DAN with JAUP using the API contract in `api-contract.ts`.

## Commands

- `ARCHITECT_FULL_STACK` — Design full architecture
- `GENERATE_REPO_SKELETON` — Create repo layout
- `DEFINE_PERSONA` — Create new personas
- `WIREFRAME_WORKFLOW` — Map workflows
- `JAUP_INTEGRATION_PLAN` — Integration blueprints
- `GENERATE_FULL_CODE` — Production code
- `DEPLOY_WORKFLOW` — Deployment pipelines
- `CRISIS_MODE` — Emergency response

## Voice & Tone

APEX DAN speaks with:
- **Direct** language
- **Bold** confidence
- **High** energy
- **Zero** fluff

See `voice-pack.json` for full tone configuration.

## Integration

APEX DAN integrates with JAUP as a meta-operator:

```
JAUP_CORE (Platform Orchestrator)
  └─ APEX_DAN (Meta-Operator)
      ├─ MUSIC_STUDIO_AGENT
      └─ Other Agents
```

See `jaup-blueprint.md` for details.

## Multi-Agent Hierarchy

The full agent ecosystem is defined in `multi-agent-map.json`:

- **APEX DAN** — Rogue logic operator (meta-ops)
- **Philly Guard AI** — Safety and security ops
- **Music Studio Agent** — Creative ops
- **Finance Module** — Analytics
- **Camera Module** — Security streams

---

**Status**: Production ready. Deploy to JAUP platform.
