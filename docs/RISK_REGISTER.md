# RISK_REGISTER

| ID | Risk | Likelihood | Impact | Owner | Mitigation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | Five-minute target pacing may still need tuning on real devices even though the target is now fixed | Medium | High | planner_agent | Keep spawn and modifier tables easy to retune; verify against real device sessions before balance signoff | Open |
| R-02 | Android package/store metadata is missing, which blocks native shell and store checklist completion | High | High | release_ops_agent | Track as explicit placeholders and do not generate live store config yet | Open |
| R-03 | Placeholder art can create false confidence about final commercial quality | Medium | Medium | asset_agent + qa_agent | Maintain strict art QA checklist and do not treat placeholder shapes as art-complete | Open |
| R-04 | Ads/IAP are planned but not integrated, creating late-stage monetization risk | Medium | High | release_ops_agent | Define value ownership and connection points early; keep SDK choice visible | Open |
| R-05 | Browser-first scaffold may miss mobile-specific touch/performance problems | Medium | High | qa_agent | Add real-device checks before Gate 6 and keep touch-hitbox rules explicit | Open |
| R-06 | Phaser-first bundle is currently about 1.5 MB minified, which is acceptable for tooling but too heavy to ignore for release | Medium | Medium | integration_agent | Revisit chunking or renderer scope once gameplay breadth grows | Open |
