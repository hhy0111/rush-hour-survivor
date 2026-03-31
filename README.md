# Rush Hour Survivor

`Rush Hour Survivor` is a touch-first roguelike survival action game for Android about surviving the commute home through increasingly chaotic subway, bus, and street rush-hour conditions.

This repository is set up as a practical multi-agent game-development workspace, not just a note dump. It includes:
- `AGENTS.md` as the short operating entrypoint
- `.codex/agents/*.toml` for project-scoped Codex subagents
- `docs/` as the system of record for planning, QA, art, and release_ops
- a runnable web-first game scaffold for fast AI-assisted debugging loops

## Quick Start

1. Install dependencies:
   `npm install`
2. Start the local game build:
   `npm run dev`
3. Run deterministic logic tests:
   `npm run test:unit`
4. Build the production bundle:
   `npm run build`
5. Run browser smoke tests after installing Playwright Chromium:
   `npx playwright install chromium`
   `npm run test:e2e`

## Current Status

- Workspace was empty at setup time, so every file in this scaffold is `ADD_NEW`.
- MVP scope is defined in [PLAN.md](PLAN.md).
- Missing business/release inputs are tracked in [TODO.md](TODO.md) and [docs/release_ops/RELEASE_INPUTS.md](docs/release_ops/RELEASE_INPUTS.md).
- QA loops are pre-wired in [docs/qa/QA_LOOP_01.md](docs/qa/QA_LOOP_01.md), [docs/qa/QA_LOOP_02.md](docs/qa/QA_LOOP_02.md), and [docs/qa/QA_LOOP_03.md](docs/qa/QA_LOOP_03.md).
- A deployable privacy-policy page draft is available at `public/privacy-policy.html`.

## Primary Docs

- Planning and gates: [PLAN.md](PLAN.md)
- Project brief: [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md)
- Core loop and state: [docs/game/CORE_LOOP.md](docs/game/CORE_LOOP.md)
- UI flow: [docs/ui/UI_FLOW.md](docs/ui/UI_FLOW.md)
- Art direction: [docs/art/ART_DIRECTION.md](docs/art/ART_DIRECTION.md)
- QA strategy: [docs/qa/QA_PLAN.md](docs/qa/QA_PLAN.md)
- Release ops: [docs/release_ops/RELEASE_INPUTS.md](docs/release_ops/RELEASE_INPUTS.md)

## Toolchain Decision

Chosen toolchain: `TypeScript + Vite + Phaser 3`.

Reason:
- Browser-first debugging is faster and easier for AI-driven iteration than a native-only setup.
- A single codebase can support touch-first gameplay, local save, offline play, and automated browser QA.
- Android wrapping and store setup can be layered on after `[확인 필요]` values such as the final package name are confirmed.
