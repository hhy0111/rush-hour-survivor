# PLAN

## Short Plan

- Current state: empty folder, no existing repo files, no current game code.
- This stage goal: create a usable multi-agent workspace plus a runnable MVP scaffold.
- Files in scope: root docs, `.codex`, `agents/`, `docs/`, `src/`, `tests/`, `assets/`, build config.
- Existing file treatment: no existing files detected, so all planned artifacts are `ADD_NEW`.
- Deferred inputs: privacy policy deployment URL, store copy, live ad IDs, live IAP catalog.
- Template-only areas: Android-specific store wiring and live monetization values remain placeholders until confirmed.

## Gate Status

| Gate | Goal | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| Gate 0 | Project inputs checked | planner_agent | Done | Empty workspace confirmed. Missing values recorded. |
| Gate 1 | Plan and MVP scope | planner_agent | Done | Scope, TODO, and gate rules documented. |
| Gate 2 | Structure design | planner_agent + integration_agent | Done | Docs, agents, and scaffold layout connected. |
| Gate 3 | Implementation prep | integration_agent + qa_agent | Done | Unit tests, Playwright smoke, `render_game_to_text`, and `advanceTime` exist. |
| Gate 4 | First integration | game_logic_agent + ui_agent | Done | Menu -> play -> fail -> restart and best-score save verified. |
| Gate 5 | QA repeat loops | qa_agent | In progress | Three loops created and first execution logged; future feature work must keep extending them. |
| Gate 6 | Release prep check | release_ops_agent | Pending | Depends on live store/monetization inputs. |
| Gate 7 | Completion decision | qa_agent + planner_agent | Pending | Blocked until QA pass. |

## MVP Scope In

- One survival run with touch-friendly movement and keyboard fallback
- Stress and health as dual failure pressure
- Commuter crowd spawning that scales with elapsed time
- Three thematic pickups: coffee, earphones, taxi
- Local best-score persistence
- Start, play, fail, restart loop
- QA hooks: `render_game_to_text`, deterministic `advanceTime`, unit tests, browser smoke test

## MVP Scope Out

- Multiple maps or chapters
- Narrative events beyond lightweight status modifiers
- Real ad SDK integration
- Real Google Play Billing integration
- Live Android shell generation before package/store metadata is confirmed
- Final production art pack

## Missing Inputs

| Item | State | Why it matters | Current handling | Unblocks when |
| --- | --- | --- | --- | --- |
| Session length target | Confirmed: `5분 내외` | Balances spawn, pacing, reward cadence | Runtime and docs updated for a 5-minute target | No blocker |
| Final package name | Confirmed: `com.appstudioon.rushhoursurvivor` | Required for Android shell/store config | Reflected in env and release docs | No blocker |
| Developer name/support email | Confirmed | Needed for store and legal prep | Reflected in env and release docs | No blocker |
| Privacy policy URL | [TODO] | Needed for Play Console disclosures | Local page created; final URL still pending | The page is deployed and its URL is known |
| Live ad IDs | [TODO] | Required for release monetization | Placeholder only | AdMob project exists |
| IAP catalog and price policy | [확인 필요] | Changes product IDs and UX copy | Placeholder only | Product matrix is approved |

## Handoff Rules

Every handoff must include:
- Input docs or code paths used
- Decisions made in this step
- Unconfirmed items
- Current risks
- What the next worker should inspect first

## Initial Work Requests

### planner_agent

- task_name: Lock MVP harness scope
- objective: Keep the environment implementation bounded to a release-first mobile MVP workflow
- scope_in: planning docs, gates, TODOs, risk definitions
- scope_out: runtime gameplay tuning
- required_inputs: `docs/PROJECT_BRIEF.md`, `docs/DONE_CRITERIA.md`
- dependencies: none
- done_criteria: scope-in and scope-out are explicit and handoff-safe
- output_files: `PLAN.md`, `TODO.md`, `docs/RISK_REGISTER.md`
- risks_to_watch: hidden scope creep, missing input ownership
- escalation_if_blocked: return missing field + owner + unblock condition

### qa_agent

- task_name: Run scaffold verification loops
- objective: Prove the environment is executable and the QA process starts before content-complete status
- scope_in: unit tests, browser smoke, restart/save path, screenshot validation, release-input audit
- scope_out: final store submission
- required_inputs: `src/**`, `tests/**`, `docs/qa/**`, `docs/release_ops/**`
- dependencies: runnable build
- done_criteria: at least three QA loops contain real issue/fix/retest/risk entries
- output_files: `docs/qa/QA_LOOP_01.md`, `docs/qa/QA_LOOP_02.md`, `docs/qa/QA_LOOP_03.md`, `docs/qa/BUG_LOG.md`
- risks_to_watch: screenshot-only failures, untracked residual risks, false green status from shallow tests
- escalation_if_blocked: document the failing command or missing environment step
