# PROJECT_BRIEF

## Input Snapshot

| Field | Value | Status | Notes |
| --- | --- | --- | --- |
| Game name | 퇴근 러시 서바이버 (`Rush Hour Survivor`) | Confirmed | Korean + English title recorded |
| Genre | 로그라이크 생존 액션 | Confirmed | Survival action with escalating commute chaos |
| Core fantasy | 직장인이 퇴근길 혼잡 상황에서 버틴다 | Confirmed | Subway, bus, street pressure |
| Platform | Android | Confirmed | Store target is Google Play |
| Toolchain | TypeScript + Vite + Phaser 3 | Confirmed by setup | Chosen for AI-debug-friendly browser loop |
| Package name | `com.appstudioon.rushhoursurvivor` | Confirmed | Selected for Android release path |
| Target users | 20대~40대 남자 | Confirmed | Tone and UX tuned for quick commute sessions |
| Priority | 출시 준비 | Confirmed | release_ops starts early |
| Monetization | 광고 + 아이템 결제 | Confirmed | Live IDs not yet available |
| Controls | 터치 | Confirmed | Keyboard fallback kept for QA/dev |
| Screen target | Phone portrait | Confirmed | Base viewport 390 x 844 |
| Session length target | `5분 내외` | Confirmed | Runtime pacing updated to target a longer session arc |
| Save | Local storage | Confirmed | Offline-compatible |
| Offline | Full offline play expected | Confirmed | Ads/IAP fail closed, core play remains local |
| Current project state | Empty folder | Confirmed | Initial scaffold created from scratch |
| Developer name | `AppStudioOn` | Confirmed | Release owner set |
| Support email | `young02hwi@gmail.com` | Confirmed | Public support contact set |
| Privacy policy URL | `https://hhy0111.github.io/rush-hour-survivor/public/privacy-policy.html` | Confirmed | Deployed via GitHub Pages |

## Scope Interpretation

MVP for this repo means:
- one polished survival run loop
- escalating commuter pressure
- core pickups linked to the fantasy
- local persistence
- touch-first UI
- automated smoke coverage
- release input tracking started early

## Inputs Left Unconfirmed

| Missing value | Why not fixed now | What unlocks a final decision |
| --- | --- | --- |
| Ad and IAP live identifiers | Must be created outside code | AdMob / Play Console setup |

## File Ownership Map

- Planning truth: `PLAN.md`
- Product input truth: this file
- Runtime rules: `docs/game/*.md`
- UX truth: `docs/ui/*.md`
- Art truth: `docs/art/*.md`
- QA truth: `docs/qa/*.md`
- Release truth: `docs/release_ops/*.md`
