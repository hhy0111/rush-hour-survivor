import Phaser from "phaser";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "../game/constants";
import type { GameSnapshot, PickupKind } from "../game/types";

const PICKUP_COLORS: Record<PickupKind, number> = {
  coffee: 0xc9783f,
  earphones: 0x4695d1,
  taxi: 0xf0bf2a
};

export function drawSnapshot(
  graphics: Phaser.GameObjects.Graphics,
  snapshot: GameSnapshot,
  dim = false
): void {
  graphics.clear();

  graphics.fillStyle(0x09121d, 1);
  graphics.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

  graphics.fillStyle(0x132235, 1);
  graphics.fillRoundedRect(18, 74, VIEWPORT_WIDTH - 36, VIEWPORT_HEIGHT - 148, 24);

  graphics.fillStyle(0x16283f, 1);
  graphics.fillRoundedRect(34, 132, VIEWPORT_WIDTH - 68, VIEWPORT_HEIGHT - 264, 18);

  graphics.fillStyle(0x2b4157, 1);
  for (let lane = 0; lane < 4; lane += 1) {
    graphics.fillRect(52 + lane * 74, 154, 10, VIEWPORT_HEIGHT - 308);
  }

  graphics.lineStyle(2, 0x90a1ad, 0.2);
  for (let stripe = 0; stripe < 10; stripe += 1) {
    graphics.beginPath();
    graphics.moveTo(42, 150 + stripe * 56);
    graphics.lineTo(VIEWPORT_WIDTH - 42, 150 + stripe * 56);
    graphics.strokePath();
  }

  if (snapshot.level >= 4) {
    graphics.lineStyle(2, 0x7aa7d8, 0.26);
    for (let line = 0; line < 18; line += 1) {
      const x = 20 + line * 22;
      graphics.beginPath();
      graphics.moveTo(x, 88);
      graphics.lineTo(x - 16, VIEWPORT_HEIGHT - 64);
      graphics.strokePath();
    }
  }

  for (const pickup of snapshot.pickups) {
    const color = PICKUP_COLORS[pickup.kind];
    graphics.fillStyle(color, 1);
    graphics.fillCircle(pickup.x, pickup.y, pickup.radius);
    graphics.fillStyle(0x0b1420, 0.8);

    if (pickup.kind === "coffee") {
      graphics.fillRect(pickup.x - 7, pickup.y - 6, 12, 14);
      graphics.fillStyle(0xf6f0d8, 1);
      graphics.fillRect(pickup.x - 8, pickup.y - 8, 14, 4);
    } else if (pickup.kind === "earphones") {
      graphics.lineStyle(4, 0x0b1420, 0.9);
      graphics.beginPath();
      graphics.moveTo(pickup.x - 6, pickup.y - 4);
      graphics.lineTo(pickup.x - 1, pickup.y + 6);
      graphics.lineTo(pickup.x + 5, pickup.y - 4);
      graphics.strokePath();
    } else {
      graphics.fillRect(pickup.x - 8, pickup.y - 3, 16, 8);
      graphics.fillStyle(0x0b1420, 0.9);
      graphics.fillCircle(pickup.x - 5, pickup.y + 6, 3);
      graphics.fillCircle(pickup.x + 5, pickup.y + 6, 3);
    }
  }

  for (const commuter of snapshot.commuters) {
    graphics.fillStyle(0xe1d7c5, 0.95);
    graphics.fillCircle(commuter.x, commuter.y, commuter.radius);
    graphics.fillStyle(0x314a63, 1);
    graphics.fillRect(
      commuter.x - commuter.radius,
      commuter.y + commuter.radius * 0.2,
      commuter.radius * 2,
      commuter.radius * 1.3
    );
  }

  const playerColor =
    snapshot.player.invulnerableMs > 0 ? 0xf0bf2a : snapshot.health < 35 ? 0xc8504d : 0x5dd0a6;

  graphics.fillStyle(0x0b1420, 0.45);
  graphics.fillCircle(snapshot.player.x + 4, snapshot.player.y + 9, snapshot.player.radius + 2);
  graphics.fillStyle(playerColor, 1);
  graphics.fillCircle(snapshot.player.x, snapshot.player.y, snapshot.player.radius);
  graphics.lineStyle(3, 0xffffff, 0.75);
  graphics.strokeCircle(snapshot.player.x, snapshot.player.y, snapshot.player.radius + 4);

  if (dim) {
    graphics.fillStyle(0x03070c, 0.55);
    graphics.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }
}

