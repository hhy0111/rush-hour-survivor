# CORE_LOOP

## Player Fantasy

The player is an office worker trying to survive the commute home while crowd density, stress, and external disruptions escalate.

## MVP Loop

1. Start run from the title screen
2. Move through the phone-sized arena to avoid commuter collisions
3. Collect pickups:
   - `coffee`: restores health
   - `earphones`: reduces stress
   - `taxi`: clears nearby commuters and grants a short escape window
4. Survive long enough to level up the commute pressure
5. Fail when health reaches `0` or stress reaches `100`
6. Record best score locally and restart

## Session Target

- Target run length: around `5 minutes`
- Design meaning:
  - first minute teaches movement and crowd reading
  - minutes 2-3 add sustained pressure
  - minutes 4-5 should feel like commute survival under stacked modifiers

## Difficulty Escalation

| Elapsed time | Modifier | Effect |
| --- | --- | --- |
| 0-80s | Base rush | Low commuter count, readable intro pacing |
| 80-160s | 지각 위험 | Higher spawn rate and denser pathing pressure |
| 160-240s | 상사 전화 | Passive stress spikes during call pulses |
| 240s+ | 폭우 | Reduced movement speed plus heavier crowd pressure |

## Reward Logic

- Score increases with survival time
- Clearing a commuter with `taxi` adds a small bonus
- Best score persists locally

## Related Files

- Runtime logic: `src/game/state/gameSession.ts`
- State definitions: `docs/game/GAME_STATES.md`
- Save rules: `docs/game/SAVE_LOAD.md`
