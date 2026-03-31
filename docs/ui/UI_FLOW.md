# UI_FLOW

## Primary Flow

1. App boot
2. Title panel with concise premise and start button
3. Survival run with HUD visible
4. Game-over panel with score summary and restart button

## Touch-First Rules

- The first important action is always the most visually prominent button
- Touch targets should be at least `48 x 48` CSS pixels
- Important numbers stay in the top HUD, not hidden in submenus
- Failure reason is always shown on game over

## Current Screen Ownership

- `menu`: player onboarding, short instructions
- `run`: score, health, stress, modifier chips
- `gameover`: score recap, best score, retry CTA

## Related Files

- `docs/ui/UI_SCREENS.md`
- `docs/ui/UI_RULES.md`
- `src/main.ts`
- `src/styles.css`

