# Rush Hour Survivor Agent Operating Guide

This repo follows an `AGENTS.md` entrypoint plus `docs/` system-of-record pattern. Keep `AGENTS.md` short, route detail into the linked docs, and update the documents before scope-changing implementation.

OpenAI references used for this setup:
- Codex custom agents live under `.codex/agents/*.toml`.
- `AGENTS.md` should stay concise and point to durable repo instructions.
- Narrow, opinionated custom agents are preferred over vague generalists.

Read in this order before major work:
1. [PLAN.md](PLAN.md)
2. [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md)
3. [docs/DONE_CRITERIA.md](docs/DONE_CRITERIA.md)
4. Relevant domain docs under `docs/`

Mandatory operating rules:
- `planner_agent` always goes first for scope, milestones, and gate changes.
- `release_ops_agent` starts tracking missing launch inputs immediately after planning.
- `game_logic_agent`, `ui_agent`, and `asset_agent` work inside planner-approved scope only.
- `integration_agent` checks file linkage and interface ownership continuously.
- `qa_agent` starts at Gate 3 or earlier and runs at least three documented fix-retest loops.
- Do not hardcode ad IDs, billing keys, signing material, or external service secrets.
- Missing values stay as `[TODO]` or `[확인 필요]` with owner and unblock condition.

Project-specific runtime config:
- Codex custom agents: `.codex/agents/*.toml`
- Human-readable role specs: `agents/*.md`
- Work request format: `docs/WORK_REQUEST_TEMPLATE.md`

Current toolchain decision:
- Core dev loop: web-first `TypeScript + Vite + Phaser 3`
- Android release path: wrap the web build after package name and store values are confirmed
- QA automation: `Vitest` for deterministic logic, `Playwright` for browser smoke/regression

Default commands:
- `npm install`
- `npm run dev`
- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`

Completion rule:
- No stage is final until the relevant gate in `docs/DONE_CRITERIA.md` is met and `qa_agent` has recorded a passing result.

