# RELEASE_INPUTS

## A. Image Generation Preparation

| Field | Current value | Status | Owner | Input location |
| --- | --- | --- | --- | --- |
| App icon needed | Yes | Confirmed | release_ops_agent | Store asset backlog |
| Feature graphic needed | Yes | Confirmed | release_ops_agent | Google Play console package |
| Screenshot list | Main menu, active run, failure screen, pickup moment | Draft | ui_agent + release_ops_agent | Marketing capture plan |
| In-game asset targets | Player, commuters, pickups, simple backgrounds, UI icons | Draft | asset_agent | `docs/art/ASSET_PIPELINE.md` |
| Style keywords | grounded commute, readable silhouettes, muted transit palette, commercial casual quality | Draft | asset_agent | `docs/art/ART_DIRECTION.md` |
| Forbidden elements | IP similarity, neon cyberpunk, extra limbs, glossy toy finish, random decoration | Confirmed | asset_agent | `docs/art/ART_QA_CHECKLIST.md` |
| Commercial safety check | Required | Confirmed | asset_agent | art QA gate |
| Prompt version log | `PROMPT-*` scheme | Confirmed | asset_agent | `docs/art/PROMPT_LIBRARY.md` |

## B. Ads

| Field | Current value | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| SDK choice | AdMob | Draft | release_ops_agent | Android-first fit |
| App ID | `SAMPLE_ANDROID_ADMOB_APP_ID` | [TODO] | Human operator | Keep out of code until issued |
| Banner unit | `SAMPLE_ANDROID_BANNER_UNIT_ID` | [TODO] | Human operator | Candidate placement: post-run only |
| Rewarded unit | `SAMPLE_ANDROID_REWARDED_UNIT_ID` | [TODO] | Human operator | Candidate placement: revive/bonus |
| Ad locations | Post-run interstitial equivalent and rewarded revive | Draft | planner_agent + release_ops_agent | Final decision after retention check |
| Rewarded reward | One emergency revive or small taxi token | [확인 필요] | planner_agent | Affects economy |
| Ad failure fallback | Show non-blocking message and continue without reward | Confirmed | qa_agent + release_ops_agent | No dead-end UX |
| Test vs live ads | Must be separated | Confirmed | release_ops_agent | `.env.sample` uses sample IDs only |

## C. IAP

| Field | Current value | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| Product name | `Coffee Pack`, `Taxi Pass` | Draft | planner_agent | Candidate only |
| Product ID | `sample.coffee_pack`, `sample.taxi_pass` | [TODO] | Human operator | Placeholder only |
| Product type | Consumable item pack | Draft | planner_agent | Restore behavior depends on type |
| Price policy | [확인 필요] | Missing | release_ops_agent | Needs regional pricing decision |
| Consumable / non-consumable | [확인 필요] | Missing | planner_agent | Impacts UX and restore logic |
| Restore needed | Likely no for consumables | Draft | release_ops_agent | Revisit if non-consumables added |
| Human input location | Google Play Console product setup | Confirmed | Human operator | External console |
| Code connection location | Env + commerce adapter | Draft | game_logic_agent | Not yet implemented live |
| Console input location | Play Console monetization pages | Confirmed | Human operator | Track before launch |

## D. Store Preparation

| Field | Current value | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| Package name | `com.appstudioon.rushhoursurvivor` | Confirmed | planner_agent | Selected for Android shell/store path |
| App name | `Rush Hour Survivor` | Draft | planner_agent | Korean title also available |
| Developer name | `AppStudioOn` | Confirmed | Human operator | Store legal owner |
| Support email | `young02hwi@gmail.com` | Confirmed | Human operator | Public support contact |
| Privacy policy URL | `YOUR_PRIVACY_POLICY_URL_HERE` | [TODO] | Human operator | Draft page created at `public/privacy-policy.html`; final deployed URL still needed |
| Store description | [TODO] | Missing | planner_agent + release_ops_agent | Needs marketing copy pass |
| Content rating | [확인 필요] | Missing | release_ops_agent | Likely low/teen, not final |
| Ads included | Yes | Confirmed | release_ops_agent | Must match console flags |
| Data safety | Local save, ads, IAP SDK metadata to confirm | Draft | release_ops_agent | Update after SDKs chosen |
| Signing key / build setup | [TODO] | Missing | Human operator | Keep outside repo |
| Release track | Internal -> Closed -> Production | Draft | release_ops_agent | Recommended rollout path |

## E. Value Separation Rule

Always classify a value as exactly one of:
1. Human-entered value
2. Code-connected value
3. External console/store value

See `VALUE_OWNERSHIP_MATRIX.md` for the live tracker.
