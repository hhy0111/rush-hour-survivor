# QA_PLAN

## QA Principle

QA is not a final checklist. It starts during scaffold creation and stays active through at least three fix-retest loops.

## Required Loop Structure

Every loop must record:
1. Problem list
2. Applied fix
3. Retest result
4. Remaining risk

## Planned Loops

| Loop | Focus | Entry gate | Owner |
| --- | --- | --- | --- |
| QA Loop 01 | Boot, start, basic run, failure, restart smoke | Gate 3 | qa_agent |
| QA Loop 02 | State regression, save/load, repeated input, scene churn | Gate 4 | qa_agent |
| QA Loop 03 | Release-facing risks: art quality, ads/IAP fallback, store readiness | Gate 5 | qa_agent + release_ops_agent |

## Minimum Commands

- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`

## Manual Focus Areas

- Fast repeated taps
- Start -> fail -> restart churn
- Save after game over and app relaunch
- Offline/default behavior
- UI misunderstanding risk
- Art outputs that still feel obviously AI-generated

