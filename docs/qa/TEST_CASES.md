# TEST_CASES

| ID | Area | Scenario | Expected result | Type |
| --- | --- | --- | --- | --- |
| TC-01 | Boot | Open app and wait for menu | Menu renders, start button visible | Smoke |
| TC-02 | Run | Press start and survive 5 seconds | HUD updates, score increases, no crash | Smoke |
| TC-02A | Pacing | Survive through a representative 5-minute balancing session | Modifier schedule roughly matches the 5-minute target arc | Balance |
| TC-03 | Failure | Take enough damage/stress to fail | Game over panel shows reason and score | Functional |
| TC-04 | Restart | Restart after failure | New run starts from clean session while best score persists | Regression |
| TC-05 | Repeated input | Rapidly tap start/restart several times | No duplicate overlay or broken state | Stress |
| TC-06 | Save | Finish run, reload app | Best score persists | Persistence |
| TC-07 | Touch flow | Drag/tap move target repeatedly | Player movement remains understandable | UX |
| TC-08 | Offline | Run app without network | Core loop works; ads/IAP stay non-blocking | Release |
| TC-09 | Art review | Review placeholder replacement candidate | Asset passes art checklist or is rejected | Visual QA |
| TC-10 | Monetization fallback | Rewarded ad unavailable | UI shows fallback and gameplay remains intact | Release |
