# SECRETS_POLICY

## Never Commit

- Ad network live IDs if your policy treats them as sensitive
- Billing/private API secrets
- Keystore passwords
- Service account keys
- External API secrets

## Allowed in Repo

- `SAMPLE_`
- `TEST_`
- `YOUR_VALUE_HERE`
- public non-sensitive product names

## Required Practice

- Human-entered values stay in operator-controlled systems until ready
- Code references use placeholders and documented connection points
- External console values are tracked in docs, not copied into source files by guesswork
