# SYSTEM_RULES

## Input -> State -> Output

### Input

- Touch target position
- Keyboard fallback vector for development and QA
- Restart / start UI actions

### Processing

- Update player movement toward input target
- Spawn commuters from screen edges on a timer
- Move commuters toward the player
- Apply collisions, pickup effects, and level modifiers
- Check fail conditions and score progression

### Output

- Visual snapshot for rendering
- HUD values
- `render_game_to_text` JSON for QA automation
- Local best-score save on game over

## Non-Negotiable Rules

- State changes are deterministic for a given input sequence and random seed
- Save data stores profile-level values only, not a mid-run resume state, until explicitly added
- Ads and IAP must not block core offline gameplay

