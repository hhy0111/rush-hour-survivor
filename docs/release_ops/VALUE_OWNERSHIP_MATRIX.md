# VALUE_OWNERSHIP_MATRIX

| Value | Category | Current placeholder | Owner | Where it lives now | Final destination |
| --- | --- | --- | --- | --- | --- |
| Package name | Human-entered value | `com.appstudioon.rushhoursurvivor` | Human operator | `.env.sample`, release docs | Android shell + Play Console |
| Developer name | Human-entered value | `AppStudioOn` | Human operator | `.env.sample`, store prep doc | Play Console |
| Support email | Human-entered value | `young02hwi@gmail.com` | Human operator | `.env.sample`, store prep doc | Play Console |
| Privacy policy URL | Human-entered value | `https://hhy0111.github.io/rush-hour-survivor/public/privacy-policy.html` | Human operator | `.env.sample`, store prep doc | Play Console + in-app settings |
| AdMob App ID | Code-connected value | `SAMPLE_ANDROID_ADMOB_APP_ID` | release_ops_agent | `.env.sample` | Native/web config after issuance |
| Banner unit ID | Code-connected value | `SAMPLE_ANDROID_BANNER_UNIT_ID` | release_ops_agent | `.env.sample` | Ad integration layer |
| Rewarded unit ID | Code-connected value | `SAMPLE_ANDROID_REWARDED_UNIT_ID` | release_ops_agent | `.env.sample` | Ad integration layer |
| IAP product ID: coffee | Code-connected value | `sample.coffee_pack` | release_ops_agent | `.env.sample` | Commerce adapter + Play Console |
| IAP product ID: taxi | Code-connected value | `sample.taxi_pass` | release_ops_agent | `.env.sample` | Commerce adapter + Play Console |
| Store listing copy | External console/store value | [TODO] | Human operator + release_ops_agent | `STORE_PREP.md` | Google Play Console |
| Content rating | External console/store value | [확인 필요] | Human operator | `STORE_PREP.md` | Google Play Console |
| Signing key | External console/store value | Never store in repo | Human operator | External secure storage only | Build/release pipeline |
