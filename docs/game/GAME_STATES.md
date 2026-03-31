# GAME_STATES

## Top-Level Flow

| State | Entered from | Exit condition | Owner |
| --- | --- | --- | --- |
| `menu` | App boot, restart | Player presses start | ui_agent |
| `playing` | Start button | Health `<= 0` or stress `>= 100` | game_logic_agent |
| `gameover` | Run failure | Player presses restart | ui_agent + game_logic_agent |

## Runtime Session Fields

- `elapsedMs`
- `score`
- `level`
- `health`
- `stress`
- `commuters[]`
- `pickups[]`
- `activeModifiers[]`
- `bestScore`
- `failReason`

## State Transition Rules

- Menu never mutates score
- Only `playing` can update commuter or pickup arrays
- Game over freezes gameplay state and pushes score to local profile storage
- Restart always creates a fresh runtime session from defaults, preserving only the saved profile

