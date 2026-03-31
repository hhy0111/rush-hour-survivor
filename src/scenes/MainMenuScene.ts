import Phaser from "phaser";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "../game/constants";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x112235, 0x112235, 0x09121d, 0x09121d, 1);
    graphics.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    graphics.fillStyle(0x1b3147, 1);
    graphics.fillRoundedRect(22, 160, VIEWPORT_WIDTH - 44, VIEWPORT_HEIGHT - 260, 26);

    for (let i = 0; i < 10; i += 1) {
      graphics.fillStyle(0xd9d0bf, 0.7);
      graphics.fillCircle(40 + i * 34, 520 + (i % 2) * 14, 13);
      graphics.fillStyle(0x34506e, 0.92);
      graphics.fillRect(28 + i * 34, 530 + (i % 2) * 12, 24, 20);
    }

    this.add
      .text(VIEWPORT_WIDTH / 2, 224, "Rush Hour Survivor", {
        color: "#f4efe2",
        fontFamily: "Segoe UI, Pretendard, sans-serif",
        fontSize: "28px",
        fontStyle: "700"
      })
      .setOrigin(0.5);

    this.add
      .text(VIEWPORT_WIDTH / 2, 274, "혼잡한 퇴근길을 버텨라", {
        color: "#b9c6d3",
        fontFamily: "Segoe UI, Pretendard, sans-serif",
        fontSize: "16px"
      })
      .setOrigin(0.5);
  }
}

