import Phaser from "phaser";

import { VIEWPORT_WIDTH } from "../game/constants";
import type { GameSnapshot } from "../game/types";
import { drawSnapshot } from "./drawSnapshot";

export class GameOverScene extends Phaser.Scene {
  private graphics?: Phaser.GameObjects.Graphics;
  private title?: Phaser.GameObjects.Text;
  private snapshot: GameSnapshot | null = null;

  constructor() {
    super("gameover");
  }

  init(data: { snapshot?: GameSnapshot }): void {
    this.snapshot = data.snapshot ?? null;
  }

  create(): void {
    this.graphics = this.add.graphics();
    this.title = this.add.text(VIEWPORT_WIDTH / 2, 108, "퇴근 실패", {
      color: "#f4efe2",
      fontFamily: "Segoe UI, Pretendard, sans-serif",
      fontSize: "30px",
      fontStyle: "700"
    });
    this.title.setOrigin(0.5);

    if (this.snapshot) {
      this.renderFrame(this.snapshot);
    }
  }

  renderFrame(snapshot: GameSnapshot): void {
    this.snapshot = snapshot;
    if (!this.graphics || !this.title) {
      return;
    }

    drawSnapshot(this.graphics, snapshot, true);
    this.title.setText(snapshot.failReason ?? "퇴근 실패");
  }
}

