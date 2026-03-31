# DONE_CRITERIA

## Gate Exit Rules

### Gate 0: Project Input Check

- Platform, current project state, and release priority are known
- Missing inputs are logged as `[TODO]` or `[확인 필요]`
- Existing-file analysis is complete

### Gate 1: Plan Lock

- `PLAN.md` exists and names MVP scope in/out
- `TODO.md` and `docs/RISK_REGISTER.md` capture current gaps
- Work request format is ready for handoff

### Gate 2: Structure Draft

- Logic, UI, art, QA, and release_ops docs exist
- `AGENTS.md` and `.codex/agents/*.toml` agree on role boundaries
- release_ops input tables and secrets policy exist

### Gate 3: Implementation Prep

- Runnable scaffold exists
- `render_game_to_text` and `advanceTime` test hooks exist
- Test commands are documented and at least one deterministic test exists

### Gate 4: First Integration

- Main menu -> play -> fail -> restart path works
- Core state updates feed HUD and game-over output
- Local best-score persistence works
- Integration notes show no orphan files

### Gate 5: QA Repeat Loops

- At least three QA loop documents exist and are used
- Each loop records:
  - issue list
  - applied fix
  - retest result
  - remaining risk
- `BUG_LOG.md` and `TEST_CASES.md` are current

### Gate 6: Release Prep

- `docs/release_ops/RELEASE_INPUTS.md` and `docs/release_ops/RELEASE_CHECKLIST.md` are current
- Ad, IAP, store, and image-generation tables separate owner and input location
- Live secrets are still absent from code

### Gate 7: Completion Decision

- `qa_agent` marks pass or explicitly states the blocking defects
- Planner confirms no hidden scope creep
- Release owner confirms remaining TODOs are acceptable for the current milestone

## Feature Definition of Done

A feature is only `done` when:
- behavior is documented
- code path is implemented
- relevant test case exists
- QA loop records the result
- release or input impact is noted if applicable

