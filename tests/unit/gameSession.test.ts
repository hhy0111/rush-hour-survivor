import { describe, expect, it } from "vitest";

import { GameSession } from "../../src/game/state/gameSession";
import type { InputState } from "../../src/game/types";

const idleInput: InputState = {
  axisX: 0,
  axisY: 0,
  pointerActive: false,
  pointerTarget: null
};

describe("GameSession", () => {
  it("starts with the expected defaults", () => {
    const session = new GameSession({ bestScore: 7, random: () => 0.25 });
    const snapshot = session.getSnapshot();

    expect(snapshot.status).toBe("running");
    expect(snapshot.level).toBe(1);
    expect(snapshot.bestScore).toBe(7);
    expect(snapshot.health).toBe(100);
    expect(snapshot.stress).toBeGreaterThan(0);
  });

  it("levels up and activates commute modifiers over time", () => {
    const session = new GameSession({ random: () => 0.4 });
    session.debugSetElapsedMs(162_000);

    const snapshot = session.getSnapshot();

    expect(snapshot.level).toBeGreaterThanOrEqual(3);
    expect(snapshot.activeModifiers).toContain("지각 위험");
    expect(snapshot.activeModifiers).toContain("상사 전화");
  });

  it("applies pickups and taxi clears nearby commuters", () => {
    const session = new GameSession({ random: () => 0.4 });
    const base = session.getSnapshot().player;

    session.debugSpawnCommuter(base.x + 20, base.y + 10, 0);
    session.debugSpawnPickup("taxi", base.x, base.y);
    session.step(16, idleInput);

    const snapshot = session.getSnapshot();
    expect(snapshot.commuters).toHaveLength(0);
    expect(snapshot.clearedCount).toBeGreaterThanOrEqual(1);
    expect(snapshot.player.invulnerableMs).toBeGreaterThan(0);
  });

  it("fails when a commuter sits on the player long enough", () => {
    const session = new GameSession({ random: () => 0.1 });
    const base = session.getSnapshot().player;

    session.debugSpawnCommuter(base.x, base.y, 0);

    for (let i = 0; i < 500; i += 1) {
      const snapshot = session.step(16, idleInput);
      if (snapshot.status === "gameover") {
        expect(snapshot.failReason).toBeTruthy();
        return;
      }
    }

    throw new Error("Expected the player to fail under constant commuter pressure");
  });
});
