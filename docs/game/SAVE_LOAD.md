# SAVE_LOAD

## Current Save Scope

- Best score
- Tutorial completion flag `[TODO]`
- Audio preference `[TODO]`

## Storage Rules

- Storage backend: browser `localStorage`
- Key namespace: `rush-hour-survivor/profile`
- Corrupt or missing data falls back to safe defaults
- Save write happens on game over and on explicit setting changes

## Future Expansion Guardrails

- Mid-run save/resume is out of MVP scope
- If run-state persistence is added later, QA must add restart/resume corruption tests before merge

