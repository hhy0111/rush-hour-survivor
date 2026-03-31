# QA_LOOP_02

## Scope

- Repeated start/restart cycles
- Best-score persistence
- Save corruption fallback
- Rapid input changes and target switching
- Modifier escalation transitions

## Problem List

- `Major`: fail -> restart -> best-score save flow was not yet reproducible in browser automation

## Applied Fix

- Added a QA-only debug fail hook that can trigger a health or stress failure without changing release behavior
- Added `tests/e2e/restart.spec.ts` to verify forced fail, persisted best score, and restart

## Retest Result

- `tests/e2e/restart.spec.ts` passed
- Best score persisted into `localStorage`
- Restart returned the app to an active playable run with HUD visible

## Remaining Risk

- App suspend/resume on a real Android device is still unverified
- Mid-run save/resume remains intentionally out of scope for the current MVP
