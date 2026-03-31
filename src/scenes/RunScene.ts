import Phaser from "phaser";

import type { GameSnapshot } from "../game/types";
import { drawSnapshot } from "./drawSnapshot";

export class RunScene extends Phaser.Scene {
  private graphics?: Phaser.GameObjects.Graphics;
  private modifierText?: Phaser.GameObjects.Text;
  private snapshot: GameSnapshot | null = null;

  constructor() {
    super("run");
  }

  init(data: { snapshot?: GameSnapshot }): void {
    this.snapshot = data.snapshot ?? null;
  }

  create(): void {
    this.graphics = this.add.graphics();
    this.modifierText = this.add.text(24, 28, "", {
      color: "#f8f2df",
      fontFamily: "Segoe UI, Pretendard, sans-serif",
      fontSize: "16px",
      fontStyle: "600"
    });

    if (this.snapshot) {
      this.renderFrame(this.snapshot);
    }
  }

  renderFrame(snapshot: GameSnapshot): void {
    this.snapshot = snapshot;
    if (!this.graphics || !this.modifierText) {
      return;
    }

    drawSnapshot(this.graphics, snapshot, false);
    this.modifierText.setText(snapshot.activeModifiers.join(" • "));
  }
}

