# DECISIONS

## D-001 Toolchain

- Decision: Use `TypeScript + Vite + Phaser 3` for the playable scaffold.
- Why: It is faster to inspect, automate, and debug than a native-only stack, while still supporting touch-first gameplay and later Android wrapping.
- Impact:
  - Browser smoke tests can run early with Playwright.
  - Local save can be validated with `localStorage`.
  - Android-specific store setup remains a later layer until package/store inputs are confirmed.

## D-002 Agent Structure

- Decision: Keep `AGENTS.md` as the short entrypoint and move durable domain rules into `docs/`.
- Why: This matches OpenAI Codex guidance that `AGENTS.md` should be concise and custom agents should stay narrow and opinionated.
- Impact:
  - Human and agent onboarding stay fast.
  - Domain docs can evolve without bloating the entry file.
  - `.codex/agents/*.toml` mirrors the human-readable `agents/*.md` specs.

## D-003 QA Timing

- Decision: QA starts before feature-complete status and is documented in three loops from scaffold stage onward.
- Why: The project goal is release readiness, not late-stage bug discovery.
- Impact:
  - Every meaningful change should touch a QA loop, bug log, or test case.
  - Final completion is blocked until `qa_agent` records a pass.

## D-004 Monetization Handling

- Decision: Separate monetization into document-first tracking plus code connection points only.
- Why: Live IDs and price policies are missing and must not be guessed or hardcoded.
- Impact:
  - `.env.sample` exposes placeholder fields only.
  - `docs/release_ops/*.md` owns live-value tracking.

