# BUG_LOG

| ID | Severity | Area | Status | Summary | Repro | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| QA-001 | Major | Visual QA | Closed | Headless screenshot capture was black while runtime state advanced | Run web game client before Canvas fix | game_logic_agent + qa_agent | Fixed by forcing Phaser Canvas renderer |
| QA-002 | Minor | Build output | Open | Production build emits a large-chunk warning around 1.5 MB | `npm run build` | integration_agent | Track under `R-06` |
| QA-003 | Major | Regression coverage | Closed | Restart/save path was not reproducible in browser automation | Attempt fail/restart before debug hook existed | qa_agent | Fixed by debug fail hook and restart e2e test |
